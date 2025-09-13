# Loading Components

This directory contains skeleton loading components designed to eliminate content flickering during page loads.

## Components

### ContentSkeleton

A versatile skeleton component that can render different types of loading placeholders.

**Props:**
- `type`: 'text' | 'title' | 'paragraph' | 'skill' | 'card' | 'button'
- `className?`: Additional CSS classes
- `lines?`: Number of lines for paragraph type (default: 1)
- `width?`: 'full' | 'large' | 'medium' | 'small' (default: 'full')

**Examples:**
```tsx
// Basic text skeleton
<ContentSkeleton type="text" />

// Title skeleton with custom width
<ContentSkeleton type="title" width="large" />

// Paragraph with multiple lines
<ContentSkeleton type="paragraph" lines={3} />

// Skill progress bar skeleton
<ContentSkeleton type="skill" />

// Card skeleton with icon and content
<ContentSkeleton type="card" />
```

### SectionSkeleton

Pre-built skeleton layouts that match specific page sections.

**Props:**
- `type`: 'about' | 'skills' | 'hero' | 'projects' | 'contact'
- `className?`: Additional CSS classes

**Examples:**
```tsx
// About section skeleton
<SectionSkeleton type="about" />

// Skills section skeleton with grid layout
<SectionSkeleton type="skills" />

// Hero section skeleton
<SectionSkeleton type="hero" />
```

## Features

- **Smooth Animations**: Uses Framer Motion for fluid pulse animations
- **Responsive Design**: Adapts to different screen sizes
- **Theme Consistent**: Matches the navy/gold/platinum color scheme
- **Staggered Loading**: Section skeletons include staggered animations for natural loading feel
- **Customizable**: Flexible props for different use cases

## Design Principles

1. **Visual Consistency**: Skeleton shapes match the actual content structure
2. **Smooth Transitions**: Gentle pulse animations provide visual feedback
3. **Performance**: Lightweight components with minimal re-renders
4. **Accessibility**: Proper contrast ratios and animation preferences

## Usage in Content Loading

These components are designed to work with the ContentProvider context to show loading states while content is being fetched, eliminating the flickering effect caused by progressive content loading.

```tsx
// Example usage with loading state
{isLoading ? (
  <SectionSkeleton type="about" />
) : (
  <AboutSection />
)}
```