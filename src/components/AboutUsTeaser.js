"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const AboutUsTeaser = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const Stat = ({ num, decimals = 0, suffix, subheading, icon, delay = 0 }) => {
    const statRef = useRef(null);

    useEffect(() => {
      if (!isInView || !statRef.current) return;

      animate(0, num, {
        duration: 3,
        ease: [0.4, 0, 0.6, 1],
        delay,
        onUpdate(value) {
          statRef.current.textContent = value.toFixed(decimals);
        },
      });
    }, [num, decimals, isInView, delay]);

    return (
      <motion.div
        className="flex flex-col justify-start items-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
        transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
      >
        <h3 className="text-gray-900 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-roboto leading-normal">
          <span className="mr-1 text-green-600">{icon}</span>
          <span ref={statRef}></span>
          {suffix}
        </h3>
        <h6 className="text-gray-500 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
          {subheading}
        </h6>
      </motion.div>
    );
  };

  return (
    <motion.section
      ref={ref}
      className="relative px-3 sm:px-4 md:px-5 lg:px-5 py-12 sm:py-16 md:py-24 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="w-full max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 justify-start items-center">
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:order-first order-last"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
          >
            <div className="pt-12 sm:pt-16 md:pt-24 lg:justify-center sm:justify-end justify-start">
              <Image
                src="/images/slide1.jpg"
                alt="Garbage Hero team cleaning a Kenyan office"
                width={300}
                height={400}
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full h-[200px] sm:h-[300px] md:h-[400px]"
                priority
              />
            </div>
            <div className="sm:ml-0 ml-auto">
              <Image
                src="/images/slide2.jpg"
                alt="Eco-friendly waste management in Kenya"
                width={300}
                height={400}
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full h-[200px] sm:h-[300px] md:h-[400px]"
                priority
              />
            </div>
          </motion.div>
          <motion.div
            className="w-full flex flex-col justify-center lg:items-start items-center gap-8 sm:gap-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
          >
            <div className="w-full flex flex-col justify-center items-start gap-6 sm:gap-8">
              <div className="w-full flex flex-col justify-start lg:items-start items-center gap-2 sm:gap-3">
                <h2 className="text-gray-900 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-roboto leading-normal lg:text-start text-center">
                  Cleaning Kenya, Sustaining Tomorrow
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base font-normal leading-relaxed lg:text-start text-center">
                  At Garbage Hero Limited, we transform Kenyan homes and businesses with eco-friendly cleaning and waste management. From bustling Nairobi offices to serene rural landscapes, our dedicated team ensures every space shines with pride, preserving Kenya’s beauty for generations.
                </p>
              </div>
              <div className="w-full flex flex-wrap lg:justify-start justify-center items-center gap-4 sm:gap-6 md:gap-8">
                <Stat
                  num={20}
                  suffix="+"
                  subheading="Years of Experience"
               
                  delay={0.6}
                />
                <Stat
                  num={12.5}
                  decimals={1}
                  suffix="K+"
                  subheading="Spaces Cleaned"
                 
                  delay={0.8}
                />
                <Stat
                  num={95}
                  suffix="%"
                  subheading="Customer Satisfaction"
              
                  delay={1.0}
                />
                {/* <Stat
                  num={100}
                  suffix="+"
                  subheading="Team Members"
             
                  delay={1.2}
                /> */}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            >
              <Link href="/about">
                <button className="w-full sm:w-fit px-3 sm:px-3.5 py-1 sm:py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex justify-center items-center">
                  <span className="px-1.5 text-white text-xs sm:text-sm md:text-base font-medium leading-6">
                    See More
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUsTeaser;