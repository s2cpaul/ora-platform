#!/bin/zsh

# Stage all changes
git add .

# Use a default commit message
git commit -m "Automated commit: update and resolve changes" || echo "No changes to commit."

# Pull and rebase with remote main
git pull --rebase origin main

# Push to remote main
git push origin main

# Note: Do NOT call this script from itself to avoid infinite loops.
# Run 'chmod +x git-auto.sh' once in your terminal to make it executable.
# Then run './git-auto.sh' to execute it when needed.