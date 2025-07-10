import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video, Upload, X, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface EditableVideoProps {
  src?: string;
  onSave: (videoUrl: string) => void;
  className?: string;
  placeholder?: string;
}

const EditableVideo: React.FC<EditableVideoProps> = ({
  src,
  onSave,
  className = '',
  placeholder = 'No video uploaded yet'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(src || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    if (!src) {
      return (
        <div className={`bg-navy-100 rounded-xl flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <p className="text-navy-600">{placeholder}</p>
          </div>
        </div>
      );
    }
    return (
      <video src={src} controls className={className}>
        Your browser does not support the video tag.
      </video>
    );
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setVideoUrl(result);
        onSave(result);
        setIsEditing(false);
        toast.success('Video uploaded successfully!');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload video');
      setIsUploading(false);
    }
  };

  const handleUrlSave = () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a valid video URL or upload a file');
      return;
    }
    onSave(videoUrl);
    setIsEditing(false);
    toast.success('Video updated successfully!');
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div className="border-2 border-dashed border-gold-300 rounded-lg p-6 bg-gold-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Enter video URL or upload from computer"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-navy-600 mb-3">Or upload from your computer</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Video</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleUrlSave}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setVideoUrl(src || '');
                  setIsEditing(false);
                }}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {src ? (
        <video src={src} controls className={className}>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className={`bg-navy-100 rounded-xl flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <p className="text-navy-600">{placeholder}</p>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 bg-gold-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-600"
      >
        <Video className="w-4 h-4" />
      </button>
    </div>
  );
};

export default EditableVideo;