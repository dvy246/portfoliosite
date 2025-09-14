import { useMemo } from 'react';
import { useContentContext } from '../contexts/ContentContext';

/**
 * Rock-solid content hook that ALWAYS provides content immediately
 * Never shows loading states, never flickers, never fails
 */
export const useStableContent = (contentNames: string[]) => {
  const { getContent, saveContent, error } = useContentContext();

  // Create stable content object - ALWAYS returns content immediately
  const stableContent = useMemo(() => {
    const result: Record<string, string> = {};
    
    for (const name of contentNames) {
      result[name] = getContent(name, '');
    }
    
    return result;
  }, [contentNames, getContent]);

  return {
    content: stableContent,
    isLoading: false, // NEVER show loading
    saveContent,
    error,
    isStatic: () => false
  };
};