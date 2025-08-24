"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Image from "next/image";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;
const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP);
const ROTATE_DEG = 2.5;
const STAGGER = 15;
const CENTER_STAGGER = -65;
const SECTION_HEIGHT = 600;

const TESTIMONIAL_DATA = [
  {
    tempId: 0,
    testimonial: "Garbage Hero transformed our office with eco-friendly cleaning. Spotless results!",
    by: "Jane M., Facilities Manager at XYZ Corp",
    imgSrc: "/images/slide1.jpg",
  },
  {
    tempId: 1,
    testimonial: "Their sustainable landscaping made our campus shine. Highly recommend!",
    by: "David K., University Administrator",
    imgSrc: "/images/slide1.jpg",
  },
  {
    tempId: 2,
    testimonial: "Fumigation was quick and safe. Our hotel is pest-free thanks to Garbage Hero!",
    by: "Sarah W., Hotel Manager",
    imgSrc: "/images/slide2.jpg",
  },
  {
    tempId: 3,
    testimonial: "Their garbage collection service keeps our community clean and green.",
    by: "Michael O., Community Leader",
    imgSrc: "/images/slide3.jpg",
  },
  {
    tempId: 4,
    testimonial: "Sanitary disposal for our school was handled with utmost professionalism.",
    by: "Esther N., School Principal",
    imgSrc: "/images/slide5.jpg",
  },
  {
    tempId: 5,
    testimonial: "Garbage Hero’s deep cleaning saved us time and impressed our clients!",
    by: "Paul T., Office Manager",
    imgSrc: "/images/slide3.jpg",
  },
  {
    tempId: 6,
    testimonial: "Their eco-friendly approach is a game-changer for our corporate park.",
    by: "Grace L., Property Manager",
    imgSrc: "/images/testimonial7.jpg",
  },
  {
    tempId: 7,
    testimonial: "Fast, reliable, and sustainable. Garbage Hero is our go-to for cleaning.",
    by: "John R., Facilities Director",
    imgSrc: "/images/testimonial8.jpg",
  },
  {
    tempId: 8,
    testimonial: "Their pest control service is top-notch. Safe and effective!",
    by: "Lucy M., Resort Owner",
    imgSrc: "/images/testimonial9.jpg",
  },
  {
    tempId: 9,
    testimonial: "Garbage Hero’s waste management made our estate cleaner than ever.",
    by: "Brian K., Estate Manager",
    imgSrc: "/images/testimonial10.jpg",
  },
  {
    tempId: 10,
    testimonial: "Their team’s professionalism and eco-focus are unmatched in Kenya.",
    by: "Mary A., Corporate Executive",
    imgSrc: "/images/testimonial11.jpg",
  },
  {
    tempId: 11,
    testimonial: "From cleaning to landscaping, Garbage Hero delivers excellence every time.",
    by: "Peter S., University Dean",
    imgSrc: "/images/testimonial12.jpg",
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
        absolute left-1/2 top-1/2 cursor-pointer border-text-primary p-8 transition-colors duration-500
        ${isActive ? "z-10 bg-green-500" : "z-0 bg-purple-200"}
      `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER}px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? "0px 8px 0px 4px #111827" : "0px 0px 0px 0px #111827",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-green-600"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <Image
        src={testimonial.imgSrc}
        alt={`Testimonial image for ${testimonial.by}`}
        width={48}
        height={56}
        className="mb-4 h-14 w-12 bg-text-body object-cover object-top"
        style={{ boxShadow: "3px 3px 0px white" }}
        sizes="(max-width: 640px) 48px, 48px"
      />
      <Heading
        level={3}
        variant={isActive ? "white" : "primary"}
        className="text-base sm:text-xl"
      >
        "{testimonial.testimonial}"
      </Heading>
      <Paragraph
        size="sm"
        color={isActive ? "primary-end" : "subtle"}
        className="absolute bottom-8 left-8 right-8 mt-2 italic"
      >
        - {testimonial.by}
      </Paragraph>
    </motion.div>
  );
};

const TestimonialsCarousel = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);
  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50px 0px" });

  const handleMove = (position) => {
    const copy = [...testimonials];
    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();
        if (!firstEl) return;
        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();
        if (!lastEl) return;
        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }
    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");
    setCardSize(matches ? CARD_SIZE_LG : CARD_SIZE_SM);

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? CARD_SIZE_LG : CARD_SIZE_SM);
    };

    window.addEventListener("resize", handleSetCardSize);
    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gray-200"
      style={{ height: SECTION_HEIGHT }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
    >
      <div className="mx-auto bg-yellow-300 max-w-6xl px-4 sm:px-6 lg:px-8  ">
        <Heading level={2} className="mb-8 text-center">
          What Our Clients Say. <span className="text-secondary">Serving Kenya’s Best.</span>
        </Heading>
      </div>
      {testimonials.map((t, idx) => {
        let position = 0;
        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }
        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <Button
          variant="secondary"
          size="lg"
          className="grid h-14 w-14 place-content-center text-3xl"
          onClick={() => handleMove(-1)}
          icon
        >
          <GoArrowLeft />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="grid h-14 w-14 place-content-center text-3xl"
          onClick={() => handleMove(1)}
          icon
        >
          <GoArrowRight />
        </Button>
      </div>
    </motion.section>
  );
};

export default TestimonialsCarousel;