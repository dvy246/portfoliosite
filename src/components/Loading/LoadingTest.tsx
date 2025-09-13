import React, { useEffect, useState } from 'react';
import { PageContentProvider, usePageContent } from '../../contexts/PageContentContext';
import PageLoader from './PageLoader';

// Test component to verify loading coordination
const LoadingTestContent: React.FC = () => {
  const { isPageLoading, loadingProgress, allSectionsLoaded } = usePageContent();
  const [testSections, setTestSections] = useState<string[]>([]);

  useEffect(() => {
    // Simulate sections loading over time
    const timers = [
      setTimeout(() => setTestSections(prev => [...prev, 'hero']), 1000),
      setTimeout(() => setTestSections(prev => [...prev, 'about']), 2000),
      setTimeout(() => setTestSections(prev => [...prev, 'skills']), 3000),
      setTimeout(() => setTestSections(prev => [...prev, 'projects']), 4000),
      setTimeout(() => setTestSections(prev => [...prev, 'contact']), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PageLoader isLoading={isPageLoading} progress={loadingProgress} />
      
      <div className={`transition-opacity duration-500 ${isPageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-3xl font-bold mb-8">Loading Coordination Test</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Loading Status</h2>
          <div className="space-y-2">
            <p><strong>Page Loading:</strong> {isPageLoading ? 'Yes' : 'No'}</p>
            <p><strong>Progress:</strong> {Math.round(loadingProgress)}%</p>
            <p><strong>All Sections Loaded:</strong> {allSectionsLoaded ? 'Yes' : 'No'}</p>
            <p><strong>Test Sections:</strong> {testSections.join(', ')}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['hero', 'about', 'skills', 'projects', 'contact'].map(section => (
            <div 
              key={section}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                testSections.includes(section) 
                  ? 'bg-green-100 border-green-500' 
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <h3 className="font-semibold capitalize">{section} Section</h3>
              <p className="text-sm text-gray-600">
                {testSections.includes(section) ? 'Loaded' : 'Loading...'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoadingTest: React.FC = () => {
  return (
    <PageContentProvider>
      <LoadingTestContent />
    </PageContentProvider>
  );
};

export default LoadingTest;