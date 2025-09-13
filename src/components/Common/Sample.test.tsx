import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Sample Test', () => {
  it('renders a message', () => {
    render(<div>Hello, Jest!</div>);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});
