import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Link, Image, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useImageUpload } from '../../hooks/useImageUpload';
import toast from 'react-hot-toast';

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (imageUrl: string) => void;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onSave,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(src);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = useAuth();
  const { uploadImage, isUploading, uploadProgress } = useImageUpload();

  if (!isAdmin) {
    return <img src={src} alt={alt} className={className} />;
  }

  const processFile = async (file: File) => {
    const result = await uploadImage(file, 'avatars');
    if (result) {
      setImageUrl(result.url);
      onSave(result.url);
      setIsEditing(false);
      toast.success('Profile photo updated successfully!');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSave = () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    onSave(imageUrl);
    setIsEditing(false);
    toast.success('Profile photo updated successfully!');
  };

  const handleCancel = () => {
    setImageUrl(src);
    setIsEditing(false);
    setUploadMethod('file');
    setDragActive(false);
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div className="border-2 border-dashed border-gold-300 rounded-full p-6 bg-gradient-to-br from-gold-50 to-white shadow-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900">Update Profile Photo</h3>
              <p className="text-sm text-navy-600">Upload from your device or use a URL</p>
            </div>

            {/* Upload Method Toggle */}
            <div className="flex space-x-2 bg-white rounded-lg p-1 border border-navy-200">
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  uploadMethod === 'file'
                    ? 'bg-gold-500 text-white shadow-md'
                    : 'text-navy-700 hover:bg-navy-50'
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload File
              </button>
              <button
                onClick={() => setUploadMethod('url')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  uploadMethod === 'url'
                    ? 'bg-gold-500 text-white shadow-md'
                    : 'text-navy-700 hover:bg-navy-50'
                }`}
              >
                <Link className="w-4 h-4 inline mr-2" />
                Use URL
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer ${
                    dragActive 
                      ? 'border-gold-500 bg-gold-50' 
                      : 'border-navy-300 hover:border-gold-400 hover:bg-gold-25'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader className="w-12 h-12 mx-auto mb-4 text-gold-600 animate-spin" />
                      <p className="text-navy-700 font-medium mb-2">Uploading...</p>
                      <div className="w-full bg-navy-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-gold-600' : 'text-navy-400'}`} />
                      <p className="text-navy-700 font-medium mb-2">
                        {dragActive ? 'Drop your photo here!' : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-navy-500 mb-4">JPG, PNG, GIF, WebP up to 10MB</p>
                      <button
                        disabled={isUploading}
                        className="bg-gold-500 text-white px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        Choose Your Photo
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/your-photo.jpg"
                />
                <p className="text-xs text-navy-500 mt-2">
                  💡 Tip: Use a direct link to an image file for best results
                </p>
              </div>
            )}

            {/* Preview */}
            {imageUrl && imageUrl !== src && (
              <div className="mt-4">
                <p className="text-sm font-medium text-navy-700 mb-3">Preview:</p>
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border-2 border-navy-200 shadow-sm"
                    onError={() => toast.error('❌ Invalid image URL')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-navy-100">
              <button
                onClick={uploadMethod === 'url' ? handleUrlSave : () => {}}
                disabled={uploadMethod === 'file' || isUploading || !imageUrl}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                ✅ Save Photo
              </button>
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-medium"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img src={src} alt={alt} className={className} />
      
      {/* Centered Upload Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 rounded-full">
        <motion.button
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gold-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gold-600 transition-all duration-300 flex items-center space-x-2"
          title="📸 Change Photo"
        >
          <Camera className="w-5 h-5" />
          <span className="text-sm font-medium">Change Photo</span>
        </motion.button>
      </div>
    </div>
  );
};

export default EditableImage;