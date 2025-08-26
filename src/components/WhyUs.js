"use client"
import { useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";
import {
  FiArrowRight,
  FiAward,
  FiCode,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const WhyUs = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section className="py-12 bg-gray-100 font-montserrat text-black">
      <div className="mx-auto max-w- px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover why our innovative approach, proven expertise, and commitment to excellence make us the ideal partner for your next project.
        </p>
        <div ref={ref} className="relative">
          {CARDS.map((c, idx) => (
            <Card
              key={c.id}
              card={c}
              scrollYProgress={scrollYProgress}
              position={idx + 1}
            />
          ))}
        </div>
        {/* <div className="h-[200vh]" /> */}
      </div>
    </section>
  );
};

const Card = ({ position, card, scrollYProgress }) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
        background: isOddCard ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
        color: isOddCard ? "white" : "black",
      }}
      className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4"
    >
      <card.Icon className="mb-4 text-4xl text-violet-500" />
      <h3 className="mb-6 text-center text-4xl font-semibold md:text-5xl">
        {card.title}
      </h3>
      <p className="mb-8 max-w-lg text-center text-sm md:text-base">
        {card.description}
      </p>
      <a
        href={card.routeTo}
        className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg ${
          card.ctaClasses
        } ${
          isOddCard
            ? "shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]"
            : "shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
        }`}
      >
        <span>Learn more</span>
        <FiArrowRight />
      </a>
    </motion.div>
  );
};

const CARD_HEIGHT = 500;

const CARDS = [
  {
    id: 1,
    Icon: FiZap,
    title: "Innovative Solutions",
    description:
      "We deliver cutting-edge technology tailored to your needs, driving progress and efficiency across diverse industries.",
    ctaClasses: "bg-violet-300 text-black",
    routeTo: "#",
  },
  {
    id: 2,
    Icon: FiAward,
    title: "Trusted Expertise",
    description:
      "Our team of experts brings years of experience, ensuring reliable and impactful solutions for every project.",
    ctaClasses: "bg-pink-300 text-black",
    routeTo: "#",
  },
  {
    id: 3,
    Icon: FiUsers,
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We collaborate closely with you to deliver personalized solutions that meet your goals.",
    ctaClasses: "bg-indigo-300 text-black",
    routeTo: "#",
  },
  {
    id: 4,
    Icon: FiCode,
    title: "Seamless Integration",
    description:
      "Our solutions integrate effortlessly with your existing systems, enhancing functionality without disruption.",
    ctaClasses: "bg-amber-300 text-black",
    routeTo: "#",
  },
];

export default WhyUs;