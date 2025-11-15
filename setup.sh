#!/bin/bash

# AI Chat Bot Setup Script
echo "🚀 Setting up AI Chat Bot Application..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your configuration:"
    echo "   - MongoDB URI"
    echo "   - OpenAI API Key"
    echo "   - JWT Secret"
fi

echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Edit .env with your configuration"
echo "2. Ensure MongoDB is running"
echo "3. Run 'npm run dev' to start the backend"
echo "4. In another terminal, run 'npm run client' to start the frontend"
echo ""
echo "🎉 Application will be available at http://localhost:3000"
