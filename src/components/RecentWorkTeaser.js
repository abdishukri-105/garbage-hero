"use client";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import Image from "next/image";
import Link from "next/link";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";

const CARD_WIDTH = 390;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const items = [
  {
    id: 1,
    url: "/images/parliament.jpg",
    category: "Cleaning & Janitorial",
    title: "Parliament of Kenya",
    description: "Transformed a 10,000 sq.ft office with eco-friendly cleaning for a leading Kenyan firm.",
  },
  {
    id: 2,
    url: "/images/slide2.jpg",
    category: "Gardening & Landscaping",
    title: "University Campus Garden",
    description: "Revamped a 2-acre campus garden with sustainable landscaping for a top university.",
  },
  {
    id: 3,
    url: "/images/slide3.jpg",
    category: "Fumigation & Pest Control",
    title: "Mombasa Hotel Sanitization",
    description: "Provided safe pest control for a 5-star hotel, ensuring guest safety and comfort.",
  },
  {
    id: 4,
    url: "/images/slide4.jpg",
    category: "Garbage Collection",
    title: "Nairobi Community Cleanup",
    description: "Managed waste for a 500-home community, promoting a cleaner Nairobi.",
  },
  {
    id: 5,
    url: "/images/slide5.jpg",
    category: "Sanitary Disposal",
    title: "Kisumu School Hygiene",
    description: "Implemented hygienic sanitary disposal for a large school, enhancing health standards.",
  },
  {
    id: 6,
    url: "/images/slide1.jpg",
    category: "Cleaning & Janitorial",
    title: "Eldoret Office Complex",
    description: "Deep-cleaned a multi-story office complex with eco-friendly solutions.",
  },
  {
    id: 7,
    url: "/images/slide2.jpg",
    category: "Gardening & Landscaping",
    title: "Corporate Park Redesign",
    description: "Redesigned a corporate park with sustainable plants and irrigation systems.",
  },
];

const Card = ({ url, category, title, description }) => {
  return (
    <Link href="/portfolio">
      <div
        className="relative shrink-0 cursor-pointer rounded-2xl bg-background-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          marginRight: MARGIN,
        }}
      >
        <Image
          src={url}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
        />
        <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
          <h5 className="text-lg text-[#3aa335] font-semibold uppercase text-secondary ">
            {category}
          </h5>
          <h3 className="my-2 text-3xl font-bold ">{title}</h3>
          <p className="text-base text-white">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const RecentWorkTeaser = () => {
  const [ref, { width }] = useMeasure();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50px 0px" });
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => pv + CARD_SIZE);
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => pv - CARD_SIZE);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="border-t border-b rounded-tr-[2rem] rounded-br-[2rem] md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="relative overflow-hidden p-4" ref={ref}>
        <div className="mx-auto max-w-6xl">
          <h1  className="mb-12 text-2xl sm:text-5xl font-bold">
            Our Recent Work.{" "}
            <span className="text-secondary">Transforming Spaces Across Kenya.</span>
          </h1>
          <motion.div
            animate={{ x: offset }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            className="flex"
          >
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </motion.div>
        </div>
 <>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-[#3aa335] backdrop-blur-sm transition-[padding] hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-[#3aa335] backdrop-blur-sm transition-[padding] hover:pr-3"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </motion.section>
  );
};

export default RecentWorkTeaser;