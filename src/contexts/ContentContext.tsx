import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { bulkFetchContent, saveContentItem, globalContentCache } from '../lib/contentApi';
import toast from 'react-hot-toast';

interface ContentContextType {
  content: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  failedItems: Set<string>;
  saveContent: (name: string, value: string) => Promise<void>;
  preloadContent: (names: string[]) => Promise<void>;
  getContent: (name: string, fallback?: string) => string;
  retryFailedContent: (names?: string[]) => Promise<void>;
  clearError: () => void;
  // Enhanced cache management methods
  refreshContent: (names: string[]) => Promise<void>;
  invalidateContent: (names: string[]) => void;
  getCacheStats: () => any;
  isContentStale: (name: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: React.ReactNode;
  preloadNames?: string[];
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ 
  children, 
  preloadNames = [] 
}) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedItems, setFailedItems] = useState<Set<string>>(new Set());
  const [loadedNames, setLoadedNames] = useState<Set<string>>(new Set());
  const [retryCount, setRetryCount] = useState<Map<string, number>>(new Map());

  // Cache to avoid redundant API calls
  const [fetchPromises, setFetchPromises] = useState<Map<string, Promise<void>>>(new Map());
  
  // Cache consistency: Track cache invalidation events
  const [cacheVersion, setCacheVersion] = useState(0);

  // Constants for retry logic
  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY_BASE = 1000; // 1 second base delay

  const bulkFetchContentItems = useCallback(async (names: string[], isRetry: boolean = false): Promise<void> => {
    // Batch state updates to prevent multiple re-renders
    const stateUpdates = {
      content: {} as Record<string, string>,
      loadedNames: new Set<string>(),
      failedItemsToRemove: new Set<string>(),
    };

    // First pass: Check cache and collect all state updates
    names.forEach(name => {
      const cached = globalContentCache.get(name);
      if (cached !== null) {
        stateUpdates.content[name] = cached;
        stateUpdates.loadedNames.add(name);
        stateUpdates.failedItemsToRemove.add(name);
      }
    });

    // Apply batched state updates for cached items
    if (Object.keys(stateUpdates.content).length > 0) {
      setContent(prev => ({ ...prev, ...stateUpdates.content }));
      setLoadedNames(prev => new Set([...prev, ...stateUpdates.loadedNames]));
      if (stateUpdates.failedItemsToRemove.size > 0) {
        setFailedItems(prev => {
          const newSet = new Set(prev);
          stateUpdates.failedItemsToRemove.forEach(name => newSet.delete(name));
          return newSet;
        });
      }
    }

    // Determine which items need to be fetched
    const namesToFetch = names.filter(name => 
      !stateUpdates.loadedNames.has(name) && 
      !loadedNames.has(name) && 
      !fetchPromises.has(name)
    );

    if (namesToFetch.length === 0) {
      return;
    }

    console.log('🔄 CONTENT PROVIDER BULK FETCH for:', namesToFetch, isRetry ? '(RETRY)' : '');

    // Add debug logs to trace bulk fetch and fallback content
    console.debug(`[ContentContext] Bulk fetch initiated for:`, namesToFetch);

    try {
      setError(null);

      const result = await bulkFetchContent(namesToFetch);
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Cache the fetched content
      Object.entries(result.content).forEach(([name, content]) => {
        globalContentCache.set(name, content);
      });

      // Update state
      setContent(prev => ({ ...prev, ...result.content }));
      setLoadedNames(prev => new Set([...prev, ...namesToFetch]));
      
      // Clear failed items for successful fetches
      setFailedItems(prev => {
        const newSet = new Set(prev);
        namesToFetch.forEach(name => newSet.delete(name));
        return newSet;
      });
      
      // Reset retry counts for successful fetches
      setRetryCount(prev => {
        const newMap = new Map(prev);
        namesToFetch.forEach(name => newMap.delete(name));
        return newMap;
      });

    } catch (err: any) {
      console.error('❌ CONTENT PROVIDER BULK FETCH EXCEPTION:', err);
      setError(err.message);
      
      // Mark items as failed
      setFailedItems(prev => new Set([...prev, ...namesToFetch]));
      
      // Set fallback content for failed fetches
      const fallbackContent: Record<string, string> = {};
      namesToFetch.forEach(name => {
        fallbackContent[name] = getFallbackContent(name);
      });
      setContent(prev => ({ ...prev, ...fallbackContent }));
      setLoadedNames(prev => new Set([...prev, ...namesToFetch]));
      
      // Implement exponential backoff retry for failed items
      if (!isRetry) {
        scheduleRetry(namesToFetch);
      }

      // Debug log for fallback content
      console.debug(`[ContentContext] Fallback content applied for:`, fallbackContent);
    }
  }, [loadedNames, fetchPromises]);

  // Helper function to get fallback content based on content name
  const getFallbackContent = useCallback((name: string): string => {
    const fallbacks: Record<string, string> = {
      'hero-title': 'Welcome to My Portfolio',
      'hero-subtitle': 'Full Stack Developer',
      'hero-description': 'Passionate about creating amazing web experiences.',
      'about-title': 'About Me',
      'about-description': 'I am a dedicated developer with experience in modern web technologies.',
      'skills-title': 'Skills & Technologies',
      'skills-description': 'Here are the technologies I work with.',
      'projects-title': 'Featured Projects',
      'projects-description': 'Some of my recent work.',
      'contact-title': 'Get In Touch',
      'contact-description': 'Let\'s discuss your next project.',
    };
    
    return fallbacks[name] || 'Content temporarily unavailable';
  }, []);

  // Schedule retry with exponential backoff
  const scheduleRetry = useCallback((names: string[]) => {
    names.forEach(name => {
      const currentRetries = retryCount.get(name) || 0;
      
      if (currentRetries < MAX_RETRY_ATTEMPTS) {
        const delay = RETRY_DELAY_BASE * Math.pow(2, currentRetries);
        
        setTimeout(() => {
          setRetryCount(prev => new Map(prev).set(name, currentRetries + 1));
          bulkFetchContentItems([name], true);
        }, delay);
        
        console.log(`⏰ Scheduled retry ${currentRetries + 1}/${MAX_RETRY_ATTEMPTS} for "${name}" in ${delay}ms`);
      } else {
        console.warn(`❌ Max retry attempts reached for "${name}"`);
      }
    });
  }, [retryCount, bulkFetchContentItems]);

  const preloadContent = useCallback(async (names: string[]): Promise<void> => {
    if (names.length === 0) return;

    setIsLoading(true);
    
    try {
      await bulkFetchContentItems(names);
    } finally {
      setIsLoading(false);
    }
  }, [bulkFetchContentItems]);

  const saveContent = useCallback(async (name: string, value: string): Promise<void> => {
    try {
      setError(null);
      console.log(`🚨 CONTENT PROVIDER SAVE for "${name}":`, value);
      
      // Optimistic update - update local state immediately
      setContent(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Update cache immediately with optimistic content
      // The saveContentItem function will handle the final cache update with server response
      globalContentCache.set(name, value, { 
        skipCallbacks: true // Skip callbacks for optimistic update to avoid double notifications
      });
      
      // Mark as loaded if not already
      setLoadedNames(prev => new Set([...prev, name]));
      
      // Save to database - this will trigger intelligent cache invalidation
      await saveContentItem(name, value);
      
      toast.success(`✅ Saved: ${name}`);
      
    } catch (err: any) {
      console.error(`❌ CONTENT PROVIDER SAVE ERROR for "${name}":`, err);
      setError(err.message);
      toast.error(`❌ Failed to save "${name}": ${err.message}`);
      
      // On error, invalidate the optimistic cache entry to force refetch
      globalContentCache.invalidate(name, 'manual');
      
      throw err;
    }
  }, []);

  const getContent = useCallback((name: string, fallback: string = ''): string => {
    // Always check cache first for most up-to-date content
    const cached = globalContentCache.get(name);
    if (cached !== null) {
      return cached;
    }
    
    // Fall back to local state, then fallback
    return content[name] || fallback;
  }, [content, cacheVersion]); // Include cacheVersion to ensure re-evaluation on cache changes

  const retryFailedContent = useCallback(async (names?: string[]): Promise<void> => {
    const itemsToRetry = names || Array.from(failedItems);
    
    if (itemsToRetry.length === 0) {
      return;
    }

    console.log('🔄 Manual retry for failed content:', itemsToRetry);
    
    // Reset retry counts for manual retries
    setRetryCount(prev => {
      const newMap = new Map(prev);
      itemsToRetry.forEach(name => newMap.delete(name));
      return newMap;
    });
    
    // Clear error state
    setError(null);
    
    // Attempt to fetch again
    await bulkFetchContentItems(itemsToRetry, true);
  }, [failedItems, bulkFetchContentItems]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ENHANCED CACHE MANAGEMENT METHODS

  const refreshContent = useCallback(async (names: string[]): Promise<void> => {
    if (names.length === 0) return;

    console.log(`🔄 MANUAL CONTENT REFRESH for:`, names);
    setIsLoading(true);
    
    try {
      // Force refresh from cache (which will fetch from API)
      await globalContentCache.refresh(names);
      
      // Update local state with refreshed content
      const refreshedContent: Record<string, string> = {};
      names.forEach(name => {
        const cached = globalContentCache.get(name);
        if (cached !== null) {
          refreshedContent[name] = cached;
        }
      });
      
      if (Object.keys(refreshedContent).length > 0) {
        setContent(prev => ({ ...prev, ...refreshedContent }));
        setLoadedNames(prev => new Set([...prev, ...names]));
      }
      
      // Clear any failed items that were successfully refreshed
      setFailedItems(prev => {
        const newSet = new Set(prev);
        names.forEach(name => newSet.delete(name));
        return newSet;
      });
      
      setError(null);
      
    } catch (err: any) {
      console.error('❌ MANUAL CONTENT REFRESH ERROR:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const invalidateContent = useCallback((names: string[]): void => {
    console.log(`🗑️ MANUAL CONTENT INVALIDATION for:`, names);
    
    names.forEach(name => {
      globalContentCache.invalidate(name, 'manual');
      
      // Remove from local state
      setContent(prev => {
        const newContent = { ...prev };
        delete newContent[name];
        return newContent;
      });
      
      // Remove from loaded names
      setLoadedNames(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    });
    
    // Increment cache version to trigger re-renders
    setCacheVersion(prev => prev + 1);
  }, []);

  const getCacheStats = useCallback(() => {
    return globalContentCache.getStats();
  }, []);

  const isContentStale = useCallback((name: string): boolean => {
    return globalContentCache.isStale(name);
  }, []);

  // CACHE CONSISTENCY: Listen for cache invalidation events
  useEffect(() => {
    const unsubscribe = globalContentCache.onInvalidation((invalidatedName) => {
      console.log(`🔄 CACHE INVALIDATION EVENT: "${invalidatedName}"`);
      
      // Update local state with fresh cache content
      const freshContent = globalContentCache.get(invalidatedName);
      if (freshContent !== null) {
        setContent(prev => ({
          ...prev,
          [invalidatedName]: freshContent
        }));
      } else {
        // Content was invalidated/removed from cache
        setContent(prev => {
          const newContent = { ...prev };
          delete newContent[invalidatedName];
          return newContent;
        });
        
        // Remove from loaded names so it can be refetched if needed
        setLoadedNames(prev => {
          const newSet = new Set(prev);
          newSet.delete(invalidatedName);
          return newSet;
        });
      }
      
      // Increment cache version to trigger re-renders in components
      setCacheVersion(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  // CACHE EXPIRATION: Periodic cleanup of expired cache items
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const cleanedCount = globalContentCache.cleanup();
      if (cleanedCount > 0) {
        // Force a state update to reflect cache cleanup
        setCacheVersion(prev => prev + 1);
      }
    }, 60000); // Cleanup every minute

    return () => clearInterval(cleanupInterval);
  }, []);

  // Preload content on mount if preloadNames provided
  useEffect(() => {
    if (preloadNames.length > 0) {
      const loadContent = async () => {
        try {
          await preloadContent(preloadNames);
        } catch (error) {
          console.error('Failed to load content:', error);
          // Set fallback content for all requested items
          const fallbackContent: Record<string, string> = {};
          preloadNames.forEach(name => {
            fallbackContent[name] = getFallbackContent(name);
          });
          setContent(prev => ({
            ...prev,
            ...fallbackContent
          }));
          setIsLoading(false);
        }
      };
      
      loadContent();
    }
  }, [preloadNames, preloadContent]);

  const contextValue: ContentContextType = {
    content,
    isLoading,
    error,
    failedItems,
    saveContent,
    preloadContent,
    getContent,
    retryFailedContent,
    clearError,
    // Enhanced cache management
    refreshContent,
    invalidateContent,
    getCacheStats,
    isContentStale
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  return context;
};