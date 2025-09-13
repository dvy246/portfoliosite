Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock import.meta.env for Vite
(global as any).import = {
  meta: {
    env: {
      MODE: 'test',
      DEV: true,
      PROD: false,
      SSR: false,
      VITE_APP_TITLE: 'Test App',
    },
  },
};
