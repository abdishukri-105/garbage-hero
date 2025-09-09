"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
 
  return (
    <motion.section
      ref={ref}
      className="absolute bottom-0 left-0 right-0 bg-white/95 shadow-lg px-4 py-1 sm:py-2 md:py-4 mx-auto max-w-7xl transform translate-y-1/2 z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <h2 className="mb-1 sm:mb-2 text-center text-sm sm:text-base md:text-lg text-black font-semibold">
        OUR NUMBER SPEAK FOR THEMSELVES
      </h2>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
        <Stat
          num={95}
          suffix="%"
          subheading="Customer satisfaction"
          delay={0}
        />
        <div className="h-[1px] w-12 sm:h-4 sm:w-[1px]" style={{ backgroundColor: '#E8F6E9' }} />
        <Stat
          num={12.5}
          decimals={1}
          suffix="K+"
          subheading="businesses cleaned"
          delay={0.2}
        />
        <div className="h-[1px] w-12 sm:h-4 sm:w-[1px]" style={{ backgroundColor: '#E8F6E9' }} />
        <Stat
          num={20}
          suffix="+"
          subheading="Years "
          delay={0.4}
        />
         <Stat
          num={95}
          suffix="%"
          subheading="Customer satisfaction"
          delay={0}
        />
         <Stat
          num={95}
          suffix="%"
          subheading="Customer satisfaction"
          delay={0}
        />
      </div>
    </motion.section>
  );
};

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
    <div className="flex flex-col items-center py-2 sm:py-2">
      <p
        className="mb-2 text-center text-xl sm:text-2xl md:text-4xl font-semibold"
        style={{ color: '#1E611B' }}
        aria-label={`${num}${suffix} ${subheading}`}
      >
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-[85%] sm:max-w-[200px] text-center text-xs sm:text-sm md:text-base" style={{ color: '#333333' }}>
        {subheading}
      </p>
    </div>
  );
};

export default StatsSection;