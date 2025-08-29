"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Heading = ({ level = 1, variant = "primary", children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const Tag = `h${level}`;
  const variantStyles = {
    primary: "text-[#000000]",
    secondary: "text-[#3aa335]",
    white: "text-[#FFFFFF]",
  };

  const sizeStyles = {
    1: "text-3xl sm:text-4xl md:text-5xl",
    2: "text-2xl sm:text-3xl md:text-4xl",
    3: "text-xl sm:text-2xl md:text-3xl",
    4: "text-lg sm:text-xl md:text-2xl",
    5: "text-base sm:text-lg md:text-xl",
    6: "text-sm sm:text-base md:text-lg",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
    >
      <Tag
        className={`font-roboto font-bold tracking-tight ${sizeStyles[level]} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default Heading;