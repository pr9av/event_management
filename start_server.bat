@echo off
echo Starting Backend Server...
cd server
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo Starting Node.js server...
call npm start
pause
