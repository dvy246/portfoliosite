import React, { useState, useEffect } from 'react';
import { useContentContext } from '../../contexts/ContentContext';

interface CacheMonitorProps {
  isVisible?: boolean;
}

export const CacheMonitor: React.FC<CacheMonitorProps> = ({ isVisible = false }) => {
  const { getCacheStats, refreshContent, invalidateContent } = useContentContext();
  const [stats, setStats] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Update stats periodically
  useEffect(() => {
    if (!isVisible) return;

    const updateStats = () => {
      setStats(getCacheStats());
    };

    updateStats();
    const interval = setInterval(updateStats, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isVisible, getCacheStats]);

  if (!isVisible || !stats) {
    return null;
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${Math.round(ms / 1000)}s`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono z-50 max-w-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold">Cache Monitor</h3>
        <span className="text-gray-400">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-gray-400">Items:</div>
              <div className="text-green-400">{stats.totalItems}</div>
            </div>
            <div>
              <div className="text-gray-400">Memory:</div>
              <div className="text-blue-400">{formatBytes(stats.memoryUsage)}</div>
            </div>
            <div>
              <div className="text-gray-400">Stale:</div>
              <div className="text-yellow-400">{stats.staleItems}</div>
            </div>
            <div>
              <div className="text-gray-400">Expired:</div>
              <div className="text-red-400">{stats.expiredItems}</div>
            </div>
          </div>

          <div>
            <div className="text-gray-400">Avg Age:</div>
            <div className="text-gray-300">{formatTime(stats.averageAge)}</div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                // Refresh all content (this is for demo - in real app you'd be more selective)
                const allContentNames = [
                  'hero_title', 'hero_subtitle', 'about_title', 'about_content',
                  'skills_title', 'skills_subtitle'
                ];
                refreshContent(allContentNames).catch(console.error);
              }}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                // Clear cache (this is for demo - in real app you'd be more selective)
                const allContentNames = [
                  'hero_title', 'hero_subtitle', 'about_title', 'about_content',
                  'skills_title', 'skills_subtitle'
                ];
                invalidateContent(allContentNames);
              }}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CacheMonitor;