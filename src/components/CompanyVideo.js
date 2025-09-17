"use client"
import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const CompanyVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 20%"], // start scaling when entering, finish when leaving
  });

  // Scale up then hold, slight upward drift after center
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.9, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [50, 0, -80]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.4, 0.2]);
  const boxShadow = useTransform(shadowOpacity, v => `0 18px 40px -10px rgba(30,97,27,${v})`);

  // YouTube embed params trimmed for a cleaner / less YouTube-looking player
  const videoUrl = "https://www.youtube.com/embed/W-_mShO-_yw?rel=0&modestbranding=1&controls=1&showinfo=0&playsinline=1&color=white";

  const handlePlay = () => setIsPlaying(true);

  return (
    <section className="relative section-compact overflow-hidden font-roboto text-[#333333]">
      {/* Artistic background (brand tint + radial glow + subtle grid) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#E8F6E9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(58,163,53,0.18),transparent_70%)]" />
        <div style={{"--tw-grid-color":"rgba(30,97,27,0.12)"}} className="absolute inset-0 opacity-50 mix-blend-multiply bg-[linear-gradient(to_right,var(--tw-grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--tw-grid-color)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Spacer wrapper to give scroll room for the effect */}
      <div ref={containerRef} className="relative">
        <div className="min-h-[140vh] pointer-events-none select-none opacity-0 -z-10 absolute inset-0" aria-hidden="true" />
        <motion.div
          className="max-w-5xl mx-auto will-change-transform"
          style={{ scale, y }}
          initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Frame wrapper */}
          <motion.div
            style={{ boxShadow }}
            className="relative group rounded-2xl ring-1 ring-[#3AA335]/20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 overflow-hidden"
          >
            {/* Decorative gradient accents */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[conic-gradient(from_140deg,rgba(58,163,53,0.35),rgba(30,97,27,0.15),transparent_70%)] blur-2xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(30,97,27,0.25),transparent_65%)] blur-2xl opacity-60" />
            <div className="relative aspect-video">
              {/* Thumbnail / Player toggle */}
              {!isPlaying && (
                <>
                  <Image
                    src="/projects/staff-1.jpg"
                    alt="Garbage Hero operations showcase preview"
                    fill
                    priority={false}
                    className="object-cover object-center transition-transform duration-[2500ms] scale-105 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#1E611B]/20 backdrop-brightness-[.85]" />
                  {/* Branded badge top-left */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-white text-[#1E611B] ring-1 ring-[#3AA335]/30 shadow-sm">
                      Company Film
                    </span>
                  </div>
                  {/* Play Button */}
                  <motion.button
                    type="button"
                    aria-label="Play company video"
                    onClick={handlePlay}
                    whileTap={{ scale: 0.92 }}
                    className="absolute inset-0 m-auto h-24 w-24 flex items-center justify-center rounded-full shadow-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#3AA335]/50"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3AA335] to-[#1E611B] opacity-90 group-hover:opacity-100 transition" />
                    <span className="absolute inset-0 rounded-full ring-2 ring-white/70 mix-blend-overlay" />
                    <svg className="relative z-10 w-10 h-10 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {/* Animated pulse */}
                    <span className="absolute inset-0 rounded-full animate-ping-slow bg-[#3AA335]/40" />
                  </motion.button>
                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="max-w-lg">
                      <h3 className="font-roboto-serif text-white text-lg sm:text-xl font-semibold drop-shadow-sm">A Glimpse Into Our Impact</h3>
                      <p className="text-white/85 text-xs sm:text-sm leading-relaxed mt-1">Discover how Garbage Hero champions sustainable cleaning, landscaping, and community well-being across Kenya.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/80 font-medium uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3AA335] animate-pulse" aria-hidden="true" /> HD Ready</span>
                      <span className="hidden sm:inline-block">•</span>
                      <span>03:00</span>
                    </div>
                  </div>
                </>
              )}

              {isPlaying && (
                <motion.iframe
                  key="player"
                  className="absolute inset-0 w-full h-full"
                  src={videoUrl + (videoUrl.includes('?') ? '&autoplay=1' : '?autoplay=1')}
                  title="Garbage Hero cinematic showcase video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  initial={reduceMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyVideo;