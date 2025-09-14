import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../hooks/useContent';

interface EditableContentProps {
  name: string;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  defaultContent?: string;
}

const EditableContent: React.FC<EditableContentProps> = ({
  name,
  multiline = false,
  className = '',
  placeholder = 'Enter content...',
  defaultContent = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const { isAdmin } = useAuth();
  const { content, saveContent } = useContent(name);

  // Always show content - never show loading or error states
  const displayContent = content || defaultContent || placeholder;

  const handleStartEdit = () => {
    setEditValue(displayContent);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await saveContent(editValue);
      setIsEditing(false);
    } catch (err) {
      // Even on error, close editing mode to prevent UI issues
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(displayContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  // Non-admin users just see the content
  if (!isAdmin) {
    return (
      <span className={className}>
        {displayContent}
      </span>
    );
  }

  // Admin editing mode
  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-primary-300 rounded-lg p-2 bg-dark-700 text-white resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary-500 w-full`}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-primary-300 rounded-lg p-2 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 w-full`}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="absolute -top-2 -right-2 flex space-x-1 z-10">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors shadow-lg"
            title="Save changes (Ctrl+Enter)"
          >
            <Save className="w-3 h-3" />
          </motion.button>
          <motion.button
            onClick={handleCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="Cancel editing (Esc)"
          >
            <X className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Admin display mode with edit button
  return (
    <div className="relative group">
      <span className={className}>
        {displayContent}
      </span>
      <motion.button
        onClick={handleStartEdit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-2 -right-2 bg-primary-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-600 shadow-lg z-10"
        title={`Edit "${name}"`}
      >
        <Edit3 className="w-3 h-3" />
      </motion.button>
    </div>
  );
};

export default EditableContent;