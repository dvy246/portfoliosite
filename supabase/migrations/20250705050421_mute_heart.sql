/*
  # Fix sections table policies for content editing

  1. Ensure sections table exists with correct structure
  2. Enable RLS and create proper policies for public access
  3. Insert test data to verify functionality
*/

-- Create sections table if it doesn't exist
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read" ON sections;
DROP POLICY IF EXISTS "Public upsert" ON sections;
DROP POLICY IF EXISTS "Public update" ON sections;
DROP POLICY IF EXISTS "Enable read access for all users" ON sections;
DROP POLICY IF EXISTS "Enable insert access for all users" ON sections;
DROP POLICY IF EXISTS "Enable update access for all users" ON sections;

-- Create comprehensive policies for public access
CREATE POLICY "Public read access" ON sections FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON sections FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON sections FOR DELETE USING (true);

-- Insert test data to verify the table works
INSERT INTO sections (name, content) VALUES
('contact_test', 'Test message: Supabase editing should work now.')
ON CONFLICT (name) DO UPDATE SET 
  content = EXCLUDED.content,
  updated_at = now();

-- Insert some default content if it doesn't exist
INSERT INTO sections (name, content) VALUES
('hero_title', 'Hey, Divy here! 👋 Finance Meets Tech'),
('hero_subtitle', 'BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.'),
('hero_badge', 'Finance + AI Professional'),
('hero_cta_text', 'Let''s Solve Problems Together'),
('about_title', 'Where Business Meets Innovation'),
('about_subtitle', 'The intersection of business intelligence and machine learning is where I thrive.'),
('about_content', 'My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions.'),
('contact_title', 'Let''s Build the Future Together'),
('contact_subtitle', 'Ready to transform your business with AI? Let''s discuss how we can create solutions that drive real impact.')
ON CONFLICT (name) DO NOTHING;