/*
  # Fix updated_at column and ensure proper schema

  1. Database Schema
    - Add updated_at column to sections table if missing
    - Create auto-update trigger function
    - Set up trigger to auto-update timestamp on row changes
    - Ensure RLS policies are properly configured

  2. Security
    - Enable RLS on sections table
    - Create comprehensive public policies for all operations
*/

-- 1.1 Add the updated_at column if missing
ALTER TABLE public.sections
ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 1.2 Create (or replace) the function to auto-stamp updates
CREATE OR REPLACE FUNCTION public.trigger_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1.3 Drop any old trigger, then create the new trigger
DROP TRIGGER IF EXISTS update_updated_at_trigger ON public.sections;
CREATE TRIGGER update_updated_at_trigger
  BEFORE UPDATE ON public.sections
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_updated_at();

-- 2. Re-enable Row Level Security (RLS) on sections and re-apply public policies
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read" ON public.sections;
DROP POLICY IF EXISTS "Public upsert" ON public.sections;
DROP POLICY IF EXISTS "Public update" ON public.sections;
DROP POLICY IF EXISTS "Public read access" ON public.sections;
DROP POLICY IF EXISTS "Public insert access" ON public.sections;
DROP POLICY IF EXISTS "Public update access" ON public.sections;
DROP POLICY IF EXISTS "Public delete access" ON public.sections;

-- Create comprehensive policies
CREATE POLICY "Public read" ON public.sections
  FOR SELECT USING (true);

CREATE POLICY "Public upsert" ON public.sections
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update" ON public.sections
  FOR UPDATE USING (true);

-- 3. Update existing records to have proper updated_at values
UPDATE public.sections 
SET updated_at = COALESCE(created_at, now()) 
WHERE updated_at IS NULL;

-- 4. Test manual upsert to confirm it works
INSERT INTO public.sections (name, content)
VALUES ('contact', 'Testing updated_at fix.')
ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content;

-- 5. Insert default content if missing
INSERT INTO public.sections (name, content) VALUES
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