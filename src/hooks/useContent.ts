import React, { useEffect, useCallback, useState } from 'react';
import { useContentContext } from '../contexts/ContentContext';
import { usePageContent } from '../contexts/PageContentContext';

interface UseContentOptions {
  preload?: boolean;
  fallback?: string;
}

export const useContent = (name: string, options: UseContentOptions = {}) => {
  const { preload = true, fallback = '' } = options;
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = React.useRef(true);

  const { isPageLoading } = usePageContent();
  const contentContext = useContentContext();

  const {
    getContent,
    saveContent: contextSaveContent,
    preloadContent,
    isLoading,
    failedItems,
    retryFailedContent,
    error: contextError,
    refreshContent,
    isContentStale
  } = contentContext;

  // Preload this content if requested
  useEffect(() => {
    isMountedRef.current = true;
    if (preload) {
      console.debug(`[useContent] Starting fetch for: ${name}`);
      preloadContent([name])
        .then(() => {
          if (isMountedRef.current) {
            console.debug(`[useContent] Data received for: ${name}`);
          }
        })
        .catch(err => {
          console.error(`[useContent] Fetch error for ${name}:`, err);
        })
        .finally(() => {
          if (isMountedRef.current) {
            console.debug(`[useContent] Setting loading to false for: ${name}`);
          }
        });
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [name, preload, preloadContent]);

  // Get content from cache - returns immediately if available
  const content = getContent(name, fallback);
  
  // Add debug logs to trace content fetching and fallback usage
  console.debug(`[useContent] Content fetched for: ${name}, Content:`, content);
  console.debug(`[useContent] Fallback used for: ${name}, Fallback:`, fallback);

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
    isLoading: isLoading || isPageLoading,
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