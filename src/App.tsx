import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PageContentProvider, usePageContent } from './contexts/PageContentContext';
import { testSupabaseConnection } from './lib/supabase';
import GlobalErrorBoundary from './components/ErrorBoundary/GlobalErrorBoundary';
import PageLoader from './components/Loading/PageLoader';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

const MainContent: React.FC = () => {
  const { isPageLoading, loadingProgress } = usePageContent();
  return (
    <>
      {/* Display the PageLoader overlay during loading */}
      <PageLoader isLoading={isPageLoading} progress={loadingProgress} />
      {/* Main content fades in when loading is complete */}
      <div className={`min-h-screen bg-white ${isPageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
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
      </div>
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const connected = await testSupabaseConnection();
        if (!connected) {
          console.error('💥 CRITICAL: Supabase connection failed!');
          return;
        }
        console.log('✅ Supabase connection initialized');
      } catch (err) {
        console.error('❌ Supabase initialization error:', err);
      }
    };
    initializeApp();
  }, []);

  return (
    <Router>
      <GlobalErrorBoundary>
        <AuthProvider>
          <PageContentProvider>
            <Suspense fallback={<PageLoader isLoading={true} progress={0} />}>
              <MainContent />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: { background: '#1e293b', color: '#fff', borderRadius: '12px' },
                }}
              />
            </Suspense>
          </PageContentProvider>
        </AuthProvider>
      </GlobalErrorBoundary>
    </Router>
  );
};

export default App;
