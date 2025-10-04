"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph"; // added

// Palette hex: #3AA335 (brand), #1E611B (dark), #E8F6E9 (light), #333333 (body)

const services = [
	{
		title: "Cleaning Services",
		description: "Comprehensive routine and deep cleaning keeping spaces spotless welcoming and consistently healthy.",
		imgSrc: "/projects/cleaning-3.jpg",
		href: "/services#cleaning",
	},
	{
		title: "Sanitary Services",
		description: "Waste management disinfection and high touch surface hygiene for a healthier safer environment.",
		imgSrc: "/images/slide5.jpg",
		href: "/services#sanitary",
	},
	{
		title: "Gardening & Landscaping",
		description: "Garden care design and seasonal maintenance delivering attractive resilient outdoor environments.",
		imgSrc: "/projects/cleaning-4.jpg",
		href: "/services#gardening",
	},
	{
		title: "Fumigation & Pest Control",
		description: "Safe targeted treatments eliminate pests and block recurrence keeping environments hygienic.",
		imgSrc: "/RBA/fumi.jpg",
		href: "/services#pest-control",
	},
	{
		title: "Garbage Collection",
		description: "Scheduled on‑site waste collection, segregation support and compliant transfer ensuring cleaner safer facilities.",
		imgSrc: "/Photos/_MG_7719.jpg",
		href: "/services#garbage",
	},
];

const ServicesPreview = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-50px 0px" });

	return (
		<motion.section
			ref={ref}
			className="section-compact z-0 relative overflow-hidden  bg-white"
			style={{ borderColor: '#E8F6E9' }}
			initial={{ opacity: 0 }}
			animate={{ opacity: isInView ? 1 : 0 }}
			transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
		>
			{/* Background pattern */}
			<div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
				<div className="text-center mb-8 sm:mb-10 md:mb-12">
					<span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-4">Service Snapshot</span>
					<div
						className="mx-auto  w-fit pb-1 px-3 rounded-md border-b-4"
						style={{ borderColor: "#3AA335" }}
					>
						<Heading
							level={2}
							className="mb-4  text-center"
							variant="primary"
						>
							Our Services
						</Heading>
					</div>
					<Paragraph className="text-lead mt-4 text-[#333333] max-w-[60ch] mx-auto">
						Comprehensive cleaning, facility care, and environmental management solutions delivered with reliability, safety, and sustainability.
					</Paragraph>
				</div>
				<div className="w-full mx-auto">
					{/* First row (3 cards) */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
						{services.slice(0, 3).map((service, index) => (
							<Card
								key={index}
								heading={service.title}
								description={service.description}
								imgSrc={service.imgSrc}
								href={service.href}
								index={index}
								isInView={isInView}
							/>
						))}
					</div>
					{/* Second row (remaining 2 cards) */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
						{services.slice(3, 5).map((service, index) => (
							<Card
								key={index + 3}
								heading={service.title}
								description={service.description}
								imgSrc={service.imgSrc}
								href={service.href}
								index={index + 3}
								isInView={isInView}
							/>
						))}
					</div>
				</div>
			</div>
		</motion.section>
	);
};

const Card = ({ heading, description, imgSrc, href, index, isInView }) => {
	return (
		<Link href={href} className="block">
			<motion.div
				whileHover="hover"
				className="w-full h-[220px] sm:h-[250px] md:h-[320px] lg:h-[400px] overflow-hidden cursor-pointer group relative rounded-2xl shadow-md bg-white border border-[#E8F6E9]"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
				transition={{
					delay: 0.2 + index * 0.1,
					duration: 0.6,
					ease: [0.4, 0, 0.6, 1],
				}}
			>
				<div className="absolute inset-0 saturate-100 group-hover:saturate-0 group-hover:scale-110 transition-all duration-500 z-0">
					<Image
						src={imgSrc}
						alt={heading}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
						style={{ objectFit: "cover" }}
						className="rounded-2xl"
						priority={index === 0}
					/>
				</div>
				<div className="p-4 relative z-10 h-full flex flex-col justify-between">
					<div className="flex items-center justify-end">
						<FiArrowRight className="text-3xl text-[#3AA335] group-hover:-rotate-45 transition-transform duration-500" />
					</div>
					<div className="bg-[#E8F6E9] bg-opacity-80 backdrop-blur-lg p-4 rounded-xl mt-auto">
						<h4 className="font-playfair font-bold text-black text-lg sm:text-xl md:text-2xl mb-2">
							{heading.split("").map((l, i) => (
								<ShiftLetter letter={l} key={i} />
							))}
						</h4>
						<p className="font-lato text-[#333333] text-xs sm:text-sm md:text-base">
							{description}
						</p>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

const ShiftLetter = ({ letter }) => {
	return (
		<div className="inline-block overflow-hidden h-[28px] sm:h-[36px] font-semibold text-lg sm:text-2xl font-playfair">
			<motion.span
				className="flex flex-col min-w-[4px]"
				style={{ y: "0%" }}
				variants={{
					hover: {
						y: "-50%",
					},
				}}
				transition={{
					duration: 0.5,
				}}
			>
				<span>{letter}</span>
				<span>{letter}</span>
			</motion.span>
		</div>
	);
};

export default ServicesPreview;