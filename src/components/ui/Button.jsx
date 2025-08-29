"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const NeuButton = ({ text = "Button", href, onClick, className = "" }) => {
  return href ? (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#228B22" }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-[#3aa335] text-[#FFFFFF] font-roboto font-medium rounded-md shadow-md text-xs sm:text-sm md:text-base ${className}`}
        onClick={onClick}
      >
        {text}
      </motion.button>
    </Link>
  ) : (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#228B22" }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className={`  transition-all shadow-[6px_6px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]px-3 py-1.5 hover:cursor-pointer sm:px-4 sm:py-2 md:px-6 md:py-3 bg-[#3aa335] text-[#FFFFFF] font-roboto font-medium rounded-md shado-md text-xs sm:text-sm md:text-base ${className}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};
export default NeuButton;