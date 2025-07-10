/*
  # Fix missing content keys and add comprehensive sections

  1. New Content Keys
    - Add all missing contact section keys
    - Add individual skill items as separate editable fields
    - Add footer contact information keys

  2. Security
    - Maintain existing RLS policies
    - All content publicly readable and editable
*/

-- Insert all missing contact and footer content keys
INSERT INTO sections (name, content) VALUES
-- Contact footer section (Get in Touch)
('contact_footer_title', 'Get in Touch'),
('contact_footer_email', 'divy.yadav@aiexpert.com'),
('contact_footer_phone', '+1 (555) 123-4567'),
('contact_footer_location', 'San Francisco, CA'),

-- Individual AI & ML Skills (editable separately)
('skill_ai_1', 'Machine Learning'),
('skill_ai_2', 'Deep Learning'),
('skill_ai_3', 'Natural Language Processing'),
('skill_ai_4', 'Computer Vision'),
('skill_ai_5', 'MLOps'),

-- Individual Business Skills (editable separately)
('skill_business_1', 'Financial Modeling'),
('skill_business_2', 'Business Intelligence'),
('skill_business_3', 'Decision Optimization'),
('skill_business_4', 'Market Analysis'),
('skill_business_5', 'Strategic Planning'),

-- Individual Technical Skills (editable separately)
('skill_technical_1', 'Python'),
('skill_technical_2', 'TensorFlow/PyTorch'),
('skill_technical_3', 'SQL/NoSQL'),
('skill_technical_4', 'Cloud Platforms'),
('skill_technical_5', 'Data Visualization'),

-- CTA Section (Let's Build the Future Together)
('cta_section_title', 'Ready to Contribute to Your Team'),
('cta_section_content', 'These projects represent my journey of learning and growth. I''m excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges.'),

-- Skills section titles
('skills_title', 'Core'),
('skills_subtitle', 'Expertise'),
('skills_ai_title', 'AI & Machine Learning'),
('skills_business_title', 'Business Analytics'),
('skills_technical_title', 'Technical Stack'),
('skills_differentiator_title', 'What Sets Me Apart'),
('skills_differentiator_subtitle', 'The rare combination of deep technical expertise and business strategic thinking')

ON CONFLICT (name) DO UPDATE SET 
  content = EXCLUDED.content,
  updated_at = now();