import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://placehold.co/200x200?text=Image+Error',
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      if (imageRef.current?.complete) {
        setIsLoaded(true);
      }
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
    };

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const defaultPlaceholder = (
    <div className={`bg-gradient-to-br from-gray-800 to-black animate-pulse flex items-center justify-center ${className}`}>
      <div className="w-16 h-16 bg-blue-500 rounded-full opacity-50" />
    </div>
  );

  return (
    <div className="relative">
      {/* Placeholder/Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          {placeholder || defaultPlaceholder}
        </div>
      )}
      
      {/* Actual Image */}
      <motion.img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={`${className} will-change-transform`}
        onLoad={handleLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading="eager"
        draggable={false}
        style={{ 
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};

export default OptimizedImage;