"use client";
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { SiAdobe, SiAmazon, SiBmw, SiChase, SiDeliveroo, SiEpicgames, SiGodaddy, SiHeroku } from 'react-icons/si';
import { urlFor } from '@/lib/sanity';
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph"; // added

/*
  ClientLogosMarquee
  UI/UX improvements:
  - Fixed border classes/colors
  - Respect reduced motion; pause when off-screen; pause on hover
  - Mobile shows static grid for scanability
  - Better a11y (roles + alt text)
  - Tuned Next/Image with Sanity loader and sizes
*/

const ROW_DURATION = 40; // seconds for one full traverse

export default function ClientLogosMarquee({ logos = [] }) {
  const hasData = Array.isArray(logos) && logos.length > 0;
  const prepared = hasData ? spreadRows(logos) : placeholderRows();
  const [rowA, rowB, rowC] = prepared; // three rows

  // Motion/viewport responsiveness
  const rm = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px', once: false });

  return (
    <section ref={sectionRef} className="relative py-4 sm:py-8 pb-10 bg-white border-t border-b overflow-hidden" style={{ borderColor: '#E8F6E9' }}>
      {/* <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} /> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-4">Trusted By</span>
          <Heading
            level={3}
            className="mb-2 mx-auto w-fit pb-2 px-2 rounded-md border-b-4 border-[#3aa335]"
            variant="primary"
          >
            Our Clients
          </Heading>
          <Paragraph className="text-center text-sm sm:text-base max-w-[60ch] mx-auto text-[#333333]">
            Forward-thinking organisations partnering with us for sustainable facility care and dependable service delivery.
          </Paragraph>
        </div>

        {/* Reduced motion: static; Otherwise simple linear marquee */}
        {rm ? (
          <StaticGrid logos={[...rowA, ...rowB, ...rowC]} />
        ) : (
          <div>
            <MarqueeRow items={rowA} reverse={false} duration={ROW_DURATION} active={inView} />
            <MarqueeRow items={rowB} reverse duration={ROW_DURATION + 8} className="mt-6" active={inView} />
            <MarqueeRow items={rowC} reverse={false} duration={ROW_DURATION + 16} className="mt-6" active={inView} />
          </div>
        )}
      </div>
      <EdgeFade />
    </section>
  );
}

function MarqueeRow({ items, reverse, duration, className = '', active = true }) {
  const seq = [...items, ...items, ...items];
  return (
    <div
      className={`flex overflow-hidden select-none ${className}`}
      role="list"
      aria-label="Client logos"
    >
      <motion.div
        className="flex gap-6 sm:gap-10 items-center"
        initial={false}
        animate={active ? { x: reverse ? ['-66.66%', '0%'] : ['0%', '-66.66%'] } : { x: 0 }}
        transition={active ? { duration, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
      >
        {seq.map((logo, i) => (
          <div role="listitem" key={logo._id ? logo._id + i : i}>
            <LogoItem logo={logo} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ logo }) {
  if (logo.type === 'placeholder') {
    const Icon = logo.icon;
    return (
      <div
        className="group relative h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center rounded-xl border"
        style={{ backgroundColor: 'rgba(232,246,233,0.4)', borderColor: '#3AA3351A', color: '#3AA335' }}
        aria-label="Client logo placeholder"
      >
        <Icon className="text-3xl sm:text-4xl opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  }
  const href = cleanUrl(logo.url);
  const img = logo.logoImage;
  const localUrl = logo.logoImageUrl;

  // Build a best-effort URL (prefer local fallback if provided)
  const fallbackUrl = (() => {
    if (localUrl) return localUrl;
    try {
      return urlFor(img).width(320).height(200).fit('max').quality(75).auto('format').url();
    } catch {
      return '/images/logo.png';
    }
  })();
  const loader = ({ width, quality }) => {
    if (localUrl) return localUrl;
    try {
      return urlFor(img)
        .width(Math.min(width, 360))
        .fit('max')
        .quality(quality ?? 70)
        .auto('format')
        .url();
    } catch { return fallbackUrl; }
  };

  const hasImage = !!localUrl || img?.asset;
  const baseClasses = "group relative h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center rounded-xl border transition-colors";
  const baseStyle = { backgroundColor: 'rgba(232,246,233,0.4)', borderColor: '#3AA3351A' };

  const Img = hasImage ? (
    <div className="relative w-full h-full p-2">
      <Image
        loader={loader}
        src={fallbackUrl}
        alt={altFor(logo)}
        fill
        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 15vw, 160px"
        quality={70}
        className="object-contain object-center opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  ) : (
    <span className="text-xs font-medium truncate px-2 text-[#333333]/70 group-hover:text-[#333333] transition-colors">{logo.companyName || 'Client'}</span>
  );

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={baseClasses}
      style={baseStyle}
      aria-label={altFor(logo)}
    >
      {Img}
      <span className="sr-only">{altFor(logo)}</span>
    </Wrapper>
  );
}

function StaticGrid({ logos = [] }) {
  const top = logos.slice(0, Math.min(12, logos.length));
  return (
    <ul role="list" className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
      {top.map((logo, i) => (
        <li role="listitem" key={logo._id ? logo._id + '-static-' + i : i}>
          <LogoItem logo={logo} />
        </li>
      ))}
    </ul>
  );
}

function EdgeFade() {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: 'linear-gradient(to right, #FFFFFF, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: 'linear-gradient(to left, #FFFFFF, transparent)' }} />
    </>
  );
}

// Helpers
function spreadRows(logos) {
  // Distribute logos across three rows as evenly as possible
  if (!Array.isArray(logos) || logos.length === 0) return [[], [], []];
  const rows = [[], [], []];
  logos.forEach((logo, idx) => {
    rows[idx % 3].push(logo);
  });
  return rows;
}

function placeholderRows() {
  const base = [
    { type: 'placeholder', icon: SiAdobe },
    { type: 'placeholder', icon: SiAmazon },
    { type: 'placeholder', icon: SiChase },
    { type: 'placeholder', icon: SiDeliveroo },
    { type: 'placeholder', icon: SiEpicgames },
    { type: 'placeholder', icon: SiGodaddy },
    { type: 'placeholder', icon: SiHeroku },
    { type: 'placeholder', icon: SiBmw },
  ];
  // Three rows of placeholders
  return [base, base, base];
}

function cleanUrl(url) {
  if (!url) return null;
  try {
    const hasProtocol = /^(https?:)?\/\//i.test(url);
    return hasProtocol ? url : `https://${url}`;
  } catch {
    return null;
  }
}

function altFor(logo) {
  const name = logo.companyName || 'Client';
  return `${name} logo`;
}
