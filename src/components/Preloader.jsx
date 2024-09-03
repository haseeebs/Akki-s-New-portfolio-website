import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoSVG = () => (
  <motion.svg 
    width="120" 
    height="120" 
    viewBox="0 0 61 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <rect width="60" height="60" transform="translate(0.96582)" fill="white"/>
    <motion.path
      d="M10.9658 20.2369L31.2411 0L50.9357 19.6567"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0 }}
    />
    <motion.path
      d="M20.2373 15.3201L31.2411 4.3371L42.2449 15.3201"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.path
      d="M13.7979 19.6567C22.1595 19.6567 28.9382 26.4225 28.9382 34.769C28.9382 43.1154 22.1595 49.8818 13.7979 49.8818"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    />
    <motion.path
      d="M48.6839 19.6567C40.3217 19.6567 33.543 26.4225 33.543 34.769C33.543 43.1154 40.3217 49.8818 48.6839 49.8818"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    />
  </motion.svg>
);

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setExit(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 ,transition: { duration: 0.5 } }}
          className="fixed inset-0 bg-white z-50 flex justify-center items-center"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              className="flex flex-col items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LogoSVG />
              <motion.h1 
                className="font-Libre_Baskerville text-6xl text-black"
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "normal", opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                Sukoon
              </motion.h1>
            </motion.div>

            {/* Full width line at bottom */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage display in the bottom-right */}
            <motion.div
              className="fixed bottom-4 right-4 text-2xl font-medium text-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
