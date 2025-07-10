/*
  # Add image storage support and contact section content

  1. Storage Setup
    - Create public images bucket for file uploads
    - Set up storage policies for public access

  2. Contact Section Content
    - Insert all contact section editable fields into sections table
    - Ensure all contact information is editable via admin panel

  3. Security
    - Public read/write access to images bucket
    - Maintain existing RLS policies on sections table
*/

-- Create storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Create storage policies for public access
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;

CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public update access" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Public delete access" ON storage.objects
  FOR DELETE USING (bucket_id = 'images');

-- Insert comprehensive contact section content
INSERT INTO sections (name, content) VALUES
-- Contact section headers
('contact_title', 'Let''s Build the Future Together'),
('contact_subtitle', 'Ready to transform your business with AI? Let''s discuss how we can create solutions that drive real impact.'),
('contact_content', 'Whether you''re looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I''m here to help turn your vision into reality.'),
('contact_section_title', 'Get in Touch'),

-- Contact information
('contact_email', 'your.email@example.com'),
('contact_phone', '+1 (555) 123-4567'),
('contact_location', 'Your City, Country'),

-- Social links
('contact_social_title', 'Connect With Me'),
('contact_linkedin_url', 'https://linkedin.com/in/yourprofile'),
('contact_github_url', 'https://github.com/yourprofile'),
('contact_twitter_url', 'https://twitter.com/yourprofile'),

-- Contact form
('contact_form_title', 'Start a Conversation'),
('contact_name_label', 'Full Name *'),
('contact_email_label', 'Email Address *'),
('contact_company_label', 'Company/Organization'),
('contact_message_label', 'Project Details *'),
('contact_button_text', 'Send Message'),
('contact_footer_text', 'I typically respond within 24 hours. For urgent matters, feel free to call directly.'),

-- Hero section image URL
('hero_image_url', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800'),

-- About section content
('about_journey_title', 'My Journey'),
('about_video_title', 'Personal Introduction'),
('about_video_url', '')

ON CONFLICT (name) DO NOTHING;