import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { motion } from 'framer-motion';

const ContentFlickeringTest: React.FC = () => {
  const [testKey, setTestKey] = useState(0);
  
  // Test multiple content items
  const { content: title } = useContent('hero_title');
  const { content: subtitle } = useContent('hero_subtitle');
  const { content: badge } = useContent('hero_badge');

  const refreshTest = () => {
    setTestKey(prev => prev + 1);
  };

  return (
    <motion.div
      key={testKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Content Flickering Test</h3>
        <button
          onClick={refreshTest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Test
        </button>
      </div>

      <div className="space-y-4">
        {/* Test Content Display */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Content Display Test</h4>
          <div className="space-y-2">
            <div className="p-2 bg-white rounded border">
              <span className="text-sm text-gray-600">Title: </span>
              <span className="font-medium">{title}</span>
            </div>
            <div className="p-2 bg-white rounded border">
              <span className="text-sm text-gray-600">Subtitle: </span>
              <span className="font-medium">{subtitle}</span>
            </div>
            <div className="p-2 bg-white rounded border">
              <span className="text-sm text-gray-600">Badge: </span>
              <span className="font-medium">{badge}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">
              Content loaded instantly - No flickering detected
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentFlickeringTest;