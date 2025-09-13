import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface FallbackContentProps {
  contentName?: string;
  error?: string;
  onRetry?: () => void;
  fallbackText?: string;
  showError?: boolean;
}

export const FallbackContent: React.FC<FallbackContentProps> = ({
  contentName,
  error,
  onRetry,
  fallbackText,
  showError = true
}) => {
  const defaultFallbackText = fallbackText || 'Content temporarily unavailable';

  if (!showError) {
    return (
      <div className="text-gray-500 italic">
        {defaultFallbackText}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <AlertCircle className="w-8 h-8 text-yellow-600 mb-3" />
      <h4 className="text-md font-medium text-yellow-800 mb-2">
        {contentName ? `Failed to load "${contentName}"` : 'Content Loading Failed'}
      </h4>
      <p className="text-yellow-700 text-center mb-3 text-sm">
        {error || 'Unable to load content from server'}
      </p>
      <p className="text-yellow-600 text-center mb-4 text-sm">
        {defaultFallbackText}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
};

// Inline fallback for smaller content areas
export const InlineFallbackContent: React.FC<FallbackContentProps> = ({
  contentName,
  error,
  onRetry,
  fallbackText,
  showError = false
}) => {
  const defaultFallbackText = fallbackText || '[Content unavailable]';

  if (!showError) {
    return (
      <span className="text-gray-400 italic text-sm">
        {defaultFallbackText}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-yellow-600 text-sm">
      <AlertCircle className="w-4 h-4" />
      <span>{defaultFallbackText}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-1 text-yellow-700 hover:text-yellow-800 underline"
        >
          retry
        </button>
      )}
    </span>
  );
};