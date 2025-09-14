import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';
import EditableImage from '../Admin/EditableImage';

const HERO_CONTENT_NAMES = [
  'hero_title',
  'hero_subtitle', 
  'hero_badge',
  'hero_cta_text',
  'hero_floating_badge',
  'hero_scroll_text',
  'profile_photo'
];

const Hero: React.FC = () => {
  const { content } = useStableContent(HERO_CONTENT_NAMES);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-primary-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-500/30 shadow-lg"
            >
              <EditableContent
                name="hero_badge"
                defaultContent="Finance + AI Professional"
                className="text-sm font-medium text-primary-300"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              <EditableContent
                name="hero_title"
                defaultContent="Hey, Divy here! 👋 Finance Meets Tech"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-light-100 to-primary-300"
              />
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-light-300 leading-relaxed"
            >
              <EditableContent
                name="hero_subtitle"
                defaultContent="BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems."
                className="text-xl md:text-2xl text-light-300 leading-relaxed"
                multiline
              />
            </motion.p>

            {/* CTA Button */}
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
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <EditableContent
                  name="hero_cta_text"
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

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Photo Circle */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary-500/30 backdrop-blur-sm">
                <EditableImage
                  src={content.profile_photo}
                  alt="Profile Photo"
                  onSave={(imageUrl) => {
                    // This will be handled by the EditableImage component
                    console.log('Profile photo updated:', imageUrl);
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-primary-600 text-white p-3 rounded-full shadow-lg"
              >
                <EditableContent
                  name="hero_floating_badge"
                  defaultContent="AI"
                  className="text-sm font-bold text-white"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-light-400 hover:text-primary-400 transition-colors group"
          >
            <EditableContent
              name="hero_scroll_text"
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
  );
};

export default Hero;