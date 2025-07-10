import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface UploadResult {
  url: string;
  path: string;
}

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, PNG, GIF, WebP)');
      return false;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return false;
    }

    return true;
  };

  const uploadImage = async (file: File, folder: string = 'uploads'): Promise<UploadResult | null> => {
    if (!validateFile(file)) {
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(folder)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(folder)
        .getPublicUrl(fileName);

      const result: UploadResult = {
        url: urlData.publicUrl,
        path: fileName
      };

      setUploadProgress(100);
      toast.success('Image uploaded successfully!');
      return result;

    } catch (error: any) {
      console.error('Upload failed:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('bucket') && error.message?.includes('not found')) {
        toast.error('❌ Bucket "avatars" not found! Please create it in Supabase Dashboard.');
        console.error('🚨 IMPORTANT: The "avatars" bucket needs to be created in Supabase.');
        console.error('📖 See SUPABASE_SETUP.md for instructions.');
      } else if (error.statusCode === 400) {
        toast.error('❌ Invalid request. Check file type and size.');
      } else if (error.statusCode === 401) {
        toast.error('❌ Authentication error. Please log in again.');
      } else if (error.statusCode === 413) {
        toast.error('❌ File too large. Maximum size is 10MB.');
      } else {
        toast.error(`❌ Upload failed: ${error.message || 'Unknown error'}`);
      }
      
      return null;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const deleteImage = async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('avatars')
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      toast.success('Image deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Delete failed:', error);
      toast.error(`Delete failed: ${error.message}`);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    uploadProgress
  };
};