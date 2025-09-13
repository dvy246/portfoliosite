import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, Database, TrendingUp, Zap } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import { useSectionLoader } from '../../contexts/PageContentContext';
import EditableContent from '../Admin/EditableContent';
import ContentSkeleton from '../Loading/ContentSkeleton';
import { ContentErrorBoundary, FallbackContent } from '../ErrorBoundary';

// All content names used in the Skills section
const SKILLS_CONTENT_NAMES = [
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
];

const SkillsContent: React.FC = () => {
  const { content, isLoading, error } = useStableContent(SKILLS_CONTENT_NAMES);
  const { isSectionLoading } = useSectionLoader('skills', SKILLS_CONTENT_NAMES);

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load skills content. Please try refreshing the page.
      </div>
    );
  }

  // Build and memoize skill categories from stable content so the array
  // identity only changes when `content` changes. This avoids re-creating
  // category arrays every render which can cause child re-renders and
  // re-trigger animations.
  const memoizedCategories = React.useMemo(() => {
    return [
      {
        title: content.skills_ai_title,
        icon: Brain,
        color: 'from-blue-500 to-blue-600',
        skills: [
          { name: content.skill_ai_1, level: 95, key: 'skill_ai_1' },
          { name: content.skill_ai_2, level: 93, key: 'skill_ai_2' },
          { name: content.skill_ai_3, level: 91, key: 'skill_ai_3' },
          { name: content.skill_ai_4, level: 89, key: 'skill_ai_4' },
          { name: content.skill_ai_5, level: 87, key: 'skill_ai_5' }
        ],
        titleKey: 'skills_ai_title'
      },
      {
        title: content.skills_business_title,
        icon: BarChart3,
        color: 'from-blue-400 to-blue-500',
        skills: [
          { name: content.skill_business_1, level: 92, key: 'skill_business_1' },
          { name: content.skill_business_2, level: 91, key: 'skill_business_2' },
          { name: content.skill_business_3, level: 90, key: 'skill_business_3' },
          { name: content.skill_business_4, level: 89, key: 'skill_business_4' },
          { name: content.skill_business_5, level: 88, key: 'skill_business_5' }
        ],
        titleKey: 'skills_business_title'
      },
      {
        title: content.skills_technical_title,
        icon: Code,
        color: 'from-blue-600 to-blue-700',
        skills: [
          { name: content.skill_technical_1, level: 95, key: 'skill_technical_1' },
          { name: content.skill_technical_2, level: 93, key: 'skill_technical_2' },
          { name: content.skill_technical_3, level: 91, key: 'skill_technical_3' },
          { name: content.skill_technical_4, level: 89, key: 'skill_technical_4' },
          { name: content.skill_technical_5, level: 87, key: 'skill_technical_5' }
        ],
        titleKey: 'skills_technical_title'
      }
    ];
  }, [content]);

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transform-gpu">
          <h2 className="text-3xl font-bold text-white mb-4">
            <EditableContent
              name="skills_title"
              defaultContent="Skills & Expertise"
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            <EditableContent
              name="skills_subtitle"
              defaultContent="A showcase of my technical abilities and specialized knowledge"
              multiline
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {isSectionLoading && (
            <div className="col-span-full">
              <ContentSkeleton type="paragraph" lines={3} className="max-w-3xl mx-auto" />
            </div>
          )}
          {memoizedCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.titleKey}
              initial={false}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 transform-gpu"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  <EditableContent
                    name={category.titleKey}
                    defaultContent={category.title}
                  />
                </h3>
              </div>

              {/* Individual Editable Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.key}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <EditableContent
                        name={skill.key}
                        defaultContent={skill.name}
                        className="text-gray-200 font-medium"
                      />
                      <span className="text-blue-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        // If the section was loading, animate from 0 to value; otherwise render at final width
                        initial={isSectionLoading ? { width: 0 } : false}
                        viewport={{ once: true }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        style={{ width: isSectionLoading ? undefined : `${skill.level}%` }}
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
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white transform-gpu"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <EditableContent
                name="skills_differentiator_title"
                defaultContent="What Sets Me Apart"
                className="text-white"
              />
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              <EditableContent
                name="skills_differentiator_subtitle"
                defaultContent="The rare combination of deep technical expertise and business strategic thinking"
                className="text-blue-100"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Business-First Approach</h4>
              <p className="text-blue-100 text-sm">Every AI solution is designed with clear ROI and business impact in mind</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">End-to-End Delivery</h4>
              <p className="text-blue-100 text-sm">From concept to deployment, ensuring scalable and maintainable solutions</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Rapid Innovation</h4>
              <p className="text-blue-100 text-sm">Quick adaptation to emerging technologies while maintaining quality standards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Skills component with ErrorBoundary - no longer needs ContentProvider wrapper
const Skills: React.FC = () => {
  return (
    <ContentErrorBoundary
      fallback={
        <section id="skills" className="py-20 bg-gradient-to-br from-navy-50 to-platinum-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FallbackContent
              contentName="Skills Section"
              fallbackText="This section is temporarily unavailable. Please refresh the page or try again later."
              showError={true}
            />
          </div>
        </section>
      }
      onRetry={() => window.location.reload()}
    >
      <SkillsContent />
    </ContentErrorBoundary>
  );
};

export default Skills;