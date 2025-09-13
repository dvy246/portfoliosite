// Static content fallbacks to prevent flickering during load
export const STATIC_CONTENT = {
  // Hero section
  hero_title: "Hey, Divy here! 👋 Finance Meets Tech",
  hero_subtitle: "BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.",
  hero_badge: "Finance + AI Professional",
  hero_cta_text: "Let's Solve Problems Together",
  hero_floating_badge: "AI",
  hero_scroll_text: "Discover More",
  profile_photo: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800",

  // About section
  about_title: "Where Business Meets Innovation",
  about_subtitle: "The intersection of business intelligence and machine learning is where I thrive.",
  about_content: "My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions.",
  about_journey_title: "My Journey",

  // Skills section
  skills_title: "Core",
  skills_subtitle: "Expertise",
  skills_ai_title: "AI & Machine Learning",
  skills_business_title: "Business Analytics", 
  skills_technical_title: "Technical Stack",
  skills_differentiator_title: "What Sets Me Apart",
  skills_differentiator_subtitle: "The rare combination of deep technical expertise and business strategic thinking",

  // Individual AI skills
  skill_ai_1: "Machine Learning",
  skill_ai_2: "Deep Learning", 
  skill_ai_3: "Natural Language Processing",
  skill_ai_4: "Computer Vision",
  skill_ai_5: "MLOps",

  // Individual Business skills
  skill_business_1: "Financial Modeling",
  skill_business_2: "Business Intelligence",
  skill_business_3: "Decision Optimization", 
  skill_business_4: "Market Analysis",
  skill_business_5: "Strategic Planning",

  // Individual Technical skills
  skill_technical_1: "Python",
  skill_technical_2: "TensorFlow/PyTorch",
  skill_technical_3: "SQL/NoSQL",
  skill_technical_4: "Cloud Platforms", 
  skill_technical_5: "Data Visualization",

  // Projects section
  cta_section_title: "Ready to Contribute to Your Team",
  cta_section_content: "These projects represent my journey of learning and growth. I'm excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges.",

  // Contact section
  contact_title: "Let's Build the Future Together",
  contact_subtitle: "Ready to transform your business with AI? Let's discuss how we can create solutions that drive real impact.",
  contact_content: "Whether you're looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I'm here to help turn your vision into reality.",
  contact_section_title: "Get in Touch",
  contact_email: "your.email@example.com",
  contact_phone: "+1 (555) 123-4567",
  contact_location: "Your City, Country",
  contact_social_title: "Connect With Me",
  contact_linkedin_url: "https://linkedin.com/in/yourprofile",
  contact_github_url: "https://github.com/yourprofile", 
  contact_twitter_url: "https://twitter.com/yourprofile",
  contact_form_title: "Start a Conversation",
  contact_name_label: "Full Name *",
  contact_email_label: "Email Address *",
  contact_company_label: "Company/Organization",
  contact_message_label: "Project Details *",
  contact_button_text: "Send Message",
  contact_footer_text: "I typically respond within 24 hours. For urgent matters, feel free to call directly.",

  // Certifications
  certifications_title: "Certificates & Continuous Learning"
} as const;

export type ContentKey = keyof typeof STATIC_CONTENT;