"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Heading from './ui/Heading'; // added
import Paragraph from './ui/Paragraph'; // added

// Fallback static members (used only if no Sanity data yet)
const FALLBACK_MEMBERS = [
	{ id: 1, name: 'John Mwangi', role: 'CEO', image: '/images/abdiaziz.jpeg' },
	{ id: 2, name: 'Sarah Wanjiku', role: 'Project Manager', image: '/images/wadud.jpeg' },
	{ id: 3, name: 'Michael Otieno', role: 'Finance', image: '/images/rose.jpeg' },
	{ id: 4, name: 'Esther Njoroge', role: 'Data Analyst', image: '/images/team2.jpg' },
	{ id: 5, name: 'David Kimani', role: 'Backend Engineer', image: '/images/team1.jpg' },
];

// Accept Sanity team array: [{ _id, name, title, image }]
const TeamProfiles = ({ team = [] }) => {
	const hasData = Array.isArray(team) && team.length > 0;
	const list = hasData ? team.map(m => ({
		id: m._id,
		name: m.name || 'Unnamed',
		role: m.title || 'Team Member',
		imageObj: m.image,
	})) : FALLBACK_MEMBERS;

	if (!hasData && FALLBACK_MEMBERS.length === 0) return null;

	return (
		<section className="section-compact relative overflow-hidden bg-white" id="team">{/* standardized spacing */}
			{/* Radial background pattern */}
			<div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(58,163,53,0.06), transparent 70%)' }} />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">{/* standardized container */}
				<div className="text-center mb-8 sm:mb-10 md:mb-12">
					<span className="inline-block text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#1E611B] bg-[#E8F6E9] px-3 py-1 rounded-full ring-1 ring-[#3AA335]/20 mb-4">Leadership & Talent</span>
					<div className="mx-auto w-fit pb-1 px-3 rounded-md border-b-4 border-[#3AA335]">
						<Heading level={2} className="mb-0" variant="primary">People Behind Our Promise</Heading>
					</div>
					<Paragraph className="text-[#333333] mt-4 max-w-[60ch] mx-auto text-sm sm:text-base md:text-lg">Meet the dedicated professionals delivering sustainable cleaning, hygiene and waste solutions across Kenya.</Paragraph>
				</div>
				<div role="list" aria-label="Team profiles" className="grid grid-flow-col auto-cols-[78%] overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 gap-4 sm:mx-0 sm:px-0 sm:gap-6 sm:overflow-visible sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-5">
					{list.map((member, i) => (
						<motion.div
							role="listitem"
							key={member.id || i}
							className="snap-start sm:snap-none relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-6 pb-6 pt-40 max-w-sm mx-auto w-full bg-black/5"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ rotate: 0.5 }}
						>
							<div className="absolute inset-0">
								{member.imageObj?.asset ? (
									<Image
										loader={({ width, quality }) => urlFor(member.imageObj).width(Math.min(width, 900)).height(Math.min(Math.round(width*1.25), 1200)).fit('crop').quality(quality ?? 60).auto('format').url()}
										src={urlFor(member.imageObj).width(900).height(1125).fit('crop').quality(70).auto('format').url()}
										alt={member.name}
										fill
										sizes="(max-width:640px) 78vw, (max-width:1024px) 50vw, 20vw"
										quality={60}
										className="object-cover"
									/>
								) : (member.image ? (
									<Image
										src={member.image}
										alt={member.name}
										fill
										sizes="(max-width:640px) 78vw, (max-width:1024px) 50vw, 20vw"
										quality={70}
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F6E9] to-[#3AA335]/40 text-[#3AA335] text-3xl font-bold">
										{member.name.charAt(0)}
									</div>
								))}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
							</div>
							<h3 className="relative z-10 mt-2 text-2xl font-bold text-white drop-shadow-sm">{member.name}</h3>
							<p className="relative z-10 text-sm font-medium text-[#E8F6E9] tracking-wide uppercase">{member.role}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamProfiles;