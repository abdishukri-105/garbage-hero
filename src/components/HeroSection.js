"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import NeuButton from "./ui/Button";

const slides = [
  {
    src: "/Photos/hero1.jpg",
    title: "Sparkling Clean Spaces, Every Time",
    description:
      "We provide professional cleaning solutions tailored to your home or office. Reliable, eco-friendly, and affordable — because you deserve a spotless space.",
    cta: "Get a Free Quote",
  },
  {
    src: "/Photos/hero2.jpg",
    title: "Trusted & Reliable Staff",
    description:
      "Our team is fully trained and dedicated to making your space shine, with safety and satisfaction guaranteed.",
    cta: "Book Your Cleaning",
  },
  {
    src: "/Photos/hero1.jpg",
    title: "Affordable Cleaning Packages",
    description:
      "Choose from our flexible packages — from one-time deep cleans to regular maintenance, all at budget-friendly rates.",
    cta: "View Packages",
  },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 20; // 20 seconds
const DRAG_BUFFER = 80; // sensitivity for swipe

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export default function HeroSection() {
  const [imgIndex, setImgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const dragX = useMotionValue(0);

  // Auto-slide
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => (pv === slides.length - 1 ? 0 : pv + 1));
        setProgress(0);
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  // Progress bar update
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((pv) => (pv >= 100 ? 0 : pv + 100 / (AUTO_DELAY / 1000)));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const onDragEnd = (info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -500) {
      setImgIndex((pv) => (pv === slides.length - 1 ? 0 : pv + 1));
      setProgress(0);
    } else if (offset > DRAG_BUFFER || velocity > 500) {
      setImgIndex((pv) => (pv === 0 ? slides.length - 1 : pv - 1));
      setProgress(0);
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-[60vh] sm:h-[70vh] md:h-[100vh] rounded-br-[2rem]">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex h-full cursor-grab active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <div
        className="
          absolute inset-0 
          bg-gradient-to-b from-[#000000]/70 to-[#000000]/30 md:bg-gradient-to-r
          flex items-start md:items-center justify-start
          pt-28 md:pt-0
        "
      >
        <div className="px-6 md:px-16 max-w-[80%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
          <Heading level={1} variant="white" key={slides[imgIndex].title}>
            {slides[imgIndex].title}
          </Heading>

          <Paragraph size="md" color="white" key={slides[imgIndex].description}>
            {slides[imgIndex].description}
          </Paragraph>

          <NeuButton text={slides[imgIndex].cta} key={slides[imgIndex].cta} />
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E5F3E8]/20">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
          className="h-full bg-[#3aa335]"
        />
      </div> */}

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />

      <GradientEdges />
    </div>
  );
}

const Images = ({ imgIndex }) => {
  return (
    <>
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{ scale: imgIndex === idx ? 1 : 0.95 }}
          transition={SPRING_OPTIONS}
          className="w-screen h-[60vh] sm:h-[70vh] md:h-[100vh] shrink-0"
        />
      ))}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    {slides.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setImgIndex(idx)}
        className={`h-3 w-3 rounded-full transition-colors ${
          idx === imgIndex ? "bg-[#3aa335]" : "bg-[#3aa335]/50"
        }`}
      />
    ))}
  </div>
);

const GradientEdges = () => (
  <>
    <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-[#000000]/40 to-transparent hidden md:block" />
    <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-[#000000]/40 to-transparent hidden md:block" />
  </>
);