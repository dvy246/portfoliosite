import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { STATIC_CONTENT } from '../data/staticContent';
import { ContentProvider, useContentContext } from './ContentContext';

interface LoadingState {
  sectionsLoaded: Set<string>;
  registeredSections: Map<string, string[]>;
  loadStartTime: number;
  updateTimeout: NodeJS.Timeout | null;
}

interface PageState {
  isPageLoading: boolean;
  loadingProgress: number;
  initialLoadComplete: boolean;
  contentReady: boolean;
}

interface PageContentContextType {
  isPageLoading: boolean;
  loadingProgress: number;
  sectionsLoaded: Set<string>;
  registerSection: (sectionName: string, contentNames: string[]) => void;
  markSectionLoaded: (sectionName: string) => void;
  allSectionsLoaded: boolean;
  initialLoadComplete: boolean;
  contentReady: boolean;
}

const PageContentContext = createContext<PageContentContextType | undefined>(undefined);

interface PageContentProviderProps {
  children: React.ReactNode;
}

// All content names used across the entire page
const ALL_PAGE_CONTENT_NAMES = [
  // Hero section
  'hero_title', 'hero_subtitle', 'hero_badge', 'hero_cta_text', 'hero_floating_badge', 'hero_scroll_text', 'profile_photo',
  
  // About section
  'about_title', 'about_subtitle', 'about_content', 'about_journey_title',
  'about_highlight_1_title', 'about_highlight_1_desc', 'about_highlight_2_title', 'about_highlight_2_desc',
  'about_highlight_3_title', 'about_highlight_3_desc', 'about_highlight_4_title', 'about_highlight_4_desc',
  
  // Skills section
  'skills_title', 'skills_subtitle', 'skills_ai_title', 'skills_business_title', 'skills_technical_title',
  'skills_differentiator_title', 'skills_differentiator_subtitle',
  'skill_ai_1', 'skill_ai_2', 'skill_ai_3', 'skill_ai_4', 'skill_ai_5',
  'skill_business_1', 'skill_business_2', 'skill_business_3', 'skill_business_4', 'skill_business_5',
  'skill_technical_1', 'skill_technical_2', 'skill_technical_3', 'skill_technical_4', 'skill_technical_5',
  
  // Projects section
  'cta_section_title', 'cta_section_content',
  
  // Contact section
  'contact_title', 'contact_subtitle', 'contact_content', 'contact_section_title',
  'contact_email', 'contact_phone', 'contact_location', 'contact_social_title',
  'contact_linkedin_url', 'contact_github_url', 'contact_twitter_url',
  'contact_form_title', 'contact_name_label', 'contact_email_label',
  'contact_company_label', 'contact_message_label', 'contact_button_text', 'contact_footer_text',
  
  // Certifications section
  'certifications_title'
];

export const PageContentProvider: React.FC<PageContentProviderProps> = ({ children }) => {
  // Unified state management
  const [state, setState] = useState({
    loading: {
      isPageLoading: true,
      loadingProgress: 0,
      initialLoadComplete: false,
      contentReady: false,
      sectionsLoaded: new Set<string>(),
      registeredSections: new Map<string, string[]>(),
    },
    startTime: Date.now()
  });

  // Memoized derived state
  const allSectionsLoaded = React.useMemo(() => {
    const { sectionsLoaded, registeredSections } = state.loading;
    return registeredSections.size > 0 && sectionsLoaded.size === registeredSections.size;
  }, [state.loading]);

  // Debounced state updates
  const debouncedUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function for safe state updates
  const updateState = useCallback((updates: Partial<typeof state.loading>) => {
    if (debouncedUpdateRef.current) {
      clearTimeout(debouncedUpdateRef.current);
    }

    debouncedUpdateRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        loading: {
          ...prev.loading,
          ...updates
        }
      }));
    }, 50);
  }, []);

  // Section registration
  const registerSection = useCallback((sectionName: string, contentNames: string[]) => {
    console.debug(`[PageContent] Registering section: ${sectionName} with content:`, contentNames);
    setState(prev => {
      const newSections = new Map(prev.loading.registeredSections);
      newSections.set(sectionName, contentNames);
      return {
        ...prev,
        loading: {
          ...prev.loading,
          registeredSections: newSections
        }
      };
    });
  }, []);

  // Section loading completion
  const markSectionLoaded = useCallback((sectionName: string) => {
    console.debug(`[PageContent] Marking section as loaded: ${sectionName}`);
    setState(prev => {
      const newLoaded = new Set(prev.loading.sectionsLoaded);
      newLoaded.add(sectionName);

      const progress = prev.loading.registeredSections.size === 0 ? 0 :
        (newLoaded.size / prev.loading.registeredSections.size) * 100;

      console.debug(`[PageContent] Updated progress: ${progress}%`);

      return {
        ...prev,
        loading: {
          ...prev.loading,
          sectionsLoaded: newLoaded,
          loadingProgress: progress,
          isPageLoading: progress < 100,
          contentReady: progress === 100
        }
      };
    });
  }, []);

  // Loading state management
  useEffect(() => {
    if (!state.loading.initialLoadComplete) {
      const minLoadTime = 500; // Minimum loading time to prevent flashing
      const elapsedTime = Date.now() - state.startTime;
      
      const initTimer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          loading: {
            ...prev.loading,
            initialLoadComplete: true
          }
        }));
      }, Math.max(0, minLoadTime - elapsedTime));
      
      return () => clearTimeout(initTimer);
    }

    // Update loading progress
    if (state.loading.registeredSections.size > 0) {
      const progress = (state.loading.sectionsLoaded.size / state.loading.registeredSections.size) * 100;
      
      if (debouncedUpdateRef.current) {
        clearTimeout(debouncedUpdateRef.current);
      }

      debouncedUpdateRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          loading: {
            ...prev.loading,
            loadingProgress: progress,
            isPageLoading: progress < 100,
            contentReady: progress === 100
          }
        }));
      }, 50);
    }

    return () => {
      if (debouncedUpdateRef.current) {
        clearTimeout(debouncedUpdateRef.current);
      }
    };
  }, [
    state.loading.initialLoadComplete,
    state.loading.sectionsLoaded.size,
    state.loading.registeredSections.size,
    state.startTime
  ]);

  // Safety timeout effect
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (state.loading.isPageLoading && state.loading.registeredSections.size > 0) {
        console.warn('Safety timeout: forcing content display');
        setState(prev => ({
          ...prev,
          loading: {
            ...prev.loading,
            isPageLoading: false,
            contentReady: true,
            loadingProgress: 100
          }
        }));
      }
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, [state.loading.isPageLoading, state.loading.registeredSections.size]);

  // Create context value with memoization to prevent unnecessary re-renders
  const contextValue = React.useMemo<PageContentContextType>(() => ({
    isPageLoading: state.loading.isPageLoading,
    loadingProgress: state.loading.loadingProgress,
    sectionsLoaded: state.loading.sectionsLoaded,
    registerSection,
    markSectionLoaded,
    allSectionsLoaded,
    initialLoadComplete: state.loading.initialLoadComplete,
    contentReady: state.loading.contentReady
  }), [
    state.loading.isPageLoading,
    state.loading.loadingProgress,
    state.loading.sectionsLoaded,
    state.loading.initialLoadComplete,
    state.loading.contentReady,
    registerSection,
    markSectionLoaded,
    allSectionsLoaded
  ]);

  // Clean up effect on unmount
  useEffect(() => {
    return () => {
      if (debouncedUpdateRef.current) {
        clearTimeout(debouncedUpdateRef.current);
      }
    };
  }, []);

  return (
    <PageContentContext.Provider value={contextValue}>
      <ContentProvider preloadNames={ALL_PAGE_CONTENT_NAMES}>
        {children}
      </ContentProvider>
    </PageContentContext.Provider>
  );
};

export const usePageContent = (): PageContentContextType => {
  const context = useContext(PageContentContext);
  if (context === undefined) {
    throw new Error('usePageContent must be used within a PageContentProvider');
  }
  return context;
};

// Hook for sections to register themselves and report loading status
interface SectionLoaderResult {
  isSectionLoading: boolean;
  isSectionLoaded: boolean;
}

export const useSectionLoader = (
  sectionName: string,
  contentNames: string[]
): SectionLoaderResult => {
  const { registerSection, markSectionLoaded, sectionsLoaded } = usePageContent();
  const contentContext = useContentContext();

  // Memoize content names array to prevent unnecessary re-renders
  const memoizedContentNames = React.useMemo(() => contentNames, [contentNames]);

  // Register section on mount
  useEffect(() => {
    registerSection(sectionName, memoizedContentNames);
    return () => {
      // No-op cleanup for now
    };
  }, [registerSection, sectionName, memoizedContentNames]);

  // Mark section loaded when all its required content keys are present in the content provider
  useEffect(() => {
    // If already marked loaded, skip
    if (sectionsLoaded.has(sectionName)) return;

    // Consider either cached content or static fallback as "present"
    const allPresent = memoizedContentNames.every(name => {
      const val = contentContext.getContent(name, '') || (STATIC_CONTENT as any)[name] || '';
      return val !== '' && val !== undefined && val !== null;
    });

    if (allPresent) {
      // Debug log to help trace lifecycle during development
      // eslint-disable-next-line no-console
      console.debug(`[PageContent] Section "${sectionName}" all content present — marking loaded`);
      // Small debounce to avoid rapid state thrash when many sections complete simultaneously
      const t = setTimeout(() => markSectionLoaded(sectionName), 40);
      return () => clearTimeout(t);
    }

    return;
  }, [contentContext, memoizedContentNames, markSectionLoaded, sectionName, sectionsLoaded]);

  // Return loading state derived from the content provider for this section only
  const isSectionLoading = !memoizedContentNames.every(name => {
    const val = contentContext.getContent(name, '');
    return val !== '' && val !== undefined && val !== null;
  });

  return React.useMemo(() => ({
    isSectionLoading,
    isSectionLoaded: sectionsLoaded.has(sectionName)
  }), [isSectionLoading, sectionsLoaded, sectionName]);
};