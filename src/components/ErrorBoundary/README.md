# Error Handling Components

This directory contains components for handling errors in content loading and display.

## Components

### ContentErrorBoundary

A React error boundary that catches JavaScript errors in component trees and displays a fallback UI.

**Props:**
- `children`: ReactNode - The components to wrap
- `fallback?`: ReactNode - Custom fallback UI to display on error
- `onRetry?`: () => void - Callback function for retry button

**Usage:**
```tsx
<ContentErrorBoundary
  fallback={<div>Custom error message</div>}
  onRetry={() => window.location.reload()}
>
  <YourComponent />
</ContentErrorBoundary>
```

### FallbackContent

A component that displays when content fails to load, with error information and retry functionality.

**Props:**
- `contentName?`: string - Name of the content that failed
- `error?`: string - Error message to display
- `onRetry?`: () => void - Retry callback
- `fallbackText?`: string - Text to show as fallback
- `showError?`: boolean - Whether to show error details (default: true)

**Usage:**
```tsx
<FallbackContent
  contentName="About Section"
  error="Network error"
  fallbackText="Content temporarily unavailable"
  onRetry={() => retryContent()}
  showError={true}
/>
```

### InlineFallbackContent

A compact inline version of fallback content for use within text or smaller UI elements.

**Props:** Same as FallbackContent but renders inline

**Usage:**
```tsx
<p>
  This is some text with{' '}
  <InlineFallbackContent
    contentName="inline content"
    fallbackText="[unavailable]"
    showError={false}
  />
  {' '}in the middle.
</p>
```

## Error Handling Features

### Automatic Retry with Exponential Backoff

The ContentContext automatically retries failed content fetches with exponential backoff:
- Maximum 3 retry attempts
- Base delay of 1 second, doubling with each retry
- Automatic retry scheduling for failed items

### Graceful Degradation

- Shows fallback content when API calls fail
- Provides meaningful error messages
- Maintains UI functionality even with network issues

### Network Error Handling

- Request timeouts (10s for fetches, 15s for saves)
- Specific error messages for different failure types
- Retry mechanisms for transient failures

## Integration

These components are integrated with:
- `ContentContext` for centralized error state management
- `useContent` hook for individual content item error handling
- Section components (About, Skills) wrapped with error boundaries

## Testing

Use `ErrorHandlingDemo` component to test error handling functionality in development.