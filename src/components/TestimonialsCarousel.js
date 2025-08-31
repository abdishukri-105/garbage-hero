"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FiAward,
  FiLayers, // replaced FiRecycle with FiLayers
  FiUsers,
  FiZap,
} from "react-icons/fi";

const TestimonialsCarousel = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-[#FFFFFF] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 overflow-hidden">
      <div className="p-4 sm:p-6">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#000000]">
          What Our Customers Think
        </h3>
        <p className="text-[#333333] my-4 sm:my-6 text-sm sm:text-base md:text-lg font-open-sans">
          Hear from our satisfied clients about how Garbage Hero Limited’s eco-friendly cleaning and waste management services have transformed their spaces across Kenya.
        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => {
  return (
    <div className="flex gap-1 mt-6 sm:mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="h-1.5 w-full bg-[#E5F3E8] relative"
          >
            {selected === n ? (
              <motion.span
                className="absolute top-0 left-0 bottom-0 bg-[#3aa335]"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5,
                }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <span
                className="absolute top-0 left-0 bottom-0 bg-[#3aa335]"
                style={{
                  width: selected > n ? "100%" : "0%",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Cards = ({ testimonials, selected, setSelected }) => {
  return (
    <div className="p-4 sm:p-6 relative h-[300px] sm:h-[350px] lg:h-[400px] shadow-xl">
      {testimonials.map((t, i) => {
        return (
          <Card
            {...t}
            key={i}
            position={i}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "#E5F3E8" : "#FFFFFF";
  const color = position % 2 ? "#333333" : "#333333";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-6 sm:p-8 lg:p-12 cursor-pointer flex flex-col justify-between"
    >
      <Icon className="text-5xl sm:text-6xl md:text-7xl mx-auto text-[#3aa335]" />
      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-open-sans font-light italic my-6 sm:my-8">
        &quot;{description}&quot;
      </p>
      <div>
        <span className="block font-playfair font-bold text-base sm:text-lg text-[#000000]">
          {name}
        </span>
        <span className="block font-open-sans text-xs sm:text-sm text-[#333333]">
          {title}
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialsCarousel;

const testimonials = [
  {
    Icon: FiUsers,
    description:
      "Garbage Hero’s team transformed our office with their professional cleaning services. Their attention to detail is unmatched!",
    name: "Sarah Mwangi",
    title: "Office Manager, Nairobi",
  },
  {
    Icon: FiLayers, // replaced FiRecycle with FiLayers
    description:
      "Their eco-friendly approach made a huge difference for our community. Sustainable and thorough, they’re the best in waste management.",
    name: "James Otieno",
    title: "Community Leader, Kisumu",
  },
  {
    Icon: FiZap,
    description:
      "The customized cleaning schedule they provided fits our business perfectly. Reliable and efficient every time!",
    name: "Fatima Ali",
    title: "Business Owner, Mombasa",
  },
  {
    Icon: FiAward,
    description:
      "Garbage Hero’s commitment to quality is exceptional. Our commercial property has never looked better!",
    name: "David Kimani",
    title: "Property Manager, Eldoret",
  },
    {
    Icon: FiAward,
    description:
      `Garbage Hero’s commitment to quality is exceptional. Our commercial property has never looked better!`,
    name: "David Kimani",
    title: "Property Manager, Eldoret",
  },
    {
    Icon: FiAward,
    description:
      `Garbage Hero’s commitment to quality is exceptional. Our commercial property has never looked better!`,
    name: "David Kimani",
    title: "Property Manager, Eldoret",
  },
];