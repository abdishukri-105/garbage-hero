"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";

const AboutUsTeaser = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px" });

  const stats = [
    { num: 20, suffix: "+", subheading: "Years of Experience", delay: 0.6 },
    { num: 12.5, decimals: 1, suffix: "K+", subheading: "Spaces Cleaned", delay: 0.8 },
    { num: 95, suffix: "%", subheading: "Customer Satisfaction", delay: 1.0 },
    { num: 100, suffix: "+", subheading: "Team Members", delay: 1.2 },
  ];

  return (
    <motion.section
      ref={ref}
      className="px-3 sm:px-4 md:px-5 lg:px-5 py-12 sm:py-16 md:py-24 bg-background-white z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="w-full max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 justify-start items-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:order-first order-last">
            <div className="pt-12 sm:pt-16 md:pt-24 lg:justify-center sm:justify-end justify-start">
              <Image
                src="/images/slide1.jpg"
                alt="Garbage Hero team cleaning a Kenyan office"
                width={300}
                height={400}
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full h-[200px] sm:h-[300px] md:h-[400px]"
                priority
              />
            </div>
            <div className="sm:ml-0 ml-auto">
              <Image
                src="/images/slide2.jpg"
                alt="Eco-friendly waste management in Kenya"
                width={300}
                height={400}
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-xl w-full h-[200px] sm:h-[300px] md:h-[400px]"
                priority
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center lg:items-start items-center gap-8 sm:gap-10">
            <div className="w-full flex flex-col justify-start lg:items-start items-center gap-2 sm:gap-3">
              <Heading level={2} className="lg:text-start text-center">
                Cleaning Kenya, Sustaining Tomorrow
              </Heading>
              <Paragraph size="md" color="subtle" className="lg:text-start text-center">
                At Garbage Hero Limited, we transform Kenyan homes and businesses with eco-friendly cleaning and waste management. From bustling Nairobi offices to serene rural landscapes, our dedicated team ensures every space shines with pride, preserving Kenya’s beauty for generations.
              </Paragraph>
            </div>
            <div className="w-full flex flex-wrap lg:justify-start justify-center items-center gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col justify-start items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ delay: stat.delay, duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
                >
                  <h3 className="text-text-primary text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-roboto leading-normal">
                    <span className="mr-1 text-secondary">{stat.icon}</span>
                    {stat.num}
                    {stat.suffix}
                  </h3>
                  <Paragraph size="sm" color="subtle">
                    {stat.subheading}
                  </Paragraph>
                </motion.div>
              ))}
            </div>
            <Button variant="primary" size="md" onClick={() => window.location.href = "/about"}>
              See More
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUsTeaser;