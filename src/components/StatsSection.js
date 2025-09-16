"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
 
  return (
    <motion.section
      ref={ref}
      className="absolute bottom-0 left-0 right-0 bg-white/95 shadow-lg px-4 py-1 sm:py-2 md:py-4 mx-auto max-w-7xl transform translate-y-1/2 z-10 rounded-xl ring-1 ring-[#3AA335]/10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
      aria-label="Key performance statistics"
    >
      <h2 className="mb-1 sm:mb-2 text-center text-[11px] sm:text-xs md:text-sm tracking-widest font-semibold uppercase text-[#1E611B]">
        Our Numbers
      </h2>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <Stat
          num={95}
          suffix="%"
          subheading="Customer satisfaction"
          delay={0}
        />
        <Divider />
        <Stat
          num={12.5}
          decimals={1}
          suffix="K+"
          subheading="Spaces cleaned"
          delay={0.2}
        />
        <Divider />
        <Stat
          num={20}
          suffix="+"
          subheading="Years experience"
          delay={0.4}
        />
        <Divider />
        <Stat
          num={100}
          suffix="+"
          subheading="Team members"
          delay={0.6}
        />
      </div>
    </motion.section>
  );
};

const Divider = () => (
  <div className="h-[1px] w-12 sm:h-6 sm:w-[1px] bg-[#E8F6E9]" aria-hidden="true" />
);

const Stat = ({ num, suffix, decimals = 0, subheading, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    animate(0, num, {
      duration: 3,
      ease: [0.4, 0, 0.6, 1],
      delay,
      onUpdate(value) {
        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView, delay]);

  return (
    <div className="flex flex-col items-center py-1 sm:py-2">
      <p
        className="mb-1 text-center text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight" style={{ color: '#1E611B' }}
        aria-label={`${num}${suffix} ${subheading}`}
      >
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-[120px] sm:max-w-[140px] text-center text-[11px] sm:text-xs md:text-sm font-medium" style={{ color: '#333333' }}>
        {subheading}
      </p>
    </div>
  );
};

export default StatsSection;