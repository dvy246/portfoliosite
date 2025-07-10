export interface User {
  id: string;
  email: string;
  is_admin: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  outcome: string;
  image_url?: string;
  project_url?: string;
  github_url?: string;
  order_index: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image_url?: string;
  order_index: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'ai' | 'business' | 'technical';
  proficiency: number;
  order_index: number;
  created_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date_earned: string;
  credential_url?: string;
  order_index: number;
  created_at: string;
}