import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  multiline = false,
  className = '',
  placeholder = 'Enter text...'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <span className={className}>{value}</span>;
  }

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-gold-300 rounded-lg p-2 bg-white resize-none`}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-gold-300 rounded-lg p-2 bg-white`}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <span className={className}>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -top-2 -right-2 bg-gold-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit3 className="w-3 h-3" />
      </button>
    </div>
  );
};

export default EditableText;