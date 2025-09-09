"use client";
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import Heading from './ui/Heading';

/*
  FAQAccordion (Global)
  Updated palette: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body)
*/

const DEFAULT_QUESTIONS = [
	{
		q: 'What cleaning services do you provide?',
		a: 'We deliver routine, deep, post-construction, and specialized cleaning for offices, schools, hospitals, residential estates, commercial blocks and hospitality venues using eco‑friendly products and trained personnel.',
	},
	{
		q: 'Do you supply cleaning materials & equipment?',
		a: 'Yes. We can supply a full bundle (labour + materials + equipment) or labour only. Our eco‑friendly chemicals are safe, effective and compliant with Kenyan regulations.',
	},
	{
		q: 'How quickly can a service be scheduled?',
		a: 'For standard cleaning we can usually mobilise within 24–48 hours after a site assessment and approval of quotation. Emergency callouts are supported subject to team availability.',
	},
	{
		q: 'Are your staff vetted and trained?',
		a: 'All team members undergo background checks, safety & hygiene training, and continuous skills development to maintain quality and confidentiality standards.',
	},
	{
		q: 'Do you offer sanitary disposal & waste management?',
		a: 'Yes. We install sanitary bins, manage scheduled pickups, provide licensed waste transport, segregation and environmentally responsible disposal / recycling where possible.',
	},
	{
		q: 'What areas do you cover?',
		a: 'We primarily serve Nairobi and its environs, with project‑based deployments across major Kenyan towns (e.g. Mombasa, Kisumu, Eldoret, Nakuru) upon arrangement.',
	},
	{
		q: 'How do I get a quotation?',
		a: 'Call +254 722 269 511 or email info@garbagehero.co.ke with service details. We conduct a free site survey (where needed) then send a tailored proposal.',
	},
];

export default function FAQAccordion({ questions = DEFAULT_QUESTIONS, title = 'Frequently Asked Questions' }) {
	return (
		<section
			className="relative py-16 bg-white border-t"
			style={{ borderColor: '#E8F6E9' }}
			id="faq"
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						'radial-gradient(circle at center, rgba(58,163,53,0.05), transparent 70%)',
				}}
			/>
			<div className="relative max-w-4xl mx-auto px-4 sm:px-6">
				<div className="text-center mb-10 md:text-left">
					<div
						className="mx-auto md:mx-0 w-fit pb-1 px-3 rounded-md border-b-4"
						style={{ borderColor: '#3AA335' }}
					>
						<Heading
							level={2}
							className="mb-0 text-center md:text-left"
							variant="primary"
						>
							{title}
						</Heading>
					</div>
					<p
						className="mt-4 text-sm sm:text-base max-w-2xl mx-auto md:mx-0"
						style={{ color: '#333333' }}
					>
						Answers to common questions about our sustainable cleaning, waste &
						hygiene solutions.
					</p>
				</div>
				<div
					className="rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm divide-y"
					style={{
						borderColor: '#3AA33533',
						color: '#333333',
						divideColor: '#3AA33533',
					}}
				>
					{questions.map((item, i) => (
						<FAQItem key={i} index={i} {...item} />
					))}
				</div>
			</div>
		</section>
	);
}

function FAQItem({ q, a, index }) {
	const [open, setOpen] = useState(false);
	const [ref, { height }] = useMeasure();
	return (
		<motion.div animate={open ? 'open' : 'closed'} className="group">
			<button
				onClick={() => setOpen((o) => !o)}
				className="w-full flex items-start gap-4 text-left px-5 sm:px-6 py-5 focus:outline-none"
				style={{ outlineColor: '#3AA335' }}
				aria-expanded={open}
			>
				<span className="flex-1">
					<span className="block font-semibold text-black text-base sm:text-lg">
						{q}
					</span>
				</span>
				<motion.span
					variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
					transition={{ duration: 0.25 }}
					className="mt-1 rounded-full p-2 shadow-inner"
					style={{ backgroundColor: '#E8F6E9', color: '#3AA335' }}
				>
					<FiChevronDown className="text-lg" />
				</motion.span>
			</button>
			<motion.div
				initial={false}
				animate={{ height: open ? height : 0 }}
				transition={{ duration: 0.35, ease: 'easeInOut' }}
				className="overflow-hidden"
			>
				<div
					ref={ref}
					className="px-5 sm:px-6 pb-5 text-sm leading-relaxed"
					style={{ color: '#333333' }}
				>
					{a}
				</div>
			</motion.div>
		</motion.div>
	);
}
