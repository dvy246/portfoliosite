import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useContent } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import EditableImage from '../Admin/EditableImage';
import { usePageContent, useSectionLoader } from '../../contexts/PageContentContext';

const Hero = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { isPageLoading } = usePageContent();
  const { content: profilePhoto, saveContent: saveProfilePhoto, isLoading: profileLoading } = useContent('profile_photo', { preload: true });
  
  const contentNames = [
    'hero_title',
    'hero_subtitle',
    'hero_badge',
    'hero_cta_text',
    'hero_floating_badge',
    'hero_scroll_text',
    'profile_photo'
  ];
  
  const { isSectionLoading } = useSectionLoader('hero', contentNames);

  // Smooth transition for content visibility
  useEffect(() => {
    if (!isPageLoading && !isSectionLoading && !profileLoading) {
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
    }
  }, [isPageLoading, isSectionLoading, profileLoading]);

  const {
    content: heroTitle,
    saveContent: saveHeroTitle
  } = useContent('hero_title');

  const {
    content: heroSubtitle,
    saveContent: saveHeroSubtitle
  } = useContent('hero_subtitle');

  const {
    content: heroBadge,
    saveContent: saveHeroBadge
  } = useContent('hero_badge');

  const {
    content: heroCta,
    saveContent: saveHeroCta
  } = useContent('hero_cta_text');

  const {
    content: heroFloatingBadge,
    saveContent: saveHeroFloatingBadge
  } = useContent('hero_floating_badge');

  const {
    content: heroScrollText,
    saveContent: saveHeroScrollText
  } = useContent('hero_scroll_text');

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {(isPageLoading || isSectionLoading || profileLoading) ? (
        <motion.section
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50"
        >
          <div className="text-center text-gray-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full mb-4 mx-auto"
            />
            <p className="text-lg font-medium">Loading content...</p>
            {profileLoading && 
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-blue-400 mt-2"
              >
                Loading profile information...
              </motion.p>
            }
          </div>
        </motion.section>
      ) : (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20 shadow-lg"
            >
              <EditableContent
                name="hero_badge"
                content={heroBadge}
                onSave={saveHeroBadge}
                defaultContent="Finance + AI Professional"
                className="text-sm font-medium text-blue-200"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              <EditableContent
                name="hero_title"
                content={heroTitle}
                onSave={saveHeroTitle}
                defaultContent="Hey, Divy here! 👋 Finance Meets Tech"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                multiline
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              <EditableContent
                name="hero_subtitle"
                content={heroSubtitle}
                onSave={saveHeroSubtitle}
                defaultContent="BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems."
                multiline
              />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8"
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <EditableContent
                  name="hero_cta_text"
                  content={heroCta}
                  onSave={saveHeroCta}
                  defaultContent="Let's Solve Problems Together"
                  className="text-white"
                />
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-blue-500/10 backdrop-blur-sm">
                <EditableImage
                  src={profilePhoto || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Profile Photo"
                  onSave={saveProfilePhoto}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
              >
                <EditableContent
                  name="hero_floating_badge"
                  content={heroFloatingBadge}
                  onSave={saveHeroFloatingBadge}
                  defaultContent="AI"
                  className="text-sm font-bold text-white"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-400 transition-colors group"
          >
            <EditableContent
              name="hero_scroll_text"
              content={heroScrollText}
              onSave={saveHeroScrollText}
              defaultContent="Discover More"
              className="text-sm font-medium"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
      )}
    </AnimatePresence>
  );
};

export default Hero;