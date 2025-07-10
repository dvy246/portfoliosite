/*
  # Add additional fields to portfolio_content for hero section

  1. Changes
    - Add badge field for hero section badge text
    - Add cta_text field for call-to-action button text
    - Add floating_badge field for floating badge text
    - Add scroll_text field for scroll indicator text

  2. Security
    - No changes to existing RLS policies
*/

DO $$
BEGIN
  -- Add badge field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_content' AND column_name = 'badge'
  ) THEN
    ALTER TABLE portfolio_content ADD COLUMN badge text;
  END IF;

  -- Add cta_text field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_content' AND column_name = 'cta_text'
  ) THEN
    ALTER TABLE portfolio_content ADD COLUMN cta_text text;
  END IF;

  -- Add floating_badge field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_content' AND column_name = 'floating_badge'
  ) THEN
    ALTER TABLE portfolio_content ADD COLUMN floating_badge text;
  END IF;

  -- Add scroll_text field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_content' AND column_name = 'scroll_text'
  ) THEN
    ALTER TABLE portfolio_content ADD COLUMN scroll_text text;
  END IF;
END $$;

-- Update hero content with engaging hook
UPDATE portfolio_content 
SET 
  title = 'Hey, Divy here! 👋 Where Finance Meets Future Tech',
  subtitle = 'I''m that rare breed who speaks both spreadsheet and Python fluently. Fresh BCom grad turned AI enthusiast, ready to solve your business puzzles with cutting-edge tech solutions.',
  badge = 'Finance + AI = Business Magic ✨',
  cta_text = 'Let''s Solve Problems Together',
  floating_badge = 'AI',
  scroll_text = 'Discover My Journey'
WHERE section_key = 'hero';