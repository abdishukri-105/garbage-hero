"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'John Mwangi',
    role: 'CEO',
    image: '/images/team1.jpg',
  },
  {
    id: 2,
    name: 'Sarah Wanjiku',
    role: 'Project Manager',
    image: '/images/team2.jpg',
  },
  {
    id: 3,
    name: 'Michael Otieno',
    role: 'finance',
    image: '/images/team1.jpg',
  },
  {
    id: 4,
    name: 'Esther Njoroge',
    role: 'Data Analyst',
    image: '/images/team2.jpg',
  },
  {
    id: 5,
    name: 'David Kimani',
    role: 'Backend Engineer',
    image: '/images/team1.jpg',
  },
];

const TeamProfiles = () => {
  return (
    <section className="bg-gren-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-amer-500">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h1>
        <p className="text-lg text-gray-600 mb-8">
          Meet the talented individuals behind our innovative projects, bringing expertise and passion to every solution we deliver.
        </p>
        <div className="grid grid-cols-1 bg-bue-400 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <motion.p
              key={member.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-8 pb-8 pt-40 max-w-sm mx-auto"
              whileHover={{ rotate: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="absolute inset-0 h-full w-full object-cover"
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="z-10 mt-3 text-3xl font-bold text-white">{member.name}</h3>
              <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {member.role}
              </div>
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;