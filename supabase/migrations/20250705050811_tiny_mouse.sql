/*
  # Add updated_at column to sections table

  1. Changes
    - Add updated_at column with default value and auto-update trigger
    - Create trigger function to automatically update the timestamp

  2. Security
    - No changes to existing RLS policies
*/

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sections' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE sections ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_updated_at ON sections;

-- Create the trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update existing rows to have updated_at values
UPDATE sections 
SET updated_at = COALESCE(created_at, now()) 
WHERE updated_at IS NULL;