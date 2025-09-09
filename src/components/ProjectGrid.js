"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Heading from './ui/Heading';

// import WetPaintButton from './ui/WetPaintButton'; // (If future CTA needed)

// Palette (reference only):
// brand: #3AA335, brand-dark: #1E611B, brand-light: #E8F6E9, body: #333333, black: #000, white: #FFFFFF

const ProjectGrid = ({ projects = [] }) => {
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
    <section className="section-standard font-lato text-[#333333]">{/* standardized spacing */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{/* standardized container */}
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-3 text-center md:text-left">
          <div className="mx-auto md:mx-0 w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} className="mb-0 text-center md:text-left" variant="primary">Our Projects</Heading>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#333333] max-w-3xl mx-auto md:mx-0">
            Explore our diverse portfolio of innovative projects, each designed to deliver impactful solutions and drive progress across Kenya and beyond.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
          <Tabs selected={selected} setSelected={setSelected} tabs={tabs} />
          <AnimatePresence mode="wait">
            <motion.div
              key={selected + (active?.title || '')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex-1 min-w-0"
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
    <div
      role="tablist"
      aria-orientation="vertical"
      className="w-full rounded-[2rem] p-3 shadow shadow-green-100 md:w-60 shrink-0 flex flex-row md:flex-col md:sticky md:top-24 overflow-x-auto md:overflow-visible gap-2 md:gap-1 pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
    >
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
    <div className="group relative w-full md:w-auto">
      <button
        role="tab"
        aria-selected={selected}
        aria-controls={`project-panel-${tabNum}`}
        id={`project-tab-${tabNum}`}
        onClick={() => setSelected(tabNum)}
        className={`relative border z-0 flex w-full items-center gap-2 border-l-[6px] md:border-l-8 p-3 md:p-2 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2 rounded-r md:rounded-none ${selected ? 'border-[#3AA335] bg-white shadow-sm' : 'border-transparent hover:border-[#3AA335]/50'}`}
      >
        <span
          className={`w-full hover:cursor-pointer text-start text-base sm:text-lg font-playfair font-bold transition-colors ${
            selected
              ? 'text-[#3AA335]'
              : 'text-[#333333]/60 group-hover:text-[#3AA335]'
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="project-grid-slider"
          className="absolute bottom-0 left-0 top-0 z-10 w-[6px] md:w-2 rounded-r bg-[#3AA335]"
        />
      )}
    </div>
  );
};

const ProjectFeature = ({ tab }) => {
  if (!tab) return null;
  const { title, images = [], description, category, timePeriod } = tab;
  return (
    <div id={`project-panel-${title}`} role="tabpanel" aria-labelledby={`project-tab-${title}`} className="w-full p-4 rounded-[2rem] space-y-5" style={{ backgroundColor: '#E8F6E9' }}>
      <div className="space-y-2">
        {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-black leading-snug">{title}</h3> */}
        <Heading level={3} variant="primary" className="text-xl sm:text-2xl md:text-3xl font-playfair leading-snug">{title}</Heading>
        <div className="text-xs sm:text-sm flex flex-wrap gap-3 items-center text-[#333333]">
          {category && <span className="px-2 py-1 rounded-md font-lato font-semibold uppercase tracking-wide" style={{ backgroundColor: '#3AA3351A', color: '#3AA335' }}>{category}</span>}
          {timePeriod && <span className="text-[#333333]/70 italic font-lato">{timePeriod}</span>}
        </div>
      </div>
      {description && <p className="text-sm sm:text-base max-w-3xl font-lato leading-relaxed text-[#333333]/90">{description}</p>}
      <div className="[column-fill:_balance] columns-2 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
        {images.length === 0 && (
          <div className="col-span-full h-48 flex items-center justify-center rounded-xl text-sm font-lato font-medium" style={{ backgroundColor: '#E8F6E9', color: '#3AA335' }}>
            No images
          </div>
        )}
        {images.map((asset, i) => {
          const imgUrl = (() => {
            try {
              return urlFor(asset).width(900).fit('max').auto('format').url();
            } catch (e) { return '/placeholder.png'; }
          })();
          const w = asset?.metadata?.dimensions?.width || 900;
          const h = asset?.metadata?.dimensions?.height || 900;
          return (
            <div key={asset?._id || i} className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden transition-colors group" style={{ backgroundColor: '#E8F6E9' }}>
              <Image
                src={imgUrl}
                alt={`${title} image ${i+1}`}
                width={w}
                height={h}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover object-center rounded-xl group-hover:brightness-105 transition duration-300"
              />
              <div className="absolute inset-0 transition-colors" style={{ backgroundColor: 'rgba(58,163,53,0)', }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PROJECTS = [
  { title: "Umma University", images: [], description: "Flagship campus modernization and sustainability initiative.", category: 'Education', timePeriod: '2023 - Present' },
  { title: "Project 2", images: [], description: "Community engagement & environmental stewardship program.", category: 'Community', timePeriod: '2024' },
  { title: "Project 3", images: [], description: "Infrastructure upgrade focusing on accessibility.", category: 'Infrastructure', timePeriod: '2024' },
  { title: "Project 4", images: [], description: "Digital transformation and process optimization.", category: 'Digital', timePeriod: '2024' },
  { title: "Project 5", images: [], description: "Health & safety training roll-out across regions.", category: 'Health', timePeriod: '2023 - 2024' },
  { title: "Project 6", images: [], description: "Renewable energy adoption pilot sites.", category: 'Sustainability', timePeriod: '2024' },
  { title: "Project 7", images: [], description: "Waste reduction and recycling initiative.", category: 'Environment', timePeriod: '2024' },
  { title: "Project 8", images: [], description: "Capacity building workshops for local partners.", category: 'Training', timePeriod: '2024' },
  { title: "Project 9", images: [], description: "Research & development exploration phase.", category: 'R&D', timePeriod: '2024' },
  { title: "Project 10", images: [], description: "Strategic partnership expansion and alignment.", category: 'Partnerships', timePeriod: '2025' },
];

export default ProjectGrid;