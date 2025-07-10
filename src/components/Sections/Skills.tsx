import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, Database, TrendingUp, Zap } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';

const Skills: React.FC = () => {
  const { content } = useContentSections([
    'skills_title',
    'skills_subtitle',
    'skills_ai_title',
    'skills_business_title', 
    'skills_technical_title',
    'skills_differentiator_title',
    'skills_differentiator_subtitle',
    // Individual AI skills
    'skill_ai_1', 'skill_ai_2', 'skill_ai_3', 'skill_ai_4', 'skill_ai_5',
    // Individual Business skills
    'skill_business_1', 'skill_business_2', 'skill_business_3', 'skill_business_4', 'skill_business_5',
    // Individual Technical skills
    'skill_technical_1', 'skill_technical_2', 'skill_technical_3', 'skill_technical_4', 'skill_technical_5'
  ]);

  const skillCategories = [
    {
      title: content.skills_ai_title || 'AI & Machine Learning',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: content.skill_ai_1 || 'Machine Learning', level: 95, key: 'skill_ai_1' },
        { name: content.skill_ai_2 || 'Deep Learning', level: 93, key: 'skill_ai_2' },
        { name: content.skill_ai_3 || 'Natural Language Processing', level: 91, key: 'skill_ai_3' },
        { name: content.skill_ai_4 || 'Computer Vision', level: 89, key: 'skill_ai_4' },
        { name: content.skill_ai_5 || 'MLOps', level: 87, key: 'skill_ai_5' }
      ],
      titleKey: 'skills_ai_title'
    },
    {
      title: content.skills_business_title || 'Business Analytics',
      icon: BarChart3,
      color: 'from-gold-500 to-orange-600',
      skills: [
        { name: content.skill_business_1 || 'Financial Modeling', level: 92, key: 'skill_business_1' },
        { name: content.skill_business_2 || 'Business Intelligence', level: 91, key: 'skill_business_2' },
        { name: content.skill_business_3 || 'Decision Optimization', level: 90, key: 'skill_business_3' },
        { name: content.skill_business_4 || 'Market Analysis', level: 89, key: 'skill_business_4' },
        { name: content.skill_business_5 || 'Strategic Planning', level: 88, key: 'skill_business_5' }
      ],
      titleKey: 'skills_business_title'
    },
    {
      title: content.skills_technical_title || 'Technical Stack',
      icon: Code,
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: content.skill_technical_1 || 'Python', level: 95, key: 'skill_technical_1' },
        { name: content.skill_technical_2 || 'TensorFlow/PyTorch', level: 93, key: 'skill_technical_2' },
        { name: content.skill_technical_3 || 'SQL/NoSQL', level: 91, key: 'skill_technical_3' },
        { name: content.skill_technical_4 || 'Cloud Platforms', level: 89, key: 'skill_technical_4' },
        { name: content.skill_technical_5 || 'Data Visualization', level: 87, key: 'skill_technical_5' }
      ],
      titleKey: 'skills_technical_title'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-navy-50 to-platinum-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            <EditableContent
              name="skills_title"
              defaultContent="Core"
              className="mr-2"
            />
            <span className="text-gold-600">
              <EditableContent
                name="skills_subtitle"
                defaultContent="Expertise"
              />
            </span>
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            A unique blend of technical mastery and business acumen that drives exceptional results
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">
                  <EditableContent
                    name={category.titleKey}
                    defaultContent={category.title}
                  />
                </h3>
              </div>

              {/* Individual Editable Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <EditableContent
                        name={skill.key}
                        defaultContent={skill.name}
                        className="text-navy-700 font-medium"
                      />
                      <span className="text-navy-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <EditableContent
                name="skills_differentiator_title"
                defaultContent="What Sets Me Apart"
                className="text-white"
              />
            </h3>
            <p className="text-gold-100 max-w-2xl mx-auto">
              <EditableContent
                name="skills_differentiator_subtitle"
                defaultContent="The rare combination of deep technical expertise and business strategic thinking"
                className="text-gold-100"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Business-First Approach</h4>
              <p className="text-gold-100 text-sm">Every AI solution is designed with clear ROI and business impact in mind</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">End-to-End Delivery</h4>
              <p className="text-gold-100 text-sm">From concept to deployment, ensuring scalable and maintainable solutions</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Rapid Innovation</h4>
              <p className="text-gold-100 text-sm">Quick adaptation to emerging technologies while maintaining quality standards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;