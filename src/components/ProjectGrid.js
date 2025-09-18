"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
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

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const showPrev = useCallback(() => {
    if (!active) return;
    setLightboxIndex((i) => (i === 0 ? (active.images?.length || 1) - 1 : i - 1));
  }, [active]);
  const showNext = useCallback(() => {
    if (!active) return;
    setLightboxIndex((i) => ((i + 1) % (active.images?.length || 1)));
  }, [active]);

  // Keyboard and scroll lock for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, showPrev, showNext]);

  return (
    <section className="section-compact font-lato text-[#333333]">{/* standardized spacing */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">{/* standardized container */}
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-3 text-center">{/* centered on all breakpoints */}
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} className="mb-0 text-center" variant="primary">Our Projects</Heading>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#333333] max-w-3xl mx-auto">
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
              <ProjectFeature tab={active} onOpenLightbox={openLightbox} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && active?.images?.length > 0 && (
          <Lightbox
            key={`lb-${active.title}`}
            images={active.images}
            title={active.title}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
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

const ProjectFeature = ({ tab, onOpenLightbox }) => {
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
          const fallbackUrl = (() => {
            try { return urlFor(asset).width(800).quality(60).auto('format').url(); } catch (e) { return '/placeholder.png'; }
          })();
          const loader = ({ width, quality }) => {
            try {
              // Request smaller thumbs with moderate quality for bandwidth savings
              return urlFor(asset).width(Math.min(width, 800)).fit('max').quality(quality ?? 50).auto('format').url();
            } catch (e) {
              return fallbackUrl;
            }
          };
          const w = asset?.metadata?.dimensions?.width || 900;
          const h = asset?.metadata?.dimensions?.height || 900;
          const lid = `pg-${title}-${asset?._id || i}`;
          return (
            <motion.div
              key={asset?._id || i}
              className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden group cursor-zoom-in"
              style={{ 
                backgroundColor: '#E8F6E9',
                // spotlight coords are set via CSS vars on mouse move
                backgroundImage: 'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(58,163,53,0.12), transparent 40%)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left; // px within
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mx', `${x}px`);
                e.currentTarget.style.setProperty('--my', `${y}px`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.removeProperty('--mx');
                e.currentTarget.style.removeProperty('--my');
              }}
              onClick={() => onOpenLightbox?.(i)}
            >
              <motion.div layoutId={lid} className="relative">
                <Image
                  loader={loader}
                  src={fallbackUrl}
                  alt={`${title} image ${i+1}`}
                  width={w}
                  height={h}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  quality={50}
                  className="w-full h-auto object-cover object-center rounded-xl group-hover:brightness-110 group-hover:saturate-110 transition duration-500"
                />
                {/* cinematic overlays */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 0 1px rgba(58,163,53,0.25)' }} />
                <div className="pointer-events-none absolute inset-0 rounded-xl mix-blend-overlay opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: 'radial-gradient(120% 120% at 80% 0%, rgba(255,255,255,0.15), transparent 60%)' }} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Lightbox component with shared layoutId
const Lightbox = ({ images = [], title, index = 0, onClose, onPrev, onNext }) => {
  const asset = images[index];
  const fallbackUrl = (() => {
    try { return urlFor(asset).width(1400).quality(80).auto('format').url(); } catch (e) { return '/placeholder.png'; }
  })();
  const lid = `pg-${title}-${asset?._id || index}`;

  // Gesture state: pinch-zoom, pan, swipe
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const pointersRef = useRef(new Map()); // id -> { x, y }
  const lastSingleRef = useRef(null); // { x, y }
  const pinchRef = useRef(null); // { startDist, startScale }
  const tapRef = useRef({ last: 0 });

  useEffect(() => {
    // Reset transforms when image changes
    setScale(1); setTx(0); setTy(0);
    pointersRef.current.clear();
    lastSingleRef.current = null;
    pinchRef.current = null;
  }, [index]);

  const clampPos = useCallback((sx, x, y) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const cw = el.clientWidth || 0;
    const ch = el.clientHeight || 0;
    const overX = Math.max(0, (cw * sx - cw) / 2);
    const overY = Math.max(0, (ch * sx - ch) / 2);
    return {
      x: Math.max(-overX, Math.min(overX, x)),
      y: Math.max(-overY, Math.min(overY, y)),
    };
  }, []);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 1) {
      lastSingleRef.current = { x: e.clientX, y: e.clientY };
    }
    if (pointersRef.current.size === 2) {
      const vals = Array.from(pointersRef.current.values());
      const dx = vals[1].x - vals[0].x;
      const dy = vals[1].y - vals[0].y;
      const dist = Math.hypot(dx, dy);
      pinchRef.current = { startDist: dist, startScale: scale };
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    const prev = pointersRef.current.get(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const vals = Array.from(pointersRef.current.values());
      const dx = vals[1].x - vals[0].x;
      const dy = vals[1].y - vals[0].y;
      const dist = Math.hypot(dx, dy);
      const raw = (pinchRef.current.startScale || 1) * (dist / (pinchRef.current.startDist || dist));
      const nextScale = Math.max(1, Math.min(4, raw));
      const clamped = clampPos(nextScale, tx, ty);
      setScale(nextScale);
      setTx(clamped.x);
      setTy(clamped.y);
      return;
    }

    if (pointersRef.current.size === 1 && lastSingleRef.current) {
      const dx = e.clientX - lastSingleRef.current.x;
      const dy = e.clientY - lastSingleRef.current.y;
      lastSingleRef.current = { x: e.clientX, y: e.clientY };
      if (scale > 1.02) {
        const clamped = clampPos(scale, tx + dx, ty + dy);
        setTx(clamped.x);
        setTy(clamped.y);
      } else {
        // track swipe intent at scale ~1
        swipeDX.current += dx;
        swipeDY.current += dy;
      }
    }
  };

  const swipeDX = useRef(0);
  const swipeDY = useRef(0);

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;

    if (pointersRef.current.size === 0) {
      // end of gesture: handle swipe navigation
      if (scale <= 1.02) {
        const absX = Math.abs(swipeDX.current);
        const absY = Math.abs(swipeDY.current);
        if (absX > 48 && absX > absY) {
          if (swipeDX.current < 0) onNext?.(); else onPrev?.();
        }
      }
      swipeDX.current = 0; swipeDY.current = 0;
      lastSingleRef.current = null;
    }
  };

  const onDoubleTap = (e) => {
    const now = Date.now();
    if (now - tapRef.current.last < 280) {
      // toggle zoom
      if (scale > 1) {
        setScale(1); setTx(0); setTy(0);
      } else {
        const nextScale = 2;
        // center slightly towards tap position
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          const nx = tx - cx * (nextScale - 1) / nextScale;
          const ny = ty - cy * (nextScale - 1) / nextScale;
          const clamped = clampPos(nextScale, nx, ny);
          setTx(clamped.x); setTy(clamped.y);
        }
        setScale(nextScale);
      }
      tapRef.current.last = 0;
    } else {
      tapRef.current.last = now;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6" ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onDoubleTap}
      >
        <div className="relative w-full max-w-6xl aspect-[16/10] overflow-hidden touch-pan-y">
          <motion.div layoutId={lid} className="absolute inset-0 will-change-transform" style={{ transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})` }}>
            <Image
              src={fallbackUrl}
              alt={`${title} large view`}
              fill
              sizes="100vw"
              quality={80}
              className="object-contain select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </div>
        {/* Controls */}
        {images.length > 1 && scale <= 1.02 && (
          <>
            <button aria-label="Previous" onClick={onPrev} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/15 text-white hover:bg-white/25 transition ring-1 ring-white/20 grid place-items-center">‹</button>
            <button aria-label="Next" onClick={onNext} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/15 text-white hover:bg-white/25 transition ring-1 ring-white/20 grid place-items-center">›</button>
          </>
        )}
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 sm:top-6 sm:right-6 h-10 w-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition ring-1 ring-white/20 grid place-items-center">✕</button>
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-xs sm:text-sm">{title} • {index + 1} / {images.length}</div>
      </div>
    </motion.div>
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