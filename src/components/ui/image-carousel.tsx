"use client";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-60 w-full overflow-hidden rounded-lg">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image.src}
          alt={image.alt}
          className="absolute h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};