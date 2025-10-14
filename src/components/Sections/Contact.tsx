import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useStableContent } from '../../hooks/useStableContent';
import EditableContent from '../Admin/EditableContent';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

const CONTACT_CONTENT_NAMES = [
  'contact_title',
  'contact_subtitle',
  'contact_content',
  'contact_section_title',
  'contact_email',
  'contact_phone',
  'contact_location',
  'contact_social_title',
  'contact_linkedin_url',
  'contact_github_url',
  'contact_twitter_url',
  'contact_form_title',
  'contact_name_label',
  'contact_email_label',
  'contact_company_label',
  'contact_message_label',
  'contact_button_text',
  'contact_footer_text'
];

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();
  const { content } = useStableContent(CONTACT_CONTENT_NAMES);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('access_key', 'c6e73f4a-e0d1-4d8a-9c84-8b5e3d2a1f7e');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('company', data.company || 'Not specified');
      formData.append('message', data.message);
      formData.append('subject', `New Portfolio Contact from ${data.name}`);
      formData.append('from_name', 'Portfolio Contact Form');
      formData.append('to_email', 'yadavdipu296@gmail.com');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Message sent successfully! I\'ll respond within 24 hours.', {
          duration: 5000,
          icon: '📧',
        });
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('❌ Failed to send. Please email me directly at yadavdipu296@gmail.com', {
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-950">
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
              name="contact_title"
              defaultContent="Let's Build the Future Together"
              className="text-4xl md:text-5xl font-bold text-white"
            />
          </h2>
          <p className="text-xl text-light-300 max-w-3xl mx-auto">
            <EditableContent
              name="contact_subtitle"
              defaultContent="Ready to transform your business with AI? Let's discuss how we can create solutions that drive real impact."
              className="text-xl text-light-300"
              multiline
            />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                <EditableContent
                  name="contact_section_title"
                  defaultContent="Get in Touch"
                  className="text-2xl font-bold text-white"
                />
              </h3>
              <p className="text-light-300 leading-relaxed mb-8">
                <EditableContent
                  name="contact_content"
                  defaultContent="Whether you're looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I'm here to help turn your vision into reality."
                  className="text-light-300 leading-relaxed"
                  multiline
                />
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-dark-800 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group border border-dark-700 hover:border-primary-500/30"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-light-400 font-medium">Email</p>
                  <EditableContent
                    name="contact_email"
                    defaultContent="your.email@example.com"
                    className="text-white font-semibold"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-dark-800 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group border border-dark-700 hover:border-primary-500/30"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-light-400 font-medium">Phone</p>
                  <EditableContent
                    name="contact_phone"
                    defaultContent="+1 (555) 123-4567"
                    className="text-white font-semibold"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-dark-800 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group border border-dark-700 hover:border-primary-500/30"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-light-400 font-medium">Location</p>
                  <EditableContent
                    name="contact_location"
                    defaultContent="Your City, Country"
                    className="text-white font-semibold"
                  />
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                <EditableContent
                  name="contact_social_title"
                  defaultContent="Connect With Me"
                  className="text-lg font-semibold text-white"
                />
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  href={content.contact_linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-dark-800 border border-dark-700 hover:border-primary-500/30 rounded-xl shadow-md flex items-center justify-center text-light-400 hover:text-primary-400 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={content.contact_github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-dark-800 border border-dark-700 hover:border-primary-500/30 rounded-xl shadow-md flex items-center justify-center text-light-400 hover:text-white transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
              
              {/* Editable Social Links */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-light-400 w-20">LinkedIn:</span>
                  <EditableContent
                    name="contact_linkedin_url"
                    defaultContent="https://linkedin.com/in/yourprofile"
                    className="text-light-200 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-light-400 w-20">GitHub:</span>
                  <EditableContent
                    name="contact_github_url"
                    defaultContent="https://github.com/yourprofile"
                    className="text-light-200 flex-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-dark-800 border border-dark-700 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              <EditableContent
                name="contact_form_title"
                defaultContent="Start a Conversation"
                className="text-2xl font-bold text-white"
              />
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-300 mb-2">
                    <EditableContent
                      name="contact_name_label"
                      defaultContent="Full Name *"
                      className="text-sm font-medium text-light-300"
                    />
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-dark-600 bg-dark-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-300 mb-2">
                    <EditableContent
                      name="contact_email_label"
                      defaultContent="Email Address *"
                      className="text-sm font-medium text-light-300"
                    />
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-dark-600 bg-dark-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light-300 mb-2">
                  <EditableContent
                    name="contact_company_label"
                    defaultContent="Company/Organization"
                    className="text-sm font-medium text-light-300"
                  />
                </label>
                <input
                  {...register('company')}
                  type="text"
                  className="w-full px-4 py-3 border border-dark-600 bg-dark-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-300 mb-2">
                  <EditableContent
                    name="contact_message_label"
                    defaultContent="Project Details *"
                    className="text-sm font-medium text-light-300"
                  />
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full px-4 py-3 border border-dark-600 bg-dark-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project, challenges, and goals."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <EditableContent
                      name="contact_button_text"
                      defaultContent="Send Message"
                      className="text-white"
                    />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-light-400">
              <EditableContent
                name="contact_footer_text"
                defaultContent="I typically respond within 24 hours. For urgent matters, feel free to call directly."
                className="text-sm text-light-400"
                multiline
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;