import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ContentProvider, useContentContext } from './ContentContext';

interface PageContentContextType {
  isPageLoading: boolean;
  loadingProgress: number;
  sectionsLoaded: Set<string>;
  registerSection: (sectionName: string, contentNames: string[]) => void;
  markSectionLoaded: (sectionName: string) => void;
  allSectionsLoaded: boolean;
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
  const [sectionsLoaded, setSectionsLoaded] = useState<Set<string>>(new Set());
  const [registeredSections, setRegisteredSections] = useState<Map<string, string[]>>(new Map());
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const registerSection = useCallback((sectionName: string, contentNames: string[]) => {
    setRegisteredSections(prev => new Map(prev).set(sectionName, contentNames));
  }, []);

  const markSectionLoaded = useCallback((sectionName: string) => {
    setSectionsLoaded(prev => new Set(prev).add(sectionName));
  }, []);

  const allSectionsLoaded = registeredSections.size > 0 && sectionsLoaded.size === registeredSections.size;

  // Simplified loading logic - shorter delays for better UX
  useEffect(() => {
    if (registeredSections.size === 0) {
      setLoadingProgress(0);
      return;
    }

    const progress = (sectionsLoaded.size / registeredSections.size) * 100;
    setLoadingProgress(progress);

    // Shorter delay for faster loading
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [sectionsLoaded.size, registeredSections.size]);

  // Faster initial loading
  useEffect(() => {
    setIsPageLoading(true);
    setLoadingProgress(0);
    
    // Auto-complete loading after 2 seconds max to prevent infinite loading
    const maxLoadTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);
    
    return () => clearTimeout(maxLoadTimer);
  }, []);

  const contextValue: PageContentContextType = {
    isPageLoading,
    loadingProgress,
    sectionsLoaded,
    registerSection,
    markSectionLoaded,
    allSectionsLoaded
  };

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
export const useSectionLoader = (sectionName: string, contentNames: string[]) => {
  const { registerSection, markSectionLoaded, sectionsLoaded } = usePageContent();
  const { isLoading } = useContentContext();
  
  // Register section on mount
  useEffect(() => {
    registerSection(sectionName, contentNames);
  }, [registerSection, sectionName, contentNames]);

  // Mark section as loaded when content loading is complete - faster response
  useEffect(() => {
    if (!isLoading && !sectionsLoaded.has(sectionName)) {
      // Immediate marking to reduce flickering
      markSectionLoaded(sectionName);
    }
  }, [isLoading, sectionName, markSectionLoaded, sectionsLoaded]);

  return {
    isSectionLoading: isLoading,
    isSectionLoaded: sectionsLoaded.has(sectionName)
  };
};