import React from 'react';
import { motion } from 'framer-motion';

const MailLoading = () => {
  const mailVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"
        variants={mailVariants}
        initial="initial"
        animate="animate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </motion.div>
      <p className="mt-4 text-gray-700 font-semibold">Sending...</p>
    </div>
  );
};

export default MailLoading;
