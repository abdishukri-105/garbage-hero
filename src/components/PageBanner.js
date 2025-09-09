"use client";
import { motion } from "framer-motion";
import React from "react";
import Heading from "./ui/Heading";

const PageBanner = ({ title = "Get to Know Us Better", subtitle = "Discover our story and values" }) => {
  return (
    <section className="relative bg-white text-black h-[300px] md:h-[350px] flex items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--tw-accent-grid)_2px,transparent_2px),linear-gradient(to_bottom,var(--tw-accent-grid)_2px,transparent_2px)] bg-[size:40px_40px]"
      ></motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0 80C240 40 480 0 720 0C960 0 1200 40 1440 80H0Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#E8F6E9' }} /> {/* brand-light */}
              <stop offset="100%" style={{ stopColor: '#3AA335' }} /> {/* brand */}
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <Heading level={2} className="mb-2" variant="primary">{title}</Heading>
          <p className="text-lead text-[#333333]">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageBanner;