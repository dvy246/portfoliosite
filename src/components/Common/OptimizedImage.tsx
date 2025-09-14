import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const preloadRef = useRef<HTMLImageElement | null>(null);

  // Memoized handlers to prevent unnecessary re-renders
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    if (!hasError && fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
      setIsLoaded(false);
    }
  }, [hasError, fallbackSrc, imageSrc]);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    setImageSrc(src);

    // Preload the image to prevent flickering
    if (preloadRef.current) {
      preloadRef.current.onload = null;
      preloadRef.current.onerror = null;
    }

    preloadRef.current = new Image();
    preloadRef.current.src = src;
    
    preloadRef.current.onload = () => {
      // Only update if the component is still mounted and src hasn't changed
      if (preloadRef.current?.src === src) {
        setImageSrc(src);
        // If the actual img element is already loaded, mark as loaded
        if (imageRef.current?.complete && imageRef.current?.naturalHeight !== 0) {
          setIsLoaded(true);
        }
      }
    };

    preloadRef.current.onerror = () => {
      if (preloadRef.current?.src === src && !hasError && fallbackSrc) {
        setImageSrc(fallbackSrc);
        setHasError(true);
      }
    };

    // Clean up
    return () => {
      if (preloadRef.current) {
        preloadRef.current.onload = null;
        preloadRef.current.onerror = null;
      }
    };
  }, [src, fallbackSrc, hasError]);

  const defaultPlaceholder = (
    <div className={`bg-gradient-to-br from-dark-800 to-dark-900 animate-pulse flex items-center justify-center ${className}`}>
      <div className="w-16 h-16 bg-primary-500 rounded-full opacity-30" />
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder/Loading State - only show if not loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          {placeholder || defaultPlaceholder}
        </div>
      )}
      
      {/* Actual Image - always rendered to prevent layout shift */}
      <motion.img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={`${className} will-change-transform`}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        loading="eager"
        draggable={false}
        style={{ 
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          // Prevent layout shift
          minHeight: '100%',
          minWidth: '100%'
        }}
      />
    </div>
  );
};

export default OptimizedImage;