"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const services = [
  {
    title: "Cleaning & Janitorial",
    description: "Spotless cleaning for homes and offices across Kenya.",
    imgSrc: "/images/slide3.jpg",
    href: "/services#cleaning",
  },
  {
    title: "Gardening & Landscaping",
    description: "Eco-friendly designs to transform your outdoor spaces.",
    imgSrc: "/images/slide2.jpg",
    href: "/services#gardening",
  },
  {
    title: "Fumigation & Pest Control",
    description: "Safe, effective solutions to keep pests at bay.",
    imgSrc: "/images/slide3.jpg",
    href: "/services#pest-control",
  },
  {
    title: "Garbage Collection",
    description: "Sustainable waste management for a cleaner Kenya.",
    imgSrc: "/images/slide4.jpg",
    href: "/services#garbage-collection",
  },
  {
    title: "Sanitary Disposal",
    description: "Hygienic disposal for healthier environments.",
    imgSrc: "/images/slide5.jpg",
    href: "/services#sanitary-disposal",
  },
];

const ServicesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  return (
    <motion.section
      ref={ref}
      className="p-4 md:p-8 bg-gren-100 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="w-full max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
          {services.slice(0, 3).map((service, index) => (
            <Card
              key={index}
              heading={service.title}
              description={service.description}
              imgSrc={service.imgSrc}
              href={service.href}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {services.slice(3).map((service, index) => (
            <Card
              key={index + 3}
              heading={service.title}
              description={service.description}
              imgSrc={service.imgSrc}
              href={service.href}
              index={index + 3}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Card = ({ heading, description, imgSrc, href, index, isInView }) => {
  return (
    <Link href={href}>
      <motion.div
        transition={{
          staggerChildren: 0.035,
        }}
        whileHover="hover"
        className="w-full h-72 sm:h-80 bg-gren-300 overflow-hidden cursor-pointer group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
      >
        <div
          className="absolute inset-0 saturate-100 md:saturate-100 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        >
          <Image
            src={imgSrc}
            alt={heading}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            priority={index === 0}
          />
        </div>
        <div className="p-4 relative z-20 h-full  text-black group-hover:text-green-600 transition-colors duration-500 flex flex-col justify-between">
          <FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
          <div>
            <h4 className="font-roboto">
              {heading.split("").map((l, i) => (
                <ShiftLetter letter={l} key={i} />
              ))}
            </h4>
            <p className="text-xs sm:text-sm font-roboto">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const ShiftLetter = ({ letter }) => {
  return (
    <div className="inline-block overflow-hidden h-[36px] font-semibold text-2xl sm:text-3xl font-roboto">
      <motion.span
        className="flex flex-col min-w-[4px]"
        style={{
          y: "0%",
        }}
        variants={{
          hover: {
            y: "-50%",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};

export default ServicesPreview;