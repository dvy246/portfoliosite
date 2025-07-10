import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface PortfolioContent {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
  [key: string]: any; // Allow dynamic properties
}

export const usePortfolioContent = () => {
  const [content, setContent] = useState<Record<string, PortfolioContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*');

      if (error) throw error;

      const contentMap = data.reduce((acc, item) => {
        acc[item.section_key] = item;
        return acc;
      }, {} as Record<string, PortfolioContent>);

      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Set default content if database fails
      setContent({
        hero: {
          id: '1',
          section_key: 'hero',
          title: 'From Commerce to Code: How Business Acumen Meets AI Mastery',
          subtitle: 'Blending analytical precision with business intuition — solving AI challenges with real-world impact.',
          content: '',
          image_url: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800',
          badge: 'AI Professional & Business Strategist',
          cta_text: "Let's Solve Problems With Me",
          floating_badge: 'AI',
          scroll_text: 'Discover More'
        },
        about: {
          id: '2',
          section_key: 'about',
          title: 'Where Business Meets Innovation',
          subtitle: 'The intersection of business intelligence and machine learning is where I thrive.',
          content: 'My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking.',
          image_url: '',
          journey_title: 'My Journey',
          video_title: 'Personal Introduction',
          video_url: '',
          highlight_1_title: 'Business Intelligence',
          highlight_1_desc: 'BCom (Hons) foundation providing deep understanding of market dynamics and financial reasoning',
          highlight_2_title: 'AI Expertise',
          highlight_2_desc: 'Advanced machine learning and deep learning capabilities with real-world application focus',
          highlight_3_title: 'Strategic Thinking',
          highlight_3_desc: 'Unique ability to align AI solutions with business objectives and measurable outcomes',
          highlight_4_title: 'Proven Results',
          highlight_4_desc: 'Track record of delivering AI projects that drive tangible business value and growth'
        },
        contact: {
          id: '3',
          section_key: 'contact',
          title: "Let's Solve Problems With Me",
          subtitle: 'Ready to transform your business with AI? Let\'s discuss how we can create solutions that drive real impact.',
          content: 'Whether you\'re looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I\'m here to help turn your vision into reality.',
          image_url: '',
          section_title: 'Get in Touch',
          email: 'your.email@example.com',
          phone: '+1 (555) 123-4567',
          location: 'Your City, Country',
          social_title: 'Connect With Me',
          linkedin_url: 'https://linkedin.com/in/yourprofile',
          github_url: 'https://github.com/yourprofile',
          twitter_url: 'https://twitter.com/yourprofile',
          form_title: 'Start a Conversation',
          name_label: 'Full Name *',
          email_label: 'Email Address *',
          company_label: 'Company/Organization',
          message_label: 'Project Details *',
          button_text: 'Send Message',
          footer_text: 'I typically respond within 24 hours. For urgent matters, feel free to call directly.'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (sectionKey: string, field: string, value: string) => {
    try {
      // First update local state immediately for better UX
      setContent(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [field]: value
        }
      }));

      // Then try to update database
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({
          section_key: sectionKey,
          [field]: value,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Database update error:', error);
        toast.success('Content updated locally!');
      } else {
        toast.success('Content updated successfully!');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      toast.success('Content updated locally!');
    }
  };

  return {
    content,
    loading,
    updateContent
  };
};