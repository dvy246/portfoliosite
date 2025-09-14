console.log('🧪 Simple Deployment Test\n');

// Simple file system check
try {
  const fs = require('fs');

  console.log('📁 Checking Files:');

  // Check .env
  if (fs.existsSync('.env')) {
    console.log('   ✅ .env file exists');

    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('VITE_SUPABASE_URL')) {
      console.log('   ✅ VITE_SUPABASE_URL found');
    } else {
      console.log('   ❌ VITE_SUPABASE_URL missing');
    }

    if (envContent.includes('VITE_SUPABASE_ANON_KEY')) {
      console.log('   ✅ VITE_SUPABASE_ANON_KEY found');
    } else {
      console.log('   ❌ VITE_SUPABASE_ANON_KEY missing');
    }

    if (envContent.includes('SUPERBASE')) {
      console.log('   ❌ TYPO: Found "SUPERBASE" - should be "SUPABASE"');
    }
  } else {
    console.log('   ❌ .env file missing');
  }

  // Check package.json
  if (fs.existsSync('package.json')) {
    console.log('   ✅ package.json exists');
  } else {
    console.log('   ❌ package.json missing');
  }

  // Check main files
  const files = ['src/App.tsx', 'src/main.tsx', 'index.html'];
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file} exists`);
    } else {
      console.log(`   ❌ ${file} missing`);
    }
  });

  console.log('\n🚀 Next Steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run dev');
  console.log('3. Check http://localhost:5173');

} catch (error) {
  console.log('❌ Test failed:', error.message);
}