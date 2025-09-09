"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Heading from './ui/Heading'; // added

// Fallback static members (used only if no Sanity data yet)
const FALLBACK_MEMBERS = [
	{ id: 1, name: 'John Mwangi', role: 'CEO', image: '/images/team1.jpg' },
	{ id: 2, name: 'Sarah Wanjiku', role: 'Project Manager', image: '/images/team2.jpg' },
	{ id: 3, name: 'Michael Otieno', role: 'Finance', image: '/images/team1.jpg' },
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
		<section className="section-standard" id="team">{/* standardized spacing */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{/* standardized container */}
				<div className="text-center md:text-center mb-8">{/* increased bottom margin to align with other sections */}
					<div className="mx-auto md:mx-0 w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
						<Heading level={2} className="mb-0 text-center md:text-center" variant="primary">Our Team</Heading>
					</div>
				</div>
				<p className="text-lead text-[#333333] mb-12 max-w-2xl font-lato mx-auto md:mx-0">Meet the talented individuals behind our sustainable cleaning & waste management solutions.</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
					{list.map((member, i) => (
						<motion.div
							key={member.id || i}
							className="relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-6 pb-6 pt-40 max-w-sm mx-auto w-full bg-black/5"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ rotate: 0.5 }}
						>
							<div className="absolute inset-0">
								{member.imageObj?.asset ? (
									<Image
										src={urlFor(member.imageObj).width(800).height(1000).fit('crop').url()}
										alt={member.name}
										fill
										sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 20vw"
										className="object-cover"
									/>
								) : (member.image ? (
									<Image
										src={member.image}
										alt={member.name}
										fill
										sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 20vw"
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F6E9] to-[#3AA335]/40 text-[#3AA335] text-3xl font-bold">
										{member.name.charAt(0)}
									</div>
								))}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
							</div>
							<h3 className="relative z-10 mt-2 text-2xl font-bold text-white drop-shadow-sm font-montserrat">{member.name}</h3>
							<p className="relative z-10 text-sm font-medium text-[#E8F6E9] tracking-wide uppercase font-lato">{member.role}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamProfiles;