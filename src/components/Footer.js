"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

// Palette hex
// brand #3AA335, brand-dark #1E611B, brand-light #E8F6E9, body #333333

const Footer = () => {
  return (
    <div className="px-4 pt-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid  gap-10 row-gap-6 mb-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          variants={primaryVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="sm:col-span-2"
        >
          <Link href="/" aria-label="Go home" title="Garbage Hero Limited" className="inline-flex items-center">
            <Image src="/images/logo1.png" alt="Garbage Hero Logo" width={60} height={60} className="" />
            <h2 className="ml-2 text-3xl font-bold tracking-wide text-black uppercase font-montserrat">Garbage Hero Limited</h2>
          </Link>
          <div className="mt-2 lg:max-w-sm">
            <p className="text-base text-[#333333] font-lato">
              Leading eco-friendly cleaning and waste management solutions across Kenya, dedicated to a sustainable future.
            </p>
            <p className="mt-2 text-base text-[#333333] font-lato">
              Committed to transforming communities with innovative and green practices.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={primaryVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-2 text-sm"
        >
          <p className="text-xl font-bold tracking-wide  font-montserrat">Contacts</p>
          <div className="flex">
            <p className="mr-1 text-lg font-semibold text-[#333333]">Phone:</p>
            <a href="tel:+254712345678" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 text-[#3AA335] text-lg hover:text-[#1E611B]">+254 712-345-678</a>
          </div>
          <div className="flex">
            <p className="mr-1 text-lg font-semibold text-[#333333]">Email:</p>
            <a href="mailto:info@garbagehero.co.ke" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-[#3AA335] text-lg  hover:text-[#1E611B]">info@garbagehero.co.ke</a>
          </div>
          <div className="flex">
            <p className="mr-1 text-lg font-semibold text-[#333333]">Address:</p>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="transition-colors text-lg duration-300 text-[#3AA335] hover:text-[#1E611B]">
              Nairobi, Kenya
            </a>
          </div>
        </motion.div>
        <motion.div
          variants={primaryVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <span className="text-xl font-bold tracking-wide text-black font-montserrat">Social</span>
          <div className="flex items-center mt-1 space-x-3">
            <Link href="/" className="text-[#3AA335] transition-colors duration-300 hover:text-[#1E611B]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6">
                <path
                  d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"
                ></path>
              </svg>
            </Link>
            <Link href="/" className="text-[#3AA335] transition-colors duration-300 hover:text-[#1E611B]">
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4"></circle>
                <path
                  d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"
                ></path>
              </svg>
            </Link>
            <Link href="/" className="text-[#3AA335] transition-colors duration-300 hover:text-[#1E611B]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path
                  d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"
                ></path>
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-lg text-[#333333]/70 font-lato">
            Eco-friendly waste solutions to keep Kenya green and clean.
          </p>
        </motion.div>
      </div>
      <motion.div
        variants={primaryVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col-reverse justify-between pt-2 pb-2 border-t border-[#1E611B] lg:flex-row"
      >
        <p className="text-sm text-[#333333]/70 font-lato">
          © 2025 Garbage Hero Limited. All rights reserved.
        </p>
        <p className="">
          <Link href="https://abdishukri.tech" target="_blank" className="text-sm underline text-[#333333]/70 transition-colors duration-300 hover:text-[#3AA335] font-lato">Built By Abdishukri Mohamed</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Footer;