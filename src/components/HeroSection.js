"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion, animate, useTransform } from "framer-motion";
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
const DRAG_BUFFER = 60; // sensitivity for swipe (lower = easier)
const VELOCITY_THRESHOLD = 300; // px/s velocity to trigger swipe

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
	const intervalRef = useRef(null);

	// Slight parallax for the active image: clamp to ~±8–10px
	const imageX = useTransform(dragX, (v) => {
		if (shouldReduce) return 0;
		const mapped = v * 0.06; // 6% of drag distance
		return Math.max(-10, Math.min(10, mapped));
	});

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

		// Decide intent first
		const next = offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD;
		const prev = offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD;

		if (next) {
			advance();
		} else if (prev) {
			setImgIndex((pv) => (pv === 0 ? slides.length - 1 : pv - 1));
		}

		// Always animate back to origin for a smoother, natural feel
		animate(dragX, 0, SPRING_OPTIONS);
		startTimer();
	};

	const onDragStart = () => {
		// Pause autoplay while interacting
		clearTimer();
	};

	return (
		<div className="relative overflow-hidden w-full min-h-[100svh]">{/* w-full prevents horizontal overflow; min-h for true fullscreen on mobile */}
			{/* Images crossfade + Ken Burns stack */}
			<div className="absolute inset-0">
				{slides.map((slide, idx) => {
					const isActive = imgIndex === idx;
					return (
						<motion.div
							key={idx}
							aria-hidden={!isActive}
							className="absolute inset-0 will-change-transform"
							style={{ x: isActive ? imageX : 0 }}
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
							/>
							{/* Desktop-only subtle scrim on the image to aid readability; hidden on mobile to avoid double overlay during drag */}
							<div
								className="absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-black/10"
								aria-hidden
							/>
						</motion.div>
					);
				})}
			</div>

			{/* Content overlay always visible (also acts as swipe surface) */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/10 md:bg-none flex items-center md:items-center justify-center md:justify-start pt-0 md:pt-0 pb-24 md:pb-0 z-10 cursor-grab active:cursor-grabbing select-none"
				drag="x"
				dragElastic={0.18}
				dragTransition={{ bounceStiffness: 350, bounceDamping: 45 }}
				dragConstraints={{ left: 0, right: 0 }}
				style={{ x: dragX }}
				onDragStart={onDragStart}
				onDragEnd={(_, info) => onDragEnd(info)}
			>
				<div className="px-6 md:px-16 max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6 text-center md:text-left mx-auto md:mx-0">
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
			</motion.div>

			<Dots imgIndex={imgIndex} setImgIndex={goTo} />
			<GradientEdges />
		</div>
	);
}

const Dots = ({ imgIndex, setImgIndex }) => (
	<div className="absolute z-20 bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 mb-[env(safe-area-inset-bottom)]">
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