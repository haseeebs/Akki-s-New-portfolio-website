import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from "../components/ImageCarousel";
import projectsData from "../data/projectsData";

const Landing = () => {
    const navigate = useNavigate();
    
    // Get the saved carousel index from localStorage, or default to 0
    const savedIndex = parseInt(localStorage.getItem('carouselIndex')) || 0;

    // Clean up localStorage when component unmounts
    useEffect(() => {
        return () => {
            // Optionally clear the index when leaving the landing page completely
            // localStorage.removeItem('carouselIndex');
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    // Handler for carousel navigation
    const handleCarouselNavigation = (index, link) => {
        // Save the current index in localStorage before navigating
        localStorage.setItem('carouselIndex', index.toString());
        navigate(link);
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col justify-between py-20 lg:py-14 px-8 md:px-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className="text-center mb-12"
                variants={itemVariants}
            >
                <motion.h1 
                    className="text-5xl md:text-6xl font-bold mb-4 text-gray-800"
                    variants={itemVariants}
                >
                    We Turn Your Dreams into Reality
                </motion.h1>
                <motion.h3 
                    className="text-xl md:text-2xl text-gray-600"
                    variants={itemVariants}
                >
                    Visualize Your Project with us
                </motion.h3>
            </motion.div>

            <motion.div 
                className="relative w-full max-w-5xl mx-auto"
                variants={itemVariants}
            >
                <ImageCarousel 
                    images={projectsData.map(project => ({ 
                        src: project.thumbnail, 
                        link: `project/${project.id}` 
                    }))}
                    initialIndex={savedIndex}
                    onNavigate={handleCarouselNavigation}
                    onSlideChange={(index) => {
                        localStorage.setItem('carouselIndex', index.toString());
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Landing;