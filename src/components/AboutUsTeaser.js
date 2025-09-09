"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";

// Palette reference: brand #3AA335, brand-dark #1E611B, brand-light #E8F6E9, body #333333

const AboutUsTeaser = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

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
      className="section-standard bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
       <div className="text-center mb-8 sm:mb-10 md:mb-12">
  <Heading
    level={2}
    className="mb-4 mx-auto w-fit pb-1 px-2 rounded-md border-b-4 border-[#3aa335]"
    variant="primary"
  >
    About Us
  </Heading>
  <p className="text-lead font-lato text-[#333333] max-w-[60ch] mx-auto">
    Professional cleaning & environmental care for healthier Kenyan spaces.
  </p>
</div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="lg:hidden flex justify-center">
              <Image
                src="/Photos/hero1.jpg"
                alt="Garbage Hero team cleaning a Kenyan office"
                width={350}
                height={300}
                sizes="(max-width: 768px) 90vw, 350px"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full max-w-[350px] h-[200px] sm:h-[250px]"
                priority
              />
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="pt-10 sm:pt-12">
                <Image
                  src="/Photos/hero1.jpg"
                  alt="Garbage Hero team cleaning a Kenyan office"
                  width={300}
                  height={400}
                  sizes="(max-width: 1024px) 45vw, 300px"
                  style={{ objectFit: "cover" }}
                  className="rounded-xl w-full h-[250px] sm:h-[350px] md:h-[400px]"
                  priority
                />
              </div>
              <div>
                <Image
                  src="/images/slide2.jpg"
                  alt="Eco-friendly waste management in Kenya"
                  width={300}
                  height={400}
                  sizes="(max-width: 1024px) 45vw, 300px"
                  style={{ objectFit: "cover" }}
                  className="rounded-xl w-full h-[250px] sm:h-[350px] md:h-[400px]"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="order-1 bg-[#E8F6E9] p-3 rounded-[2rem] lg:order-2 flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
            <div className="space-y-4">
              <Heading level={3} variant="primary" className="text-2xl sm:text-3xl md:text-4xl text-center lg:text-left font-montserrat font-bold">Cleaning Kenya, Sustaining Tomorrow</Heading>
              <p className="font-lato text-body text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left">
                Garbage Hero Limited is a leading cleaning and waste management company in Kenya, committed to eco-friendly practices. From Nairobi’s bustling offices to serene rural homes, our skilled team delivers professional cleaning, waste collection, fumigation, and landscaping services, ensuring a cleaner, greener Kenya for future generations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center lg:justify-items-start">
              {stats.map((stat, index) => {
                const animatedCount = animatedCounts[index];
                const displayValue = stat.decimals 
                  ? animatedCount.toFixed(1) 
                  : Math.floor(animatedCount);

                return (
                  <motion.div
                    key={index}
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isInView ? 1 : 0, 
                      y: isInView ? 0 : 20 
                    }}
                    transition={{ 
                      delay: stat.delay / 1000, 
                      duration: 0.6, 
                      ease: "easeOut" 
                    }}
                  >
                    <h3 className="font-montserrat font-bold text-[#3AA335] text-xl sm:text-2xl md:text-3xl leading-normal">
                      {displayValue}
                      {stat.suffix}
                    </h3>
                    <p className="font-lato text-body text-sm sm:text-base">
                      {stat.subheading}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center lg:justify-start">
              <WetPaintButton href="/about-us" text="Learn More" size="md" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUsTeaser;