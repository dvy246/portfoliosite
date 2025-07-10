# Supabase Storage Setup Instructions

## 🚀 Quick Setup Guide

Since you're getting a "bucket not found" error, you need to create the `avatars` bucket in your Supabase project. Here's how:

### Step 1: Create the Avatars Bucket

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project: `kcfqnctadolyxpralogs`

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar

3. **Create New Bucket**
   - Click the "New bucket" button
   - Enter these settings:
     - **Name**: `avatars` (exactly as shown, all lowercase)
     - **Public bucket**: ✅ Toggle ON (IMPORTANT!)
     - **Allowed MIME types**: `image/*`
     - **Max file size**: 10 MB (or 10485760 bytes)
   - Click "Save"

### Step 2: Configure Bucket Policies (if needed)

If uploads still fail after creating the bucket, you may need to add policies:

1. Click on the `avatars` bucket
2. Go to "Policies" tab
3. Click "New Policy"
4. Use "For full customization" option
5. Add these policies:

**Upload Policy (INSERT)**:
```sql
-- Allow anyone to upload images
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'avatars');
```

**View Policy (SELECT)**:
```sql
-- Allow anyone to view images
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'avatars');
```

### Step 3: Verify Setup

After creating the bucket, test it:

1. Restart your development server: `npm run dev`
2. Log in as admin
3. Try uploading a profile photo
4. Check the browser console for any errors

### Step 4: Alternative - RLS Settings

If you still have issues, check RLS (Row Level Security):

1. Go to Storage → Policies
2. Make sure RLS is either:
   - Disabled for the `avatars` bucket, OR
   - Has proper policies allowing public access

### Troubleshooting

If you still see "bucket not found":

1. **Double-check the bucket name**: It must be exactly `avatars` (lowercase)
2. **Ensure it's PUBLIC**: The bucket must be set as public
3. **Check your Supabase URL**: Make sure `.env` has the correct project URL
4. **Clear browser cache**: Sometimes old errors persist

### Test with cURL

You can test if the bucket exists using this command:

```bash
curl -X GET "https://kcfqnctadolyxpralogs.supabase.co/storage/v1/bucket/avatars"
```

If successful, you should see bucket information.

## 📝 Notes

- The bucket name `avatars` is hardcoded in the application
- The bucket MUST be public for the images to be viewable
- File size limit is set to 10MB in the code
- Supported formats: JPG, PNG, GIF, WebP

## Need Help?

If you continue to have issues:
1. Check the browser console for specific error messages
2. Verify your Supabase project URL in `.env`
3. Make sure you're logged in as admin when trying to upload
