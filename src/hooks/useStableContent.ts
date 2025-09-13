import { useMemo } from 'react';
import { useContentSections } from './useContent';
import { STATIC_CONTENT, ContentKey } from '../data/staticContent';

/**
 * Enhanced content hook that provides stable content with static fallbacks
 * to prevent flickering during loading
 */
export const useStableContent = (contentNames: string[]) => {
  const { content, isLoading, saveContent } = useContentSections(contentNames);

  // Create stable content object with static fallbacks
  const stableContent = useMemo(() => {
    const result: Record<string, string> = {};
    
    contentNames.forEach(name => {
      // Use loaded content if available, otherwise use static fallback
      result[name] = content[name] || STATIC_CONTENT[name as ContentKey] || '';
    });
    
    return result;
  }, [content, contentNames]);

  return {
    content: stableContent,
    isLoading,
    saveContent,
    // Helper to check if content is from static fallback
    isStatic: (name: string) => !content[name] && !!STATIC_CONTENT[name as ContentKey]
  };
};