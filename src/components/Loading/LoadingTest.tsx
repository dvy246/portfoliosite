import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const LoadingTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');

  const simulateLoading = async () => {
    setIsLoading(true);
    
    const stages = [
      'Initializing...',
      'Loading content...',
      'Processing data...',
      'Finalizing...'
    ];

    for (const stage of stages) {
      setLoadingStage(stage);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsLoading(false);
    setLoadingStage('Complete!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Loader2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Loading Test</h3>
      </div>

      <div className="space-y-4">
        {/* Loading Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : loadingStage === 'Complete!' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <p className="font-medium text-gray-900">Loading Status</p>
              <p className="text-sm text-gray-600">
                {loadingStage || 'Ready to test'}
              </p>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <div className="flex justify-center">
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Loading...' : 'Start Loading Test'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingTest;