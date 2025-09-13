#!/usr/bin/env node

console.log('🧪 Testing Deployment Configuration...\n');

// Test 1: Check if .env file exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

console.log('📁 File Check:');
console.log(`   .env file: ${fs.existsSync(envPath) ? '✅ EXISTS' : '❌ MISSING'}`);
console.log(`   .env.example: ${fs.existsSync(envExamplePath) ? '✅ EXISTS' : '❌ MISSING'}`);

// Test 2: Read and validate .env content
if (fs.existsSync(envPath)) {
  console.log('\n🔍 Environment Variables:');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n').filter(line => line.trim());
  
  let hasSupabaseUrl = false;
  let hasSupabaseKey = false;
  let hasTypos = false;
  
  lines.forEach(line => {
    if (line.includes('VITE_SUPABASE_URL')) {
      hasSupabaseUrl = true;
      console.log('   ✅ VITE_SUPABASE_URL found');
    }
    if (line.includes('VITE_SUPABASE_ANON_KEY')) {
      hasSupabaseKey = true;
      console.log('   ✅ VITE_SUPABASE_ANON_KEY found');
    }
    if (line.includes('SUPERBASE')) {
      hasTypos = true;
      console.log('   ❌ TYPO FOUND: "SUPERBASE" should be "SUPABASE"');
    }
  });
  
  if (!hasSupabaseUrl) console.log('   ❌ VITE_SUPABASE_URL missing');
  if (!hasSupabaseKey) console.log('   ❌ VITE_SUPABASE_ANON_KEY missing');
  
  console.log('\n📊 Status:');
  if (hasSupabaseUrl && hasSupabaseKey && !hasTypos) {
    console.log('   ✅ Environment variables are correctly configured!');
  } else {
    console.log('   ❌ Environment variables need fixing');
  }
} else {
  console.log('\n❌ No .env file found. Create one with:');
  console.log('   VITE_SUPABASE_URL=your_url_here');
  console.log('   VITE_SUPABASE_ANON_KEY=your_key_here');
}

// Test 3: Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('\n📦 Package.json:');
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`   ✅ Project: ${packageContent.name}`);
  console.log(`   ✅ Scripts available: ${Object.keys(packageContent.scripts).join(', ')}`);
} else {
  console.log('\n❌ package.json not found');
}

// Test 4: Check critical files
console.log('\n📂 Critical Files:');
const criticalFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/data/staticContent.ts',
  'index.html',
  'vite.config.ts'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

console.log('\n🚀 Next Steps:');
console.log('1. Fix any ❌ issues above');
console.log('2. Run: npm run dev (test locally)');
console.log('3. Run: npm run build (test build)');
console.log('4. Deploy with correct environment variables');
console.log('\n💡 Most common issue: Typo in environment variable names (SUPERBASE vs SUPABASE)');