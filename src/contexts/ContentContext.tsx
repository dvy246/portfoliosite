import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STATIC_CONTENT, ContentKey } from '../data/staticContent';
import { bulkFetchContent, saveContentItem } from '../lib/contentApi';
import toast from 'react-hot-toast';

interface ContentContextType {
  content: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  saveContent: (name: string, value: string) => Promise<void>;
  getContent: (name: string, fallback?: string) => string;
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
  const [hasInitialized, setHasInitialized] = useState(false);

  // Get content with immediate static fallback - NEVER returns empty
  const getContent = useCallback((name: string, fallback: string = ''): string => {
    // Priority: loaded content > static fallback > provided fallback
    if (content[name]) {
      return content[name];
    }
    
    if (STATIC_CONTENT[name as ContentKey]) {
      return STATIC_CONTENT[name as ContentKey];
    }
    
    return fallback || `Content for ${name}`;
  }, [content]);

  // Load content from API (background operation)
  const loadContent = useCallback(async (names: string[]) => {
    if (names.length === 0) return;

    try {
      const result = await bulkFetchContent(names);
      
      if (result.content && Object.keys(result.content).length > 0) {
        setContent(prev => ({ ...prev, ...result.content }));
      }
      
      if (result.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Save content
  const saveContent = useCallback(async (name: string, value: string): Promise<void> => {
    try {
      setError(null);
      
      // Optimistic update
      setContent(prev => ({ ...prev, [name]: value }));
      
      // Save to API
      await saveContentItem(name, value);
      toast.success(`✅ Saved: ${name}`);
      
    } catch (err: any) {
      setError(err.message);
      toast.error(`❌ Failed to save "${name}"`);
      throw err;
    }
  }, []);

  // Initialize content on mount (background load)
  useEffect(() => {
    if (!hasInitialized && preloadNames.length > 0) {
      setHasInitialized(true);
      // Load in background - don't block rendering
      loadContent(preloadNames);
    }
  }, [hasInitialized, preloadNames, loadContent]);

  const contextValue: ContentContextType = {
    content,
    isLoading,
    error,
    saveContent,
    getContent
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