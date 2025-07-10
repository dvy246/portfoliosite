import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import LoginModal from '../Auth/LoginModal';

const Footer: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { content } = useContentSections([
    'contact_footer_title',
    'contact_footer_email',
    'contact_footer_phone', 
    'contact_footer_location'
  ]);

  return (
    <>
      <footer className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Divy Yadav</h3>
              <p className="text-navy-300 leading-relaxed">
                Bridging the gap between business intelligence and artificial intelligence 
                to create solutions that drive real-world impact.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Skills', 'Projects', 'Testimonials', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      const element = document.querySelector(`#${link.toLowerCase()}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block text-navy-300 hover:text-gold-400 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info - Now Editable */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                <EditableContent
                  name="contact_footer_title"
                  defaultContent="Get in Touch"
                />
              </h4>
              <div className="space-y-2 text-navy-300">
                <p>
                  <EditableContent
                    name="contact_footer_email"
                    defaultContent="divy.yadav@aiexpert.com"
                  />
                </p>
                <p>
                  <EditableContent
                    name="contact_footer_phone"
                    defaultContent="+1 (555) 123-4567"
                  />
                </p>
                <p>
                  <EditableContent
                    name="contact_footer_location"
                    defaultContent="San Francisco, CA"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-navy-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-navy-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by Divy Yadav</span>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 text-navy-400 hover:text-gold-400 transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
              <span className="text-navy-400 text-sm">
                © 2024 All rights reserved
              </span>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Footer;