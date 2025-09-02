"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const ProjectGrid = ({ projects = [] }) => {
  // Derive tabs from Sanity projects if provided else fallback to placeholder PROJECTS
  const tabs = projects.length > 0 ? projects.map(p => ({
    title: p.companyName || 'Untitled',
    images: (p.images || []).map(img => img.asset).filter(Boolean),
    category: p.category,
    timePeriod: p.timePeriod,
    description: p.shortDescription,
  })) : PROJECTS;
  const [selected, setSelected] = useState(0);
  const active = tabs[selected];
  return (
    <section className="py-12 bg-gray-100 font-montserrat text-black">
      <div className="mx-auto max-w-8xl px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Projects</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore our diverse portfolio of innovative projects, each designed to deliver impactful solutions and drive progress across Kenya and beyond.
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 py-8">
          <Tabs selected={selected} setSelected={setSelected} tabs={tabs} />
          <AnimatePresence mode="wait">
            <motion.div
              key={selected + (active?.title || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1"
            >
              <ProjectFeature tab={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Tabs = ({ selected, setSelected, tabs }) => {
  return (
    <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0">
      {tabs.map((t, index) => (
        <Tab
          key={index}
          setSelected={setSelected}
          selected={selected === index}
          title={t.title}
          tabNum={index}
        />
      ))}
    </div>
  );
};

const Tab = ({ selected, title, setSelected, tabNum }) => {
  return (
    <div className="group relative w-full">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full border-l-[6px] border-slate-200 p-4 transition-colors group-hover:border-slate-300 md:border-l-8 md:p-2"
      >
        <span
          className={`w-full text-start text-xl font-bold transition-colors md:text-2xl ${
            selected
              ? "text-green-500"
              : "text-slate-400 group-hover:text-slate-500"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="project-grid-slider"
          className="absolute bottom-0 left-0 top-0 z-10 w-[6px] bg-green-600 md:w-2"
        />
      )}
    </div>
  );
};

const ProjectFeature = ({ tab }) => {
  if (!tab) return null;
  const { title, images = [], description, category, timePeriod } = tab;
  return (
    <div className="w-full space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-600 flex flex-wrap gap-3">
        {category && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs uppercase font-semibold tracking-wide">{category}</span>}
        {timePeriod && <span className="text-gray-500 italic">{timePeriod}</span>}
      </div>
      {description && <p className="text-base text-gray-700 max-w-3xl">{description}</p>}
      <div className="columns-2 gap-4 md:columns-3">
        {images.length === 0 && (
          <div className="mb-4 h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">No images</div>
        )}
        {images.map((asset, i) => (
          <div key={asset._id || i} className="relative mb-4 rounded-xl overflow-hidden bg-gray-200 break-inside-avoid h-48 md:h-64">
            <Image
              src={urlFor(asset).width(800).height(800).url()}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const PROJECTS = [
  {
    title: "Umma University",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Umma University</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 2",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 2</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 3",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 3</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 4",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 4</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 5",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 5</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 6",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 6</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 7",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 7</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 8",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 8</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 9",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 9</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Project 10",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 10</h2>
        <div className="columns-2 gap-4 md:columns-3">
          <div className="mb-4 h-64 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-96 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-48 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-80 bg-gray-200 rounded-xl break-inside-avoid"></div>
          <div className="mb-4 h-56 bg-gray-200 rounded-xl break-inside-avoid"></div>
        </div>
      </div>
    ),
  },
];

export default ProjectGrid;