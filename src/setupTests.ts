import '@testing-library/jest-dom';
import React from 'react';

// Import Vite mocks
import './__mocks__/viteMock';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    // Filter motion props to avoid React warning about unknown DOM attributes
    div: ({ children, ...props }: any) => {
      const { initial, animate, whileHover, whileTap, transition, viewport, ...rest } = props || {};
      return React.createElement('div', rest, children);
    },
    button: ({ children, ...props }: any) => {
      const { initial, animate, whileHover, whileTap, transition, viewport, ...rest } = props || {};
      return React.createElement('button', rest, children);
    },
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));

// Mock Supabase
jest.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
    })),
  },
}));
