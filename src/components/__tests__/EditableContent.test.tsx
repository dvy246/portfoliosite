import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableContent from '../Admin/EditableContent';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../hooks/useContent';

// Mock the hooks
jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useContent');

describe('EditableContent', () => {
  const mockContent = 'Test Content';
  const mockName = 'test-content';
  const mockSaveContent = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: false
    });

    // Mock useContent hook
    (useContent as jest.Mock).mockReturnValue({
      content: mockContent,
      saveContent: mockSaveContent,
      error: null,
      hasFailed: false
    });
  });

  it('renders content in non-admin mode', () => {
    render(
      <EditableContent
        name={mockName}
        defaultContent="Default Content"
      />
    );

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it('shows edit button in admin mode', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: true
    });

    render(
      <EditableContent
        name={mockName}
        defaultContent="Default Content"
      />
    );

    expect(screen.getByTitle(`Edit "${mockName}"`)).toBeInTheDocument();
  });

  it('allows editing in admin mode', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: true
    });

    render(
      <EditableContent
        name={mockName}
        defaultContent="Default Content"
      />
    );

    // Click edit button
    fireEvent.click(screen.getByTitle(`Edit "${mockName}"`));

    // Check if input field appears
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockContent);

    // Edit content
    fireEvent.change(input, { target: { value: 'New Content' } });
    
    // Save changes
    fireEvent.click(screen.getByTitle('Save changes (Ctrl+Enter)'));
    
    expect(mockSaveContent).toHaveBeenCalledWith('New Content');
  });

  it('shows error message when content fails to load', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: true
    });

    (useContent as jest.Mock).mockReturnValue({
      content: '',
      saveContent: mockSaveContent,
      error: 'Failed to load content',
      hasFailed: true
    });

    render(
      <EditableContent
        name={mockName}
        defaultContent="Default Content"
      />
    );

    // The inline fallback renders a retry button when hasFailed is true
    expect(screen.getByTitle(`Retry loading "${mockName}"`)).toBeInTheDocument();
  });
});
