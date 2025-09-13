import React, { useState } from 'react';
import { ContentErrorBoundary } from './ContentErrorBoundary';
import { FallbackContent, InlineFallbackContent } from './FallbackContent';
import { ContentProvider, useContentContext } from '../../contexts/ContentContext';

// Component that intentionally throws an error for testing
const ErrorThrowingComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error for error boundary');
  }
  
  return <div>This component works fine!</div>;
};

// Component to test content context error handling
const ContentErrorDemo: React.FC = () => {
  const { error, failedItems, retryFailedContent } = useContentContext();
  
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Content Context Error Demo</h3>
      <p>Error: {error || 'None'}</p>
      <p>Failed Items: {Array.from(failedItems).join(', ') || 'None'}</p>
      {failedItems.size > 0 && (
        <button 
          onClick={() => retryFailedContent()}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Retry Failed Content
        </button>
      )}
    </div>
  );
};

// Main demo component
export const ErrorHandlingDemo: React.FC = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">Error Handling Demo</h2>
      
      {/* Error Boundary Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Error Boundary Demo</h3>
        <button
          onClick={() => setShouldThrowError(!shouldThrowError)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          {shouldThrowError ? 'Fix Error' : 'Trigger Error'}
        </button>
        
        <ContentErrorBoundary
          onRetry={() => setShouldThrowError(false)}
        >
          <ErrorThrowingComponent shouldThrow={shouldThrowError} />
        </ContentErrorBoundary>
      </div>
      
      {/* Fallback Content Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fallback Content Demo</h3>
        
        <div className="space-y-2">
          <h4 className="font-medium">Full Fallback Content:</h4>
          <FallbackContent
            contentName="Demo Content"
            error="Simulated API error"
            fallbackText="This is fallback content"
            onRetry={() => console.log('Retry clicked')}
            showError={true}
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Inline Fallback Content:</h4>
          <p>
            Here is some text with{' '}
            <InlineFallbackContent
              contentName="inline content"
              error="Failed to load"
              fallbackText="[fallback text]"
              onRetry={() => console.log('Inline retry clicked')}
              showError={true}
            />
            {' '}in the middle.
          </p>
        </div>
      </div>
      
      {/* Content Context Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Context Error Demo</h3>
        <ContentProvider preloadNames={['demo_content_1', 'demo_content_2']}>
          <ContentErrorDemo />
        </ContentProvider>
      </div>
    </div>
  );
};