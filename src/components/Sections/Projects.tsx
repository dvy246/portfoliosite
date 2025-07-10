import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Award, Zap, BookOpen, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  outcome: string;
  image_url: string;
  project_url?: string;
  github_url?: string;
  order_index: number;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const { isAdmin } = useAuth();
  const { content } = useContentSections([
    'cta_section_title',
    'cta_section_content'
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Set default projects if database fails
      setProjects([
        {
          id: '1',
          title: 'E-commerce Sales Prediction Model',
          description: 'Built a machine learning model to predict sales trends for an online retail business using historical data, seasonal patterns, and customer behavior analysis.',
          technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'],
          outcome: '85% prediction accuracy, identified key sales drivers',
          image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
          order_index: 1
        },
        {
          id: '2',
          title: 'Customer Sentiment Analysis Dashboard',
          description: 'Developed an NLP-based sentiment analysis tool that processes customer reviews and feedback to provide business insights through an interactive dashboard.',
          technologies: ['Python', 'NLTK', 'Streamlit', 'TextBlob', 'Plotly'],
          outcome: 'Real-time sentiment tracking, actionable business insights',
          image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
          order_index: 2
        }
      ]);
    }
  };

  const startEditing = (project: Project) => {
    setEditingProject(project.id);
    setEditForm(project);
  };

  const saveProject = async () => {
    if (!editForm.id) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: editForm.title,
          description: editForm.description,
          technologies: editForm.technologies,
          outcome: editForm.outcome,
          image_url: editForm.image_url,
          project_url: editForm.project_url,
          github_url: editForm.github_url
        })
        .eq('id', editForm.id);

      if (error) {
        console.error('Supabase error:', error);
        // Update locally even if database fails
        setProjects(prev => prev.map(p => p.id === editForm.id ? { ...p, ...editForm } : p));
        toast.success('Project updated locally!');
      } else {
        setProjects(prev => prev.map(p => p.id === editForm.id ? { ...p, ...editForm } : p));
        toast.success('Project updated successfully!');
      }

      setEditingProject(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating project:', error);
      // Update locally as fallback
      setProjects(prev => prev.map(p => p.id === editForm.id ? { ...p, ...editForm } : p));
      setEditingProject(null);
      setEditForm({});
      toast.success('Project updated locally!');
    }
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setEditForm({});
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted locally!');
    }
  };

  const addProject = async () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      technologies: ['Technology'],
      outcome: 'Project outcome',
      image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      order_index: projects.length + 1
    };

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        setProjects(prev => [...prev, newProject]);
        toast.success('Project added locally!');
      } else {
        setProjects(prev => [...prev, data]);
        toast.success('Project added successfully!');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      setProjects(prev => [...prev, newProject]);
      toast.success('Project added locally!');
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'High':
        return <Award className="w-4 h-4 text-gold-600" />;
      case 'Medium':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'Learning':
        return <BookOpen className="w-4 h-4 text-green-600" />;
      default:
        return <Zap className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
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
              Learning Through <span className="text-gold-600">Projects</span>
            </h2>
            {isAdmin && (
              <button
                onClick={addProject}
                className="bg-gold-500 text-white p-2 rounded-full hover:bg-gold-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Hands-on projects that demonstrate the practical application of AI and business knowledge
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-white to-navy-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-navy-100 relative"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                  {editingProject === project.id ? (
                    <>
                      <button
                        onClick={saveProject}
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(project)}
                        className="bg-gold-500 text-white p-2 rounded-full hover:bg-gold-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Project Image */}
              <div className="relative overflow-hidden">
                {editingProject === project.id ? (
                  <div className="h-48 p-4 bg-gray-100">
                    <input
                      type="url"
                      value={editForm.image_url || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Image URL"
                    />
                  </div>
                ) : (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    {getImpactIcon('Learning')}
                    <span className="text-xs font-medium text-navy-700">Academic Project</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {editingProject === project.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 border rounded font-bold text-xl"
                      placeholder="Project Title"
                    />
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2 border rounded resize-none"
                      rows={3}
                      placeholder="Project Description"
                    />
                    <input
                      type="text"
                      value={editForm.technologies?.join(', ') || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, technologies: e.target.value.split(', ').filter(t => t.trim()) }))}
                      className="w-full p-2 border rounded"
                      placeholder="Technologies (comma separated)"
                    />
                    <input
                      type="text"
                      value={editForm.outcome || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, outcome: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Project Outcome"
                    />
                    <input
                      type="url"
                      value={editForm.project_url || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, project_url: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Project URL (optional)"
                    />
                    <input
                      type="url"
                      value={editForm.github_url || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, github_url: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="GitHub URL (optional)"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-navy-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-navy-100 text-navy-700 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Outcome */}
                    <div className="bg-gradient-to-r from-gold-50 to-gold-100 p-4 rounded-xl mb-4">
                      <h4 className="text-sm font-semibold text-gold-800 mb-1">Key Outcomes</h4>
                      <p className="text-gold-700 text-sm font-medium">{project.outcome}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-navy-600 hover:text-gold-600 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Demo</span>
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-navy-600 hover:text-gold-600 transition-colors text-sm font-medium"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Now Editable */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              <EditableContent
                name="cta_section_title"
                defaultContent="Ready to Contribute to Your Team"
                className="text-white"
              />
            </h3>
            <p className="text-navy-200 mb-6 max-w-2xl mx-auto">
              <EditableContent
                name="cta_section_content"
                defaultContent="These projects represent my journey of learning and growth. I'm excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges."
                multiline
                className="text-navy-200"
              />
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gold-600 hover:bg-gold-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Let's Discuss Opportunities
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;