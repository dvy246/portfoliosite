import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContentSkeleton from './ContentSkeleton';
import SectionSkeleton from './SectionSkeleton';

const SkeletonDemo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'content' | 'section'>('content');
  const [selectedVariant, setSelectedVariant] = useState<string>('text');

  const contentTypes = ['text', 'title', 'paragraph', 'skill', 'card', 'button'];
  const sectionTypes = ['about', 'skills', 'hero', 'projects', 'contact'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Skeleton Loading Components</h1>
          <p className="text-navy-600 text-lg">Interactive demo of skeleton loading states</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-navy-700 mb-2">Component Type</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedType('content')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedType === 'content'
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Content Skeleton
                </button>
                <button
                  onClick={() => setSelectedType('section')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedType === 'section'
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Section Skeleton
                </button>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-navy-700 mb-2">Variant</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                {(selectedType === 'content' ? contentTypes : sectionTypes).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Demo Area */}
        <motion.div
          key={`${selectedType}-${selectedVariant}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-navy-50 border-b">
            <h3 className="text-lg font-semibold text-navy-900">
              {selectedType === 'content' ? 'ContentSkeleton' : 'SectionSkeleton'} - {selectedVariant}
            </h3>
          </div>

          <div className="p-6">
            {selectedType === 'content' ? (
              <div className="space-y-6">
                <ContentSkeleton 
                  type={selectedVariant as any} 
                  lines={selectedVariant === 'paragraph' ? 3 : 1}
                />
                {selectedVariant === 'paragraph' && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-navy-700 mb-4">Different line counts:</h4>
                    <div className="space-y-4">
                      <ContentSkeleton type="paragraph" lines={2} />
                      <ContentSkeleton type="paragraph" lines={4} />
                      <ContentSkeleton type="paragraph" lines={5} />
                    </div>
                  </div>
                )}
                {selectedVariant === 'text' && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-navy-700 mb-4">Different widths:</h4>
                    <div className="space-y-4">
                      <ContentSkeleton type="text" width="small" />
                      <ContentSkeleton type="text" width="medium" />
                      <ContentSkeleton type="text" width="large" />
                      <ContentSkeleton type="text" width="full" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <SectionSkeleton type={selectedVariant as any} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-navy-900 mb-4">Usage Examples</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>
{selectedType === 'content' ? `// Basic usage
<ContentSkeleton type="${selectedVariant}" />

// With custom props
<ContentSkeleton 
  type="${selectedVariant}" 
  ${selectedVariant === 'paragraph' ? 'lines={3}' : ''}
  ${selectedVariant === 'text' ? 'width="medium"' : ''}
  className="custom-class" 
/>` : `// Section skeleton usage
<SectionSkeleton type="${selectedVariant}" />

// With custom styling
<SectionSkeleton 
  type="${selectedVariant}" 
  className="custom-section-class" 
/>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDemo;