import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PageContentProvider, usePageContent } from './contexts/PageContentContext';
import { testSupabaseConnection, directSaveTest } from './lib/supabase';
import { runFullSetup } from './setupStorage';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import PageLoader from './components/Loading/PageLoader';

// Main App Content Component
const AppContent: React.FC = () => {
  const { isPageLoading, loadingProgress } = usePageContent();

  useEffect(() => {
    // Initialize Supabase connection in production-ready way
    const initializeApp = async () => {
      try {
        // Only run tests in development
        if (import.meta.env.DEV) {
          console.log('🔧 Development mode: Testing Supabase connection...');
          const connected = await testSupabaseConnection();
          if (connected) {
            console.log('✅ Supabase connection successful');
            // Setup storage in development
            await runFullSetup();
          }
        } else {
          // Production: Silent initialization
          await testSupabaseConnection();
        }
      } catch (err) {
        // Silent fail in production, log in development
        if (import.meta.env.DEV) {
          console.error('❌ App initialization error:', err);
        }
      }
    };
    
    initializeApp();
  }, []);

  return (
    <>
      {/* Simplified loading - only show for very brief initial load */}
      {isPageLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-2 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
            <p className="text-navy-600 font-medium">Loading Portfolio...</p>
          </div>
        </div>
      )}
      
      <div className={`min-h-screen bg-white transition-opacity duration-300 ${
        isPageLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
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
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PageContentProvider>
          <AppContent />
        </PageContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;