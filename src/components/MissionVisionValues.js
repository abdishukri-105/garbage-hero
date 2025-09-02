"use client";
import React from "react";
import { FiAward, FiEye, FiHeart } from "react-icons/fi";

const MissionVisionValues = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 font-open-sans text-[#333333]">
      <div className="mx-auto max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#000000] mb-4 sm:mb-6 text-center">
          Our Mission, Vision, and Values
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-[#333333] mb-8 sm:mb-10 md:mb-12 text-center max-w-3xl mx-auto">
          Discover the core principles that drive Garbage Hero Limited’s commitment to creating cleaner, healthier, and sustainable environments across Kenya.
        </p>
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              Icon={card.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, Icon }) => {
  return (
    <div
      className="w-full p-4 sm:p-8 rounded-lg border-[1px] border-[#000000]/10 bg-[#FFFFFF] relative overflow-hidden group "
    >
      <div className="absolute inset-0 bg-[#3aa335] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <Icon className="absolute z-10 -top-12 -right-12 text-8xl sm:text-9xl text-[#E5F3E8] group-hover:text-[#228B22] group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-xl  sm:text-4xl text-[#3aa335] group-hover:text-[#FFFFFF] transition-colors duration-300 relative z-10" />
      <h3 className="font-playfair font-bold text-base sm:text-2xl text-[#000000] group-hover:text-[#FFFFFF] transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-[#333333] group-hover:text-[#FFFFFF]/90 text-xs sm:text-sm md:text-lg font-open-sans leading-relaxed transition-colors duration-300 relative z-10">
        {subtitle}
      </p>
    </div>
  );
};

const CARDS = [
  {
    id: 1,
    title: "Mission",
    subtitle:
      "To provide eco-friendly cleaning and waste management services that enhance the well-being and beauty of Kenyan communities.",
    Icon: FiAward,
  },
  {
    id: 2,
    title: "Vision",
    subtitle:
      "To be Kenya’s leading provider of sustainable cleaning and waste solutions, preserving the environment for future generations.",
    Icon: FiEye,
  },
  {
    id: 3,
    title: "Values",
    subtitle:
      "Sustainability, professionalism, and customer satisfaction guide our work, ensuring quality and care in every service.",
    Icon: FiHeart,
  },
];

export default MissionVisionValues;