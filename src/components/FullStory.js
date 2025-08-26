"use client"
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const FullStory = () => {
  return (
    <section className="py-12 bg-gray-100 font-montserrat text-black">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Full Story</h2>
        <p className="text-lg text-gray-600 mb-8">
          Journey through a decade of innovation, from our founding in 2015 to becoming a global leader in transformative technology solutions.
        </p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-violet-500 transform -translate-x-1/2 hidden md:block"></div>
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
      className={`mb-8 flex flex-col md:flex ${
        isOdd ? "md:flex-row" : "md:flex-row-reverse"
      } justify-between items-center w-full relative`}
    >
      <div className="order-1 w-full md:w-5/12">
        <div className={`bg-white rounded-lg shadow-xl px-6 py-4 ${isOdd ? "md:mr-8" : "md:ml-8"}`}>
          <h3 className="mb-3 font-bold text-gray-800 text-xl">{milestone.title}</h3>
          <p className="text-gray-600 text-base leading-tight">{milestone.description}</p>
        </div>
      </div>
      <div className="order-1 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-violet-500 absolute left-1/2 transform -translate-x-1/2">
        <h1 className="font-semibold text-lg text-white">{milestone.year}</h1>
      </div>
    </motion.div>
  );
};

const MILESTONES = [
  {
    id: 1,
    year: "2015",
    title: "Founded",
    description:
      "Our company was established with a vision to revolutionize technology solutions in Kenya, starting with a small team of innovators.",
  },
  {
    id: 2,
    year: "2017",
    title: "First Major Project",
    description:
      "Launched our first flagship project, delivering a transformative digital platform for local communities.",
  },
  {
    id: 3,
    year: "2019",
    title: "Regional Expansion",
    description:
      "Expanded operations across East Africa, partnering with regional organizations to drive technological advancements.",
  },
  {
    id: 4,
    year: "2020",
    title: "Award Recognition",
    description:
      "Received industry recognition for innovation and impact, solidifying our position as a trusted leader.",
  },
  {
    id: 5,
    year: "2022",
    title: "Global Reach",
    description:
      "Began international collaborations, bringing our solutions to a global audience and scaling our impact.",
  },
  {
    id: 6,
    year: "2024",
    title: "Technology Breakthrough",
    description:
      "Introduced a groundbreaking technology that redefined user experiences and set new industry standards.",
  },
  {
    id: 7,
    year: "2025",
    title: "Continued Excellence",
    description:
      "Celebrating a decade of innovation, we continue to push boundaries and deliver exceptional solutions worldwide.",
  },
];

export default FullStory;