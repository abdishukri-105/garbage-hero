"use client";
import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

// Brand constants
const BRAND_GREEN = "#3aa335";
const LIGHT_BG = "#E5F3E8";

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
		<section className="w-full mx-auto py-14 bg-white" id="services">
			<div className="max-w-7xl mx-auto px-4">
				<header className="mb-12">
					<div className="w-fit pb-1 px-3 rounded-md text-2xl font-playfair font-bold border-b-4 border-[#50AB62] text-[#0F2012]">
						Our Services
					</div>
					<p className="mt-4 max-w-3xl text-sm md:text-base text-[#36513B]">
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
			<div className="md:w-1/2 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-[#50AB62]/15 bg-[#0F2012] relative aspect-[4/3]">
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
				<div className="absolute inset-0 bg-[linear-gradient(rgba(15,32,18,0.25),rgba(15,32,18,0.45))]" />
			</div>
			<div className="md:w-1/2 w-full bg-[#F6FBF7] rounded-xl md:rounded-md p-6 md:p-8 border border-[#50AB62]/20 flex flex-col">
				<h2 className="text-2xl md:text-3xl font-bold font-playfair text-[#0F2012] leading-tight">
					{service.heading}
				</h2>
				<p className="mt-2 text-sm uppercase tracking-wide font-semibold text-[#3aa335]">
					{service.subheading}
				</p>
				<p className="mt-4 text-[#36513B] text-sm md:text-base leading-relaxed">
					{service.intro}
				</p>
				<ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
					{service.bullets.map((b, i) => (
						<li
							key={i}
							className="flex items-start gap-2 text-[#12331B] text-xs md:text-sm bg-white/70 backdrop-blur rounded-md px-3 py-2 border border-[#50AB62]/10"
						>
							<span className="mt-0.5 h-2 w-2 rounded-full bg-[#50AB62] flex-shrink-0" />
							<span>{b}</span>
						</li>
					))}
				</ul>
				<div className="mt-5 text-xs md:text-sm italic text-[#12331B] bg-[#E5F3E8]/70 border border-[#50AB62]/10 rounded-md p-3">
					{service.value}
				</div>
				<div className="mt-6">
					<a
						href="/contact-us"
						className="inline-flex items-center gap-2 rounded-md bg-[#3aa335] hover:bg-[#228B22] text-white font-medium px-5 py-3 text-sm shadow transition-colors"
					>
						Request Quote <FiArrowUpRight className="text-base" />
					</a>
				</div>
			</div>
		</div>
	);
};