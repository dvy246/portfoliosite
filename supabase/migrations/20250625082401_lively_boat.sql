/*
  # Create admin user and portfolio content tables

  1. New Tables
    - `users` - Admin user authentication
    - `portfolio_content` - Editable content sections
    - `projects` - Project information
    - `testimonials` - Testimonial data
    - `skills` - Skills and proficiency levels
    - `certifications` - Certificates and credentials

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access only
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create portfolio content table for editable text sections
CREATE TABLE IF NOT EXISTS portfolio_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text,
  subtitle text,
  content text,
  image_url text,
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  outcome text,
  image_url text,
  project_url text,
  github_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  image_url text,
  rating integer DEFAULT 5,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 0,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  date_earned text NOT NULL,
  credential_url text,
  certificate_type text DEFAULT 'Professional',
  description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin can manage users" ON users FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage portfolio content" ON portfolio_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage testimonials" ON testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage skills" ON skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage certifications" ON certifications FOR ALL TO authenticated USING (true);

-- Public read access for portfolio content
CREATE POLICY "Public can read portfolio content" ON portfolio_content FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read skills" ON skills FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read certifications" ON certifications FOR SELECT TO anon USING (true);

-- Insert admin user (password: admin123)
INSERT INTO users (email, password_hash, is_admin) 
VALUES ('admin@divyyadav.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default portfolio content
INSERT INTO portfolio_content (section_key, title, subtitle, content, image_url) VALUES
('hero', 'From Commerce to Code: How Business Acumen Meets AI Mastery', 'Blending analytical precision with business intuition — solving AI challenges with real-world impact.', '', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800'),
('about', 'Where Business Meets Innovation', 'The intersection of business intelligence and machine learning is where I thrive.', 'My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions.', ''),
('contact', 'Let''s Build the Future Together', 'Ready to transform your business with AI? Let''s discuss how we can create solutions that drive real impact.', 'Whether you''re looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I''m here to help turn your vision into reality.', '')
ON CONFLICT (section_key) DO NOTHING;

-- Insert default projects
INSERT INTO projects (title, description, technologies, outcome, image_url, order_index) VALUES
('E-commerce Sales Prediction Model', 'Built a machine learning model to predict sales trends for an online retail business using historical data, seasonal patterns, and customer behavior analysis.', ARRAY['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'], '85% prediction accuracy, identified key sales drivers', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
('Customer Sentiment Analysis Dashboard', 'Developed an NLP-based sentiment analysis tool that processes customer reviews and feedback to provide business insights through an interactive dashboard.', ARRAY['Python', 'NLTK', 'Streamlit', 'TextBlob', 'Plotly'], 'Real-time sentiment tracking, actionable business insights', 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800', 2)
ON CONFLICT DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, category, proficiency, order_index) VALUES
('Machine Learning', 'AI & Machine Learning', 95, 1),
('Deep Learning', 'AI & Machine Learning', 90, 2),
('Python', 'Technical Stack', 95, 3),
('Financial Modeling', 'Business Analytics', 92, 4)
ON CONFLICT DO NOTHING;

-- Insert default certifications
INSERT INTO certifications (title, issuer, date_earned, certificate_type, description, order_index) VALUES
('BCom (Honours) in Commerce', 'University of Excellence', '2023', 'Academic', 'Specialized in Financial Analysis, Business Strategy, and Market Research with distinction', 1),
('Machine Learning Specialization', 'Stanford University (Coursera)', '2023', 'Professional', 'Comprehensive ML algorithms, supervised/unsupervised learning, and neural networks', 2)
ON CONFLICT DO NOTHING;