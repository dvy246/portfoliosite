#!/bin/bash

echo "🚀 Starting Portfolio..."

# Simple checks
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found."
    exit 1
fi

echo "✅ Node: $(node --version)"
echo "✅ npm: $(npm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check .env
if [ ! -f .env ]; then
    echo "⚠️  No .env file found"
    echo "📝 Create .env with:"
    echo "   VITE_SUPABASE_URL=your_url"
    echo "   VITE_SUPABASE_ANON_KEY=your_key"
fi

echo ""
echo "🔥 Starting server at http://localhost:5173"
echo ""

# Start dev server
npm run dev