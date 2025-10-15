#!/bin/bash
# How to run the app via PM2 (https://www.npmjs.com/package/pm2)
pm2 start --name sacchbot ./dist/index.js --time
