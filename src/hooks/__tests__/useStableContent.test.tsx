import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStableContent } from '../useStableContent';
import * as useContentModule from '../useContent';

const TestComponent: React.FC = () => {
  const { content } = useStableContent(['skills_title', 'skill_ai_1']);
  return (
    <div>
      <span data-testid="title">{content.skills_title}</span>
      <span data-testid="skill">{content.skill_ai_1}</span>
    </div>
  );
};

describe('useStableContent', () => {
  it('returns stable content with static fallbacks when content is missing', () => {
    // Mock useContentSections to return empty content and not loading
    jest.spyOn(useContentModule, 'useContentSections').mockReturnValue({
      content: {},
      isLoading: false,
      saveContent: jest.fn(),
      refreshSection: jest.fn(),
      invalidateSection: jest.fn(),
      error: null,
      hasStaleContent: false
    } as any);

    render(<TestComponent />);

    expect(screen.getByTestId('title').textContent).toBeTruthy();
    expect(screen.getByTestId('skill').textContent).toBeTruthy();
  });
});
