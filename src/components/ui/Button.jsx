"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "right",
  children,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-primary-start to-primary-end text-black hover:bg-gradient-to-r hover:from-primary-end hover:to-primary-start",
    secondary:
      "border border-secondary text-secondary hover:bg-secondary hover:text-white",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <motion.button
      ref={ref}
      className={`font-roboto font-medium rounded-md shadow-sm flex items-center justify-center transition ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      whileHover={{ scale: 1.05 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <FiArrowRight className="mr-2" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <FiArrowRight className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;