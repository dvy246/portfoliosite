import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import EditableContent from '../Admin/EditableContent';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date_earned: string;
  certificate_type: string;
  description: string;
  credential_url?: string;
  order_index: number;
}

const Certifications: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      // Set default certificates if database fails
      setCertificates([
        {
          id: '1',
          title: 'BCom (Honours) in Commerce',
          issuer: 'University of Excellence',
          date_earned: '2023',
          certificate_type: 'Academic',
          description: 'Specialized in Financial Analysis, Business Strategy, and Market Research with distinction',
          order_index: 1
        },
        {
          id: '2',
          title: 'Machine Learning Specialization',
          issuer: 'Stanford University (Coursera)',
          date_earned: '2023',
          certificate_type: 'Professional',
          description: 'Comprehensive ML algorithms, supervised/unsupervised learning, and neural networks',
          order_index: 2
        }
      ]);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Academic':
        return 'from-blue-500 to-blue-600';
      case 'Professional':
        return 'from-primary-500 to-primary-600';
      case 'Technical':
        return 'from-purple-500 to-purple-600';
      case 'Cloud':
        return 'from-green-500 to-green-600';
      case 'Analytics':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-dark-500 to-dark-600';
    }
  };

  return (
    <section className="py-20 bg-dark-800">
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
              name="certifications_title"
              defaultContent="Certificates & Continuous Learning"
              className="text-4xl md:text-5xl font-bold text-white"
            />
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            <EditableContent
              name="certifications_subtitle"
              defaultContent="A commitment to excellence through formal education and industry-recognized certifications"
              className="text-xl text-light-300"
              multiline
            />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-dark-700 to-dark-600 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 p-6 border border-dark-500 hover:border-primary-500/30 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTypeColor(cert.certificate_type)} flex items-center justify-center`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center text-light-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {cert.date_earned}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-primary-400 font-medium text-sm">{cert.issuer}</p>
                </div>

                <p className="text-light-300 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Type Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeColor(cert.certificate_type)}`}>
                    {cert.certificate_type}
                  </span>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-400 hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary-400 mr-3" />
            <h3 className="text-2xl font-bold">Lifelong Learning Mindset</h3>
          </div>
          <p className="text-navy-200 max-w-3xl mx-auto leading-relaxed">
            As a fresh graduate entering the AI field, I understand that continuous learning is not just beneficial—it's essential. 
            My diverse educational background, from commerce fundamentals to cutting-edge AI certifications, 
            demonstrates my commitment to bridging business strategy with technical innovation. Each certificate represents 
            not just knowledge gained, but a step toward becoming a well-rounded AI professional who can deliver real business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;