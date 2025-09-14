#!/usr/bin/env node

console.log('🔍 Verifying Build Configuration...\n');

try {
  // Check if we can build the project
  const { execSync } = require('child_process');
  
  console.log('📦 Testing TypeScript compilation...');
  
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('✅ TypeScript compilation successful');
  } catch (error) {
    console.log('❌ TypeScript compilation failed');
    console.log('   Run: npx tsc --noEmit for details');
  }
  
  console.log('\n🏗️ Testing Vite build...');
  
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Vite build successful');
  } catch (error) {
    console.log('❌ Vite build failed');
    console.log('   Run: npm run build for details');
  }
  
  console.log('\n🎯 Build verification complete!');
  console.log('   If both tests passed, your app is ready for deployment.');
  
} catch (error) {
  console.log('❌ Verification failed:', error.message);
}