"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="bg-white py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-clip bg-[#3aa335] px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <motion.div
            aria-hidden="true"
            className="absolute right-0 top-0 -z-10 aspect-square w-full max-w-3xl translate-x-3/4 rounded-full bg-green-200/60 blur-[10rem] lg:-top-[40rem] lg:left-1/2 lg:-translate-x-1/2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.95, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.4, 0, 0.6, 1] }}
          ></motion.div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-start">
            <motion.h2
              className="text-3xl font-semibold tracking-tight text-black sm:text-4xl font-roboto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            >
              Ready to Transform Your Space with Eco-Friendly Cleaning?
            </motion.h2>
            <motion.p
              className="mt-6 text-xl text-black font-opensans"
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
                 <WetPaintButton /> 
              {/* <Link
                href="/contact-us"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-roboto"
              >
                Get a Quote
              </Link> */}
              {/* <Link
                href="mailto:info@garbagehero.co.ke"
                className="text-sm font-semibold leading-6 text-white font-roboto"
              >
                Send an Email
              </Link> */}
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


const WetPaintButton = () => {
  return (
    <Link href="/contact-us" >
      <button className="group relative rounded bg-white px-6 py-4 font-semibold text-black hover:cursor-pointer transition-colors hover:bg-[#228B22]">
        GET A QUOTE NOW!
        <Drip left="10%" height={24} delay={0.5} />
        <Drip left="30%" height={20} delay={3} />
        <Drip left="57%" height={10} delay={4.25} />
        <Drip left="85%" height={16} delay={1.5} />
      </button>
    </Link>
  );
};

const Drip = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{
        left,
      }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-white transition-colors group-hover:bg-[#228B22]"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors group-hover:fill-[#228B22]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors group-hover:fill-[#228B22]"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors group-hover:fill-[#228B22]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors group-hover:fill-[#228B22]"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-white transition-colors group-hover:bg-[#228B22]"
      />
    </motion.div>
  );
};

export default CTABanner;