"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import WetPaintButton from "./ui/WetPaintButton";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="section-standard bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="relative isolate overflow-clip bg-[#3AA335] px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <motion.div
            aria-hidden="true"
            className="absolute right-0 top-0 -z-10 aspect-square w-full max-w-3xl translate-x-3/4 rounded-full bg-[#E8F6E9]/60 blur-[10rem] lg:-top-[40rem] lg:left-1/2 lg:-translate-x-1/2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.95, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.4, 0, 0.6, 1] }}
          ></motion.div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-start">
            <motion.h2
              className="text-3xl font-semibold tracking-tight text-black sm:text-4xl font-montserrat"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            >
              Ready to Transform Your Space with Eco-Friendly Cleaning?
            </motion.h2>
            <motion.p
              className="mt-6 text-xl text-black font-lato"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            >
              Partner with Garbage Hero Limited for sustainable cleaning and waste management solutions tailored to your needs. Let’s make Kenya cleaner together.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            >
                 <WetPaintButton text="GET A QUOTE NOW!" href="/contact-us" /> 
            </motion.div>
          </div>
          <motion.div
            className="relative mt-16 h-80 lg:mt-8 lg:h-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
          >
            <Image
              width={1920}
              height={1139}
              className="absolute left-0 top-0 w-[58rem] max-w-none rounded-2xl bg-white/5 ring-1 ring-white/10 lg:top-14"
              src="/images/slide3.jpg"
              alt="Eco-friendly cleaning in action"
              sizes="(max-width: 1024px) 100vw, 58rem"
              priority
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTABanner;