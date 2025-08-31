"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const services = [
	{
		title: "Cleaning & Janitorial",
		description: "Spotless cleaning for homes and offices across Kenya.",
		imgSrc: "/images/slide3.jpg",
		href: "/services#cleaning",
	},
	{
		title: "Gardening & Landscaping",
		description: "Eco-friendly designs to transform your outdoor spaces.",
		imgSrc: "/images/slide2.jpg",
		href: "/services#gardening",
	},
	{
		title: "Fumigation & Pest Control",
		description: "Safe, effective solutions to keep pests at bay.",
		imgSrc: "/images/slide3.jpg",
		href: "/services#pest-control",
	},
	{
		title: "Garbage Collection",
		description: "Sustainable waste management for a cleaner Kenya.",
		imgSrc: "/images/slide4.jpg",
		href: "/services#garbage-collection",
	},
	{
		title: "Sanitary Disposal",
		description: "Hygienic disposal for healthier environments.",
		imgSrc: "/images/slide5.jpg",
		href: "/services#sanitary-disposal",
	},
];

const ServicesPreview = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-50px 0px" });

	return (
		<motion.section
			ref={ref}
			className="px-4 sm:px-6 md:px-8 border rounded-tr-[2rem] rounded-br-[2rem] lg:px-10 py-8 md:py-12  z-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: isInView ? 1 : 0 }}
			transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
		>
			<div className="text-center mb-8 sm:mb-10 md:mb-12">
				<h1 className="font-playfair font-bold text-[#000000] text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
					Our Services
				</h1>
			
			</div>
			<div className="w-full max-w-[90%] sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
					{services.slice(0, 2).map((service, index) => (
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
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
					{services.slice(2).map((service, index) => (
						<Card
							key={index + 2}
							heading={service.title}
							description={service.description}
							imgSrc={service.imgSrc}
							href={service.href}
							index={index + 2}
							isInView={isInView}
						/>
					))}
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
				className="w-full h-[220px] sm:h-[250px] md:h-[320px] lg:h-[400px] overflow-hidden cursor-pointer group relative rounded-2xl shadow-md bg-white border border-[#E5F3E8]"
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
						<FiArrowRight className="text-3xl text-[#3aa335] group-hover:-rotate-45 transition-transform duration-500" />
					</div>
					<div className="bg-[#E5F3E8] bg-opacity-80 backdrop-blur-lg p-4 rounded-xl mt-auto">
						<h4 className="font-playfair font-bold text-[#000000] text-lg sm:text-xl md:text-2xl mb-2">
							{heading.split("").map((l, i) => (
								<ShiftLetter letter={l} key={i} />
							))}
						</h4>
						<p className="font-open-sans text-[#333333] text-xs sm:text-sm md:text-base">
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