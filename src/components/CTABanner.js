"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import WetPaintButton from "./ui/WetPaintButton";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 32, transition: { duration: 0.7, ease: [0.4, 0, 0.6, 1], delay } },
  });

  return (
    <motion.section
      ref={ref}
      aria-labelledby="cta-heading"
      className="section-compact relative overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      {/* Background pattern (subtle radial like other sections) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.05), transparent 70%)' }} />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#3AA335] via-[#2F8F2B] to-[#1E611B] px-6 py-14 sm:py-20 sm:px-12 md:px-16 lg:flex lg:items-center lg:gap-x-16 lg:py-20 shadow-xl ring-1 ring-[#FFFFFF1A]">
          {/* Decorative accents */}
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden />
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.07] bg-[radial-gradient(circle_at_25%_20%,#fff,transparent_60%)]" aria-hidden />

          {/* Text */}
          <motion.div {...fadeUp(0.05)} className="relative z-10 mx-auto text-center lg:text-left lg:mx-0 lg:basis-[55%] lg:max-w-none max-w-xl">
            <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-white/80 bg-white/10 px-3 py-1 rounded-full ring-1 ring-white/20 mb-5">
              Take Action Today
            </span>
            <Heading
              id="cta-heading"
              level={2}
              className="text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
            >
              Elevate Hygiene Standards With A Trusted National Partner
            </Heading>
            <Paragraph className="text-white/90 text-base sm:text-lg md:text-xl max-w-prose mx-auto lg:mx-0" size="lg">
              Secure consistent compliant and sustainable facility hygiene now. Get a fast tailored quote and start improving health appearance and efficiency.
            </Paragraph>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <WetPaintButton href="/contact-us" text="Request Quote" size="lg" variant="cta" />
            </div>
            {/* <ul className="mt-8 grid grid-cols-2 gap-4 text-left text-white/80 text-xs sm:text-sm max-w-sm mx-auto lg:mx-0">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-white/70" />ISO-aligned hygiene standards</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-white/70" />Eco-friendly product usage</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-white/70" />Trusted by corporate & public sector</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-white/70" />Nationwide service coverage</li>
            </ul> */}
          </motion.div>

          {/* Image */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative mt-12 lg:mt-0 mx-auto lg:mx-0 lg:basis-[45%] flex-1"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:h-[360px] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl">
              <Image
                src="/projects/cleaning-4.jpg"
                alt="Professional eco-focused cleaning team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 48rem"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E611B]/20 via-[#3AA335]/10 to-transparent" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTABanner;