"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Paragraph = ({ size = "md", color = "default", children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const sizeStyles = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
  };

  const colorStyles = {
    // simplified palette via direct hex
    default: "text-[#333333]",
    subtle: "text-[#3AA335]",
    white: "text-white",
  };

  const defaultFont = "font-roboto"; // switched from lato

  return (
    <motion.p
      ref={ref}
      className={`${defaultFont} leading-relaxed ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
};

export default Paragraph;