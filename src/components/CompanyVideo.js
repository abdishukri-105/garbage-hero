"use client"
import React from 'react';
import { motion } from 'framer-motion';

const CompanyVideo = () => {
  const videoUrl = 'https://www.youtube.com/embed/W-_mShO-_yw?si=EoWQAFf7CQeP_JEi'; // Provided 3-minute video

  return (
    <section className="py-16 bg-gray-100">
      <motion.div
        className="max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden bg-gray-300 border-2 border-transparent hover:border-indigo-500/50 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative aspect-video max-h-2/3">
          <iframe
            className="w-full h-full absolute inset-0"
            src={videoUrl}
            title="Our Cinematic Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};

export default CompanyVideo;