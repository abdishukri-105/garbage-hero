"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";
import Paragraph from "./ui/Paragraph";

// Palette reference: brand #3AA335, brand-dark #1E611B, brand-light #E8F6E9, body #333333

const AboutUsTeaser = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Motion variants for subtle stagger
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
    }),
  };

  const useCountUp = (end, duration = 2000, delay = 0) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (isInView && !hasAnimated) {
        const timer = setTimeout(() => {
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = end * easeOutQuart;
            setCount(currentCount);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
              if (delay === 900) {
                setHasAnimated(true);
              }
            }
          };
          requestAnimationFrame(animate);
        }, delay);
        return () => clearTimeout(timer);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, duration, delay, isInView, hasAnimated]);
    return count;
  };

  const stats = [
    { num: 20, suffix: "+", subheading: "Years of Experience", delay: 0 },
    { num: 12.5, decimals: 1, suffix: "K+", subheading: "Spaces Cleaned", delay: 300 },
    { num: 95, suffix: "%", subheading: "Customer Satisfaction", delay: 600 },
    { num: 100, suffix: "+", subheading: "Team Members", delay: 900 },
  ];

  const count1 = useCountUp(stats[0].num, 2000, stats[0].delay);
  const count2 = useCountUp(stats[1].num, 2000, stats[1].delay);
  const count3 = useCountUp(stats[2].num, 2000, stats[2].delay);
  const count4 = useCountUp(stats[3].num, 2000, stats[3].delay);
  const animatedCounts = [count1, count2, count3, count4];

  return (
    <motion.section
      ref={ref}
      className="section-standard bg-white relative overflow-hidden borer-t order-b"
      style={{ borderColor: '#E8F6E9' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Radial background (matched to ClientLogosMarquee) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
      {/* Removed previous circular blur accents for consistency with marquee section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Section Heading block */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12" aria-labelledby="aboutus-heading">
          <Heading
            id="aboutus-heading"
            level={2}
            className="mb-4 mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]"
            variant="primary"
          >
            About Us
          </Heading>
          <Paragraph className="text-lead text-[#333333] max-w-[60ch] mx-auto">
            Professional cleaning & environmental care for healthier Kenyan spaces.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Media / Imagery */}
          <motion.div
            className="order-2 lg:order-1 relative"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Layered card backdrop */}
            {/* <div className="hidden lg:block absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#E8F6E9] via-white to-white shadow-inner" aria-hidden="true" />
            <div className="hidden lg:block absolute -inset-4 rounded-3xl border border-[#3AA335]/15" aria-hidden="true" /> */}

            <div className="lg:hidden flex justify-center">
              <Image
                src="/Photos/about1.jpg"
                alt="Garbage Hero team cleaning a Kenyan office"
                width={380}
                height={320}
                sizes="(max-width: 768px) 90vw, 380px"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full max-w-[380px] h-[220px] sm:h-[260px] shadow-md"
                priority
              />
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 gap-6 relative">
              <motion.div
                className="pt-12"
                custom={0}
                variants={fadeInUp}
              >
                <Image
                  src="/projects/cleaning-3.jpg"
                  alt="Garbage Hero team cleaning a Kenyan office"
                  width={320}
                  height={420}
                  sizes="(max-width: 1024px) 45vw, 320px"
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl w-full h-[340px] xl:h-[400px] shadow-lg ring-1 ring-black/5"
                  priority
                />
              </motion.div>
              <motion.div
                custom={1}
                variants={fadeInUp}
                className="relative"
              >
                <Image
                  src="/Photos/about1.jpg"
                  alt="Eco-friendly waste management in Kenya"
                  width={320}
                  height={420}
                  sizes="(max-width: 1024px) 45vw, 320px"
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl w-full h-[340px] xl:h-[400px] shadow-lg ring-1 ring-black/5"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#3AA335]/20 rounded-full blur-2xl" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            className="order-1 lg:order-2 relative flex flex-col gap-6 sm:gap-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <div className="relative borer boder-[#3AA335]/20 bg-gradient-to-br from-[#E8F6E9] via-white to-white p-6 sm:p-8 rounded-2xl shaow-sm lg:text-left text-center ring-1 ring-[#3AA335]/10 backdrop-blur">
              <div className="space-y-5">
                <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9]/80 rounded-full px-3 py-1 ring-1 ring-[#3AA335]/20">Who We Are</span>
                <Heading
                  level={3}
                  variant="primary"
                  className="text-2xl sm:text-3xl md:text-4xl leading-tight"
                >
                  Cleaning Kenya, Sustaining Tomorrow
                </Heading>
                <Paragraph className="text-sm sm:text-base md:text-lg leading-relaxed text-[#333333]">
                  Garbage Hero Limited is a leading cleaning and waste management company in Kenya, committed to eco-friendly practices. From Nairobi’s bustling offices to serene rural homes, our skilled team delivers professional cleaning, waste collection, fumigation, and landscaping services, ensuring a cleaner, greener Kenya for future generations.
                </Paragraph>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5" role="list" aria-label="Company impact statistics">
                {stats.map((stat, index) => {
                  const animatedCount = animatedCounts[index];
                  const displayValue = stat.decimals
                    ? animatedCount.toFixed(1)
                    : Math.floor(animatedCount);

                  return (
                    <motion.div
                      key={index}
                      role="listitem"
                      className="relative group text-center lg:text-left bg-white/60 rounded-lg p-3 sm:p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition shadow-[#3AA335]/5"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
                      transition={{ delay: stat.delay / 1200, duration: 0.5, ease: "easeOut" }}
                    >
                      <h3 className="font-semibold text-[#3AA335] text-xl sm:text-2xl md:text-3xl tracking-tight">
                        {displayValue}{stat.suffix}
                      </h3>
                      <p className="text-[11px] sm:text-xs md:text-sm text-[#1E611B] font-medium mt-1">
                        {stat.subheading}
                      </p>
                      <span className="absolute inset-0 rounded-lg ring-1 ring-transparent group-hover:ring-[#3AA335]/30 transition" aria-hidden="true" />
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <WetPaintButton href="/about-us" text="Learn More" size="md" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUsTeaser;