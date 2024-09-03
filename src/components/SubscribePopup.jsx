import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MailLoading from './MailLoading';

const SubscribePopup = ({ onClose }) => {
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const successMessageVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const options = [
    { value: '', label: 'Select a service' },
    { value: 'Interior design', label: 'Interior design' },
    { value: 'Exterior design', label: 'Exterior design' },
    { value: '3D modeling', label: '3D modeling' },
    { value: 'Rendering', label: 'Rendering' },
    { value: 'Texturing', label: 'Texturing' },
    { value: 'Walk through', label: 'Walk through' },
  ];

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000); // Show loading for 2 seconds
  };


  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm px-2"
      onClick={onClose}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={popupVariants}
    >
      <div
        className="bg-white px-12 py-8 rounded-3xl shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-black hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={successMessageVariant}
            >
              <MailLoading />
            </motion.div>
          ) : !isSubmitted ? (
            <form onSubmit={handleSubmit}>

              {/* Name Input */}
              <label className='ml-4 block text-black mb-1 font-semibold' htmlFor='name'>What's your name?</label>
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 border-2 border-black bg-white rounded-3xl h-16 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />

              {/* Email Input */}
              <label className='ml-4 block text-black mb-1 font-semibold' htmlFor='email'>What's your email?</label>
              <input
                type="email"
                className="w-full px-4 py-2 mb-4 border-2 border-black bg-white rounded-3xl h-16 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />

              {/* Service Dropdown */}
              <label className="ml-4 block text-black mb-1 font-semibold" htmlFor="service">
                What services are you looking for?
              </label>
              <div className="relative w-full mb-12">
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-black bg-white rounded-3xl h-16 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                  required
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none h-6 w-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full left-0 absolute bottom-0">
                <button
                  type="submit"
                  className="border-2 border-black border-b-0 px-10 py-3 rounded-3xl rounded-b-none hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Send it!
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={successMessageVariant}
            >
              <h2 className="text-2xl font-bold mb-4">Great job! 🎉</h2>
              <p className="text-lg">Your form has been submitted. We'll be in touch with you soon!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SubscribePopup;
