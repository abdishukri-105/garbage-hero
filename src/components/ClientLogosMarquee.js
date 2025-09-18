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
      <div className=" flex items-center justify-center rounded-xl border" style={{ backgroundColor: '#E8F6E9', borderColor: '#3AA3351A', color: '#3AA335' }} aria-label="Client logo placeholder">
        <Icon className="text-3xl sm:text-4xl" />
      </div>
    );
  }
  const href = cleanUrl(logo.url);
  const img = logo.logoImage;

  // Sanity loader tuned for small logos + responsive sizes
  const fallbackUrl = (() => {
    try { return urlFor(img).width(200).height(120).fit('max').quality(70).auto('format').url(); } catch { return '/placeholder.png'; }
  })();
  const loader = ({ width, quality }) => {
    try { return urlFor(img).width(Math.min(width, 240)).height(Math.min(Math.round(width * 0.6), 140)).fit('max').quality(quality ?? 60).auto('format').url(); } catch { return fallbackUrl; }
  };

  const content = img?.asset ? (
    <Image
      loader={loader}
      src={fallbackUrl}
      alt={altFor(logo)}
      width={160}
      height={80}
      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 15vw, 160px"
      quality={60}
      className="object-contain max-h-full max-w-full opacity-80 hover:opacity-100 transition-opacity p-2"
    />
  ) : (
    <span className="text-xs font-medium truncate px-1" style={{ color: '#333333' }}>{logo.companyName || 'Client'}</span>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center rounded-xl border transition-colors" style={{ backgroundColor: 'rgba(232,246,233,0.4)', borderColor: '#3AA3351A' }} aria-label={altFor(logo)}>
      {content}
    </a>
  ) : (
    <div className="group h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center rounded-xl border transition-colors" style={{ backgroundColor: 'rgba(232,246,233,0.4)', borderColor: '#3AA3351A' }} aria-label={altFor(logo)}>
      {content}
    </div>
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
