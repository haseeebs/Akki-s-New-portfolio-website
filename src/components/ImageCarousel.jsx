import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'react-feather';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageCarousel = ({
  images = [],
  projectView = false,
  initialIndex = 0,
  onNavigate,
  onSlideChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Update currentIndex when initialIndex prop changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Call onSlideChange whenever currentIndex changes
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleImageClick = (image, index) => {
    if (image.link) {
      onNavigate?.(index, image.link);
    } else {
      openModal(image.src);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  if (images.length === 0) {
    return <div className="text-center p-4">No images to display</div>;
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition duration-300"
          disabled={images.length <= 1}
        >
          <ChevronLeft size={24} />
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex transition-transform ease-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 w-full ${index === currentIndex ? 'px-[5%]' : 'px-[2.5%]'}`}
              initial={false}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.7,
                zIndex: index === currentIndex ? 10 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className={`w-full 
                  ${projectView
                    ? 'min-h-[28rem] max-h-[28rem] lg:h-full lg:max-w-md mx-auto'
                    : 'h-[25rem] lg:h-80 2xl:h-96'} 
                  object-cover rounded-3xl 
                  ${!image.link
                    ? 'cursor-zoom-in'
                    : 'cursor-pointer'
                  }`}
                onClick={() => handleImageClick(image, index)}
                loading="lazy" // Lazy loading attribute
              />
            </motion.div>
          ))}
        </motion.div>

        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition duration-300"
          disabled={images.length <= 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 modal-background"
          onClick={handleBackgroundClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-4xl p-4 flex justify-center">
            <button
              className="absolute top-6 right-6 text-2xl p-2 rounded-full bg-white z-10"
              onClick={closeModal}
            >
              <X />
            </button>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={modalImage}
                  alt="Full View"
                  className="w-full h-auto max-h-screen object-contain"
                  loading="lazy" // Lazy loading applied to modal image as well
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageCarousel;