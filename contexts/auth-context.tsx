"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// Row shape of public.users (synced from auth.users by a DB trigger)
export type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  provider: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signInWithGoogle: (next?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(createClient);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = session?.user ?? null;

  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle<UserProfile>();
      if (error) console.error("Failed to load user profile:", error.message);
      return data ?? null;
    },
    [supabase],
  );

  useEffect(() => {
    // onAuthStateChange fires INITIAL_SESSION on subscribe, so it covers the first load too
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const userId = user?.id;

  useEffect(() => {
    // Kept out of the auth callback so Supabase calls don't deadlock
    if (!userId) return;
    let ignore = false;
    fetchProfile(userId).then((data) => {
      if (!ignore) setProfile(data);
    });
    return () => {
      ignore = true;
    };
  }, [userId, fetchProfile]);

  // Hide a stale profile left over from a previous user (e.g. after sign-out)
  const currentProfile = profile?.id === userId ? profile : null;

  const signInWithGoogle = useCallback(
    async (next = "/") => {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, [supabase]);

  const refreshProfile = useCallback(async () => {
    if (userId) setProfile(await fetchProfile(userId));
  }, [userId, fetchProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile: currentProfile,
      isLoading,
      signInWithGoogle,
      signOut,
      refreshProfile,
    }),
    [user, session, currentProfile, isLoading, signInWithGoogle, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
