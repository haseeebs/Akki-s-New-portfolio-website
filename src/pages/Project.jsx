import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import projectsData from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Project = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <Link to="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='relative w-full h-screen max-w-6xl mx-auto px-8 pt-20 lg:py-20 flex flex-col items-center justify-center gap-16 lg:flex-row lg:gap-0'>

        <ImageCarousel
          images={project.images.map(image => ({ src: image }))}
          projectView={true}
        />

        <ProjectCard project={project} />
      </div>
    </motion.div>
  );
};

export default Project;