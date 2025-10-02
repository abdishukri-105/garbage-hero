"use client";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import Image from "next/image";
import Link from "next/link";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import { urlFor } from '@/lib/sanity';
import { FALLBACK_TEASERS } from '@/data/fallback/teasers';

const CARD_WIDTH = 390;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const RecentWorkTeaser = ({ teasers = [] }) => {
  // Prefer live teasers if available; otherwise use centralized fallback data
  const src = Array.isArray(teasers) && teasers.length > 0 ? teasers : FALLBACK_TEASERS;

  // Normalize into card shape
  const mapped = src.map((t, i) => {
    const url = t.imageUrl || t.url || (t.image ? (() => {
      try { return urlFor(t.image).width(800).height(600).auto('format').url(); } catch { return '/images/slide3.jpg'; }
    })() : '/images/slide3.jpg');
    return {
      id: t._id || t.id || `teaser-${i}`,
      url,
      category: t.category || 'Project',
      title: t.companyName || t.title || 'Untitled',
      description: t.shortDescription || t.description || '',
    };
  });

  const [ref, { width }] = useMeasure();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50px 0px" });
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (mapped.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => pv + CARD_SIZE);
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => pv - CARD_SIZE);
  };

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="recentwork-heading"
      className="relative overflow-hidden section-compact rounded-tr-[2rem] rounded-br-[2rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      {/* Radial background pattern (no borders) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
      <div className="relative p-4" ref={ref}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12" >
            <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-4">Proven Outcomes</span>
            <Heading id="recentwork-heading" level={2} className="mb-4 mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]" variant="primary">
              Recent Hygiene & Facility Success Stories
            </Heading>
            <Paragraph className="text-[#333333] max-w-[65ch] mx-auto text-sm sm:text-base md:text-xl" size="xl">
              A curated snapshot of cleaning sanitation landscaping and pest control engagements delivering measurable health aesthetic and operational gains.
            </Paragraph>
          </div>
          <motion.div
            role="list"
            animate={{ x: offset }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            className="flex"
          >
            {mapped.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </motion.div>
        </div>
        {/* Nav buttons */}
        <>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_LEFT ? "0%" : "-120%" }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 rounded-r-xl bg-white/60 backdrop-blur-sm p-3 pl-2 text-3xl shadow ring-1 ring-[#3AA335]/20 hover:bg-white/80 transition"
            style={{ color: '#3AA335' }}
            onClick={shiftLeft}
            aria-label="Scroll left"
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_RIGHT ? "0%" : "120%" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-l-xl bg-white/60 backdrop-blur-sm p-3 pr-2 text-3xl shadow ring-1 ring-[#3AA335]/20 hover:bg-white/80 transition"
            style={{ color: '#3AA335' }}
            onClick={shiftRight}
            aria-label="Scroll right"
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </motion.section>
  );
};

const Card = ({ url, category, title, description }) => {
  return (
    <Link href="/portfolio" role="listitem" aria-label={`${title} project`}>
      <div
        className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT, marginRight: MARGIN }}
      >
        <Image
          src={url}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
          style={{ objectFit: 'cover' }}
          className="rounded-2xl"
        />
        <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-t from-[#1E611B]/85 via-[#1E611B]/55 to-[#1E611B]/10 p-6 flex flex-col justify-end text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
          <span className="self-start w-auto inline-block text-[10px] tracking-wide font-medium uppercase text-[#1E611B] bg-[#E8F6E9]/80 px-2 py-0.5 rounded-md mb-2 ring-1 ring-[#3AA335]/15">
            {category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold leading-snug drop-shadow-md">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-white/90 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecentWorkTeaser;