import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppContent from '../__mocks__/AppContent';
import { usePageContent } from '../../contexts/PageContentContext';

// Mock the context hooks
jest.mock('../../contexts/PageContentContext', () => ({
  usePageContent: jest.fn(() => ({
    isPageLoading: false,
    loadingProgress: 100,
  })),
  PageContentProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );
    
    // Verify that main sections are rendered
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-about')).toBeInTheDocument();
    expect(screen.getByTestId('mock-skills')).toBeInTheDocument();
    expect(screen.getByTestId('mock-projects')).toBeInTheDocument();
    expect(screen.getByTestId('mock-certifications')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });

  it('shows loading state when page is loading', () => {
    (usePageContent as jest.Mock).mockReturnValueOnce({
      isPageLoading: true,
      loadingProgress: 50,
    });

    render(
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading Portfolio...')).toBeInTheDocument();
  });

  it('renders main content when loading is complete', () => {
    (usePageContent as jest.Mock).mockReturnValueOnce({
      isPageLoading: false,
      loadingProgress: 100,
    });

    render(
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );

    expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});
