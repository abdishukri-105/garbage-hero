"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";


const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const ContactForm = () => {
  return (
    <form action="https://fabform.io/f/xxxxx" method="post">
      <section className="py-16 border bg-white rounded-tr-[2rem]  rounded-br-[2rem] border-[#3aa335]">
     <div className="text-center mb-8 sm:mb-10 md:mb-12">
				<h1 className="font-playfair font-bold text-[#000000] text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
				Contact Us
				</h1>
			
			</div>
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-96 lg:h-full min-h-[400px]">
                  <Image
                    src="/images/slide3.jpg"
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
                   Reach Us
                  </motion.h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a href="tel:+254712345678" className="flex items-center mb-6">
                        <FiPhone className="text-[#3aa335]" />
                        <h5 className=" text-xl font-normal leading-6 ml-5">
                          +254 712-345-678
                        </h5>
                      </a>
                      <a href="mailto:info@garbagehero.co.ke" className="flex items-center mb-6">
                        <FiMail className="text-[#3aa335]" />
                        <h5 className=" text-lg font-normal leading-6 ml-5">
                          info@garbagehero.co.ke
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center">
                        <FiMapPin className="text-[#3aa335]" />
                        <h5 className=" text-lg font-normal leading-6 ml-5">
                          Transnep House, Lenana Road, Hurlingham, Nairobi, Kenya
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background-light p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            
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
                  className="w-full h-12  placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-xl border border-background-dark focus:outline-primary-start pl-4"
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
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-xl border border-background-dark focus:outline-primary-start pl-4"
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
                  className="w-full h-12 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-xl border border-background-dark focus:outline-primary-start pl-4"
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
              
              </motion.div>
              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-10"
              >
                <textarea
                  name="message"
                  className="w-full h-32 text-text-body placeholder-text-subtle bg-transparent text-lg font-open-sans font-normal leading-7 rounded-xl border border-background-dark focus:outline-primary-start pl-4"
                  placeholder="Message"
                  required
                />
              </motion.div>
            
                <WetPaintButton />
           
            </div>
          </div>
        </div>
      </section>
     
    </form>
  );
};


export default ContactForm;


const WetPaintButton = () => {
  return (
    <Link href="/contact-us" >
      <button className="group w-full relative rounded hover:bg-[#3aa335] px-6 py-4 font-semibold text-black hover:cursor-pointer transition-colors bg-[#228B22]">
        GET A QUOTE NOW!
        <Drip left="10%" height={24} delay={0.5} />
        <Drip left="20%" height={20} delay={3} />
        <Drip left="37%" height={30} delay={1.25} />
         <Drip left="57%" height={29} delay={0.25} />
           <Drip left="77%" height={19} delay={2.25} />
        <Drip left="95%" height={16} delay={1.5} />
      </button>
    </Link>
  );
};

const Drip = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{
        left,
      }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full group-hover:bg-[#3aa335] transition-colors bg-[#228B22]"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="group-hover:fill-[#3aa355] transition-colors fill-[#228B22]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="group-hover:fill-[#3aa355] transition-colors fill-[#228B22]"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="group-hover:fill-[#3aa355] transition-colors fill-[#228B22]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="group-hover:fill-[#3aa355] transition-colors fill-[#228B22]"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-xl group-hover:bg-[#3aa335] transition-colors bg-[#228B22]"
      />
    </motion.div>
  );
};