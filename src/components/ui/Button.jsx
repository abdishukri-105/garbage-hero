"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const baseBtn = "font-montserrat font-medium rounded-md text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2";

const NeuButton = ({ text = "Button", href, onClick, className = "" }) => {
  const ButtonEl = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className={`${baseBtn} bg-[#3AA335] hover:bg-[#1E611B] text-white shadow-md ${className}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
  return href ? <Link href={href}>{ButtonEl}</Link> : ButtonEl;
};

export default NeuButton;