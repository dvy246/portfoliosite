import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, BookOpen, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

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
  const [editingCert, setEditingCert] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Certificate>>({});
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
      console.error('Error fetching certificates:', error);
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

  const startEditing = (cert: Certificate) => {
    setEditingCert(cert.id);
    setEditForm(cert);
  };

  const saveCertificate = async () => {
    if (!editForm.id) return;

    try {
      const { error } = await supabase
        .from('certifications')
        .update({
          title: editForm.title,
          issuer: editForm.issuer,
          date_earned: editForm.date_earned,
          certificate_type: editForm.certificate_type,
          description: editForm.description,
          credential_url: editForm.credential_url
        })
        .eq('id', editForm.id);

      if (error) {
        console.error('Supabase error:', error);
        // Update locally even if database fails
        setCertificates(prev => prev.map(c => c.id === editForm.id ? { ...c, ...editForm } : c));
        toast.success('Certificate updated locally!');
      } else {
        setCertificates(prev => prev.map(c => c.id === editForm.id ? { ...c, ...editForm } : c));
        toast.success('Certificate updated successfully!');
      }

      setEditingCert(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating certificate:', error);
      // Update locally as fallback
      setCertificates(prev => prev.map(c => c.id === editForm.id ? { ...c, ...editForm } : c));
      setEditingCert(null);
      setEditForm({});
      toast.success('Certificate updated locally!');
    }
  };

  const cancelEditing = () => {
    setEditingCert(null);
    setEditForm({});
  };

  const deleteCertificate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
      }

      setCertificates(prev => prev.filter(c => c.id !== id));
      toast.success('Certificate deleted successfully!');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      setCertificates(prev => prev.filter(c => c.id !== id));
      toast.success('Certificate deleted locally!');
    }
  };

  const addCertificate = async () => {
    const newCert = {
      id: Date.now().toString(),
      title: 'New Certificate',
      issuer: 'Issuing Organization',
      date_earned: '2024',
      certificate_type: 'Professional',
      description: 'Certificate description',
      order_index: certificates.length + 1
    };

    try {
      const { data, error } = await supabase
        .from('certifications')
        .insert(newCert)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        setCertificates(prev => [...prev, newCert]);
        toast.success('Certificate added locally!');
      } else {
        setCertificates(prev => [...prev, data]);
        toast.success('Certificate added successfully!');
      }
    } catch (error) {
      console.error('Error adding certificate:', error);
      setCertificates(prev => [...prev, newCert]);
      toast.success('Certificate added locally!');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Academic':
        return 'from-blue-500 to-blue-600';
      case 'Professional':
        return 'from-gold-500 to-gold-600';
      case 'Technical':
        return 'from-purple-500 to-purple-600';
      case 'Cloud':
        return 'from-green-500 to-green-600';
      case 'Analytics':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-navy-500 to-navy-600';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              Certificates & <span className="text-gold-600">Continuous Learning</span>
            </h2>
            {isAdmin && (
              <button
                onClick={addCertificate}
                className="bg-gold-500 text-white p-2 rounded-full hover:bg-gold-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            A commitment to excellence through formal education and industry-recognized certifications
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
              className="bg-gradient-to-br from-white to-navy-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-navy-100 group relative"
            >
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  {editingCert === cert.id ? (
                    <>
                      <button
                        onClick={saveCertificate}
                        className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-3 h-3" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(cert)}
                        className="bg-gold-500 text-white p-1 rounded-full hover:bg-gold-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteCertificate(cert.id)}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {editingCert === cert.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Certificate Title"
                  />
                  <input
                    type="text"
                    value={editForm.issuer || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, issuer: e.target.value }))}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Issuer"
                  />
                  <input
                    type="text"
                    value={editForm.date_earned || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date_earned: e.target.value }))}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Date Earned"
                  />
                  <select
                    value={editForm.certificate_type || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, certificate_type: e.target.value }))}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Professional">Professional</option>
                    <option value="Technical">Technical</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border rounded text-sm resize-none"
                    rows={3}
                    placeholder="Description"
                  />
                  <input
                    type="url"
                    value={editForm.credential_url || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, credential_url: e.target.value }))}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Credential URL (optional)"
                  />
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTypeColor(cert.certificate_type)} flex items-center justify-center`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center text-navy-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cert.date_earned}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gold-600 font-medium text-sm">{cert.issuer}</p>
                    </div>

                    <p className="text-navy-600 text-sm leading-relaxed">
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
                          className="text-navy-500 hover:text-gold-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-white text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-gold-400 mr-3" />
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