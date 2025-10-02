"use client";
import React from "react";
import { FiAward, FiEye, FiHeart } from "react-icons/fi";
import Heading from './ui/Heading';
import Paragraph from './ui/Paragraph';

const MissionVisionValues = () => {
  return (
    <section className="section-compact font-roboto text-[#333333]">{/* standardized spacing */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{/* standardized container */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <span className="inline-block mb-3 sm:mb-4 text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] rounded-full px-3 py-1 ring-1 ring-[#3AA335]/20">
            Purpose & Direction
          </span>
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} variant="primary" className="mb-0 text-center">Mission Vision & Values</Heading>
          </div>
          <Paragraph className="text-lead text-[#333333] mt-4 max-w-3xl mx-auto" size="lg">
            The principles that anchor every service interaction and sustain long term trust impact and consistency across Kenya.
          </Paragraph>
        </div>
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              Icon={card.Icon}
              values={card.values}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, Icon, values }) => {
  return (
    <div
      className="w-full p-4 sm:p-8 rounded-lg border border-[#3AA335]/20 bg-white relative overflow-hidden group"
    >
      {/* brand background slide */}
      <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" style={{ backgroundColor: '#3AA335' }} />
      <Icon className="absolute z-10 -top-12 -right-12 text-8xl sm:text-9xl text-[#E8F6E9] group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl sm:text-4xl relative z-10 transition-colors duration-300" style={{ color: '#3AA335' }} />
      <h3 className="font-roboto-serif font-semibold text-lg sm:text-2xl text-black group-hover:text-white transition-colors duration-300 relative z-10">
        {title}
      </h3>
      {values ? (
        <ul className="mt-2 space-y-2 text-[#333333] group-hover:text-white/90 text-sm sm:text-base font-roboto leading-relaxed transition-colors duration-300 relative z-10">
          {values.map((v, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F6E9] group-hover:bg-white/15 text-[#1E611B] group-hover:text-white text-xs font-semibold mt-0.5">{i + 1}</span>
              <div>
                <p className="font-semibold tracking-tight mb-0.5">{v.label}</p>
                <p className="text-[12px] sm:text-[13px] leading-snug opacity-90">{v.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[#333333] group-hover:text-white/90 text-sm sm:text-base font-roboto leading-relaxed transition-colors duration-300 relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const CARDS = [
  {
    id: 1,
    title: "Mission",
    subtitle:
      "To redefine cleanliness by providing innovative and trustworthy cleaning services that uphold the highest standards of quality, professionalism, and client satisfaction.",
    Icon: FiAward,
  },
  {
    id: 2,
    title: "Vision",
    subtitle:
      "To lead the cleaning industry with exceptional service, trust, and professionalism.",
    Icon: FiEye,
  },
  {
    id: 3,
    title: "Values",
    values: [
      { label: "Innovation", desc: "Continuously  adopting better practices." },
      { label: "Trust", desc: "Building dependable long-term partnerships." },
      { label: "Professionalism", desc: "Maintaining high standards, discipline and care." },
    ],
    Icon: FiHeart,
  },
];

export default MissionVisionValues;