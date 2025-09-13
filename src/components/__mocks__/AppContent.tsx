import React from 'react';
import { usePageContent } from '../../contexts/PageContentContext';

const MockHero = () => <div data-testid="mock-hero">Hero Section</div>;
const MockAbout = () => <div data-testid="mock-about">About Section</div>;
const MockSkills = () => <div data-testid="mock-skills">Skills Section</div>;
const MockProjects = () => <div data-testid="mock-projects">Projects Section</div>;
const MockCertifications = () => <div data-testid="mock-certifications">Certifications Section</div>;
const MockContact = () => <div data-testid="mock-contact">Contact Section</div>;
const MockHeader = () => <header data-testid="mock-header">Header</header>;
const MockFooter = () => <footer data-testid="mock-footer">Footer</footer>;

const AppContent = () => {
  const { isPageLoading } = usePageContent();

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
          <p className="text-navy-600 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="app-content">
      <MockHeader />
      <main>
        <MockHero />
        <MockAbout />
        <MockSkills />
        <MockProjects />
        <MockCertifications />
        <MockContact />
      </main>
      <MockFooter />
    </div>
  );
};

export default AppContent;
