import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useContentContext } from '../../contexts/ContentContext';

const ErrorHandlingDemo: React.FC = () => {
  const { error } = useContentContext();
  const [isRetrying, setIsRetrying] = useState(false);

  const simulateRetry = async () => {
    setIsRetrying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRetrying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Error Handling Demo</h3>
      </div>

      {/* Error Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {error ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <div>
              <p className="font-medium text-gray-900">Content Loading Status</p>
              <p className="text-sm text-gray-600">
                {error ? 'Error detected' : 'All systems operational'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {error ? 'Failed' : 'Success'}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800">Error Details</h4>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Retry Button */}
        <div className="flex justify-center">
          <button
            onClick={simulateRetry}
            disabled={isRetrying}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Retrying...' : 'Test Retry'}</span>
          </button>
        </div>

        {/* Recovery Status */}
        <div className="text-center text-sm text-gray-600">
          <p>Error recovery mechanisms are active and monitoring content loading.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorHandlingDemo;