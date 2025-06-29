#!/bin/bash

# Start the bot with PM2
echo "Starting bot with PM2..."
pm2 start ecosystem.config.js

# Show PM2 status
echo "\nBot status:" 
pm2 status
