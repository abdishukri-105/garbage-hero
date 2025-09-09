"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";

// Palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body)

const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const ContactForm = () => {
  return (
    <form
      // onSubmit={handleSubmit}
      className="bg-white section-standard"
      noValidate
    >
      <section className="py-16 border bg-white rounded-tr-[2rem]  rounded-br-[2rem] border-[#3AA335]">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <Heading level={2} className="mb-4" variant="primary">
            Contact Us
          </Heading>
          <p className="text-lead font-lato text-[#333333] max-w-[60ch] mx-auto">
            We are ready to assist with tailored cleaning and waste management
            solutions.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* standardized container */}
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-96 lg:h-full min-h-[400px]">
                  <Image
                    src="/projects/staff-1.jpg"
                    alt="Contact us background"
                    fill
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-[#3AA335] object-cover"
                  />
                  <motion.h1
                    variants={primaryVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="font-montserrat text-white text-4xl font-bold leading-10 absolute top-11 left-11"
                  >
                    Reach Us
                  </motion.h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a
                        href="tel:+254712345678"
                        className="flex items-center mb-6"
                      >
                        <FiPhone className="text-[#3AA335]" />
                        <h5 className=" text-xl font-normal leading-6 ml-5">
                          +254 712-345-678
                        </h5>
                      </a>
                      <a
                        href="mailto:info@garbagehero.co.ke"
                        className="flex items-center mb-6"
                      >
                        <FiMail className="text-[#3AA335]" />
                        <h5 className=" text-lg font-normal leading-6 ml-5">
                          info@garbagehero.co.ke
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center">
                        <FiMapPin className="text-[#3AA335]" />
                        <h5 className=" text-lg font-normal leading-6 ml-5">
                          Transnep House, Lenana Road, Hurlingham, Nairobi, Kenya
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E8F6E9] p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <input
                  type="text"
                  name="name"
                  className="w-full h-12  placeholder-[#333333] bg-transparent text-lg font-lato font-normal leading-7 rounded-xl border border-[#1E611B] focus:outline-[#3AA335] pl-4"
                  placeholder="Name"
                  required
                />
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <input
                  type="email"
                  name="email"
                  className="w-full h-12 text-[#333333] placeholder-[#333333] bg-transparent text-lg font-lato font-normal leading-7 rounded-xl border border-[#1E611B] focus:outline-[#3AA335] pl-4"
                  placeholder="Email"
                  required
                />
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <input
                  type="tel"
                  name="phone"
                  className="w-full h-12 text-[#333333] placeholder-[#333333] bg-transparent text-lg font-lato font-normal leading-7 rounded-xl border border-[#1E611B] focus:outline-[#3AA335] pl-4"
                  placeholder="Phone"
                />
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              ></motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <textarea
                  name="message"
                  className="w-full h-32 text-[#333333] placeholder-[#333333] bg-transparent text-lg font-lato font-normal leading-7 rounded-xl border border-[#1E611B] focus:outline-[#3AA335] pl-4"
                  placeholder="Message"
                  required
                />
              </motion.div>

              <WetPaintButton
                text="GET A QUOTE NOW!"
                fullWidth
                href="/contact-us"
              />
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default ContactForm;