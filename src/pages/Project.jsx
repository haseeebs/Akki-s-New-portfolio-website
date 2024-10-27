import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import projectsData from '../data/projectsData';

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

const Project = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) return <h1>Project not found</h1>

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

        <motion.div variants={itemVariants} className="flex flex-row lg:flex-col flex-shrink-0 lg:h-full justify-between w-full lg:w-1/3 bg-gradient-to-b from-gray-200 to-gray-100 p-0 lg:p-5 rounded-3xl z-10">
          <h1 className='flex-shrink-0 text-center text-xl px-8 py-5 font-medium rounded-3xl bg-gray-300 text-black'>{project.name}</h1>
          <p className="hidden lg:block">{project.description}</p>
          <Link to={'/'}>
            <motion.div className="flex-shrink-0 text-center p-5 rounded-3xl bg-black text-white w-fit lg:w-full cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}>
              Home
            </motion.div></Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Project