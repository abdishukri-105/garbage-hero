"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiAdobe, SiAmazon, SiBmw, SiChase, SiDeliveroo, SiEpicgames, SiGodaddy, SiHeroku } from 'react-icons/si';
import { urlFor } from '@/lib/sanity';

/*
  ClientLogosMarquee
  Updated: Removed Tailwind custom color tokens; hardcoded palette.
  Palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body), #000, #fff
*/

const ROW_DURATION = 40; // seconds for one full traverse

export default function ClientLogosMarquee({ logos = [] }) {
  const hasData = Array.isArray(logos) && logos.length > 0;
  const prepared = hasData ? spreadRows(logos) : placeholderRows();
  const [rowA, rowB] = prepared;

  return (
    <section className="relative py-10 sm:py-12 bg-white border-t border-b overflow-hidden" style={{ borderColor: '#E8F6E9' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="sr-only">Trusted By</h2>
        <p className="text-center text-xs sm:text-sm tracking-wide uppercase font-semibold mb-6" style={{ color: '#3AA335' }}>Trusted By Forward-Thinking Organisations</p>
        <MarqueeRow items={rowA} reverse={false} duration={ROW_DURATION} />
        <MarqueeRow items={rowB} reverse duration={ROW_DURATION + 8} className="mt-6" />
      </div>
      <EdgeFade />
    </section>
  );
}

function MarqueeRow({ items, reverse, duration, className = '' }) {
  const seq = [...items, ...items, ...items];
  return (
    <div className={`flex overflow-hidden select-none ${className}`} aria-hidden>
      <motion.div
        className="flex gap-6 sm:gap-10 items-center"
        initial={{ x: reverse ? '-66.66%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-66.66%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {seq.map((logo, i) => (
          <LogoItem key={logo._id ? logo._id + i : i} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ logo }) {
  if (logo.type === 'placeholder') {
    const Icon = logo.icon;
    return (
      <div className="h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center rounded-xl border" style={{ backgroundColor: '#E8F6E9', borderColor: '#3AA3351A', color: '#3AA335' }}>
        <Icon className="text-3xl sm:text-4xl" />
      </div>
    );
  }
  const href = cleanUrl(logo.url);
  const img = logo.logoImage;
  return (
    <div className="group h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center rounded-xl border transition-colors" style={{ backgroundColor: 'rgba(232,246,233,0.4)', borderColor: '#3AA3351A' }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full w-full p-2">
          {img?.asset ? (
            <Image
              src={urlFor(img).width(200).height(120).fit('max').url()}
              alt={logo.companyName || 'Client logo'}
              width={160}
              height={80}
              className="object-contain max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <span className="text-xs font-medium truncate px-1" style={{ color: '#333333' }}>{logo.companyName || 'Client'}</span>
          )}
        </a>
      ) : img?.asset ? (
        <Image
          src={urlFor(img).width(200).height(120).fit('max').url()}
          alt={logo.companyName || 'Client logo'}
          width={160}
          height={80}
          className="object-contain max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity p-2"
        />
      ) : (
        <span className="text-xs font-medium truncate px-1" style={{ color: '#333333' }}>{logo.companyName || 'Client'}</span>
      )}
    </div>
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
  if (logos.length <= 4) {
    return [logos, logos];
  }
  const midpoint = Math.ceil(logos.length / 2);
  return [logos.slice(0, midpoint), logos.slice(midpoint)];
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
  return [base, base];
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
