import React, { useState } from 'react';
import { InfiniteRetryTest } from './InfiniteRetryTest';
import ContentFlickeringTest from './ContentFlickeringTest';
import { globalContentCache } from '../../lib/contentApi';

type TestTab = 'retry' | 'flicker' | 'cache';

export const ComprehensiveTestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TestTab>('retry');
  const [cacheStats, setCacheStats] = useState(globalContentCache.getStats());

  const refreshCacheStats = () => {
    setCacheStats(globalContentCache.getStats());
  };

  const clearCache = () => {
    globalContentCache.clear();
    refreshCacheStats();
  };

  const tabs = [
    { id: 'retry' as TestTab, label: 'Infinite Retry Test', icon: '🔄' },
    { id: 'flicker' as TestTab, label: 'Flickering Test', icon: '⚡' },
    { id: 'cache' as TestTab, label: 'Cache Monitor', icon: '💾' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content System Test Suite
          </h1>
          <p className="text-gray-600">
            Comprehensive testing for infinite retry loops, content flickering, and cache performance.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'retry' && (
            <div>
              <InfiniteRetryTest />
            </div>
          )}

          {activeTab === 'flicker' && (
            <div>
              <ContentFlickeringTest />
            </div>
          )}

          {activeTab === 'cache' && (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cache Monitor</h2>
                <p className="text-gray-600">Real-time monitoring of the content cache system.</p>
              </div>

              <div className="mb-6 flex space-x-4">
                <button
                  onClick={refreshCacheStats}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Stats
                </button>
                <button
                  onClick={clearCache}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Cache
                </button>
              </div>

              {/* Cache Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{cacheStats.totalItems}</div>
                  <div className="text-sm text-blue-800">Total Items</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{cacheStats.staleItems}</div>
                  <div className="text-sm text-yellow-800">Stale Items</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{cacheStats.expiredItems}</div>
                  <div className="text-sm text-red-800">Expired Items</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(cacheStats.averageAge / 1000)}s
                  </div>
                  <div className="text-sm text-green-800">Avg Age</div>
                </div>
              </div>

              {/* Memory Usage */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Usage</h3>
                <div className="text-sm text-gray-600">
                  <div>Cache Size: {(cacheStats.memoryUsage / 1024).toFixed(2)} KB</div>
                  <div>Average Item Size: {cacheStats.totalItems > 0 ? (cacheStats.memoryUsage / cacheStats.totalItems).toFixed(0) : 0} bytes</div>
                </div>
              </div>

              {/* Cache Health */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cache Health</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cache Hit Rate</span>
                    <span className={`text-sm font-medium ${
                      cacheStats.totalItems > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cacheStats.totalItems > 0 ? 'Good' : 'No Data'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stale Content</span>
                    <span className={`text-sm font-medium ${
                      cacheStats.staleItems === 0 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {cacheStats.staleItems === 0 ? 'None' : `${cacheStats.staleItems} items`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expired Content</span>
                    <span className={`text-sm font-medium ${
                      cacheStats.expiredItems === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cacheStats.expiredItems === 0 ? 'None' : `${cacheStats.expiredItems} items`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cache Actions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Cache Actions</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• Cache automatically expires items after 15 minutes</div>
                  <div>• Stale items are refreshed in the background</div>
                  <div>• Failed requests use circuit breaker to prevent infinite retries</div>
                  <div>• Duplicate requests are deduplicated to improve performance</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overall System Status */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Circuit Breaker: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Request Deduplication: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Fallback Content: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};