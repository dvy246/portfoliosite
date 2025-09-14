import React from 'react';

const DeploymentTest: React.FC = () => {
  // Simple environment variable check
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isDev = import.meta.env.DEV;
  const mode = import.meta.env.MODE;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 Simple Test</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>VITE_SUPABASE_URL:</span>
              <span className={supabaseUrl ? 'text-green-600' : 'text-red-600'}>
                {supabaseUrl ? '✅ Set' : '❌ Missing'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>VITE_SUPABASE_ANON_KEY:</span>
              <span className={supabaseKey ? 'text-green-600' : 'text-red-600'}>
                {supabaseKey ? '✅ Set' : '❌ Missing'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Mode:</span>
              <span className="text-blue-600">{mode}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Development:</span>
              <span className="text-blue-600">{isDev ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          
          {supabaseUrl && supabaseKey ? (
            <div className="text-green-600 font-medium text-center">
              ✅ Configuration looks good!
            </div>
          ) : (
            <div className="text-red-600 font-medium text-center">
              ❌ Missing environment variables
            </div>
          )}
          
          <div className="mt-4 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentTest;