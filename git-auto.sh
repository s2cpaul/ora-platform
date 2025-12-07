#!/bin/zsh

# Stage all changes
git add .

# Use a default commit message
git commit -m "Automated commit: update and resolve changes" || echo "No changes to commit."

# Pull and rebase with remote main
git pull --rebase origin main

# Push to remote main
git push origin main
chmod +x git-auto.sh
./git-auto.sh