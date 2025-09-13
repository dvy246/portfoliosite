import { useEffect, useCallback, useState } from 'react';
import { useContentContext } from '../contexts/ContentContext';

interface UseContentOptions {
  preload?: boolean;
  fallback?: string;
}

export const useContent = (name: string, options: UseContentOptions = {}) => {
  const { preload = true, fallback = '' } = options;
  const [error, setError] = useState<string | null>(null);
  
  // Use ContentContext - this hook now requires ContentProvider to be available
  const { 
    getContent, 
    saveContent: contextSaveContent, 
    preloadContent, 
    isLoading, 
    failedItems,
    retryFailedContent,
    error: contextError,
    // Enhanced cache management
    refreshContent,
    isContentStale
  } = useContentContext();
  
  // Preload this content if requested
  useEffect(() => {
    if (preload) {
      preloadContent([name]);
    }
  }, [name, preload, preloadContent]);

  // Get content from cache - returns immediately if available
  const content = getContent(name, fallback);
  
  // Check if this specific content item failed to load
  const hasFailed = failedItems.has(name);
  
  const saveContent = useCallback(async (newContent: string) => {
    try {
      setError(null);
      await contextSaveContent(name, newContent);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [name, contextSaveContent]);

  const retryContent = useCallback(async () => {
    try {
      setError(null);
      await retryFailedContent([name]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [name, retryFailedContent]);

  // Enhanced cache management methods
  const refreshContentItem = useCallback(async () => {
    try {
      setError(null);
      await refreshContent([name]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [name, refreshContent]);

  const isStale = isContentStale(name);

  return {
    content,
    saveContent,
    retryContent,
    refreshContent: refreshContentItem,
    isLoading,
    error: error || (hasFailed ? contextError : null),
    hasFailed,
    isStale
  };
};

// Hook for managing multiple content sections - uses ContentProvider
export const useContentSections = (sectionNames: string[]) => {
  const { 
    getContent, 
    saveContent: contextSaveContent, 
    preloadContent, 
    isLoading,
    refreshContent,
    invalidateContent,
    isContentStale
  } = useContentContext();
  const [error, setError] = useState<string | null>(null);

  // Preload all requested content
  useEffect(() => {
    preloadContent(sectionNames);
  }, [sectionNames, preloadContent]);

  // Build content object from individual content items
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

  // Enhanced cache management for sections
  const refreshSection = useCallback(async () => {
    try {
      setError(null);
      await refreshContent(sectionNames);
    } catch (err: any) {
      setError(err.message);
    }
  }, [sectionNames, refreshContent]);

  const invalidateSection = useCallback(() => {
    invalidateContent(sectionNames);
  }, [sectionNames, invalidateContent]);

  const hasStaleContent = sectionNames.some(name => isContentStale(name));

  return {
    content,
    saveContent,
    refreshSection,
    invalidateSection,
    isLoading,
    error,
    hasStaleContent
  };
};