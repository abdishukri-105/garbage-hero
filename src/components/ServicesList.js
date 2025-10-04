"use client";
import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";
import Paragraph from "./ui/Paragraph"; // added

// Structured service data (hardcoded)
const SERVICES = [
	{
		key: "cleaning",
		img: "/projects/cleaning-1.jpg",
		subheading: "Cleaning Services",
		heading: "Cleaning Services",
		intro: "From routine cleaning to deep cleaning, we offer comprehensive services to keep your spaces spotless and welcoming. Our trained staff uses advanced equipment and eco-friendly products to ensure top-notch cleanliness.",
		bullets: [
			"Routine daily & periodic schedules",
			"Deep cleans & detail restoration",
			"Disinfection of high-touch points",
			"Floor care & surface treatment",
			"Move-in / move-out readiness",
			"Transparent quality supervision",
		],
		value: "Eco-friendly chemistry, trained stewards and documented checklists uphold consistent hygiene standards.",
	},
	{
		key: "sanitary",
		img: "/projects/staff-1.jpg",
		subheading: "Sanitary Services",
		heading: "Sanitary Services",
		intro: "We provide sanitary services that include waste management, disinfection, and sanitation of bathrooms and high-touch surfaces, promoting a healthy and safe environment.",
		bullets: [
			"Bathroom hygiene servicing",
			"High-touch surface sanitation",
			"Waste segregation guidance",
			"Scheduled disinfection cycles",
			"Odour & pathogen control focus",
			"Compliance-ready reporting",
		],
		value: "Structured sanitation routines reduce risk and reinforce user comfort and wellbeing.",
	},
	{
		key: "gardening",
		img: "/Photos/_MG_7719.jpg",
		subheading: "Gardening & Landscaping",
		heading: "Gardening & Landscaping",
		intro: "Our expert gardeners transform your outdoor spaces into beautiful and well-maintained landscapes. Whether you need routine garden care, landscaping design, or seasonal maintenance, we deliver exceptional results.",
		bullets: [
			"Routine grooming & mowing",
			"Shrub pruning & hedge shaping",
			"Seasonal bed redesigns",
			"Soil health & mulching care",
			"Water-efficient upkeep",
			"Sustainable plant selection",
		],
		value: "Planned horticulture improves aesthetics, biodiversity and long-term maintenance efficiency.",
	},
	{
		key: "pest",
		img: "/pest2.jpg",
		subheading: "Fumigation & Pest Control",
		heading: "Fumigation & Pest Control",
		intro: "Protect your home or business from harmful pests with our professional fumigation and pest control services. We use safe and effective treatments to eliminate pests and prevent future infestations, ensuring your environment remains hygienic and pest-free.",
		bullets: [
			"Integrated inspection & monitoring",
			"Safe targeted treatments",
			"Rodent & vector management",
			"Preventive barrier strategies",
			"Infestation source tracing",
			"Follow-up verification visits",
		],
		value: "Licensed technicians apply effective low-risk methods that prevent recurrence and safeguard health.",
	},
	{
		key: "garbage",
		img: "/projects/cleaning-4.jpg",
		subheading: "Garbage Collection",
		heading: "Garbage Collection & Waste Handling",
		intro: "Reliable scheduled collection, segregation guidance and compliant transfer of general and recyclable waste streams reducing on‑site clutter, odour and risk while improving sustainability reporting.",
		bullets: [
			"Scheduled on-site pickups",
			"Segregated bins & labeling support",
			"Regulatory compliant disposal routes",
			"Recyclables diversion tracking",
			"Overflow & urgent call-out response",
			"Documentation / manifest trail",
		],
		value: "Structured collection logistics, proper segregation and auditable disposal reduce environmental impact and operational disruption.",
	},
];

export const ServicesList = () => {
	return (
		<section className="section-standard bg-white relative overflow-hidden" id="services">{/* standardized spacing with radial pattern */}
			{/* Radial background pattern */}
			<div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">{/* standardized container */}
				<header className="mb-12 text-center max-w-3xl mx-auto">
					<span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-4">What We Do</span>
					<div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]">
						<Heading level={2} variant="primary" className="mb-0 text-center">Our Services</Heading>
					</div>
					<Paragraph className="mt-4 text-[#333333] mx-auto">
						Integrated cleaning, waste, hygiene and outdoor solutions engineered for reliability, compliance and environmental stewardship.
					</Paragraph>
				</header>
				<div className="flex flex-col space-y-14 md:space-y-20">
					{SERVICES.map((service, idx) => (
						<ServiceBlock key={service.key} service={service} index={idx} />
					))}
				</div>
			</div>
		</section>
	);
};

const ServiceBlock = ({ service, index }) => {
	const reverse = index % 2 === 1;
	return (
		<div
			className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} md:items-stretch items-start gap-6 md:gap-10`}
		>
			<div className="md:w-1/2 w-full overflow-hidden rounded-xl shadow-sm relative aspect-[4/3]" style={{ backgroundColor: '#1E611B', boxShadow: '0 0 0 1px rgba(58,163,53,0.3) inset' }}>
				<Image
					src={service.img}
					alt={service.subheading}
					fill
					className="object-cover object-center hover:scale-[1.03] transition-transform duration-700"
					placeholder="empty"
					priority={index < 2}
					quality={60}
					sizes="(max-width:768px) 100vw, 45vw"
				/>
				<div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(15,32,18,0.25),rgba(15,32,18,0.45))' }} />
			</div>
			<div className="md:w-1/2 w-full bg-white rounded-xl md:rounded-md p-6 md:p-8 border flex flex-col" style={{ borderColor: 'rgba(58,163,53,0.2)' }}>
				<Heading level={3} variant="primary" className="mb-0 font-playfair leading-tight text-2xl md:text-3xl">{service.heading}</Heading>
				<p className="mt-2 text-sm uppercase tracking-wide font-semibold" style={{ color: '#3AA335' }}>
					{service.subheading}
				</p>
				<p className="mt-4 text-sm md:text-base" style={{ color: '#333333' }}>
					{service.intro}
				</p>
				<ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
					{service.bullets.map((b, i) => (
						<li
							key={i}
							className="flex items-start gap-2 text-xs md:text-sm bg-white/70 backdrop-blur rounded-md px-3 py-2 border"
							style={{ color: '#333333', borderColor: 'rgba(58,163,53,0.1)' }}
						>
							<span className="mt-0.5 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#3AA335' }} />
							<span>{b}</span>
						</li>
					))}
				</ul>
				<div className="mt-5 text-xs md:text-sm italic rounded-md p-3" style={{ color: '#333333', backgroundColor: '#E8F6E9', border: '1px solid rgba(58,163,53,0.1)' }}>
					{service.value}
				</div>
				<div className="mt-6">
					<WetPaintButton text="Request Quote" href="/contact-us" size="md" />
				</div>
			</div>
		</div>
	);
};

export default ServicesList;