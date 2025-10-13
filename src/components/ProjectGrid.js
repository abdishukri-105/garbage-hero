"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Heading from './ui/Heading';

// import WetPaintButton from './ui/WetPaintButton'; // (If future CTA needed)

// Palette (reference only):
// brand: #3AA335, brand-dark: #1E611B, brand-light: #E8F6E9, body: #333333, black: #000, white: #FFFFFF

// Helper function to format and sanitize content from Sanity
const formatSanityContent = (projects) => {
  return projects.map(p => {
    // The shortDescription actually contains the full content in Sanity
    const fullContent = p.shortDescription || p.description || p.fullDescription || p.content || p.details || '';
    
    // For preview, we'll show the first few sentences or first paragraph
    const lines = fullContent.split('\n').filter(line => line.trim());
    const previewContent = lines.slice(0, 3).join('\n'); // First 3 lines for preview
    
    return {
      title: (p.companyName || 'Untitled Project').trim(),
      images: (p.images || []).map(img => img?.asset || img).filter(Boolean),
      services: formatServices(p.services, p.category),
      category: p.category?.trim() || 'General',
      description: previewContent || 'Professional facility management services delivered with excellence.',
      fullDescription: fullContent || 'Professional facility management services delivered with excellence.',
      // Add any additional fields you might have
      completionDate: p.completionDate,
      location: p.location,
    };
  });
};

// Format services array with proper fallbacks
const formatServices = (services, category) => {
  if (Array.isArray(services) && services.length > 0) {
    return services.map(s => (typeof s === 'string' ? s.trim() : s)).filter(Boolean);
  }
  return category ? [category.trim()] : ['General Services'];
};

// Helper function to format content and make headings bold
const formatContentWithBoldHeadings = (content) => {
  if (!content) return content;
  
  // Split content into lines and process each line
  return content.split('\n').map(line => {
    const trimmedLine = line.trim();
    
    // Check if line ends with colon (indicating it's a heading)
    if (trimmedLine.endsWith(':') && trimmedLine.length > 1 && trimmedLine.length < 50) {
      // Common headings in the content
      const headingPatterns = [
        'Challenge:',
        'Solution:',
        'End Result:',
        'End Result (Impact):',
        'Impact:',
        'Results:',
        'Outcome:',
        'Benefits:',
        'Process:',
        'Approach:',
        'Implementation:',
        'Overview:',
        'Summary:'
      ];
      
      const isHeading = headingPatterns.some(pattern => 
        trimmedLine.toLowerCase() === pattern.toLowerCase()
      );
      
      if (isHeading) {
        return `**${trimmedLine}**`;
      }
    }
    
    return line;
  }).join('\n');
};

// Helper function to render formatted content with bold headings
const renderFormattedContent = (content) => {
  if (!content) return null;
  
  const formattedContent = formatContentWithBoldHeadings(content);
  const lines = formattedContent.split('\n');
  
  return lines.map((line, index) => {
    // Check if line contains bold markdown (**text**)
    if (line.includes('**')) {
      const parts = line.split(/(\*\*[^*]+\*\*)/);
      return (
        <div key={index} className="mb-2 last:mb-0">
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const boldText = part.slice(2, -2);
              return <strong key={partIndex} className="font-bold text-[#1E611B]">{boldText}</strong>;
            }
            return part;
          })}
        </div>
      );
    }
    
    return <div key={index} className="mb-2 last:mb-0">{line}</div>;
  });
};

const ProjectGrid = ({ projects = [] }) => {
  const tabs = projects.length > 0 ? formatSanityContent(projects) : PROJECTS;  
  const [selected, setSelected] = useState(0);
  const active = tabs[selected];

  // Ensure selected index stays valid if tabs array changes dynamically
  useEffect(() => {
    if (selected >= tabs.length) setSelected(0);
  }, [tabs.length, selected]);

  return (
    <section className="section-compact font-lato text-[#333333]">{/* standardized spacing */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">{/* standardized container */}
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-3 text-center">{/* centered on all breakpoints */}
          <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20">Project Portfolio</span>
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} className="mb-0 text-center" variant="primary">Recent Facility Impact Work</Heading>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#333333] max-w-3xl mx-auto">
            Integrated cleaning, sanitary, landscaping and pest control projects delivering measurable hygiene uplift, safer environments and stronger presentation value.
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
  // Truncate long titles for better display
  const displayTitle = title.length > 25 ? `${title.substring(0, 22)}...` : title;
  
  return (
    <div className="group relative w-full md:w-auto">
      <button
        role="tab"
        aria-selected={selected}
        aria-controls={`project-panel-${tabNum}`}
        id={`project-tab-${tabNum}`}
        onClick={() => setSelected(tabNum)}
        className={`relative border z-0 flex w-full items-center gap-2 border-l-[6px] md:border-l-8 p-3 md:p-2 transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2 rounded-r md:rounded-none ${selected ? 'border-[#3AA335] bg-white shadow-sm' : 'border-transparent hover:border-[#3AA335]/50 hover:bg-white/50'}`}
        title={title} // Full title on hover
      >
        <span
          className={`w-full hover:cursor-pointer text-start text-base sm:text-lg font-playfair font-bold transition-colors ${
            selected
              ? 'text-[#3AA335]'
              : 'text-[#333333]/60 group-hover:text-[#3AA335]'
          }`}
        >
          {displayTitle}
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!tab) return null;
  const { title, images = [], description, fullDescription, category, services = [], location, completionDate } = tab;
  
  // Check if there's more content to show
  const hasMoreContent = (fullDescription && fullDescription.length > description.length) || images.length > 0;
  
  return (
    <div id={`project-panel-${title}`} role="tabpanel" aria-labelledby={`project-tab-${title}`} className="w-full p-4 sm:p-5 md:p-6 rounded-[2rem] space-y-6" style={{ backgroundColor: '#E8F6E9' }}>
      
      {/* Project Header */}
      <div className="space-y-3">
        <Heading level={3} variant="primary" className="text-xl sm:text-2xl md:text-3xl font-playfair leading-snug text-black">
          <strong>{title}</strong>
        </Heading>
        
        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center text-xs sm:text-sm">
          {/* Services/Category Tags */}
          <div className="flex flex-wrap gap-2">
            {services.slice(0, 4).map((service, i) => (
              <span 
                key={`${title}-svc-${i}`} 
                className="px-2.5 py-1 rounded-lg font-lato font-bold uppercase tracking-wide text-[10px] sm:text-xs transition-colors" 
                style={{ backgroundColor: '#3AA3351A', color: '#3AA335' }}
                title={service}
              >
                {service.length > 15 ? `${service.substring(0, 12)}...` : service}
              </span>
            ))}
            {services.length > 4 && (
              <span 
                className="px-2.5 py-1 rounded-lg font-lato font-medium text-[10px] sm:text-xs" 
                style={{ backgroundColor: '#3AA33520', color: '#1E611B' }}
                title={`And ${services.length - 4} more services`}
              >
                <strong>+{services.length - 4} more</strong>
              </span>
            )}
          </div>
          
          {/* Additional metadata */}
          {location && (
            <span className="text-[#333333]/70 font-lato flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <em>{location}</em>
            </span>
          )}
          
          {completionDate && (
            <span className="text-[#333333]/70 font-lato flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <strong>{new Date(completionDate).getFullYear()}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Description - Preview or Full */}
      {(description || fullDescription) && (
        <div className="prose prose-sm max-w-none">
          <div className="text-sm sm:text-base leading-relaxed font-lato text-[#333333]/90">
            {!isExpanded ? (
              // Preview: Show condensed description
              <div>
                <div className="space-y-2">
                  {renderFormattedContent(description)}
                </div>
                {hasMoreContent && (
                  <div className="mt-3">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#3AA335] bg-white/70 hover:bg-white rounded-lg border border-[#3AA335]/30 hover:border-[#3AA335] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Full content - show full description with proper formatting
              <div>
                <div className="space-y-2">
                  {renderFormattedContent(fullDescription)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Images Grid - Only show when expanded */}
      {isExpanded && images.length > 0 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-lato font-bold text-[#333333] uppercase tracking-wide">
              <u>Project Gallery</u>
            </h4>
          </div>
          
          {/* Regular Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((asset, i) => {
              const isLocal = typeof asset === 'string' || asset?.url;
              const srcUrl = isLocal ? (typeof asset === 'string' ? asset : asset.url) : undefined;
              const fallbackUrl = (() => {
                if (srcUrl) return srcUrl;
                try { return urlFor(asset).width(400).quality(75).auto('format').url(); } catch (e) { return '/images/slide3.jpg'; }
              })();
              const loader = ({ width, quality }) => {
                if (srcUrl) return srcUrl;
                try {
                  return urlFor(asset).width(Math.min(width, 400)).fit('max').quality(quality ?? 75).auto('format').url();
                } catch (e) {
                  return fallbackUrl;
                }
              };
              
              return (
                <motion.div
                  key={asset?._id || srcUrl || i}
                  className="relative rounded-xl overflow-hidden group bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-square">
                    <Image
                      loader={loader}
                      src={fallbackUrl}
                      alt={`${title} - Image ${i+1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={75}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Collapse button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#333333] bg-white/70 hover:bg-white rounded-lg border border-[#333333]/30 hover:border-[#333333] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>Show Less</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PROJECTS = [
  { title: "Umma University", images: [], description: "Flagship campus modernization and sustainability initiative.", category: 'Education' },
  { title: "Project 2", images: [], description: "Community engagement & environmental stewardship program.", category: 'Community' },
  { title: "Project 3", images: [], description: "Infrastructure upgrade focusing on accessibility.", category: 'Infrastructure' },
  { title: "Project 4", images: [], description: "Digital transformation and process optimization.", category: 'Digital' },
  { title: "Project 5", images: [], description: "Health & safety training roll-out across regions.", category: 'Health' },
  { title: "Project 6", images: [], description: "Renewable energy adoption pilot sites.", category: 'Sustainability' },
  { title: "Project 7", images: [], description: "Waste reduction and recycling initiative.", category: 'Environment' },
  { title: "Project 8", images: [], description: "Capacity building workshops for local partners.", category: 'Training' },
  { title: "Project 9", images: [], description: "Research & development exploration phase.", category: 'R&D' },
  { title: "Project 10", images: [], description: "Strategic partnership expansion and alignment.", category: 'Partnerships' },
];

export default ProjectGrid;