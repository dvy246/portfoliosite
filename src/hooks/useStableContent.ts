import { useMemo } from 'react';
import { useContentSections } from './useContent';
import { STATIC_CONTENT, ContentKey } from '../data/staticContent';

/**
 * Enhanced content hook that provides stable content with static fallbacks
 * to prevent flickering during loading
 */
export const useStableContent = (contentNames: string[]) => {
  // Memoize contentNames array to prevent unnecessary re-renders
  const memoizedContentNames = useMemo(() => contentNames, [contentNames]);

  const { content, isLoading, saveContent, error } = useContentSections(memoizedContentNames);

  // Create stable content object with static fallbacks and memoization
  const stableContent = useMemo(() => {
    const result: Record<string, string> = {};

    memoizedContentNames.forEach(name => {
      // Prioritize existing content to prevent flicker
      if (content[name]) {
        result[name] = content[name];
      } else {
        // Use static fallback as initial value
        result[name] = STATIC_CONTENT[name as ContentKey] || '';
      }
    });

    // Add debug logs to trace stable content derivation
    console.debug('[useStableContent] Stable content derived:', stableContent);
    return result;
  }, [content, memoizedContentNames]);

  // Debug lifecycle for stable content
  console.debug('[useStableContent] Stable content initialized for:', memoizedContentNames);

  return {
    content: stableContent,
    isLoading,
    saveContent,
    error,
    // Helper to check if content is from static fallback
    isStatic: (name: string) => !content[name] && !!STATIC_CONTENT[name as ContentKey]
  };
};