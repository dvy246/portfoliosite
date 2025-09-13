import React from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
  progress?: number;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, progress = 0 }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-gold-600 to-gold-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h2 className="text-2xl font-bold text-navy-900">Loading Portfolio</h2>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="w-full bg-navy-100 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-500"
            />
          </div>
          <p className="text-navy-600 text-sm mt-2">{Math.round(progress)}% loaded</p>
        </div>

        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 mx-auto border-2 border-gold-200 border-t-gold-600 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default PageLoader;