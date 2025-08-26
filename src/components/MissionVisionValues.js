"use client"
import React from "react";
import { FiEye, FiHeart, FiStar } from "react-icons/fi";

const MissionVisionValues = () => {
  return (
    <section className="py-12 bg-gray-100 font-montserrat text-black">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission, Vision, and Values</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the core principles that drive our commitment to innovation, excellence, and impact in everything we do.
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              href={card.href}
              Icon={card.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors duration-300 relative z-10" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 transition-colors duration-300 relative z-10 text-base">
        {subtitle}
      </p>
    </a>
  );
};

const CARDS = [
  {
    id: 1,
    title: "Mission",
    subtitle:
      "To empower communities through innovative technology solutions that drive progress and create lasting impact.",
    href: "#",
    Icon: FiStar,
  },
  {
    id: 2,
    title: "Vision",
    subtitle:
      "To be a global leader in transformative technology, shaping a future where innovation knows no boundaries.",
    href: "#",
    Icon: FiEye,
  },
  {
    id: 3,
    title: "Values",
    subtitle:
      "Integrity, collaboration, and excellence guide everything we do, ensuring trust and quality in every project.",
    href: "#",
    Icon: FiHeart,
  },
];

export default MissionVisionValues;