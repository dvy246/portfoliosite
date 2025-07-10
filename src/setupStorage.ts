import { supabase } from './lib/supabase';

export const setupStorageBucket = async () => {
  console.log('🚀 Setting up Supabase Storage bucket...');
  
  try {
    // Check if avatars bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return false;
    }
    
    const avatarsBucket = buckets?.find(bucket => bucket.name === 'avatars');
    
    if (!avatarsBucket) {
      console.log('📦 Creating avatars bucket...');
      
      const { data, error: createError } = await supabase.storage.createBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('❌ Error creating bucket:', createError);
        return false;
      }
      
      console.log('✅ Avatars bucket created successfully!');
    } else {
      console.log('✅ Avatars bucket already exists');
      
      // Update bucket to ensure it's public
      const { data, error: updateError } = await supabase.storage.updateBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (updateError) {
        console.error('⚠️ Warning: Could not update bucket settings:', updateError);
      } else {
        console.log('✅ Avatars bucket settings updated');
      }
    }
    
    // Test the bucket by uploading a test file
    console.log('🧪 Testing bucket upload...');
    const testFile = new Blob(['test'], { type: 'image/png' });
    const testFileName = `test-${Date.now()}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(testFileName, testFile);
    
    if (uploadError) {
      console.error('❌ Test upload failed:', uploadError);
      return false;
    }
    
    console.log('✅ Test upload successful');
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(testFileName);
    
    console.log('🔗 Test file URL:', urlData.publicUrl);
    
    // Clean up test file
    await supabase.storage.from('avatars').remove([testFileName]);
    console.log('🧹 Test file cleaned up');
    
    return true;
  } catch (error) {
    console.error('❌ Setup failed:', error);
    return false;
  }
};

// Initialize profile_photo in sections table
export const initializeProfilePhoto = async () => {
  console.log('🖼️ Initializing profile_photo in sections table...');
  
  try {
    // Check if profile_photo exists
    const { data: existing, error: checkError } = await supabase
      .from('sections')
      .select('content')
      .eq('name', 'profile_photo')
      .maybeSingle();
    
    if (checkError) {
      console.error('❌ Error checking profile_photo:', checkError);
      return false;
    }
    
    if (!existing) {
      // Create profile_photo entry with default image
      const defaultImage = 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800';
      
      const { data, error: insertError } = await supabase
        .from('sections')
        .insert({ name: 'profile_photo', content: defaultImage })
        .select();
      
      if (insertError) {
        console.error('❌ Error creating profile_photo:', insertError);
        return false;
      }
      
      console.log('✅ profile_photo initialized with default image');
    } else {
      console.log('✅ profile_photo already exists:', existing.content);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    return false;
  }
};

// Run setup
export const runFullSetup = async () => {
  console.log('🎯 Running full storage setup...');
  
  const bucketSetup = await setupStorageBucket();
  const photoInit = await initializeProfilePhoto();
  
  if (bucketSetup && photoInit) {
    console.log('🎉 All setup completed successfully!');
    return true;
  } else {
    console.log('❌ Setup incomplete. Check errors above.');
    return false;
  }
};
