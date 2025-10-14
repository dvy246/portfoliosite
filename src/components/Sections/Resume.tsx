import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Sparkles, Award, Briefcase } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';
import { useAuth } from '../../contexts/AuthContext';

const RESUME_CONTENT_NAMES = [
  'resume_title',
  'resume_subtitle',
  'resume_pdf_url',
  'resume_highlights_1',
  'resume_highlights_2',
  'resume_highlights_3',
  'resume_highlights_4'
];

const Resume: React.FC = () => {
  const { content } = useStableContent(RESUME_CONTENT_NAMES);
  const { isAdmin } = useAuth();

  const highlights = [
    content.resume_highlights_1 || 'BCom Graduate with Finance & AI Expertise',
    content.resume_highlights_2 || 'Python, Machine Learning & Data Analysis',
    content.resume_highlights_3 || 'Business Strategy & Digital Transformation',
    content.resume_highlights_4 || 'Multiple Certifications in AI & Finance'
  ];

  const resumeUrl = content.resume_pdf_url || 'https://drive.google.com/file/d/YOUR_FILE_ID/view';

  return (
    <section id="resume" className="py-20 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 to-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/15 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400 bg-clip-text text-transparent mb-6">
            <EditableContent
              name="resume_title"
              defaultContent="My Professional Journey"
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400 bg-clip-text text-transparent"
            />
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            <EditableContent
              name="resume_subtitle"
              defaultContent="Discover my full professional background, experience, and qualifications"
              className="text-xl text-light-300"
              multiline
            />
          </p>
        </motion.div>

        {/* Main Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary-500/20 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

            {/* Floating shapes */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 border-2 border-cyan-400/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 border-2 border-primary-400/20 rounded-lg"
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10 p-8 md:p-12">
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                {/* Resume Preview */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-primary-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden aspect-[8.5/11]">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FileText className="w-24 h-24 text-primary-600 mb-4" />
                        </motion.div>
                        <div className="w-full space-y-2 mt-4">
                          <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto" />
                          <div className="h-3 bg-gray-300 rounded w-full" />
                          <div className="h-3 bg-gray-300 rounded w-5/6 mx-auto" />
                          <div className="h-2 bg-gray-200 rounded w-2/3 mx-auto mt-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                      <Award className="w-8 h-8 text-cyan-400 mr-3" />
                      Resume Highlights
                    </h3>
                    <ul className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3 group"
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-3 h-3 text-white" />
                          </div>
                          <EditableContent
                            name={`resume_highlights_${index + 1}`}
                            defaultContent={highlight}
                            className="text-light-200 leading-relaxed text-lg"
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-600 rounded-xl" />
                      <div className="relative bg-gradient-to-r from-cyan-500 to-primary-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center space-x-2">
                        <ExternalLink className="w-5 h-5" />
                        <span className="text-lg">View Resume</span>
                      </div>
                    </motion.a>

                    <motion.a
                      href={resumeUrl}
                      download
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <div className="bg-dark-700/50 backdrop-blur-sm border-2 border-cyan-400/50 text-cyan-300 px-6 py-4 rounded-xl font-semibold hover:bg-dark-600/50 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-400/30">
                        <Download className="w-5 h-5" />
                        <span className="text-lg">Download PDF</span>
                      </div>
                    </motion.a>
                  </div>

                  {/* Admin Edit URL */}
                  {isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl"
                    >
                      <p className="text-yellow-400 font-bold mb-3 flex items-center text-sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        ADMIN: Edit Resume URL
                      </p>
                      <EditableContent
                        name="resume_pdf_url"
                        defaultContent="https://drive.google.com/file/d/YOUR_FILE_ID/view"
                        className="text-cyan-300 text-sm break-all block font-mono bg-dark-900/50 p-3 rounded-lg"
                      />
                      <p className="text-xs text-light-500 mt-3">
                        💡 Click the URL above to edit. Paste your Google Drive share link or direct PDF URL.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
