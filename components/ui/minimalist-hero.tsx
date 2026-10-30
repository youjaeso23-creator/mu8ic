'use client';

import { useState, type ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ComponentType<{ className?: string }>;
  href: string;
}

interface MinimalistHeroProps {
  logoText: string;
  navLinks: NavLink[];
  mainText: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks?: SocialLink[];
  locationText?: string;
  className?: string;
}

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks = [],
  locationText,
  className = '',
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaClassName =
    'inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80';

  return (
    <section
      className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-background p-6 font-sans text-foreground md:p-10 ${className}`}
    >
      <header className="relative z-30 flex w-full items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl tracking-wider"
        >
          {logoText}
        </motion.a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={ctaLink}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (navLinks.length + 1) }}
            className={ctaClassName}
          >
            {ctaText}
          </motion.a>
        </nav>

        <motion.button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </header>

      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-6 top-16 z-30 flex flex-col gap-4 rounded-lg border border-foreground/10 bg-background p-6 shadow-lg md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaLink}
            onClick={() => setMenuOpen(false)}
            className={`${ctaClassName} text-center`}
          >
            {ctaText}
          </a>
        </motion.nav>
      )}

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-10 self-center py-10 md:grid-cols-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
            {mainText}
          </p>
          <a href={ctaLink} className={`${ctaClassName} mt-6`}>
            {ctaText}
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative z-10 h-auto w-56 md:w-64 lg:w-72"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={576}
              height={864}
              priority
              className="h-auto w-full scale-150 object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="font-display text-7xl md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {(socialLinks.length > 0 || locationText) && (
        <footer className="relative z-30 flex w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-sm font-medium text-foreground/80"
          >
            {locationText}
          </motion.p>
        </footer>
      )}
    </section>
  );
};
