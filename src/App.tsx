import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import { ComprehensiveTestPage } from './components/Test/ComprehensiveTestPage';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Resume from './components/Sections/Resume';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

// All content names used across the entire page
const ALL_PAGE_CONTENT_NAMES = [
  // Hero section
  'hero_title', 'hero_subtitle', 'hero_badge', 'hero_cta_text', 'hero_floating_badge', 'hero_scroll_text', 'profile_photo',
  
  // About section
  'about_title', 'about_subtitle', 'about_content', 'about_journey_title',
  
  // Skills section
  'skills_title', 'skills_subtitle', 'skills_differentiator_title', 'skills_differentiator_subtitle',
  
  // Projects section
  'cta_section_title', 'cta_section_content',

  // Resume section
  'resume_title', 'resume_subtitle', 'resume_pdf_url',
  'resume_highlights_1', 'resume_highlights_2', 'resume_highlights_3', 'resume_highlights_4',

  // Contact section
  'contact_title', 'contact_subtitle', 'contact_content', 'contact_section_title',
  'contact_email', 'contact_phone', 'contact_location', 'contact_social_title',
  'contact_linkedin_url', 'contact_github_url', 'contact_twitter_url',
  'contact_form_title', 'contact_name_label', 'contact_email_label',
  'contact_company_label', 'contact_message_label', 'contact_button_text', 'contact_footer_text',
  
  // Certifications section
  'certifications_title'
];

const AppContent: React.FC = () => {
  // Check if we should show the test page
  const urlParams = new URLSearchParams(window.location.search);
  const showTestPage = urlParams.get('test') === 'true';

  // Show test page if requested
  if (showTestPage) {
    return (
      <>
        <ComprehensiveTestPage />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </>
    );
  }

  // Main portfolio - renders immediately, no loading states
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider preloadNames={ALL_PAGE_CONTENT_NAMES}>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;