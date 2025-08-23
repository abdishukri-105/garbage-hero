"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    title: "Expert Cleaning & Janitorial Services",
    description: "Transform your space with our professional cleaning services for homes and businesses.",
    image: "/images/slide1.jpg",
    href: "/services/cleaning",
  },
  {
    title: "Gardening & Landscaping",
    description: "Create a stunning outdoor space with our expert gardening and landscaping services.",
    image: "/images/slide2.jpg",
    href: "/services/gardening",
  },
  {
    title: "Fumigation & Pest Control",
    description: "Keep your environment pest-free with our safe and effective fumigation solutions.",
    image: "/images/slide3.jpg",
    href: "/services/pest-control",
  },
  {
    title: "Garbage Collection & Disposal",
    description: "Reliable and eco-friendly garbage collection to keep your space clean and sustainable.",
    image: "/images/slide4.jpg",
    href: "/services/garbage-collection",
  },
  {
    title: "Sanitary Disposal Services",
    description: "Discreet and hygienic sanitary disposal solutions for a healthier environment.",
    image: "/images/slide5.jpg",
    href: "/services/sanitary-disposal",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[80vh] sm:h-[80vh] flex items-center justify-start overflow-hidden">
      {SLIDES.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: index === currentSlide ? 1 : 0, scale: index === currentSlide ? 1 : 1.02 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.6, 1] }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={index === currentSlide}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center justify-start">
            <motion.div
              className="text-white px-3 sm:px-8 md:px-12 lg:px-24 max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-3xl"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
            >
              <motion.h1
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
              >
                {slide.description}
              </motion.p>
              <Link href={slide.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md shadow-lg text-sm sm:text-lg"
                >
                  Get a Quote
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black bg-opacity-50 p-2 rounded-full z-10"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <FiChevronLeft />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black bg-opacity-50 p-2 rounded-full z-10"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <FiChevronRight />
      </motion.button>
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {SLIDES.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              index === currentSlide ? "bg-indigo-600" : "bg-gray-400"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: index === currentSlide ? 1.2 : 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.6, 1] }}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;