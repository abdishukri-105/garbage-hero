"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";
import Paragraph from "./ui/Paragraph";

// Palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body)

const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const ContactForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Refs for accessibility focus management
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  const setField = (field) => (e) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name || values.name.trim().length < 2)
      newErrors.name = "Please enter your full name.";
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(values.email);
    if (!emailOk) newErrors.email = "Enter a valid email address.";
    const phoneOk =
      values.phone === "" || /^[+()\d\s-]{7,}$/.test(values.phone);
    if (!phoneOk) newErrors.phone = "Enter a valid phone number.";
    if (!values.message || values.message.trim().length < 10)
      newErrors.message = "Tell us a bit more (min 10 characters).";
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const v = validate();
    setErrors(v);

    // Focus the first invalid field for better accessibility
    if (Object.keys(v).length) {
      if (v.name && nameRef.current) nameRef.current.focus();
      else if (v.email && emailRef.current) emailRef.current.focus();
      else if (v.phone && phoneRef.current) phoneRef.current.focus();
      else if (v.message && messageRef.current) messageRef.current.focus();
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || "Failed to send. Please try again.";
        setApiError(msg);
        return;
      }

      setSubmitted(true);
      setValues({ name: "", email: "", phone: "", message: "", company: "" });
    } catch (err) {
      setApiError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (hasError) =>
    `w-full h-12 text-[#333333] placeholder-[#333333]/70 bg-transparent text-base sm:text-lg font-normal leading-7 rounded-xl border ${
      hasError
        ? "border-[#1E611B] ring-2 ring-[#3AA335]/40"
        : "border-[#3AA335]/30 focus:ring-2 focus:ring-[#3AA335]/50"
    } focus:outline-none px-4 transition`;

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white section-compact"
      noValidate
      aria-busy={isSubmitting}
    >
      {/* Honeypot field (hidden from users) */}
      <input type="text" name="company" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
      <section className="relative overflow-hidden bg-white rounded-2xl">
        {/* Radial background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 relative">
          <span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] rounded-full px-3 py-1 ring-1 ring-[#3AA335]/20">
            Talk To Us
          </span>
          <Heading
            level={2}
            className="mt-3 mb-2 mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]"
            variant="primary"
          >
            Contact Us
          </Heading>
          <Paragraph className="text-lead text-[#333333] max-w-[60ch] mx-auto">
            We are ready to assist with tailored cleaning and waste management
            solutions.
          </Paragraph>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative">
          {/* standardized container */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
            {/* Media / contact info */}
            <div className="lg:mb-0 mb-6">
              <div className="group w-full h-full">
                <div className="relative h-80 sm:h-96 lg:h-full min-h-[360px]">
                  <Image
                    src="/projects/staff-1.jpg"
                    alt="Garbage Hero team at work"
                    fill
                    className="w-full h-full rounded-2xl lg:rounded-l-2xl object-cover [--tw-bg-opacity:1] bg-[#3AA335]/40 mix-blend-multiply"
                    priority
                  />
                  <motion.h2
                    variants={primaryVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="font-roboto-serif text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight absolute top-6 left-6"
                  >
                    Reach Us
                  </motion.h2>
                  <div className="absolute bottom-0 w-full lg:p-8 p-5">
                    <div className="bg-white rounded-lg p-5 shadow-sm ring-1 ring-[#3AA335]/10">
                      <a
                        href="tel:+254712345678"
                        className="flex items-center mb-4 sm:mb-5"
                      >
                        <FiPhone className="text-[#3AA335] text-lg sm:text-xl" />
                        <span className="text-base sm:text-lg text-[#333333] ml-4">
                          +254 712-345-678
                        </span>
                      </a>
                      <a
                        href="mailto:info@garbagehero.co.ke"
                        className="flex items-center mb-4 sm:mb-5"
                      >
                        <FiMail className="text-[#3AA335] text-lg sm:text-xl" />
                        <span className="text-base sm:text-lg text-[#333333] ml-4">
                          info@garbagehero.co.ke
                        </span>
                      </a>
                      <div className="flex items-center">
                        <FiMapPin className="text-[#3AA335] text-lg sm:text-xl" />
                        <span className="text-base sm:text-lg text-[#333333] ml-4">
                          Transnep House, Lenana Road, Hurlingham, Nairobi, Kenya
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="bg-[#E8F6E9] p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-r-2xl">
              {/* Honeypot field (hidden) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company" className="sr-only">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="organization"
                  value={values.company}
                  onChange={setField("company")}
                />
              </div>

              {apiError && (
                <div className="mb-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 ring-1 ring-red-200">
                    <svg className="h-5 w-5 text-red-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zM10 14a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm sm:text-base text-red-700" role="alert">{apiError}</p>
                  </div>
                </div>
              )}

              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-5 sm:mb-6"
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#1E611B] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={setField("name")}
                  className={fieldClass(!!errors.name)}
                  placeholder="Jane Doe"
                  required
                  minLength={2}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  ref={nameRef}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-5 sm:mb-6"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#1E611B] mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={setField("email")}
                  className={fieldClass(!!errors.email)}
                  placeholder="you@example.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  ref={emailRef}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-5 sm:mb-6"
              >
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-[#1E611B] mb-1"
                >
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={setField("phone")}
                  className={fieldClass(!!errors.phone)}
                  placeholder="+254 712 345 678"
                  pattern="[+()0-9\s-]{7,}"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  ref={phoneRef}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={primaryVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-6 sm:mb-8"
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[#1E611B] mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={setField("message")}
                  className={`w-full text-[#333333] placeholder-[#333333]/70 bg-transparent text-base sm:text-lg font-normal leading-7 rounded-xl border ${
                    errors.message
                      ? "border-[#1E611B] ring-2 ring-[#3AA335]/40"
                      : "border-[#3AA335]/30 focus:ring-2 focus:ring-[#3AA335]/50"
                  } focus:outline-none px-4 py-3 transition`}
                  placeholder="How can we help?"
                  required
                  minLength={10}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  ref={messageRef}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </motion.div>

              <WetPaintButton
                text={isSubmitting ? "Sending..." : submitted ? "Sent!" : "Get a Quote Now"}
                type="submit"
                fullWidth
                size="md"
                aria-label="Submit contact form"
                disabled={isSubmitting}
                className={isSubmitting ? "opacity-60 cursor-not-allowed" : ""}
              />
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-[#E8F6E9] ring-1 ring-[#3AA335]/30">
                    <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3AA335] text-white">
                      {/* icon replaced by CSS here to avoid extra imports if needed */}
                      <svg className="text-white h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-[#1E611B]">Message sent</p>
                      <p className="text-sm sm:text-base text-[#333333]">Thanks! We’ll get back to you shortly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default ContactForm;