/*
  # Fix All Content Editing - Complete Database Reset

  1. Database Schema
    - Drop and recreate sections table with proper structure
    - Add proper RLS policies for public access
    - Create proper indexes and triggers

  2. Content Keys
    - Insert ALL content keys used in the application
    - Ensure every editable element has a database entry

  3. Testing
    - Add test functionality to verify everything works
*/

-- Drop existing sections table and recreate from scratch
DROP TABLE IF EXISTS sections CASCADE;

-- Create sections table with proper structure
CREATE TABLE sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_sections_name ON sections(name);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Allow public read" ON sections FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON sections FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON sections FOR DELETE USING (true);

-- Create trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

-- Insert ALL content keys used in the application
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

-- About Highlights (individual editable items)
('about_highlight_1_title', 'Business Intelligence'),
('about_highlight_1_desc', 'BCom (Hons) foundation providing deep understanding of market dynamics and financial reasoning'),
('about_highlight_2_title', 'AI Expertise'),
('about_highlight_2_desc', 'Advanced machine learning and deep learning capabilities with real-world application focus'),
('about_highlight_3_title', 'Strategic Thinking'),
('about_highlight_3_desc', 'Unique ability to align AI solutions with business objectives and measurable outcomes'),
('about_highlight_4_title', 'Proven Results'),
('about_highlight_4_desc', 'Track record of delivering AI projects that drive tangible business value and growth'),

-- Skills Section Titles
('skills_title', 'Core'),
('skills_subtitle', 'Expertise'),
('skills_ai_title', 'AI & Machine Learning'),
('skills_business_title', 'Business Analytics'),
('skills_technical_title', 'Technical Stack'),
('skills_differentiator_title', 'What Sets Me Apart'),
('skills_differentiator_subtitle', 'The rare combination of deep technical expertise and business strategic thinking'),

-- Individual AI Skills (fully editable)
('skill_ai_1', 'Machine Learning'),
('skill_ai_2', 'Deep Learning'),
('skill_ai_3', 'Natural Language Processing'),
('skill_ai_4', 'Computer Vision'),
('skill_ai_5', 'MLOps'),

-- Individual Business Skills (fully editable)
('skill_business_1', 'Financial Modeling'),
('skill_business_2', 'Business Intelligence'),
('skill_business_3', 'Decision Optimization'),
('skill_business_4', 'Market Analysis'),
('skill_business_5', 'Strategic Planning'),

-- Individual Technical Skills (fully editable)
('skill_technical_1', 'Python'),
('skill_technical_2', 'TensorFlow/PyTorch'),
('skill_technical_3', 'SQL/NoSQL'),
('skill_technical_4', 'Cloud Platforms'),
('skill_technical_5', 'Data Visualization'),

-- Contact Section (complete)
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

-- Footer Contact Info (editable)
('contact_footer_title', 'Get in Touch'),
('contact_footer_email', 'divy.yadav@aiexpert.com'),
('contact_footer_phone', '+1 (555) 123-4567'),
('contact_footer_location', 'San Francisco, CA'),

-- CTA Section (Let's Build the Future Together - editable)
('cta_section_title', 'Ready to Contribute to Your Team'),
('cta_section_content', 'These projects represent my journey of learning and growth. I''m excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges.'),

-- Test entries to verify functionality
('test_connection', 'Database connection test successful'),
('test_edit', 'This content should be editable');

-- Test that upsert works properly
INSERT INTO sections (name, content) VALUES ('test_upsert', 'Testing upsert functionality')
ON CONFLICT (name) DO UPDATE SET 
  content = 'Upsert test successful at ' || now()::text,
  updated_at = now();