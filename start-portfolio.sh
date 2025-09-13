#!/bin/bash

echo "🚀 Starting Divy's Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "📝 Please edit .env file with your Supabase credentials"
        echo "   VITE_SUPABASE_URL=your_supabase_url"
        echo "   VITE_SUPABASE_ANON_KEY=your_supabase_key"
        echo ""
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🔥 Starting development server..."
echo "📱 Portfolio will open at: http://localhost:5173"
echo ""
echo "🧪 Testing checklist:"
echo "   ✅ Profile photo loads without flickering"
echo "   ✅ Skills section appears smoothly"
echo "   ✅ Page loads in under 2 seconds"
echo "   ✅ Mobile responsive design works"
echo ""

# Start the development server
npm run dev