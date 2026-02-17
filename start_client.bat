@echo off
echo Starting Frontend Client...
cd client

echo Installing dependencies (this may take a few minutes)...
call npm install

echo Starting React App...
call npm run dev
pause
