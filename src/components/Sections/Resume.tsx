import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';

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

  const highlights = [
    content.resume_highlights_1 || 'BCom Graduate with Finance & AI Expertise',
    content.resume_highlights_2 || 'Python, Machine Learning & Data Analysis',
    content.resume_highlights_3 || 'Business Strategy & Digital Transformation',
    content.resume_highlights_4 || 'Multiple Certifications in AI & Finance'
  ];

  const resumeUrl = content.resume_pdf_url || '#';

  return (
    <section id="resume" className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <EditableContent
              name="resume_title"
              defaultContent="My Professional Journey"
              className="text-4xl md:text-5xl font-bold text-white"
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

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-8 border border-dark-600 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Resume Highlights</h3>
                  <p className="text-light-400 text-sm">Key qualifications & achievements</p>
                </div>
              </div>

              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <EditableContent
                      name={`resume_highlights_${index + 1}`}
                      defaultContent={highlight}
                      className="text-light-200 leading-relaxed"
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative w-full max-w-md aspect-[8.5/11] bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl shadow-2xl border border-dark-600 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <FileText className="w-24 h-24 text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Professional Resume</h3>
                <p className="text-light-400 mb-8">View my complete credentials</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Resume</span>
                  </motion.a>

                  <motion.a
                    href={resumeUrl}
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-dark-700 border border-primary-500/30 text-primary-300 px-6 py-3 rounded-full font-semibold hover:bg-dark-600 transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-light-400 space-y-1">
              <p className="font-medium">Resume PDF URL:</p>
              <EditableContent
                name="resume_pdf_url"
                defaultContent="https://your-resume-url.pdf"
                className="text-primary-400 text-xs break-all"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
