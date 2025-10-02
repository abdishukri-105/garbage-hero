"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import { FiFlag, FiLayers, FiUsers, FiSun, FiTrendingUp, FiAward } from "react-icons/fi";

const FullStory = () => {
  return (
    <section className="section-compact font-roboto text-[#333333] overflow-x-hidden relative">
      {/* Pattern background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#E8F6E9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(58,163,53,0.10),transparent_70%)]" />
        <div style={{ "--tw-accent-grid": "rgba(30,97,27,0.15)" }} className="absolute inset-0 opacity-40 mix-blend-multiply bg-[linear-gradient(to_right,var(--tw-accent-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--tw-accent-grid)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <span className="inline-block mb-3 sm:mb-4 text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-white rounded-full px-3 py-1 ring-1 ring-[#3AA335]/20">
            Growth Journey
          </span>
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]">
            <Heading level={2} variant="primary" className="mb-0 text-center">Our Growth Story</Heading>
          </div>
          <Paragraph className="text-lead mt-4 max-w-3xl mx-auto">
            From a focused Nairobi operation to a multi service hygiene partner our progress reflects disciplined delivery innovation and trust.
          </Paragraph>
        </motion.div>
        {/* Timeline */}
        <ol className="relative mt-4 md:mt-6" aria-label="Company milestones timeline">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3AA335]/10 via-[#3AA335]/30 to-[#3AA335]/10 -translate-x-1/2" aria-hidden="true" />
          {MILESTONES.map((milestone, index) => (
            <TimelineItem key={milestone.id} milestone={milestone} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const isLeft = index % 2 === 0; // left side on desktop
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      initial={reduceMotion ? {} : { opacity: 0, x: isLeft ? -48 : 48 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.15 }}
      className={`relative mb-6 md:mb-10 flex flex-col md:flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}
    >
      {/* Connector dot (desktop) */}
      <div className="hidden md:block absolute left-1/2 top-4 -translate-x-1/2 z-20" aria-hidden="true">
        <span className="block w-4 h-4 rounded-full bg-white ring-4 ring-[#3AA335] shadow" />
      </div>

      <div className={`w-full md:w-1/2 md:px-6 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}> 
        <div className="group bg-white rounded-xl shadow-sm ring-1 ring-[#3AA335]/15 hover:ring-[#3AA335]/40 transition py-5 px-5 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_80%_20%,rgba(58,163,53,0.08),transparent_70%)]" />
          <div className="flex items-start gap-4 mb-3 relative z-10">
            <div className="flex flex-col items-center -mt-1">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#3AA335] text-white font-roboto-serif text-xs font-semibold shadow-sm mb-2">
                {milestone.year}
              </div>
              <milestone.Icon className="text-[#1E611B] group-hover:text-[#3AA335] transition-colors" size={22} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-roboto-serif text-lg sm:text-xl font-semibold text-[#1E611B] tracking-tight mb-1">
                {milestone.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#333333]">
                {milestone.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

const MILESTONES = [
  { id: 1, year: "2014", title: "Founded In Nairobi", description: "Established with a mission to deliver reliable eco aligned cleaning and waste stewardship.", Icon: FiFlag },
  { id: 2, year: "2016", title: "Service Expansion", description: "Added gardening landscaping fumigation broadening integrated hygiene support for diverse clients.", Icon: FiLayers },
  { id: 3, year: "2018", title: "Institutional Trust", description: "Earned hospitals higher learning institutions and government agencies through consistent standards supervision.", Icon: FiUsers },
  { id: 4, year: "2020", title: "Sustainability Focus", description: "Adopted safer chemistry efficiency routines and measurable performance tracking nationwide.", Icon: FiSun },
  { id: 5, year: "2023", title: "Community Impact", description: "Partnered NGOs and local groups advancing sanitation awareness and responsible waste handling.", Icon: FiAward },
  { id: 6, year: "2025", title: "Industry Leadership", description: "Driving innovation talent development and client centric quality assurance nationwide.", Icon: FiTrendingUp },
];

export default FullStory;