#!/bin/bash
# Test script for yt-dlp-api

BASE_URL="http://localhost:8080"
TEST_URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"

echo "=== Testing /health ==="
curl -s "$BASE_URL/health"
echo -e "\n"

echo "=== Testing /info ==="
curl -s "$BASE_URL/info?url=$TEST_URL" | jq .
echo -e "\n"

echo "=== Testing /download/video ==="
DOWNLOAD_RESPONSE=$(curl -s "$BASE_URL/download/video?url=$TEST_URL&quality=720p")
echo "$DOWNLOAD_RESPONSE" | jq .
DOWNLOAD_ID=$(echo "$DOWNLOAD_RESPONSE" | jq -r .download_id)
echo "Download ID: $DOWNLOAD_ID"
echo -e "\n"

echo "=== Testing /stream (SSE) ==="
echo "Connecting to stream for $DOWNLOAD_ID..."
echo "Press Ctrl+C to stop watching"
curl -N "$BASE_URL/stream/$DOWNLOAD_ID"