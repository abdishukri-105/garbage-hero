"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Award, Layers, Users, Zap } from "lucide-react";
import Heading from './ui/Heading';

const WhyUs = () => {
  const CARDS = [
    {
      id: 1,
      icon: <Users className="h-10 w-10 text-white transition-all" />,
      title: "Professional Team",
      description:
        "Our staff is highly trained, skilled, and dedicated to providing the best service possible.",
    },
    {
      id: 2,
      icon: <Layers className="h-10 w-10 text-white transition-all" />,
      title: "Eco-Friendly Approach",
      description:
        "We prioritize sustainability by using environmentally friendly products and practices wherever possible.",
    },
    {
      id: 3,
      icon: <Zap className="h-10 w-10 text-white transition-all" />,
      title: "Customized Solutions",
      description:
        "We tailor our services to meet the unique needs of each client, offering flexible scheduling and personalized care.",
    },
    {
      id: 4,
      icon: <Award className="h-10 w-10 text-white transition-all" />,
      title: "Reliable & Efficient",
      description:
        "We pride ourselves on our punctuality, consistency, and attention to detail, ensuring that every job is completed to the highest standard.",
    },
  ];

  return (
    <section className="section-standard font-sans text-[#333333]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} variant="primary" className="mb-0 text-center">Why Choose Garbage Hero</Heading>
          </div>
          <p className="text-lead font-lato text-[#333333] mt-4 max-w-3xl mx-auto">
            At Garbage Hero Limited, we believe in creating environments that promote well-being, safety, and comfort. Whether it&apos;s a home, office, or commercial property, we are here to help you maintain a clean, healthy, and beautiful space. Let us handle the dirty work so you can enjoy a pristine and well-kept environment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      className={twMerge(
        "group relative cursor-pointer overflow-hidden bg-white px-4 sm:px-6 pt-8 sm:pt-4 pb-6 sm:pb-6 shadow-xl ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-md mx-auto rounded-lg"
      )}
    >
      <span className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 z-0 h-16 sm:h-20 w-16 sm:w-20 rounded-full transition-all duration-300 group-hover:scale-[10] group-hover:bg-[#1E611B]">
      </span>
      <div className="relative z-10 mx-auto max-w-md">
        <div className="flex justify-center mb-4 sm:mb-5">
          <span className="grid h-16 sm:h-16 w-16 sm:w-16 place-items-center rounded-full bg-[#3AA335] transition-all duration-300 group-hover:bg-[#1E611B]">
            {card.icon}
          </span>
        </div>
        <div className="space-y-4 sm:space-y-6 text-base leading-7 text-[#333333] transition-all duration-300 group-hover:text-white/90 font-sans">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-black group-hover:text-white text-center">
            {card.title}
          </h3>
          <p className="text-center">{card.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;