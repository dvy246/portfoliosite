import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
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
    // 🚨 Disabled Supabase tests in production to stop flickering
    // If you ever need to debug Supabase again, re-enable the block below:

    // const runCriticalTests = async () => {
    //     console.log('🚨 RUNNING CRITICAL SUPABASE TESTS...');
    //     const connected = await testSupabaseConnection();
    //     if (!connected) {
    //         console.error('💥 CRITICAL: Supabase connection failed!');
    //         return;
    //     }
    //     try {
    //         await directSaveTest('app_test', 'App loaded at ' + new Date().toISOString());
    //         console.log('🎉 CRITICAL SUCCESS: Direct save test passed!');
    //     } catch (err) {
    //         console.error('💥 CRITICAL: Direct save test failed:', err);
    //     }
    //     try {
    //         await runFullSetup();
    //         console.log('✅ Storage setup completed!');
    //     } catch (err) {
    //         console.error('❌ Storage setup failed:', err);
    //     }
    // };
    // runCriticalTests();
}, []);


    return (_jsx(Router, { children: _jsx(AuthProvider, { children: _jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(About, {}), _jsx(Skills, {}), _jsx(Projects, {}), _jsx(Certifications, {}), _jsx(Contact, {})] }), _jsx(Footer, {}), _jsx(Toaster, { position: "top-right", toastOptions: {
                            duration: 4000,
                            style: {
                                background: '#1e293b',
                                color: '#fff',
                                borderRadius: '12px',
                            },
                        } })] }) }) }));
}
export default App;
