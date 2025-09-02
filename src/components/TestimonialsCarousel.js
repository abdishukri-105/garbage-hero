"use client"
// TestimonialsCarousel refactored to consume Sanity "testimonial" documents passed in as props.
// Expected shape per item: { _id, clientName, clientTitle, company, statement, companyLogo }
// companyLogo is an image field (asset ref). We render it via urlFor (Sanity image-url helper).

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const AUTOPLAY_INTERVAL = 5000; // ms matches progress animation duration

const TestimonialsCarousel = ({ testimonials = [], autoplay = true }) => {
  const [selected, setSelected] = useState(0);

  // Clamp selected if data length changes
  useEffect(() => {
    if (selected > testimonials.length - 1) setSelected(0);
  }, [testimonials, selected]);

  if (!testimonials || testimonials.length === 0) return null; // nothing to show

  return (
    <section className="bg-[#FFFFFF] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 overflow-hidden">
      <div className="p-4 sm:p-6">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#000000]">
          What Our Customers Think
        </h3>
        <p className="text-[#333333] my-4 sm:my-6 text-sm sm:text-base md:text-lg font-open-sans">
          Hear from our satisfied clients about how Garbage Hero Limited’s eco-friendly cleaning and waste management services have transformed their spaces across Kenya.
        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
          autoplay={autoplay}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected, autoplay }) => {
  return (
    <div className="flex gap-1 mt-6 sm:mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        const isActive = selected === n;
        return (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="h-1.5 w-full bg-[#E5F3E8] relative overflow-hidden"
            aria-label={`Go to testimonial ${n + 1}`}
          >
            {isActive && autoplay ? (
              <motion.span
                className="absolute top-0 left-0 bottom-0 bg-[#3aa335]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <span
                className="absolute top-0 left-0 bottom-0 bg-[#3aa335]"
                style={{ width: selected > n ? "100%" : "0%" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Cards = ({ testimonials, selected, setSelected }) => {
  return (
    <div className="p-4 sm:p-6 relative h-[320px] sm:h-[360px] lg:h-[420px] shadow-xl">
      {testimonials.map((t, i) => (
        <Card
          key={t._id || i}
          testimonial={t}
          position={i}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

const Card = ({ testimonial, position, selected, setSelected }) => {
  const { clientName, clientTitle, company, statement, companyLogo } = testimonial;

  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "#E5F3E8" : "#FFFFFF";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color: "#333333",
      }}
      animate={{ x: `${offset}%`, scale }}
      whileHover={{ translateX: position === selected ? 0 : -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-6 sm:p-8 lg:p-12 cursor-pointer flex flex-col justify-between rounded-lg border border-[#E5F3E8]"
    >
      <div className="flex flex-col items-center text-center">
        {companyLogo?.asset && (
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 mb-4">
            <Image
              src={urlFor(companyLogo).width(160).height(160).url()}
              alt={company ? `${company} logo` : 'Company logo'}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        )}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-open-sans font-light italic my-4 sm:my-6 max-w-prose">
          “{statement}”
        </p>
      </div>
      <div className="text-center">
        <span className="block font-playfair font-bold text-base sm:text-lg text-[#000000]">
          {clientName}
        </span>
        <span className="block font-open-sans text-xs sm:text-sm text-[#333333]">
          {clientTitle}{clientTitle && company ? ' • ' : ''}{company}
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialsCarousel;