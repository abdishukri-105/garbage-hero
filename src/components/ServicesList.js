"use client";
import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Heading from "./ui/Heading";
import WetPaintButton from "./ui/WetPaintButton";

// Structured service data (hardcoded)
const SERVICES = [
	{
		key: "cleaning",
		img: "/projects/cleaning-1.jpg",
		subheading: "Cleaning & Janitorial",
		heading: "Spotless. Consistent. Eco‑Friendly.",
		intro: "End‑to‑end professional cleaning programs for universities, government facilities, corporate offices, health institutions and residential estates.",
		bullets: [
			"Routine daily / periodic office cleaning",
			"Deep cleaning & disinfection (high touch zones)",
			"Floor care: machine scrubbing, polishing & sealing",
			"Post–construction & handover cleaning",
			"Move‑in / move‑out & tenancy turnaround",
			"High level / window & façade cleaning (select sites)",
		],
		value: "We deploy vetted, uniformed stewards, green-certified chemicals and documented checklists for measurable quality.",
	},
	{
		key: "landscaping",
		img: "/projects/mandera-1.jpg",
		subheading: "Gardening & Landscaping",
		heading: "Greener Outdoor Spaces.",
		intro: "Design, installation and maintenance of healthy, water‑efficient landscapes that elevate property value and wellbeing.",
		bullets: [
			"Grounds grooming & scheduled mowing",
			"Hedge shaping & tree / shrub pruning",
			"Seasonal flowerbed design & replanting",
			"Soil conditioning & mulching programs",
			"Irrigation optimisation & leak checks",
			"Organic pest & weed suppression strategies",
		],
		value: "Native / drought‑tolerant species and compost integration reduce water & chemical usage over time.",
	},
	{
		key: "pest",
		img: "/projects/firstaid-1.jpg",
		subheading: "Fumigation & Pest Control",
		heading: "Safe. Targeted. Compliant.",
		intro: "Integrated pest management (IPM) combining inspection, exclusion and low‑toxicity treatments to protect people & assets.",
		bullets: [
			"Cockroaches, ants, bedbugs & crawling insects",
			"Rodent monitoring & bait station servicing",
			"Mosquito, fly & vector reduction procedures",
			"Stored product pest mitigation",
			"Disinfection fogging for risk zones",
			"Preventive inspection & reporting schedules",
		],
		value: "Licensed technicians follow label rates & safety data; records maintained for audits & health inspections.",
	},
	{
		key: "waste",
		img: "/projects/mandera-3.jpg",
		subheading: "Garbage Collection & Waste",
		heading: "Responsible Waste Streams.",
		intro: "Structured on‑site segregation, scheduled collection and compliant transport for commercial & institutional clients.",
		bullets: [
			"Colour‑coded bin & liner programs",
			"Scheduled & on‑call pickups (daily / weekly)",
			"Licensed transport & manifest traceability",
			"Recyclables channeling (paper, plastics, metals)",
			"Bulk / green waste & debris removal",
			"Data & diversion reporting (upon request)",
		],
		value: "Improved housekeeping, lower landfill dependency and easier ESG reporting for stakeholders.",
	},
	{
		key: "sanitary",
		img: "/projects/staff-1.jpg",
		subheading: "Sanitary Disposal",
		heading: "Hygiene You Can Trust.",
		intro: "Discrete, hygienic feminine sanitary waste management solutions for offices, malls, schools & hospitality venues.",
		bullets: [
			"Supply & installation of pedal sanitary bins",
			"Scheduled discreet servicing & liner replacement",
			"Medical / clinical waste coordination (partners)",
			"Odour & pathogen control treatments",
			"Regulated disposal pathway assurance",
			"Service logs & compliance documentation",
		],
		value: "Enhances dignity, cleanliness & infection control standards across shared washrooms.",
	},
	{
		key: "specialised",
		img: "/projects/traning-1.jpg",
		subheading: "Specialised Support",
		heading: "Tailored Project Solutions.",
		intro: "Complementary services delivered by trained crews for complex or episodic facility needs.",
		bullets: [
			"Post‑event & conference turnaround",
			"Flood / water ingress clean‑out (light cases)",
			"Floor restoration & crystallisation",
			"Asset / upholstery shampooing & drying",
			"High‑traffic microbial touchpoint programs",
			"Rapid deployment response teams",
		],
		value: "Flexible resourcing means minimal downtime and accelerated readiness of your space.",
	},
];

export const ServicesList = () => {
	return (
		<section className="section-standard bg-white" id="services">{/* standardized spacing */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{/* standardized container */}
				<header className="mb-12 text-center md:text-left">
					<div className="mx-auto md:mx-0 w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]">
						<Heading level={2} variant="primary" className="mb-0 text-center md:text-left">Our Services</Heading>
					</div>
					<p className="mt-4 max-w-3xl text-lead font-lato text-[#333333] mx-auto md:mx-0">
						Integrated cleaning, waste, hygiene and outdoor solutions engineered for reliability, compliance and environmental stewardship.
					</p>
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