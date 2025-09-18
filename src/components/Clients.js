"use client";
import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import NeuButton from "./ui/Button";
import { urlFor } from "@/lib/sanity";
import {
  SiAdobe,
  SiAmazon,
  SiBmw,
  SiChase,
  SiDeliveroo,
  SiEpicgames,
  SiGodaddy,
  SiHeroku,
} from "react-icons/si";

/*
  Clients (Trust Band)
  - Hero row of top government/enterprise logos
  - Subtle marquee for breadth (desktop only)
  - CTAs: Company Profile (PDF) + View all clients
  - A11y, reduced motion, consistent sizing
  Palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body)
*/

const ROW_DURATION = 45; // slower for gravitas

export default function Clients({ logos = [] }) {
  const rm = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px", once: false });

  const { hero, rowA, rowB } = useMemo(() => prepareRows(logos), [logos]);

  return (
    <section
      id="clients"
      ref={sectionRef}
      aria-labelledby="clients-title"
      className="relative py-8 sm:py-12 md:py-14 bg-white border-t border-b overflow-hidden"
      style={{ borderColor: "#E8F6E9" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="text-center md:text-left">
            <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-3">
              Trusted by Government and Enterprise
            </span>
            <Heading id="clients-title" level={3} className="mb-2 w-fit md:w-auto mx-auto md:mx-0 pb-2 px-2 rounded-md border-b-4 border-[#3AA335]" variant="primary">
              Our Clients
            </Heading>
            <Paragraph className="text-sm sm:text-base max-w-[65ch] mx-auto md:mx-0 text-[#333333]">
              Long-term partnerships with ministries, counties, agencies, and leading enterprises across Kenya.
            </Paragraph>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-3">
            <NeuButton text="Download Company Profile" href="/images/companyprofile.pdf" className="whitespace-nowrap" />
            <NeuButton text="View All Clients" href="/about-us#clients" className="bg-white text-[#1E611B] ring-1 ring-[#3AA335]/30 hover:bg-[#E8F6E9]" />
          </div>
        </div>

        {/* Hero row (always visible) */}
        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {hero.map((logo, i) => (
            <li role="listitem" key={logo._id ? logo._id + "-hero-" + i : i}>
              <HeroLogo logo={logo} priority={i < 6} />
            </li>
          ))}
        </ul>

        {/* Desktop marquee for breadth; mobile shows a compact static grid */}
        {rm ? (
          <StaticCompactGrid logos={[...rowA, ...rowB]} />
        ) : (
          <div className="hidden sm:block">
            <MarqueeRow items={rowA} reverse={false} duration={ROW_DURATION} active={inView} />
            <MarqueeRow items={rowB} reverse duration={ROW_DURATION + 8} className="mt-6" active={inView} />
          </div>
        )}

        {/* Mobile compact grid */}
        <div className="sm:hidden mt-4">
          <StaticCompactGrid logos={[...rowA, ...rowB]} />
        </div>
      </div>

      <EdgeFade />
    </section>
  );
}

function HeroLogo({ logo, priority = false }) {
  if (logo.type === "placeholder") {
    const Icon = logo.icon;
    return (
      <div
        className="h-16 sm:h-20 md:h-24 w-full flex items-center justify-center rounded-xl border"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#3AA3351A", color: "#3AA335" }}
        aria-label="Client logo placeholder"
      >
        <Icon className="text-3xl sm:text-4xl" />
      </div>
    );
  }

  const href = cleanUrl(logo.url);
  const img = logo.logoImage;

  const fallbackUrl = (() => {
    try {
      return urlFor(img).width(260).height(160).fit("max").quality(75).auto("format").url();
    } catch {
      return "/placeholder.png";
    }
  })();
  const loader = ({ width, quality }) => {
    try {
      return urlFor(img)
        .width(Math.min(width, 320))
        .height(Math.min(Math.round(width * 0.6), 180))
        .fit("max")
        .quality(quality ?? 70)
        .auto("format")
        .url();
    } catch {
      return fallbackUrl;
    }
  };

  const content = img?.asset ? (
    <Image
      loader={loader}
      src={fallbackUrl}
      alt={altFor(logo)}
      width={220}
      height={110}
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 220px"
      quality={70}
      priority={priority}
      className="object-contain max-h-full max-w-full opacity-90 hover:opacity-100 transition-opacity p-3"
    />
  ) : (
    <span className="text-xs font-medium truncate px-1" style={{ color: "#333333" }}>
      {logo.companyName || "Client"}
    </span>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-16 sm:h-20 md:h-24 w-full flex items-center justify-center rounded-xl border"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#3AA3351A" }}
      aria-label={altFor(logo)}
    >
      {content}
    </a>
  ) : (
    <div
      className="h-16 sm:h-20 md:h-24 w-full flex items-center justify-center rounded-xl border"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#3AA3351A" }}
      aria-label={altFor(logo)}
    >
      {content}
    </div>
  );
}

function MarqueeRow({ items, reverse, duration, className = "", active = true }) {
  const seq = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className={`flex overflow-hidden select-none ${className}`} role="list" aria-label="Client logos marquee">
      <motion.div
        className="flex gap-6 sm:gap-10 items-center"
        initial={false}
        animate={active ? { x: reverse ? ["-66.66%", "0%"] : ["0%", "-66.66%"] } : { x: "0%" }}
        transition={active ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        {seq.map((logo, i) => (
          <div role="listitem" key={logo._id ? logo._id + "-mq-" + i : i}>
            <LogoItem logo={logo} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ logo }) {
  if (logo.type === "placeholder") {
    const Icon = logo.icon;
    return (
      <div
        className="h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center rounded-xl border"
        style={{ backgroundColor: "rgba(232,246,233,0.4)", borderColor: "#3AA3351A", color: "#3AA335" }}
      >
        <Icon className="text-3xl sm:text-4xl" />
      </div>
    );
  }

  const href = cleanUrl(logo.url);
  const img = logo.logoImage;

  const fallbackUrl = (() => {
    try {
      return urlFor(img).width(200).height(120).fit("max").quality(70).auto("format").url();
    } catch {
      return "/placeholder.png";
    }
  })();
  const loader = ({ width, quality }) => {
    try {
      return urlFor(img)
        .width(Math.min(width, 240))
        .height(Math.min(Math.round(width * 0.6), 140))
        .fit("max")
        .quality(quality ?? 60)
        .auto("format")
        .url();
    } catch {
      return fallbackUrl;
    }
  };

  const content = img?.asset ? (
    <Image
      loader={loader}
      src={fallbackUrl}
      alt={altFor(logo)}
      width={160}
      height={80}
      sizes="(max-width: 640px) 120px, 160px"
      quality={60}
      className="object-contain max-h-full max-w-full opacity-80 hover:opacity-100 transition-opacity p-2"
    />
  ) : (
    <span className="text-xs font-medium truncate px-1" style={{ color: "#333333" }}>
      {logo.companyName || "Client"}
    </span>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-14 w-28 sm:h-16 sm:w-32 rounded-xl border" style={{ backgroundColor: "rgba(232,246,233,0.4)", borderColor: "#3AA3351A" }} aria-label={altFor(logo)}>
      {content}
    </a>
  ) : (
    <div className="flex items-center justify-center h-14 w-28 sm:h-16 sm:w-32 rounded-xl border" style={{ backgroundColor: "rgba(232,246,233,0.4)", borderColor: "#3AA3351A" }} aria-label={altFor(logo)}>
      {content}
    </div>
  );
}

function StaticCompactGrid({ logos = [] }) {
  const top = logos.slice(0, Math.min(12, logos.length));
  return (
    <ul role="list" className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
      {top.map((logo, i) => (
        <li role="listitem" key={logo._id ? logo._id + "-cg-" + i : i}>
          <LogoItem logo={logo} />
        </li>
      ))}
    </ul>
  );
}

function EdgeFade() {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(to right, #FFFFFF, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(to left, #FFFFFF, transparent)" }} />
    </>
  );
}

// Helpers
function prepareRows(logos) {
  const list = Array.isArray(logos) && logos.length > 0 ? logos : placeholderRows();
  const hero = pickHero(list, 6);
  const remaining = list.filter((l) => !hero.includes(l));
  const [rowA, rowB] = spreadRows(remaining.length ? remaining : list);
  return { hero, rowA, rowB };
}

function pickHero(logos, count = 6) {
  // Heuristic: prioritise likely government/public sector by name, then fill
  const govTerms = ["ministry", "county", "authority", "commission", "agency", "parliament", "university", "hospital"];
  const score = (name = "") => {
    const n = name.toLowerCase();
    return govTerms.some((t) => n.includes(t)) ? 2 : n.length > 0 ? 1 : 0;
  };
  const sorted = [...logos].sort((a, b) => (score(b.companyName) - score(a.companyName)));
  return sorted.slice(0, count);
}

function spreadRows(logos) {
  if (logos.length <= 4) return [logos, logos];
  const midpoint = Math.ceil(logos.length / 2);
  return [logos.slice(0, midpoint), logos.slice(midpoint)];
}

function placeholderRows() {
  const base = [
    { type: "placeholder", icon: SiAdobe },
    { type: "placeholder", icon: SiAmazon },
    { type: "placeholder", icon: SiChase },
    { type: "placeholder", icon: SiDeliveroo },
    { type: "placeholder", icon: SiEpicgames },
    { type: "placeholder", icon: SiGodaddy },
    { type: "placeholder", icon: SiHeroku },
    { type: "placeholder", icon: SiBmw },
  ];
  return base;
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
  const name = logo.companyName || "Client";
  return `${name} logo`;
}
