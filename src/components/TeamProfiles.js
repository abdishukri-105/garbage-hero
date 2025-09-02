"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

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
    <section className="py-16 bg-gray-50" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">Meet the talented individuals behind our sustainable cleaning & waste management solutions.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {list.map((member, i) => (
            <motion.div
              key={member.id || i}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-6 pb-6 pt-40 max-w-sm mx-auto w-full bg-gray-900/5"
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
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 text-green-700 text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
              </div>
              <h3 className="relative z-10 mt-2 text-2xl font-bold text-white drop-shadow-sm">{member.name}</h3>
              <p className="relative z-10 text-sm font-medium text-green-200 tracking-wide uppercase">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;