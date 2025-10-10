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
      question: "What do your Cleaning Services cover day to day?",
      answer: "From routine cleaning to deep cleaning, we offer comprehensive services to keep your spaces spotless and welcoming. Our trained staff uses advanced equipment and eco-friendly products to ensure top-notch cleanliness." 
    },
    {
      question: "How do you ensure quality and professionalism?",
      answer: "We uphold the highest standards of quality, professionalism, and client satisfaction. Our mission is to redefine cleanliness by providing innovative and trustworthy cleaning services." 
    },
    {
      question: "Which types of facilities do you currently serve?",
      answer: "Higher learning institutions; government institutions, bodies and agencies; private learning institutions; hospitals (both private and public); shopping malls; hotels and restaurants; estates and private residential spaces; non-governmental organizations; places of worship; entertainment joints." 
    },
    {
      question: "What makes your cleaning team different?",
      answer: "Professional Team: Our staff is highly trained, skilled, and dedicated to providing the best service possible. Reliable & Efficient: We pride ourselves on our punctuality, consistency, and attention to detail." 
    },
    {
      question: "How do your values influence service delivery?",
      answer: "Core Values: Innovation, Trust, Professionalism. We tailor our services to meet the unique needs of each client, offering flexible scheduling and personalized care." 
    }
  ],
  "Sanitary Solutions": [
    {
      question: "What is included in your sanitary services?",
      answer: "We provide sanitary services that include waste management, disinfection, and sanitation of bathrooms and high-touch surfaces, promoting a healthy and safe environment." 
    },
    {
      question: "How do these services create safer environments?",
      answer: "We provide sanitary services that include waste management, disinfection, and sanitation of bathrooms and high-touch surfaces, promoting a healthy and safe environment." 
    },
    {
      question: "Do you tailor sanitary schedules to client needs?",
      answer: "We tailor our services to meet the unique needs of each client, offering flexible scheduling and personalized care." 
    },
    {
      question: "How do you ensure reliability and consistency?",
      answer: "Reliable & Efficient: We pride ourselves on our punctuality, consistency, and attention to detail, ensuring that every job is completed to the highest standard." 
    },
    {
      question: "Are your methods eco-friendly and sustainable?",
      answer: "Eco-Friendly Approach: We prioritize sustainability by using environmentally friendly products and practices wherever possible." 
    }
  ],
  "Gardening & Landscaping": [
    {
      question: "What do your gardeners deliver?",
      answer: "Our expert gardeners transform your outdoor spaces into beautiful and well-maintained landscapes." 
    },
    {
      question: "Do you offer design and seasonal maintenance?",
      answer: "Whether you need routine garden care, landscaping design, or seasonal maintenance, we deliver exceptional results." 
    },
    {
      question: "How do you keep landscapes healthy long term?",
      answer: "Our expert gardeners transform your outdoor spaces into beautiful and well-maintained landscapes. Reliable & Efficient: We pride ourselves on our punctuality, consistency, and attention to detail." 
    },
    {
      question: "Can solutions be customized to each property?",
      answer: "We tailor our services to meet the unique needs of each client, offering flexible scheduling and personalized care." 
    },
    {
      question: "Which values guide your landscaping work?",
      answer: "Core Values: Innovation, Trust, Professionalism. We believe in creating environments that promote well-being, safety, and comfort." 
    }
  ],
  "Fumigation & Pest Control": [
    {
      question: "What do your fumigation and pest services achieve?",
      answer: "Protect your home or business from harmful pests with our professional fumigation and pest control services." 
    },
    {
      question: "How do you eliminate pests safely?",
      answer: "We use safe and effective treatments to eliminate pests and prevent future infestations, ensuring your environment remains hygienic and pest-free." 
    },
    {
      question: "Do you help prevent future infestations?",
      answer: "We use safe and effective treatments to eliminate pests and prevent future infestations, ensuring your environment remains hygienic and pest-free." 
    },
    {
      question: "Which environments do you support?",
      answer: "Home or business settings including higher learning institutions, government institutions, hospitals (both private and public), shopping malls, hotels and restaurants, and private residential spaces." 
    },
    {
      question: "What principles guide your pest control approach?",
      answer: "Professional Team; Eco-Friendly Approach; Customized Solutions; Reliable & Efficient. Core Values: Innovation, Trust, Professionalism." 
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