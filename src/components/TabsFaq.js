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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((pv) => !pv);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={`answer-${id}`}
      onClick={() => setOpen((pv) => !pv)}
      onKeyDown={handleKeyDown}
      animate={open ? "open" : "closed"}
      className={`cursor-pointer rounded-xl border px-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        open ? "bg-[#E8F6E9] border-[#3AA335]" : "bg-white border-[#3AA335]/15"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 py-3.5">
        <span
          className={`font-roboto-serif text-base sm:text-lg font-semibold transition-colors ${
            open ? "text-[#1E611B]" : "text-[#333333]"
          }`}
        >
          {question}
        </span>
        <motion.span variants={{ open: { rotate: "45deg" }, closed: { rotate: "0deg" } }}>
          <FiPlus className={`text-lg sm:text-xl transition-colors ${open ? "text-[#1E611B]" : "text-[#333333]/60"}`} />
        </motion.span>
      </div>
      <motion.div
        id={`answer-${id}`}
        initial={false}
        animate={{ height: open ? height : "0px", marginBottom: open ? "20px" : "0px" }}
        className="overflow-hidden text-[#333333]/80"
      >
        <p ref={ref} className="text-body">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS = [
  "Cleaning Services",
  "Sanitary Solutions",
  "Gardening & Landscaping",
  "Fumigation & Pest Control",
];

const QUESTIONS = {
  "Cleaning Services": [
    {
      question: "What types of cleaning services does Garbage Hero Ltd offer?",
      answer:
        "We provide comprehensive cleaning services, including routine cleaning, deep cleaning, and specialized cleaning for commercial and residential spaces. Our services cover offices, hospitals, schools, hotels, and homes, using eco-friendly products and advanced equipment to ensure a spotless and welcoming environment."
    },
    {
      question: "Do you offer cleaning for specific industries like hospitals or schools?",
      answer:
        "Yes, we cater to a wide range of clients, including hospitals, higher learning institutions, and private schools. Our team is trained to meet industry-specific standards, ensuring hygienic and safe environments tailored to the needs of each sector."
    },
    {
      question: "Are your cleaning products safe and eco-friendly?",
      answer:
        "Absolutely. At Garbage Hero Ltd, we prioritize sustainability by using environmentally friendly, non-toxic cleaning products that are safe for both people and the environment, without compromising on cleanliness."
    },
    {
      question: "How can I schedule a cleaning service?",
      answer:
        "You can contact us via email at info@garbagehero.co.ke or call +254 722 269 511 to schedule a service. We offer flexible scheduling and customized solutions to meet your specific needs."
    }
  ],
  "Sanitary Solutions": [
    {
      question: "What are your sanitary solutions?",
      answer:
        "Our sanitary solutions include waste management, disinfection of bathrooms and high-touch surfaces, and sanitation services to promote a healthy environment. We focus on creating clean and safe spaces for homes, offices, and public facilities."
    },
    {
      question: "Do you provide waste management for large institutions?",
      answer:
        "Yes, we serve large institutions such as government bodies, universities, and shopping malls. Our waste management services are designed to be efficient, eco-friendly, and compliant with local regulations."
    },
    {
      question: "How often should high-touch surfaces be disinfected?",
      answer:
        "The frequency depends on the environment, but we recommend regular disinfection of high-touch surfaces, especially in high-traffic areas like hospitals, schools, and malls. We can create a tailored schedule based on your needs."
    },
    {
      question: "Are your disinfection methods safe for sensitive environments?",
      answer:
        "Yes, we use safe, industry-approved disinfectants that are effective yet gentle enough for sensitive environments like hospitals and schools. Our team follows strict protocols to ensure safety and efficacy."
    }
  ],
  "Gardening & Landscaping": [
    {
      question: "What gardening and landscaping services do you offer?",
      answer:
        "We provide routine garden care, landscaping design, and seasonal maintenance for both residential and commercial properties. Our expert gardeners create beautiful, sustainable outdoor spaces tailored to your vision."
    },
    {
      question: "Can you design a custom landscape for my property?",
      answer:
        "Yes, we offer customized landscaping design services. Our team works with you to create a unique outdoor space that reflects your preferences and enhances your property’s aesthetic and functionality."
    },
    {
      question: "Do you use eco-friendly practices in gardening?",
      answer:
        "We prioritize sustainability by using organic fertilizers, water-efficient irrigation, and native plants where possible to create environmentally friendly landscapes that thrive in Nairobi’s climate."
    },
    {
      question: "How often should I schedule garden maintenance?",
      answer:
        "Maintenance frequency depends on your garden’s needs, but we typically recommend monthly or quarterly visits for routine care. We can assess your space and provide a personalized maintenance plan."
    }
  ],
  "Fumigation & Pest Control": [
    {
      question: "What pests do you treat with your fumigation services?",
      answer:
        "We treat a wide range of pests, including insects, rodents, and other vermin commonly found in homes, offices, and commercial spaces. Our treatments are tailored to address specific pest issues effectively."
    },
    {
      question: "Are your fumigation methods safe for homes and businesses?",
      answer:
        "Yes, we use safe, industry-approved fumigation methods and eco-friendly products to eliminate pests while ensuring the safety of occupants, pets, and the environment. We follow strict safety protocols during all treatments."
    },
    {
      question: "How long does a fumigation treatment take?",
      answer:
        "The duration depends on the size of the property and the severity of the infestation. Most treatments take a few hours, with some requiring temporary evacuation. We provide clear instructions and timelines before starting."
    },
    {
      question: "Can you prevent future pest infestations?",
      answer:
        "Yes, we offer preventative pest control services, including regular inspections and treatments to keep your property pest-free. Our team can create a customized plan to suit your needs.",
    }
  ]
};

export default TabsFaq;