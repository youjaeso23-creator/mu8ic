import { MinimalistHero } from '@/components/ui/minimalist-hero';

const navLinks = [
  { label: 'FEATURES', href: '#' },
  { label: 'PRICING', href: '#' },
  { label: 'CONTACT', href: '#' },
];

export default function Hero() {
  return (
    <MinimalistHero
      logoText="mu8ic"
      navLinks={navLinks}
      mainText="Create royalty-free music for your YouTube videos in seconds. Tailored to your content."
      ctaText="Get Started"
      ctaLink="#"
      imageSrc="https://cdn.21st.dev/assets/mirror/21/2172cd84238bbee1a57a87b64322655b09c2ffa4ea89acaef7e9989c3abd272d.png"
      imageAlt="A portrait of a person in a black turtleneck, in profile."
      overlayText={{
        part1: 'Create',
        part2: 'Your Sound',
      }}
    />
  );
}
