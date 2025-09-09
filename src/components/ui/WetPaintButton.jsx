"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/*
  WetPaintButton (Primary CTA)
  Standard brand CTA button with animated paint drips.
  Palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (light), #333333 (body)

  Props:
  - text / children: label content
  - href: optional route (if provided renders a Next <Link>)
  - size: 'sm' | 'md' | 'lg'
  - fullWidth: boolean (adds w-full)
  - drips: optional custom array of { left, height, delay }
*/

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-4 text-base",
  lg: "px-8 py-5 text-lg",
};

const DEFAULT_DRIPS = [
  { left: "10%", height: 24, delay: 0.5 },
  { left: "30%", height: 18, delay: 2.25 },
  { left: "57%", height: 14, delay: 3.5 },
  { left: "85%", height: 20, delay: 1.25 },
];

const WetPaintButton = ({
  text,
  children,
  href,
  size = "md",
  fullWidth = false,
  drips = DEFAULT_DRIPS,
  className = "",
  type = "button",
  ...rest
}) => {
  const content = (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative rounded font-semibold tracking-wide text-black bg-white hover:bg-[#1E611B] hover:text-white transition-colors overflow-hidden ${
        SIZE_STYLES[size] || SIZE_STYLES.md
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      <span className="relative z-10">
        {text || children || "Get a Quote"}
      </span>
      {drips.map((d, i) => (
        <Drip key={i} {...d} />
      ))}
    </motion.button>
  );

  return href ? (
    <Link href={href} aria-label={text || (typeof children === 'string' ? children : 'Primary call to action')}>
      {content}
    </Link>
  ) : (
    content
  );
};

const Drip = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{ left }}
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
        className="w-2 rounded-b-full bg-white transition-colors group-hover:bg-[#1E611B]"
      />
      {/* Corner paint caps */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-white transition-colors group-hover:fill-[#1E611B]"
        />
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-white transition-colors group-hover:fill-[#1E611B]"
        />
      </svg>
      {/* Falling drop */}
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
        className="absolute top-full h-2 w-2 rounded-full bg-white transition-colors group-hover:bg-[#1E611B]"
      />
    </motion.div>
  );
};

export default WetPaintButton;
