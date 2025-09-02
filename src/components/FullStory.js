"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const FullStory = () => {
  return (
    <section className="py-12 bg-[#E5F3E8] font-inter text-black overflow-x-hidden">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#50AB62] mb-4 text-center"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto"
        >
          Since 2014, Garbage Hero Limited has been delivering eco-friendly cleaning, sanitation, and landscaping solutions across Kenya, transforming spaces with professionalism and trust.
        </motion.p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#50AB62] transform -translate-x-1/2 hidden md:block"></div>
          {MILESTONES.map((milestone, index) => (
            <TimelineItem key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const isOdd = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isOdd ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isOdd ? -50 : 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-4 flex flex-col md:flex ${
        isOdd ? "md:flex-row" : "md:flex-row-reverse"
      } justify-between items-center w-full max-w-full relative`}
    >
      <div className="order-1 w-full md:w-5/12 max-w-[calc(100%-3rem)] md:max-w-[calc(50%-2rem)]">
        <div className="flex flex-col items-center md:items-start">
          <div
            className={`w-12 h-12 rounded-full bg-[#50AB62] flex items-center justify-center -mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-20`}
          >
            <h1 className="font-semibold text-lg text-white">{milestone.year}</h1>
          </div>
          <div className={`bg-white rounded-lg shadow-xl px-6 py-4 w-full ${isOdd ? "md:mr-8" : "md:ml-8"}`}>
            <h3 className="mb-3 font-bold text-gray-800 text-xl">{milestone.title}</h3>
            <p className="text-gray-600 text-base leading-tight">{milestone.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MILESTONES = [
  {
    id: 1,
    year: "2014",
    title: "Founded in Nairobi",
    description:
      "Garbage Hero Limited was established in Nairobi, Kenya, with a mission to provide affordable, reliable, and eco-friendly cleaning and waste management solutions.",
  },
  {
    id: 2,
    year: "2016",
    title: "Expanded Service Offerings",
    description:
      "Introduced gardening, landscaping, and fumigation services, catering to residential and commercial clients across Kenya.",
  },
  {
    id: 3,
    year: "2018",
    title: "Trusted by Institutions",
    description:
      "Began serving higher learning institutions, hospitals, and government agencies, earning a reputation for quality and professionalism.",
  },
  {
    id: 4,
    year: "2020",
    title: "Eco-Friendly Innovation",
    description:
      "Adopted advanced eco-friendly products and practices, reinforcing our commitment to sustainable and healthy environments.",
  },
  {
    id: 5,
    year: "2023",
    title: "Community Impact",
    description:
      "Partnered with NGOs and local communities to promote sanitation and waste management initiatives, enhancing our social impact.",
  },
  {
    id: 6,
    year: "2025",
    title: "Market Leader",
    description:
      "Celebrating over a decade of excellence, Garbage Hero continues to lead the cleaning industry with innovative, trustworthy services.",
  },
];

export default FullStory;