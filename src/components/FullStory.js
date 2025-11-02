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
            Our Journey
          </span>
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]">
            <Heading level={2} variant="primary" className="mb-0 text-center">Our Journey of Growth and Excellence</Heading>
          </div>
          <Paragraph className="text-lead mt-4 max-w-3xl mx-auto">
            Since our inception in 2014, Garbage Hero Limited has grown from a small cleaning outfit into one of Kenya’s trusted providers of professional cleaning, sanitary, garbage collection, gardening, and fumigation services.
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
  { id: 1, year: "2014", title: "Our Beginning", description: "Founded with a vision to redefine cleanliness and hygiene standards through reliable and professional service delivery.", Icon: FiFlag },
  { id: 2, year: "2016", title: "Expanding Our Expertise", description: "Introduced a full range of sanitary, fumigation, and pest control services, enabling us to serve both residential and commercial clients with complete hygiene solutions.", Icon: FiLayers },
  { id: 3, year: "2018", title: "Building Trust", description: "Partnered with key corporate and government institutions, cementing our reputation for quality, consistency, and professionalism.", Icon: FiUsers },
  { id: 4, year: "2020", title: "Going Green", description: "Embraced eco-friendly cleaning solutions and sustainable waste management practices to protect both people and the planet.", Icon: FiSun },
  { id: 5, year: "2022", title: "Nationwide Reach", description: "Extended our operations to multiple counties across Kenya, delivering integrated environmental management services to diverse clients.", Icon: FiTrendingUp },
  { id: 6, year: "2024", title: "Leading with Excellence", description: "Recognized for maintaining high service standards and customer satisfaction — a testament to our dedicated team and commitment to excellence.", Icon: FiAward },
];

export default FullStory;