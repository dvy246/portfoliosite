import React from 'react';
import { motion } from 'framer-motion';

interface ContentSkeletonProps {
  type: 'text' | 'title' | 'paragraph' | 'skill' | 'card' | 'button';
  className?: string;
  lines?: number;
  width?: 'full' | 'large' | 'medium' | 'small';
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  type,
  className = '',
  lines = 1,
  width = 'full'
}) => {
  const getWidthClass = (widthType: string) => {
    switch (widthType) {
      case 'small': return 'w-1/4';
      case 'medium': return 'w-1/2';
      case 'large': return 'w-3/4';
      default: return 'w-full';
    }
  };

  const pulseAnimation = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'title':
        return (
          <motion.div
            {...pulseAnimation}
            className={`h-8 md:h-12 bg-gradient-to-r from-navy-200 to-navy-300 rounded-lg ${getWidthClass(width)} ${className}`}
          />
        );

      case 'text':
        return (
          <motion.div
            {...pulseAnimation}
            className={`h-6 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md ${getWidthClass(width)} ${className}`}
          />
        );

      case 'paragraph':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <motion.div
                key={index}
                {...pulseAnimation}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`h-4 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md ${
                  index === lines - 1 ? getWidthClass('large') : 'w-full'
                }`}
              />
            ))}
          </div>
        );

      case 'skill':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center">
              <motion.div
                {...pulseAnimation}
                className="h-5 w-32 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md"
              />
              <motion.div
                {...pulseAnimation}
                style={{ animationDelay: '0.2s' }}
                className="h-4 w-10 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md"
              />
            </div>
            <motion.div
              {...pulseAnimation}
              style={{ animationDelay: '0.4s' }}
              className="h-2 w-full bg-navy-100 rounded-full overflow-hidden"
            >
              <motion.div
                {...pulseAnimation}
                style={{ animationDelay: '0.6s' }}
                className="h-full w-3/4 bg-gradient-to-r from-gold-300 to-gold-400 rounded-full"
              />
            </motion.div>
          </div>
        );

      case 'card':
        return (
          <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
            <div className="flex items-center mb-4">
              <motion.div
                {...pulseAnimation}
                className="w-12 h-12 bg-gradient-to-r from-gold-200 to-gold-300 rounded-xl mr-4"
              />
              <motion.div
                {...pulseAnimation}
                style={{ animationDelay: '0.2s' }}
                className="h-6 w-32 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <motion.div
                {...pulseAnimation}
                style={{ animationDelay: '0.4s' }}
                className="h-4 w-full bg-gradient-to-r from-navy-200 to-navy-300 rounded-md"
              />
              <motion.div
                {...pulseAnimation}
                style={{ animationDelay: '0.6s' }}
                className="h-4 w-3/4 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <motion.div
            {...pulseAnimation}
            className={`h-12 w-32 bg-gradient-to-r from-gold-200 to-gold-300 rounded-lg ${className}`}
          />
        );

      default:
        return (
          <motion.div
            {...pulseAnimation}
            className={`h-4 bg-gradient-to-r from-navy-200 to-navy-300 rounded-md ${getWidthClass(width)} ${className}`}
          />
        );
    }
  };

  return renderSkeleton();
};

export default ContentSkeleton;