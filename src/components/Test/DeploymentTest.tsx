import React, { useEffect, useState } from 'react';

const DeploymentTest: React.FC = () => {
  const [envTest, setEnvTest] = useState<{
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;
    hasStaticContent: boolean;
  }>({
    supabaseUrl: undefined,
    supabaseKey: undefined,
    hasStaticContent: false
  });

  useEffect(() => {
    // Test environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Test static content import
    let hasStaticContent = false;
    try {
      // This should work if staticContent.ts exists
      import('../../data/staticContent').then(() => {
        setEnvTest(prev => ({ ...prev, hasStaticContent: true }));
      });
    } catch (error) {
      console.error('Static content import failed:', error);
    }

    setEnvTest({
      supabaseUrl,
      supabaseKey,
      hasStaticContent
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 Deployment Test</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Environment Variables Test */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🔧 Environment Variables</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 ${
                  envTest.supabaseUrl ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="font-medium">VITE_SUPABASE_URL:</span>
                <span className="ml-2 text-sm text-gray-600">
                  {envTest.supabaseUrl ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 ${
                  envTest.supabaseKey ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="font-medium">VITE_SUPABASE_ANON_KEY:</span>
                <span className="ml-2 text-sm text-gray-600">
                  {envTest.supabaseKey ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>

            {envTest.supabaseUrl && (
              <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                <strong>URL:</strong> {envTest.supabaseUrl}
              </div>
            )}
          </div>

          {/* Static Content Test */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📄 Static Content</h2>
            
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${
                envTest.hasStaticContent ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="font-medium">Static Fallbacks:</span>
              <span className="ml-2 text-sm text-gray-600">
                {envTest.hasStaticContent ? '✅ Available' : '❌ Missing'}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Static content provides fallbacks when Supabase is unavailable.
            </div>
          </div>

          {/* Build Info */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🏗️ Build Info</h2>
            
            <div className="space-y-2 text-sm">
              <div><strong>Mode:</strong> {import.meta.env.MODE}</div>
              <div><strong>Dev:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</div>
              <div><strong>Prod:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}</div>
            </div>
          </div>

          {/* Status Summary */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📊 Status</h2>
            
            {envTest.supabaseUrl && envTest.supabaseKey ? (
              <div className="text-green-600 font-medium">
                ✅ Ready for deployment!
              </div>
            ) : (
              <div className="text-red-600 font-medium">
                ❌ Environment variables missing
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              {envTest.hasStaticContent ? 
                "Site should work even without Supabase connection." :
                "Static content fallbacks may be missing."
              }
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 Next Steps</h3>
          
          {!envTest.supabaseUrl || !envTest.supabaseKey ? (
            <div className="text-blue-700">
              <p className="mb-2"><strong>Fix Environment Variables:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Check your deployment platform (Vercel/Netlify)</li>
                <li>Ensure variables are named exactly: <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code></li>
                <li>No typos (SUPABASE not SUPERBASE)</li>
                <li>Redeploy after fixing</li>
              </ol>
            </div>
          ) : (
            <div className="text-blue-700">
              <p>✅ Environment variables are correctly configured!</p>
              <p className="text-sm mt-2">Your portfolio should be working properly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentTest;