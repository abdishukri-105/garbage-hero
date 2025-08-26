"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ProjectGrid = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="py-12 bg-gray-100 font-montserrat text-black">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Projects</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore our diverse portfolio of innovative projects, each designed to deliver impactful solutions and drive progress across Kenya and beyond.
        </p>
        <div className="flex flex-row gap-6 py-12">
          <Tabs selected={selected} setSelected={setSelected} />
          <AnimatePresence mode="wait">
            {PROJECTS.map((project, index) => {
              return selected === index ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  key={index}
                  className="flex-1"
                >
                  <project.Feature />
                </motion.div>
              ) : undefined;
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="w-48 shrink-0 flex flex-col">
      {PROJECTS.map((project, index) => {
        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            title={project.title}
            tabNum={index}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ selected, title, setSelected, tabNum }) => {
  return (
    <div className="group relative w-full">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full border-l-[6px] border-slate-200 p-4 transition-colors group-hover:border-slate-300 md:border-l-8 md:p-6"
      >
        <span
          className={`w-full text-start text-xl font-bold transition-colors md:text-2xl ${
            selected
              ? "text-violet-500"
              : "text-slate-400 group-hover:text-slate-500"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="project-grid-slider"
          className="absolute bottom-0 left-0 top-0 z-10 w-[6px] bg-violet-500 md:w-2"
        />
      )}
    </div>
  );
};

const PROJECTS = [
  {
    title: "Project 1",
    Feature: () => (
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Project 1</h2>
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