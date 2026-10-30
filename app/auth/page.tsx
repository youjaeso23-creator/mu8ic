import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in · mu8ic",
};

export default async function AuthPage({ searchParams }: PageProps<"/auth">) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) redirect("/");

  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-[#171717] px-4 font-sans text-white">
      {/* Soft light behind the card so the glass has something to refract */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-[70%] -translate-y-[65%] rounded-full bg-yellow-400/25 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-[15%] -translate-y-[20%] rounded-full bg-violet-500/20 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04),0_24px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:p-10">
        {/* Top sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/[0.08] to-transparent"
        />

        <div className="relative flex flex-col items-center text-center">
          <Link href="/" className="font-display text-4xl tracking-wider">
            mu8ic
          </Link>

          <p className="mt-6 text-sm leading-relaxed text-white/60">
            Moments connected through music
          </p>

          <GoogleSignInButton />

          {error && (
            <p className="mt-3 text-xs text-red-400">
              Sign-in failed. Please try again.
            </p>
          )}

          <p className="mt-8 text-xs leading-relaxed text-white/40">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white/70">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white/70">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
