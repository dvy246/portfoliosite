import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, TrendingUp, Database, Zap } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';

const SKILLS_CONTENT_NAMES = [
  'skills_title',
  'skills_subtitle',
  'skills_differentiator_title',
  'skills_differentiator_subtitle'
];

const Skills: React.FC = () => {
  const { content } = useStableContent(SKILLS_CONTENT_NAMES);

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'Machine Learning', level: 95 },
        { name: 'Deep Learning', level: 93 },
        { name: 'Natural Language Processing', level: 91 },
        { name: 'Computer Vision', level: 89 },
        { name: 'MLOps', level: 87 }
      ]
    },
    {
      title: 'Business Analytics',
      icon: BarChart3,
      color: 'from-blue-400 to-blue-500',
      skills: [
        { name: 'Financial Modeling', level: 92 },
        { name: 'Business Intelligence', level: 91 },
        { name: 'Decision Optimization', level: 90 },
        { name: 'Market Analysis', level: 89 },
        { name: 'Strategic Planning', level: 88 }
      ]
    },
    {
      title: 'Technical Stack',
      icon: Code,
      color: 'from-blue-600 to-blue-700',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'TensorFlow/PyTorch', level: 93 },
        { name: 'SQL/NoSQL', level: 91 },
        { name: 'Cloud Platforms', level: 89 },
        { name: 'Data Visualization', level: 87 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <EditableContent
              name="skills_title"
              defaultContent="Core"
              className="text-4xl md:text-5xl font-bold text-white"
            />{' '}
            <EditableContent
              name="skills_subtitle"
              defaultContent="Expertise"
              className="text-4xl md:text-5xl font-bold text-white"
            />
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            A showcase of my technical abilities and specialized knowledge
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-2xl border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  <EditableContent
                    name={`skills_${category.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_title`}
                    defaultContent={category.title}
                    className="text-xl font-bold text-white"
                  />
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <EditableContent
                        name={`skill_${category.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${skillIndex + 1}`}
                        defaultContent={skill.name}
                        className="text-light-200 font-medium"
                      />
                      <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: skillIndex * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              <EditableContent
                name="skills_differentiator_title"
                defaultContent="What Sets Me Apart"
                className="text-2xl font-bold text-white"
              />
            </h3>
            <p className="text-primary-100 max-w-2xl mx-auto">
              <EditableContent
                name="skills_differentiator_subtitle"
                defaultContent="The rare combination of deep technical expertise and business strategic thinking"
                className="text-primary-100"
                multiline
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Business-First Approach</h4>
              <p className="text-primary-100 text-sm">Every AI solution is designed with clear ROI and business impact in mind</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">End-to-End Delivery</h4>
              <p className="text-primary-100 text-sm">From concept to deployment, ensuring scalable and maintainable solutions</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Rapid Innovation</h4>
              <p className="text-primary-100 text-sm">Quick adaptation to emerging technologies while maintaining quality standards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;