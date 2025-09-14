import React, { useState } from 'react';
import { bulkFetchContent, globalContentCache } from '../../lib/contentApi';

interface TestResult {
  testName: string;
  status: 'running' | 'passed' | 'failed';
  message: string;
  duration?: number;
}

export const InfiniteRetryTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Circuit Breaker Test
    addResult({ testName: 'Circuit Breaker Test', status: 'running', message: 'Testing retry limits...' });
    const startTime1 = Date.now();
    
    try {
      // Make multiple requests to trigger circuit breaker
      const promises = Array.from({ length: 5 }, () => 
        bulkFetchContent(['nonexistent_content_' + Math.random()])
      );
      
      const results = await Promise.all(promises);
      const duration1 = Date.now() - startTime1;
      
      // Check if circuit breaker activated (should return fallback content)
      const hasCircuitBreaker = results.some(result => 
        result.error?.includes('Circuit breaker') || result.error?.includes('cooldown')
      );
      
      if (hasCircuitBreaker && duration1 < 30000) { // Should complete quickly due to circuit breaker
        addResult({ 
          testName: 'Circuit Breaker Test', 
          status: 'passed', 
          message: `Circuit breaker activated correctly in ${duration1}ms`,
          duration: duration1
        });
      } else {
        addResult({ 
          testName: 'Circuit Breaker Test', 
          status: 'failed', 
          message: `Circuit breaker not working properly. Duration: ${duration1}ms`,
          duration: duration1
        });
      }
    } catch (error) {
      addResult({ 
        testName: 'Circuit Breaker Test', 
        status: 'failed', 
        message: `Unexpected error: ${error}`,
        duration: Date.now() - startTime1
      });
    }

    // Test 2: Request Deduplication Test
    addResult({ testName: 'Request Deduplication Test', status: 'running', message: 'Testing duplicate request handling...' });
    const startTime2 = Date.now();
    
    try {
      // Make identical concurrent requests
      const contentNames = ['hero_title', 'about_title'];
      const promises = Array.from({ length: 3 }, () => 
        bulkFetchContent(contentNames)
      );
      
      const results = await Promise.all(promises);
      const duration2 = Date.now() - startTime2;
      
      // All results should be identical (deduplication working)
      const allIdentical = results.every(result => 
        JSON.stringify(result.content) === JSON.stringify(results[0].content)
      );
      
      if (allIdentical && duration2 < 15000) {
        addResult({ 
          testName: 'Request Deduplication Test', 
          status: 'passed', 
          message: `Request deduplication working correctly in ${duration2}ms`,
          duration: duration2
        });
      } else {
        addResult({ 
          testName: 'Request Deduplication Test', 
          status: 'failed', 
          message: `Request deduplication failed. Duration: ${duration2}ms`,
          duration: duration2
        });
      }
    } catch (error) {
      addResult({ 
        testName: 'Request Deduplication Test', 
        status: 'failed', 
        message: `Unexpected error: ${error}`,
        duration: Date.now() - startTime2
      });
    }

    // Test 3: Fallback Content Test
    addResult({ testName: 'Fallback Content Test', status: 'running', message: 'Testing fallback content delivery...' });
    const startTime3 = Date.now();
    
    try {
      const result = await bulkFetchContent(['hero_title', 'about_title']);
      const duration3 = Date.now() - startTime3;
      
      // Should always return content (either from API or fallback)
      const hasContent = Object.keys(result.content).length > 0 && 
        Object.values(result.content).every(content => content && content.length > 0);
      
      if (hasContent) {
        addResult({ 
          testName: 'Fallback Content Test', 
          status: 'passed', 
          message: `Fallback content delivered correctly in ${duration3}ms`,
          duration: duration3
        });
      } else {
        addResult({ 
          testName: 'Fallback Content Test', 
          status: 'failed', 
          message: `No content returned. Duration: ${duration3}ms`,
          duration: duration3
        });
      }
    } catch (error) {
      addResult({ 
        testName: 'Fallback Content Test', 
        status: 'failed', 
        message: `Unexpected error: ${error}`,
        duration: Date.now() - startTime3
      });
    }

    // Test 4: Cache Performance Test
    addResult({ testName: 'Cache Performance Test', status: 'running', message: 'Testing cache performance...' });
    const startTime4 = Date.now();
    
    try {
      // First request (should hit API)
      await bulkFetchContent(['hero_title']);
      const firstRequestTime = Date.now() - startTime4;
      
      // Second request (should hit cache)
      const cacheStartTime = Date.now();
      const cachedContent = globalContentCache.get('hero_title');
      const cacheTime = Date.now() - cacheStartTime;
      
      if (cachedContent && cacheTime < 10) { // Cache should be very fast
        addResult({ 
          testName: 'Cache Performance Test', 
          status: 'passed', 
          message: `Cache working correctly. First: ${firstRequestTime}ms, Cache: ${cacheTime}ms`,
          duration: Date.now() - startTime4
        });
      } else {
        addResult({ 
          testName: 'Cache Performance Test', 
          status: 'failed', 
          message: `Cache not working properly. Cache time: ${cacheTime}ms`,
          duration: Date.now() - startTime4
        });
      }
    } catch (error) {
      addResult({ 
        testName: 'Cache Performance Test', 
        status: 'failed', 
        message: `Unexpected error: ${error}`,
        duration: Date.now() - startTime4
      });
    }

    setIsRunning(false);
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'running': return 'text-blue-600';
      case 'passed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running': return '🔄';
      case 'passed': return '✅';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Infinite Retry Loop Fix Test</h2>
        <p className="text-gray-600">Testing the fixes for infinite retry loops and content flickering issues.</p>
      </div>

      <div className="mb-6">
        <button
          onClick={runTests}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isRunning 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {getStatusIcon(result.status)} {result.testName}
              </h3>
              {result.duration && (
                <span className="text-sm text-gray-500">
                  {result.duration}ms
                </span>
              )}
            </div>
            <p className={`text-sm ${getStatusColor(result.status)}`}>
              {result.message}
            </p>
          </div>
        ))}
      </div>

      {testResults.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {testResults.filter(r => r.status === 'passed').length}
              </div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter(r => r.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {testResults.filter(r => r.status === 'running').length}
              </div>
              <div className="text-sm text-gray-600">Running</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};