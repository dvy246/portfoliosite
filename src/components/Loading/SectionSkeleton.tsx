import React from 'react';
import { motion } from 'framer-motion';
import ContentSkeleton from './ContentSkeleton';

interface SectionSkeletonProps {
  type: 'about' | 'skills' | 'hero' | 'projects' | 'contact';
  className?: string;
}

const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ type, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderAboutSkeleton = () => (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <ContentSkeleton type="title" width="large" className="mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentSkeleton type="text" width="medium" className="mx-auto" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Section Skeleton */}
          <motion.div variants={itemVariants} className="space-y-6">
            <ContentSkeleton type="title" width="medium" />
            <ContentSkeleton type="paragraph" lines={4} />
          </motion.div>

          {/* Highlights Grid Skeleton */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ContentSkeleton type="card" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderSkillsSkeleton = () => (
    <section className={`py-20 bg-gradient-to-br from-navy-50 to-platinum-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <ContentSkeleton type="title" width="large" className="mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentSkeleton type="text" width="medium" className="mx-auto" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-navy-200 to-navy-300 mr-4" />
                <ContentSkeleton type="text" width="medium" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    style={{ animationDelay: `${skillIndex * 0.1}s` }}
                  >
                    <ContentSkeleton type="skill" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators Skeleton */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <ContentSkeleton type="title" width="medium" className="mx-auto mb-4" />
            <ContentSkeleton type="text" width="large" className="mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 mx-auto mb-3 bg-white/20 rounded" />
                <ContentSkeleton type="text" width="medium" className="mx-auto mb-2" />
                <ContentSkeleton type="paragraph" lines={2} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderHeroSkeleton = () => (
    <section className={`min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <ContentSkeleton type="title" width="large" className="mx-auto h-16" />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <ContentSkeleton type="paragraph" lines={3} className="max-w-3xl mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-center space-x-4">
            <ContentSkeleton type="button" />
            <ContentSkeleton type="button" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

  const renderProjectsSkeleton = () => (
    <section className={`py-20 bg-navy-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <ContentSkeleton type="title" width="large" className="mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentSkeleton type="text" width="medium" className="mx-auto" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-navy-200 to-navy-300" />
              <div className="p-6">
                <ContentSkeleton type="text" width="large" className="mb-4" />
                <ContentSkeleton type="paragraph" lines={3} className="mb-4" />
                <div className="flex space-x-2">
                  <ContentSkeleton type="button" className="h-8 w-16" />
                  <ContentSkeleton type="button" className="h-8 w-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContactSkeleton = () => (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <ContentSkeleton type="title" width="large" className="mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentSkeleton type="text" width="medium" className="mx-auto" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-navy-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ContentSkeleton type="text" width="medium" />
              <ContentSkeleton type="paragraph" lines={4} />
            </div>
            <div className="space-y-4">
              <ContentSkeleton type="text" width="small" />
              <div className="h-12 bg-gradient-to-r from-navy-200 to-navy-300 rounded-lg" />
              <ContentSkeleton type="text" width="small" />
              <div className="h-12 bg-gradient-to-r from-navy-200 to-navy-300 rounded-lg" />
              <ContentSkeleton type="text" width="small" />
              <div className="h-32 bg-gradient-to-r from-navy-200 to-navy-300 rounded-lg" />
              <ContentSkeleton type="button" className="w-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  switch (type) {
    case 'about':
      return renderAboutSkeleton();
    case 'skills':
      return renderSkillsSkeleton();
    case 'hero':
      return renderHeroSkeleton();
    case 'projects':
      return renderProjectsSkeleton();
    case 'contact':
      return renderContactSkeleton();
    default:
      return renderAboutSkeleton();
  }
};

export default SectionSkeleton;