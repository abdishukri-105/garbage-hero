"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Paragraph = ({ size = "md", color = "default", children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const colorStyles = {
    default: "text-text-body",
    subtle: "text-text-subtle",
    white: "text-white",
  };

  return (
    <motion.p
      ref={ref}
      className={`font-open-sans leading-relaxed ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
    >
      {children}
    </motion.p>
  );
};

export default Paragraph;