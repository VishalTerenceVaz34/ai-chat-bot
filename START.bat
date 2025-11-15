@echo off
REM AI Chat Bot - Quick Start Script for Windows

echo.
echo ========================================
echo   AI Chat Bot - Quick Start
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error installing root dependencies
        pause
        exit /b 1
    )
)

if not exist "client\node_modules" (
    echo Installing client dependencies...
    call npm run install-all
    if errorlevel 1 (
        echo Error installing dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo Server will run on: http://localhost:5000
echo.

REM Start backend server
start cmd /k "npm run dev"

timeout /t 3

echo.
echo ========================================
echo Starting Frontend App...
echo ========================================
echo App will open at: http://localhost:3000
echo.

REM Start frontend
start cmd /k "npm run client"

echo.
echo ========================================
echo All services starting!
echo ========================================
echo.
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
echo The frontend should open automatically in your browser.
echo.
pause
