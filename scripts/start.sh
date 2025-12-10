#!/bin/bash

cd /Users/manu225/ai-leads-saas/infrastructure
docker-compose up -d

osascript -e 'tell application "Terminal" to do script "cd /Users/manu225/ai-leads-saas/backend && npm run start:dev"'
osascript -e 'tell application "Terminal" to do script "cd /Users/manu225/ai-leads-saas/frontend && npm run dev"'
