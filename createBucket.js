// Manual script to create the avatars bucket in Supabase
// Run this script: node createBucket.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY are set in .env');
  process.exit(1);
}

console.log('🔧 Supabase URL:', supabaseUrl);
console.log('🔑 Using key:', supabaseServiceKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAvatarsBucket() {
  console.log('\n📦 Creating avatars bucket...\n');
  
  try {
    // First, try to list existing buckets
    console.log('1️⃣ Checking existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      console.log('\n💡 This might mean you need to use the Supabase Dashboard to create the bucket manually.');
      return false;
    }
    
    console.log('✅ Found buckets:', buckets?.map(b => b.name).join(', ') || 'none');
    
    const avatarsBucket = buckets?.find(bucket => bucket.name === 'avatars');
    
    if (avatarsBucket) {
      console.log('\n✅ Avatars bucket already exists!');
      
      // Try to update it to ensure it's public
      console.log('2️⃣ Updating bucket settings...');
      const { error: updateError } = await supabase.storage.updateBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (updateError) {
        console.error('⚠️  Could not update bucket:', updateError.message);
      } else {
        console.log('✅ Bucket settings updated!');
      }
    } else {
      console.log('\n2️⃣ Creating new avatars bucket...');
      const { data, error: createError } = await supabase.storage.createBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        console.log('\n💡 You may need to create the bucket manually in Supabase Dashboard:');
        console.log('   1. Go to your Supabase project dashboard');
        console.log('   2. Navigate to Storage');
        console.log('   3. Click "New bucket"');
        console.log('   4. Name it "avatars"');
        console.log('   5. Make it PUBLIC');
        console.log('   6. Set allowed MIME types to: image/*');
        return false;
      }
      
      console.log('✅ Avatars bucket created successfully!');
    }
    
    // Test upload
    console.log('\n3️⃣ Testing bucket with a sample upload...');
    const testContent = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG header
    const testFileName = `test-${Date.now()}.png`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(testFileName, testContent, {
        contentType: 'image/png'
      });
    
    if (uploadError) {
      console.error('❌ Test upload failed:', uploadError.message);
      return false;
    }
    
    console.log('✅ Test upload successful!');
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(testFileName);
    
    console.log('🔗 Public URL:', urlData.publicUrl);
    
    // Clean up
    console.log('\n4️⃣ Cleaning up test file...');
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([testFileName]);
    
    if (deleteError) {
      console.error('⚠️  Could not delete test file:', deleteError.message);
    } else {
      console.log('✅ Test file cleaned up!');
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
    return false;
  }
}

async function initializeProfilePhoto() {
  console.log('\n🖼️  Initializing profile_photo in database...\n');
  
  try {
    // Check if profile_photo exists
    const { data: existing, error: checkError } = await supabase
      .from('sections')
      .select('content')
      .eq('name', 'profile_photo')
      .maybeSingle();
    
    if (checkError) {
      console.error('❌ Error checking profile_photo:', checkError.message);
      return false;
    }
    
    if (existing) {
      console.log('✅ profile_photo already exists with value:', existing.content);
    } else {
      console.log('📝 Creating profile_photo entry...');
      const defaultImage = 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800';
      
      const { error: insertError } = await supabase
        .from('sections')
        .insert({ name: 'profile_photo', content: defaultImage });
      
      if (insertError) {
        console.error('❌ Error creating profile_photo:', insertError.message);
        return false;
      }
      
      console.log('✅ profile_photo initialized with default image!');
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
    return false;
  }
}

// Run the setup
async function main() {
  console.log('🚀 Starting Supabase Storage Setup\n');
  console.log('==================================\n');
  
  const bucketCreated = await createAvatarsBucket();
  const photoInitialized = await initializeProfilePhoto();
  
  console.log('\n==================================');
  if (bucketCreated && photoInitialized) {
    console.log('🎉 Setup completed successfully!');
    console.log('✅ You can now upload images in your app!');
  } else {
    console.log('⚠️  Setup incomplete. Please check the errors above.');
    console.log('\n💡 If bucket creation failed, please create it manually in Supabase Dashboard.');
  }
}

main().catch(console.error);
