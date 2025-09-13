import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PageContentProvider } from './contexts/PageContentContext';

// Mock the components that use import.meta.env
jest.mock('./components/Sections/Hero', () => () => <div data-testid="mock-hero">Hero Section</div>);
jest.mock('./components/Sections/About', () => () => <div data-testid="mock-about">About Section</div>);
jest.mock('./components/Sections/Skills', () => () => <div data-testid="mock-skills">Skills Section</div>);
jest.mock('./components/Sections/Projects', () => () => <div data-testid="mock-projects">Projects Section</div>);
jest.mock('./components/Sections/Certifications', () => () => <div data-testid="mock-certifications">Certifications Section</div>);
jest.mock('./components/Sections/Contact', () => () => <div data-testid="mock-contact">Contact Section</div>);
jest.mock('./components/Layout/Header', () => () => <header data-testid="mock-header">Header</header>);
jest.mock('./components/Layout/Footer', () => () => <footer data-testid="mock-footer">Footer</footer>);

function App() {
  return (
    <Router>
      <AuthProvider>
        <PageContentProvider>
          <div data-testid="app-container">
            <Toaster position="top-right" />
            <header data-testid="mock-header">Header</header>
            <main>
              <div data-testid="mock-hero">Hero Section</div>
              <div data-testid="mock-about">About Section</div>
              <div data-testid="mock-skills">Skills Section</div>
              <div data-testid="mock-projects">Projects Section</div>
              <div data-testid="mock-certifications">Certifications Section</div>
              <div data-testid="mock-contact">Contact Section</div>
            </main>
            <footer data-testid="mock-footer">Footer</footer>
          </div>
        </PageContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
