import React from 'react';
import { renderHook, act } from '@testing-library/react';
import * as contentContext from '../../contexts/ContentContext';
import { useContent } from '../useContent';

describe('useContent', () => {
  it('preloads content when preload is true', () => {
    const preloadContent = jest.fn().mockResolvedValue(undefined);
    const mockContext = {
      getContent: (name: string, fallback: string) => fallback,
      saveContent: jest.fn(),
      preloadContent,
      isLoading: false,
      failedItems: new Set(),
      retryFailedContent: jest.fn(),
      error: null,
      refreshContent: jest.fn(),
      isContentStale: jest.fn().mockReturnValue(false)
    } as any;

  jest.spyOn(contentContext, 'useContentContext').mockReturnValue(mockContext);
  // Mock usePageContent from the PageContentContext module
  jest.spyOn(require('../../contexts/PageContentContext'), 'usePageContent').mockReturnValue({ isPageLoading: false } as any);

    const { result } = renderHook(() => useContent('skill_ai_1', { preload: true }));

    expect(preloadContent).toHaveBeenCalledWith(['skill_ai_1']);
    expect(result.current.content).toBeDefined();
  });
});
