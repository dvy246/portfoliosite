import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, BarChart3, Code, TrendingUp, Database, Zap, Sparkles, Target, Rocket } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';

const SKILLS_CONTENT_NAMES = [
  'skills_title',
  'skills_subtitle',
  'skills_differentiator_title',
  'skills_differentiator_subtitle'
];

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
  color: string;
}

const AnimatedSkillBar: React.FC<SkillBarProps> = ({ name, level, delay, color }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = level;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, level]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-light-200 font-medium group-hover:text-cyan-300 transition-colors">{name}</span>
        <span className="text-cyan-400 font-bold text-lg">{count}%</span>
      </div>
      <div className="relative h-3 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${color} shadow-lg`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: delay + 1,
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { content } = useStableContent(SKILLS_CONTENT_NAMES);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      gradient: 'from-cyan-500 via-blue-500 to-purple-600',
      bgGradient: 'from-cyan-500/20 to-purple-500/20',
      skills: [
        { name: 'Machine Learning', level: 95 },
        { name: 'Deep Learning', level: 93 },
        { name: 'Natural Language Processing', level: 91 },
        { name: 'Computer Vision', level: 89 },
        { name: 'MLOps & Deployment', level: 87 }
      ]
    },
    {
      title: 'Business Analytics',
      icon: BarChart3,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bgGradient: 'from-green-500/20 to-teal-500/20',
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
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgGradient: 'from-orange-500/20 to-pink-500/20',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'TensorFlow/PyTorch', level: 93 },
        { name: 'SQL/NoSQL', level: 91 },
        { name: 'Cloud Platforms (AWS/Azure)', level: 89 },
        { name: 'Data Visualization', level: 87 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Zap className="w-12 h-12 text-cyan-400 mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              <EditableContent
                name="skills_title"
                defaultContent="Core Expertise"
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              />
            </span>
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            Dynamic skill set combining technical excellence with business acumen
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(index)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === index
                  ? 'text-white shadow-2xl'
                  : 'text-light-400 bg-dark-800/50 backdrop-blur-sm border border-dark-700 hover:border-cyan-500/50'
              }`}
            >
              {selectedCategory === index && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center space-x-2">
                <category.icon className="w-5 h-5" />
                <span>{category.title}</span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Skills Display */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-dark-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary-500/20 shadow-2xl overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${skillCategories[selectedCategory].bgGradient} opacity-30`}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating shapes */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 border-2 border-cyan-400/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skillCategories[selectedCategory].gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {React.createElement(skillCategories[selectedCategory].icon, {
                    className: "w-8 h-8 text-white"
                  })}
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{skillCategories[selectedCategory].title}</h3>
                  <p className="text-light-400">Proficiency breakdown</p>
                </div>
              </div>

              <div className="space-y-6">
                {skillCategories[selectedCategory].skills.map((skill, index) => (
                  <AnimatedSkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.1}
                    color={`bg-gradient-to-r ${skillCategories[selectedCategory].gradient}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Differentiator Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Target, title: 'Business + Tech', description: 'Unique blend of finance expertise and AI knowledge' },
            { icon: Rocket, title: 'Fast Learner', description: 'Quickly adapt to new technologies and methodologies' },
            { icon: Sparkles, title: 'Innovation Driven', description: 'Always exploring cutting-edge solutions' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-light-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
