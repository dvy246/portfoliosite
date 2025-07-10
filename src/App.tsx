import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
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

function App() {
  useEffect(() => {
    // CRITICAL: Test Supabase connection and database operations
    const runCriticalTests = async () => {
      console.log('🚨 RUNNING CRITICAL SUPABASE TESTS...');
      
      // Test 1: Basic connection
      const connected = await testSupabaseConnection();
      if (!connected) {
        console.error('💥 CRITICAL: Supabase connection failed!');
        return;
      }
      
      // Test 2: Direct save test
      try {
        console.log('🔥 Testing direct save functionality...');
        await directSaveTest('app_test', 'App loaded at ' + new Date().toISOString());
        console.log('🎉 CRITICAL SUCCESS: Direct save test passed!');
        console.log('🎉 EDITING SHOULD NOW WORK PROPERLY!');
      } catch (err) {
        console.error('💥 CRITICAL: Direct save test failed:', err);
      }
      
      // Test 3: Setup storage bucket
      try {
        console.log('🔧 Setting up storage bucket...');
        await runFullSetup();
        console.log('✅ Storage setup completed!');
      } catch (err) {
        console.error('❌ Storage setup failed:', err);
      }
    };
    
    runCriticalTests();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
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
      </AuthProvider>
    </Router>
  );
}

export default App;