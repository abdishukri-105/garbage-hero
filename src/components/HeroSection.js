"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import WetPaintButton from "./ui/WetPaintButton";
import hero1 from "../../public/Photos/hero1.jpg";
import cleaning4 from "../../public/projects/cleaning-4.jpg";
import training1 from "../../public/projects/traning-1.jpg";

const slides = [
	{
		src: hero1,
		title: "Integrated Facility Hygiene Excellence Across Kenya",
		description:
			"Integrated cleaning, sanitary, pest and landscape stewardship delivering healthier environments, reduced risk and visibly elevated workplace standards.",
		cta: "Request Quote",
	},
	{
		src: cleaning4,
		title: "Consistent Compliant Cleaning For High-Traffic Environments",
		description:
			"Precision routines, disinfection focus, responsive supervision and transparent performance insight keeping high‑traffic facilities consistent, compliant, calm always.",
		cta: "Request Quote",
	},
	{
		src: training1,
		title: "Trained Teams Driving Sustainable Hygiene Standards",
		description:
			"Continuous training, safety discipline and ESG‑aligned chemistry deliver resilient hygiene outcomes and stakeholder confidence nationwide with consistency.",
		cta: "Request Quote",
	},
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 20; // 20 seconds
const DRAG_BUFFER = 80; // sensitivity for swipe

const SPRING_OPTIONS = {
	type: "spring",
	mass: 3,
	stiffness: 400,
	damping: 50,
};

export default function HeroSection() {
	const shouldReduce = useReducedMotion();
	const [imgIndex, setImgIndex] = useState(0);
	const dragX = useMotionValue(0);
	const [isFirstLoaded, setIsFirstLoaded] = useState(false);
	const intervalRef = useRef(null);
	const markLoaded = useCallback(() => { if (!isFirstLoaded) setIsFirstLoaded(true); }, [isFirstLoaded]);

	const clearTimer = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	const advance = useCallback(() => {
		setImgIndex((pv) => (pv === slides.length - 1 ? 0 : pv + 1));
	}, []);

	const startTimer = useCallback(() => {
		clearTimer();
		intervalRef.current = setInterval(() => {
			if (Math.abs(dragX.get()) < 2) advance();
		}, AUTO_DELAY);
	}, [advance, dragX]);

	useEffect(() => {
		startTimer();
		return () => clearTimer();
	}, [startTimer]);

	const goTo = useCallback(
		(i) => {
			setImgIndex(i);
			dragX.set(0);
			startTimer();
		},
		[dragX, startTimer]
	);

	const onDragEnd = (info) => {
		const offset = info.offset.x;
		const velocity = info.velocity.x;
		if (offset < -DRAG_BUFFER || velocity < -500) {
			advance();
		} else if (offset > DRAG_BUFFER || velocity > 500) {
			setImgIndex((pv) => (pv === 0 ? slides.length - 1 : pv - 1));
		}
		dragX.set(0);
		startTimer();
	};

	return (
		<div className="relative overflow-hidden w-full h-[60vh] sm:h-[70vh] md:h-screen">{/* switched w-screen -> w-full to prevent horizontal overflow caused by 100vw including scrollbar */}
			{/* Images crossfade + Ken Burns stack */}
			<div className="absolute inset-0">
				{slides.map((slide, idx) => {
					const isActive = imgIndex === idx;
					return (
						<motion.div
							key={idx}
							aria-hidden={!isActive}
							className="absolute inset-0 will-change-transform"
							initial={false}
							animate={
								isActive
									? shouldReduce
										? { opacity: 1 }
										: { opacity: 1, scale: [1, 1.07] }
									: { opacity: 0, scale: 1 }
							}
							transition={
								isActive
									? {
											opacity: { duration: 0.6 },
											scale: shouldReduce
												? { duration: 0 }
												: { duration: 18, ease: "linear" },
									  }
									: { opacity: { duration: 0.4 } }
							}
						>
							<Image
								priority={idx === 0}
								src={slide.src}
								alt=""
								fill
								placeholder={idx === 0 ? "blur" : undefined}
								quality={60}
								sizes="100vw"
								className="object-cover"
								onLoad={idx === 0 ? markLoaded : undefined}
							/>
							{/* subtle gradient overlay */}
							<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-black/10" />
						</motion.div>
					);
				})}
				<Image
						src={slides[0].src}
						alt=""
						className="hidden"
						priority
						onLoad={markLoaded}
				/>
			</div>

			{/* Drag layer for swipe */}
			<motion.div
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				style={{ x: dragX }}
				onDragEnd={(_, info) => onDragEnd(info)}
				className="absolute inset-0 cursor-grab active:cursor-grabbing"
			/>

			{/* Content overlay */}
			<div
				className={`absolute inset-0 transition-opacity duration-500 ${
					isFirstLoaded ? "opacity-100" : "opacity-0"
				} bg-gradient-to-b from-black/80 via-black/30 to-black/10 md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-black/10 flex items-start md:items-center justify-start pt-28 md:pt-0`}
			>
				{/* Fallback: if image hasn't loaded after 2s, force show */}
				{!isFirstLoaded && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="hidden" onAnimationComplete={() => markLoaded()} />
				)}
				<div className="px-6 md:px-16 max-w-[80%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
					<Heading
						level={1}
						variant="white"
						key={slides[imgIndex].title}
						className="text-[clamp(2rem,6vw,3rem)] leading-[1.05] hero-heading-font"
					>
						{slides[imgIndex].title}
					</Heading>
					<Paragraph
						size="lg"
						color="white"
						key={slides[imgIndex].description}
						className="hero-body-font hero-paragraph-mobile-clamp"
					>
						{slides[imgIndex].description}
					</Paragraph>
					<WetPaintButton text={slides[imgIndex].cta || 'Request Quote'} key={slides[imgIndex].cta} href="/contact-us" size="md" />
				</div>
			</div>

			<Dots imgIndex={imgIndex} setImgIndex={goTo} />
			<GradientEdges />
		</div>
	);
}

const Dots = ({ imgIndex, setImgIndex }) => (
	<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
		{slides.map((_, idx) => (
			<button
				key={idx}
				onClick={() => setImgIndex(idx)}
				className={`h-3 w-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AA335]/70 ${
					idx === imgIndex
						? "bg-black"
						: "bg-black/50 hover:bg-black/70 hover:cursor-pointer"
				}`}
				aria-label={`Go to slide ${idx + 1}`}
				aria-current={idx === imgIndex ? "true" : "false"}
			/>
		))}
	</div>
);

const GradientEdges = () => (
	<>
		<div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-black/40 to-transparent hidden md:block" />
		<div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-black/40 to-transparent hidden md:block" />
	</>
);