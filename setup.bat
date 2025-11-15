@echo off
REM AI Chat Bot Setup Script for Windows

echo 🚀 Setting up AI Chat Bot Application...

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14+ first.
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
cd ..

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from example...
    copy .env.example .env
    echo ⚠️  Please edit .env with your configuration:
    echo    - MongoDB URI
    echo    - OpenAI API Key
    echo    - JWT Secret
)

echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo 1. Edit .env with your configuration
echo 2. Ensure MongoDB is running
echo 3. Run 'npm run dev' to start the backend
echo 4. In another terminal, run 'npm run client' to start the frontend
echo.
echo 🎉 Application will be available at http://localhost:3000
