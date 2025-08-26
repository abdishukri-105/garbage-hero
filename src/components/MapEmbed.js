"use client";
import { motion } from 'framer-motion';

const MapEmbed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-7xl mx-auto my-8 rounded-xl overflow-hidden "
    >
      <div className="absolute inset-0 bg-green-200/20 z-10" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.201992744155!2d36.796688169523094!3d-1.2894544999186306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xcbb9deddfa4c301%3A0x7f7dedb87e97b20e!2sTransnep%20Insurance%20Brokers%20Limited!5e0!3m2!1sen!2ske!4v1756228875629!5m2!1sen!2ske"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-0"
      ></iframe>
      <div className="absolute bottom-4 left-2 z-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-gray-800"
        >
          <p className="text-lg font-medium">Hurlingham, Transnep House, Lenana Road, Gate 8</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MapEmbed;