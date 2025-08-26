"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";

const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const ContactForm = () => {
  return (
    <form action="https://fabform.io/f/xxxxx" method="post">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <Image
                    src="/images/slide1.jpg"
                    alt="Contact us background"
                    fill
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-primary-start object-cover"
                  />
                  <motion.h1
                    variants={primaryVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="font-roboto text-white text-4xl font-bold leading-10 absolute top-11 left-11"
                  >
                    Contact us
                  </motion.h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a href="tel:+254712345678" className="flex items-center mb-6">
                        <FiPhone className="text-primary-start" />
                        <h5 className="text-text-body text-base font-normal leading-6 ml-5">
                          +254 712-345-678
                        </h5>
                      </a>
                      <a href="mailto:info@garbagehero.co.ke" className="flex items-center mb-6">
                        <FiMail className="text-primary-start" />
                        <h5 className="text-text-body text-base font-normal leading-6 ml-5">
                          info@garbagehero.co.ke
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center">
                        <FiMapPin className="text-primary-start" />
                        <h5 className="text-text-body text-base font-normal leading-6 ml-5">
                          Nairobi, Kenya
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background-light p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <motion.h2
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-primary-start font-roboto text-4xl font-semibold leading-10 mb-11"
              >
                Send Us A Message
              </motion.h2>
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
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-full border border-background-dark focus:outline-primary-start pl-4"
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
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-full border border-background-dark focus:outline-primary-start pl-4"
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
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-full border border-background-dark focus:outline-primary-start pl-4"
                  placeholder="Phone"
                />
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <h4 className="text-text-subtle text-lg font-open-sans font-normal leading-7 mb-4">
                  Preferred method of communication
                </h4>
                <div className="flex">
                  <div className="flex items-center mr-11">
                    <input
                      id="radio-email"
                      type="radio"
                      name="communication"
                      value="email"
                      className="hidden checked:bg-no-repeat checked:bg-center checked:border-primary-start checked:bg-primary-100 peer"
                      required
                    />
                    <label
                      htmlFor="radio-email"
                      className="flex items-center cursor-pointer text-text-subtle text-base font-open-sans font-normal leading-6 peer-checked:text-primary-start"
                    >
                      <span className="border border-background-dark rounded-full mr-2 w-4 h-4 ml-2 peer-checked:bg-primary-start peer-checked:border-primary-start"></span>
                      Email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="radio-phone"
                      type="radio"
                      name="communication"
                      value="phone"
                      className="hidden checked:bg-no-repeat checked:bg-center checked:border-primary-start checked:bg-primary-100 peer"
                    />
                    <label
                      htmlFor="radio-phone"
                      className="flex items-center cursor-pointer text-text-subtle text-base font-open-sans font-normal leading-6 peer-checked:text-primary-start"
                    >
                      <span className="border border-background-dark rounded-full mr-2 w-4 h-4 ml-2 peer-checked:bg-primary-start peer-checked:border-primary-start"></span>
                      Phone
                    </label>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <input
                  type="text"
                  name="message"
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-full border border-background-dark focus:outline-primary-start pl-4"
                  placeholder="Message"
                  required
                />
              </motion.div>
              <motion.button
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                className="w-full h-12 text-white text-base font-roboto font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-primary-end bg-primary-start shadow-sm"
              >
                <Button variant="primary" size="md">
                  Send
                </Button>
              </motion.button>
            </div>
          </div>
        </div>
      </section>
     
    </form>
  );
};

export default ContactForm;