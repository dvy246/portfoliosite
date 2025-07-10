-- Update hero content with better messaging
UPDATE portfolio_content 
SET 
  title = 'Hey, Divy here! 👋 Finance Meets Tech',
  subtitle = 'BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.',
  badge = 'Finance + AI Professional',
  cta_text = 'Let''s Solve Problems Together',
  floating_badge = 'AI',
  scroll_text = 'Discover More'
WHERE section_key = 'hero';