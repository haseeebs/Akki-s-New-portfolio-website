import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'react-feather';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    const hoverEffect = {
        scale: 1.02,
        transition: { duration: 0.2 }
    };

    return (
            <motion.div variants={itemVariants} className="flex flex-row lg:flex-col flex-shrink-0 lg:h-full justify-between w-full lg:w-1/3 bg-gradient-to-b from-gray-200 to-gray-100 p-0 lg:p-5 rounded-3xl z-10">
                {/* Header */}

                <h1 className='text-center text-2xl font-semibold tracking-tight text-gray-800  px-8 py-5 rounded-3xl bg-gray-300'>{project.name}</h1>

                {/* Body */}
                <p className="hidden lg:block text-gray-600 leading-relaxed">{project.description}</p>

                {/* Footer */}
                <div className="p-6">
                    <Link to="/" className="block">
                        <motion.div
                            whileHover={hoverEffect}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-2xl transition-colors duration-200"
                        >
                            <Home size={18} />
                            <span className="lg:inline hidden">Back to Home</span>
                            <span className="lg:hidden inline">Home</span>
                            <ChevronRight
                                size={18}
                                className="transform group-hover:translate-x-1 transition-transform duration-200"
                            />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
    );
};

export default ProjectCard;