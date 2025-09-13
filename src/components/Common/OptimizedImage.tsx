import React, { useState, useEffect } from 'react';
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
  fallbackSrc = 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800',
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    if (src && src !== imageSrc) {
      setIsLoaded(false);
      setHasError(false);
      setImageSrc(src);
    }
  }, [src, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  const defaultPlaceholder = (
    <div className={`bg-gradient-to-br from-navy-200 to-navy-300 animate-pulse flex items-center justify-center ${className}`}>
      <div className="w-16 h-16 bg-navy-400 rounded-full opacity-50" />
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
        src={imageSrc}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default OptimizedImage;