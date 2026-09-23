@echo off
REM Test script for yt-dlp-api (Windows)

set BASE_URL=http://localhost:8080
set TEST_URL=https://www.youtube.com/watch?v=dQw4w9WgXcQ

echo === Testing /health ===
curl -s %BASE_URL%/health
echo.

echo === Testing /info ===
curl -s "%BASE_URL%/info?url=%TEST_URL%"
echo.

echo === Testing /download/video ===
curl -s "%BASE_URL%/download/video?url=%TEST_URL%&quality=720p"
echo.

echo === For streaming, run in another terminal: ===
echo curl -N "%BASE_URL%/stream/<download_id>"
echo.

echo To download audio only:
echo curl -s "%BASE_URL%/download/audio?url=%TEST_URL%"