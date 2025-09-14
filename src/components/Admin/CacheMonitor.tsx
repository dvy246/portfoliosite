import React from 'react';
import { motion } from 'framer-motion';
import { Database, RefreshCw, Trash2, Activity } from 'lucide-react';
import { useContentContext } from '../../contexts/ContentContext';

const CacheMonitor: React.FC = () => {
  const { error } = useContentContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Content Cache Monitor</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Active</span>
        </div>
      </div>

      {/* Cache Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-900">--</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Hit Rate</p>
              <p className="text-2xl font-bold text-green-900">--</p>
            </div>
            <Database className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Stale Items</p>
              <p className="text-2xl font-bold text-yellow-900">--</p>
            </div>
            <RefreshCw className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Errors</p>
              <p className="text-2xl font-bold text-red-900">{error ? '1' : '0'}</p>
            </div>
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Cache Status</span>
          <span className="text-sm font-medium text-green-600">Operational</span>
        </div>
        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CacheMonitor;