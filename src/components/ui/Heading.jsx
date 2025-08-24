"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Heading = ({ level = 1, variant = "primary", children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const Tag = `h${level}`;
  const variantStyles = {
    primary: "text-text-primary",
    secondary: "text-secondary",
    white: "text-white",
  };

  const sizeStyles = {
    1: "text-4xl sm:text-5xl",
    2: "text-3xl sm:text-4xl",
    3: "text-2xl sm:text-3xl",
    4: "text-xl sm:text-2xl",
    5: "text-lg sm:text-xl",
    6: "text-base sm:text-lg",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
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