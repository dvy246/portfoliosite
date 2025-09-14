import { useCallback, useState } from 'react';
import { useContentContext } from '../contexts/ContentContext';

interface UseContentOptions {
  preload?: boolean;
  fallback?: string;
}

export const useContent = (name: string, options: UseContentOptions = {}) => {
  const { fallback = '' } = options;
  const [error, setError] = useState<string | null>(null);
  const { getContent, saveContent: contextSaveContent, error: contextError } = useContentContext();

  // Get content (always returns something - never empty)
  const content = getContent(name, fallback);
  
  const saveContent = useCallback(async (newContent: string) => {
    try {
      setError(null);
      await contextSaveContent(name, newContent);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [name, contextSaveContent]);

  return {
    content,
    saveContent,
    isLoading: false, // Never show loading - always have content
    error: error || contextError,
    hasFailed: false,
    isStale: false,
    retryContent: async () => {},
    refreshContent: async () => {}
  };
};

// Hook for managing multiple content sections
export const useContentSections = (sectionNames: string[]) => {
  const { getContent, saveContent: contextSaveContent, error: contextError } = useContentContext();
  const [error, setError] = useState<string | null>(null);

  // Build content object - always returns content
  const content: Record<string, string> = {};
  sectionNames.forEach(name => {
    content[name] = getContent(name, '');
  });

  const saveContent = useCallback(async (name: string, newContent: string) => {
    try {
      setError(null);
      await contextSaveContent(name, newContent);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [contextSaveContent]);

  return {
    content,
    saveContent,
    isLoading: false, // Never show loading
    error: error || contextError,
    refreshSection: async () => {},
    invalidateSection: () => {},
    hasStaleContent: false
  };
};