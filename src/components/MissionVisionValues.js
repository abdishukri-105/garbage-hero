"use client";
import React from "react";
import { FiAward, FiEye, FiHeart } from "react-icons/fi";
import Heading from './ui/Heading';

const MissionVisionValues = () => {
  return (
    <section className="section-standard font-lato text-[#333333]">{/* standardized spacing */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{/* standardized container */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} variant="primary" className="mb-0 text-center">Our Mission, Vision, and Values</Heading>
          </div>
          <p className="text-sm sm:text-base md:text-xl text-[#333333] mt-4 max-w-3xl mx-auto">
            Discover the core principles that drive Garbage Hero Limited’s commitment to creating cleaner, healthier, and sustainable environments across Kenya.
          </p>
        </div>
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
      className="w-full p-4 sm:p-8 rounded-lg border border-black/10 bg-white relative overflow-hidden group"
    >
      {/* brand background slide */}
      <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" style={{ backgroundColor: '#3AA335' }} />
      <Icon className="absolute z-10 -top-12 -right-12 text-8xl sm:text-9xl text-[#E8F6E9] group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-xl sm:text-4xl relative z-10 transition-colors duration-300" style={{ color: '#3AA335' }} />
      <h3 className="font-playfair font-bold text-base sm:text-2xl text-black group-hover:text-white transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-[#333333] group-hover:text-white/90 text-xs sm:text-sm md:text-lg font-lato leading-relaxed transition-colors duration-300 relative z-10">
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