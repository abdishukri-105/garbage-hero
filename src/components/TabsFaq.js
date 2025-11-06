"use client"
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";

// slug helper for a11y ids
const slugify = (str = "") => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TabsFaq = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="relative section-compact bg-white overflow-hidden">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Object.values(QUESTIONS).flat().map(q => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer }
            }))
          })
        }}
      />
      {/* Radial background to match AboutUsTeaser */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="container-site relative">
        <FaqHeader />
        <Tabs selected={selected} setSelected={setSelected} />
        <Questions selected={selected} />
      </div>
    </section>
  );
};

const FaqHeader = () => {
  return (
    <div className="relative z-10 mx-auto max-w-3xl text-center">
      <span className="eyebrow inline-block rounded-full bg-[#E8F6E9] px-3 py-1 text-[#1E611B]">Help & Support</span>
      <div className="mx-auto w-fit mt-3 pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
        <Heading level={2} variant="primary" className="mb-0">
          Answers for Cleaner, Safer Spaces
        </Heading>
      </div>
      <Paragraph size="md" className="mt-2 opacity-90">
        Quick, honest answers to the questions clients ask us most—so you can move forward with confidence.
      </Paragraph>
    </div>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div
      role="tablist"
      aria-label="FAQ categories"
      className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5"
    >
      {TABS.map((tab) => {
        const id = slugify(tab);
        const isSelected = selected === tab;
        return (
          <button
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            onClick={() => setSelected(tab)}
            className={`relative overflow-hidden whitespace-nowrap rounded-md border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer hover:cursor-pointer ${
              isSelected
                ? "border-[#3AA335] bg-[#3AA335] text-white"
                : "border-[#3AA335]/20 bg-transparent text-[#333333]/70 hover:border-[#3AA335]/40"
            }`}
            key={tab}
          >
            <span className="relative z-10">{tab}</span>
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.4, ease: "backIn" }}
                  className="absolute inset-0 z-0 bg-[#1E611B] pointer-events-none"
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
};

const Questions = ({ selected }) => {
  return (
    <div className="relative z-10 mx-auto mt-10 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          const id = slugify(tab);
          return selected === tab ? (
            <motion.div
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question = ({ question, answer }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);
  const id = slugify(question);

  const toggle = () => setOpen(p => !p);

  return (
    <div className={`rounded-xl border transition-colors ${open ? 'bg-[#E8F6E9] border-[#3AA335]' : 'bg-white border-[#3AA335]/15'}`}> {/* container only */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`answer-${id}`}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-3.5 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2 rounded-xl"
      >
        <span className={`font-roboto-serif text-base sm:text-lg font-semibold transition-colors ${open ? 'text-[#1E611B]' : 'text-[#333333]'}`}>{question}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }}>
          <FiPlus className={`text-lg sm:text-xl transition-colors ${open ? 'text-[#1E611B]' : 'text-[#333333]/60'}`} />
        </motion.span>
      </button>
      <motion.div
        id={`answer-${id}`}
        initial={false}
        animate={{ height: open ? height : 0, marginBottom: open ? 20 : 0 }}
        className="overflow-hidden text-[#333333]/80 px-4"
      >
        <p ref={ref} className="text-body pb-4">{answer}</p>
      </motion.div>
    </div>
  );
};

const TABS = [
  "Cleaning Services",
  "Sanitary Solutions",
  "Gardening & Landscaping",
  "Fumigation & Pest Control",
  "Garbage Collection",
];

const QUESTIONS = {
  "Cleaning Services": [
    {
      question: "What’s included in daily and deep cleaning?",
      answer: "Daily tasks cover dusting, vacuuming/mopping, desks and surfaces, bins, washrooms and touchpoints. Deep cleans include detail work like high dusting, grout/edge scrubs, upholstery/steam as needed, and machine floor care." 
    },
    {
      question: "How do you assure quality and supervision?",
      answer: "We use site-specific checklists, trained supervisors, and periodic QA audits. Issues are logged and resolved via SLAs, with corrective actions tracked and reported." 
    },
    {
      question: "Which facilities do you specialise in?",
      answer: "Government offices and agencies, higher education, private schools, hospitals/clinics, malls and retail, hospitality, estates/residential blocks, NGOs and worship centres." 
    },
    {
      question: "Can you supply materials and equipment?",
      answer: "Yes—full bundle (labour + materials + equipment) or labour-only. Chemicals are eco‑friendly and compliant; MSDS/technical data sheets are available on request." 
    },
    {
      question: "How fast can you start, and can schedules flex?",
      answer: "After a site survey and approval, we typically mobilise in 24–48 hours. We offer day/night shifts and can adjust frequency around exams, events or peak seasons." 
    }
  ],
  "Sanitary Solutions": [
    {
      question: "What’s included in sanitary bin service?",
      answer: "Supply of bins and liners, discreet scheduled swaps, safe transport to licensed facilities, manifests/chain‑of‑custody, and optional feminine hygiene consumables." 
    },
    {
      question: "How often do you service washrooms?",
      answer: "Weekly, fortnightly or monthly as standard—scaled to footfall and season. High‑traffic sites can have multiple visits per week; telemetry options available for overflow alerts." 
    },
    {
      question: "Are you compliant and licensed for sanitary waste?",
      answer: "Yes. We operate under county by‑laws and NEMA guidelines, use licensed carriers, and retain disposal certificates for audit readiness." 
    },
    {
      question: "Do you disinfect washrooms and high‑touch points?",
      answer: "Yes. We provide routine disinfection using hospital‑grade, surface‑safe products, including taps, handles, dispensers and partitions." 
    },
    {
      question: "Are your methods eco‑friendly and safe?",
      answer: "We prioritise low‑toxicity, biodegradable chemicals and proper segregation to minimise environmental impact while maintaining hygiene standards." 
    }
  ],
  "Gardening & Landscaping": [
    {
      question: "What services do you provide outdoors?",
      answer: "Routine lawn care (mowing, edging), pruning/hedging, bed preparation, weeding, leaf sweeping, green‑waste haul‑away and seasonal clean‑ups." 
    },
    {
      question: "Do you offer design and installations?",
      answer: "Yes—softscape design/planting and small hardscape works (edging, paving repairs). We can refresh existing beds or implement new concepts to brief." 
    },
    {
      question: "How do you keep plants healthy long‑term?",
      answer: "We manage irrigation setups, mulching, soil conditioning, fertilisation and targeted pest management to maintain vigorous growth across seasons." 
    },
    {
      question: "Can you work safely on active sites?",
      answer: "Yes. Our teams follow RAMS, PPE and signage protocols to operate around staff, students and visitors with minimal disruption." 
    },
    {
      question: "Do you tailor plans to each property?",
      answer: "We build site‑specific maintenance plans with clear frequencies and standards, and adapt to seasonal/usage changes as needed." 
    }
  ],
  "Fumigation & Pest Control": [
    {
      question: "Which pests do you treat?",
      answer: "Cockroaches, rodents, termites, bed bugs, ants, flies, mosquitoes and more—both residential and commercial environments." 
    },
    {
      question: "Is treatment safe for people and pets?",
      answer: "We use targeted baits, gels and low‑odour formulations. Safety data and re‑entry times are provided; sensitive areas get non‑chemical options where appropriate." 
    },
    {
      question: "What prep and after‑care are needed?",
      answer: "Before: cover food/utensils, declutter access points, isolate pets. After: ventilate if instructed, clean food areas, and follow housekeeping tips to prevent re‑infestation." 
    },
    {
      question: "Do you offer preventive maintenance?",
      answer: "Yes—monitoring visits with traps/baits, structural proofing, and sanitation recommendations. We maintain logs for audits in regulated facilities." 
    },
    {
      question: "Are treatments guaranteed?",
      answer: "Most services include follow‑ups within the treatment window. Warranty terms vary by pest and will be confirmed in your proposal." 
    }
  ],
  "Garbage Collection": [
    {
      question: "What does your Garbage Collection service include?",
      answer: "Scheduled pick-ups for general, recyclable, and sanitary waste; supply of bins and liners; safe transport to licensed facilities; and documented handover for audit trails."
    },
    {
      question: "How often can you collect, and can schedules be customized?",
      answer: "We offer daily, weekly, bi-weekly, monthly, and on-demand pickups. Schedules are tailored to site volume, access windows, and seasonal fluctuations, with public holiday coverage available."
    },
    {
      question: "Do you handle waste segregation and provide the right containers?",
      answer: "Yes. We provide color-coded bins, liners, and signage for proper segregation (recyclables, organics, general, sanitary). We also train onsite teams to reduce contamination."
    },
    {
      question: "Are you compliant and insured? Where is waste disposed?",
      answer: "We operate under relevant county by‑laws and NEMA guidelines, using licensed carriers and permitted disposal/recovery facilities. We maintain manifests and chain‑of‑custody records; insurance is in place."
    },
    {
      question: "How do you price and measure performance?",
      answer: "Pricing is based on pickup frequency, container sizes, estimated volumes, site access, and route density. KPIs include missed‑pickup rate, response time, and fill‑level trends. Monthly reports are available."
    }
  ]
};

export default TabsFaq;