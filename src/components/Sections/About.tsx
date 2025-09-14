import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Target, Award } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';

const ABOUT_CONTENT_NAMES = [
  'about_title',
  'about_subtitle',
  'about_content',
  'about_journey_title'
];

const About: React.FC = () => {
  const { content } = useStableContent(ABOUT_CONTENT_NAMES);

  const highlights = [
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'BCom (Hons) foundation providing deep understanding of market dynamics and financial reasoning'
    },
    {
      icon: Brain,
      title: 'AI Expertise',
      description: 'Advanced machine learning and deep learning capabilities with real-world application focus'
    },
    {
      icon: Target,
      title: 'Strategic Thinking',
      description: 'Unique ability to align AI solutions with business objectives and measurable outcomes'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of delivering AI projects that drive tangible business value and growth'
    }
  ];

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <EditableContent
              name="about_title"
              defaultContent="Where Business Meets Innovation"
              className="text-4xl md:text-5xl font-bold text-white"
            />
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            <EditableContent
              name="about_subtitle"
              defaultContent="The intersection of business intelligence and machine learning is where I thrive."
              className="text-xl text-light-300"
              multiline
            />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              <EditableContent
                name="about_journey_title"
                defaultContent="My Journey"
                className="text-3xl font-bold text-white"
              />
            </h3>
            
            <div className="prose prose-lg text-light-200 space-y-4">
              <p className="leading-relaxed text-light-200">
                <EditableContent
                  name="about_content"
                  defaultContent="My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions."
                  className="leading-relaxed text-light-200"
                  multiline
                />
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-dark-800 to-dark-700 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 border border-dark-600 hover:border-primary-500/30"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-light-300 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;