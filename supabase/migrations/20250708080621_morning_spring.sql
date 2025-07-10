/*
  # Fix Content Editing System - Final Solution

  1. Database Schema
    - Ensure sections table exists with proper structure
    - Add all missing content keys with default values
    - Fix RLS policies for proper access

  2. Security
    - Enable RLS on sections table
    - Create comprehensive policies for public access
    - Test upsert functionality
*/

-- Ensure sections table exists with proper structure
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read" ON sections;
DROP POLICY IF EXISTS "Public upsert" ON sections;
DROP POLICY IF EXISTS "Public update" ON sections;
DROP POLICY IF EXISTS "Public read access" ON sections;
DROP POLICY IF EXISTS "Public insert access" ON sections;
DROP POLICY IF EXISTS "Public update access" ON sections;
DROP POLICY IF EXISTS "Public delete access" ON sections;

-- Create comprehensive policies for public access
CREATE POLICY "Enable read for all" ON sections FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON sections FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON sections FOR DELETE USING (true);

-- Create or replace the trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS set_updated_at ON sections;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert ALL content keys with proper conflict handling
INSERT INTO sections (name, content) VALUES

-- Hero Section
('hero_title', 'Hey, Divy here! 👋 Finance Meets Tech'),
('hero_subtitle', 'BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.'),
('hero_badge', 'Finance + AI Professional'),
('hero_cta_text', 'Let''s Solve Problems Together'),
('hero_floating_badge', 'AI'),
('hero_scroll_text', 'Discover More'),
('profile_photo', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800'),

-- About Section
('about_title', 'Where Business Meets Innovation'),
('about_subtitle', 'The intersection of business intelligence and machine learning is where I thrive.'),
('about_content', 'My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions.'),
('about_journey_title', 'My Journey'),

-- About Highlights
('about_highlight_1_title', 'Business Intelligence'),
('about_highlight_1_desc', 'BCom (Hons) foundation providing deep understanding of market dynamics and financial reasoning'),
('about_highlight_2_title', 'AI Expertise'),
('about_highlight_2_desc', 'Advanced machine learning and deep learning capabilities with real-world application focus'),
('about_highlight_3_title', 'Strategic Thinking'),
('about_highlight_3_desc', 'Unique ability to align AI solutions with business objectives and measurable outcomes'),
('about_highlight_4_title', 'Proven Results'),
('about_highlight_4_desc', 'Track record of delivering AI projects that drive tangible business value and growth'),

-- Skills Section
('skills_title', 'Core'),
('skills_subtitle', 'Expertise'),
('skills_ai_title', 'AI & Machine Learning'),
('skills_business_title', 'Business Analytics'),
('skills_technical_title', 'Technical Stack'),
('skills_differentiator_title', 'What Sets Me Apart'),
('skills_differentiator_subtitle', 'The rare combination of deep technical expertise and business strategic thinking'),

-- Individual Skills
('skill_ai_1', 'Machine Learning'),
('skill_ai_2', 'Deep Learning'),
('skill_ai_3', 'Natural Language Processing'),
('skill_ai_4', 'Computer Vision'),
('skill_ai_5', 'MLOps'),
('skill_business_1', 'Financial Modeling'),
('skill_business_2', 'Business Intelligence'),
('skill_business_3', 'Decision Optimization'),
('skill_business_4', 'Market Analysis'),
('skill_business_5', 'Strategic Planning'),
('skill_technical_1', 'Python'),
('skill_technical_2', 'TensorFlow/PyTorch'),
('skill_technical_3', 'SQL/NoSQL'),
('skill_technical_4', 'Cloud Platforms'),
('skill_technical_5', 'Data Visualization'),

-- Contact Section
('contact_title', 'Let''s Build the Future Together'),
('contact_subtitle', 'Ready to transform your business with AI? Let''s discuss how we can create solutions that drive real impact.'),
('contact_content', 'Whether you''re looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I''m here to help turn your vision into reality.'),
('contact_section_title', 'Get in Touch'),
('contact_email', 'your.email@example.com'),
('contact_phone', '+1 (555) 123-4567'),
('contact_location', 'Your City, Country'),
('contact_social_title', 'Connect With Me'),
('contact_linkedin_url', 'https://linkedin.com/in/yourprofile'),
('contact_github_url', 'https://github.com/yourprofile'),
('contact_twitter_url', 'https://twitter.com/yourprofile'),
('contact_form_title', 'Start a Conversation'),
('contact_name_label', 'Full Name *'),
('contact_email_label', 'Email Address *'),
('contact_company_label', 'Company/Organization'),
('contact_message_label', 'Project Details *'),
('contact_button_text', 'Send Message'),
('contact_footer_text', 'I typically respond within 24 hours. For urgent matters, feel free to call directly.'),

-- Footer Contact
('contact_footer_title', 'Get in Touch'),
('contact_footer_email', 'divy.yadav@aiexpert.com'),
('contact_footer_phone', '+1 (555) 123-4567'),
('contact_footer_location', 'San Francisco, CA'),

-- CTA Section
('cta_section_title', 'Ready to Contribute to Your Team'),
('cta_section_content', 'These projects represent my journey of learning and growth. I''m excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges.')

ON CONFLICT (name) DO UPDATE SET 
  content = EXCLUDED.content,
  updated_at = now();

-- Test the upsert functionality
INSERT INTO sections (name, content) VALUES ('test_edit', 'This is a test edit')
ON CONFLICT (name) DO UPDATE SET 
  content = 'Test edit successful - ' || now()::text,
  updated_at = now();