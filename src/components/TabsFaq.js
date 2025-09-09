"use client"
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";

const TabsFaq = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden bg-black px-4 py-12 text-white">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 bg-[#E8F6E9] text-[#1E611B] font-semibold px-3 py-1 rounded-full text-xs tracking-wide uppercase">Got Questions? We&apos;ve Got Answers</span>
        <span className="mb-8 text-5xl font-bold text-white">FAQs</span>
      </div>

      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-[#3AA335]/10 blur-3xl" />
    </>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
            selected === tab
              ? "border-[#3AA335] bg-[#3AA335] text-white"
              : "border-white/20 bg-transparent text-white/70 hover:border-white/40"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.4,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-[#1E611B]"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
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

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border px-4 transition-colors ${
        open ? "bg-[#1E611B]/30 border-[#1E611B]" : "bg-white/5 border-white/15"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-white" : "text-white/70"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-white" : "text-white/70"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-white/70"
      >
        <p ref={ref}>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS = ["Cleaning Services", "Sanitary Solutions", "Gardening & Landscaping", "Fumigation & Pest Control"];

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