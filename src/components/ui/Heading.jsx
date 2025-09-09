"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Heading = ({ level = 1, variant = "primary", children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const Tag = `h${level}`;
  const variantStyles = {
    // simplified palette hardcoded
    primary: "text-black",
    secondary: "text-[#3AA335]",
    white: "text-white",
  };

  // Map levels to responsive scale (uses custom utilities + legacy helpers)
  const sizeStyles = {
    1: "text-hero", // fluid hero size (tailwind custom fontSize)
    2: "heading-2",
    3: "heading-3",
    4: "heading-4",
    5: "text-xl font-semibold",
    6: "text-lg font-semibold",
  };

  // Default font stack; can be overridden externally (e.g., hero-heading-font)
  const defaultFont = "font-roboto-serif"; // switched from montserrat

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
    >
      <Tag
        className={`${defaultFont} font-bold tracking-tight ${sizeStyles[level]} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default Heading;