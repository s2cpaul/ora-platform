# Git Repository Setup Instructions

## Prerequisites
- Git installed on your machine ([Download Git](https://git-scm.com/downloads))
- GitHub account created ([Sign up at GitHub](https://github.com/signup))
- Visual Studio Code installed

## Step 1: Initialize Git Repository Locally

Open your terminal/command prompt in Visual Studio Code (Terminal → New Terminal) and navigate to your project root directory, then run:

```bash
# Initialize a new Git repository
git init

# Check the status of your files
git status
```

## Step 2: Add Files to Git

```bash
# Add all files to staging (respects .gitignore)
git add .

# Or add files individually
git add package.json
git add App.tsx
git add components/
# etc.

# Verify what's been staged
git status
```

## Step 3: Make Your First Commit

```bash
# Commit the staged files with a message
git commit -m "Initial commit: ORA Voice of Customer template with React, Tailwind, and all components"
```

## Step 4: Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `ora-voice-of-customer` (or your preferred name)
   - **Description**: "Voice of the Customer web template for Global Gen-AI Community"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ora-voice-of-customer.git

# Verify the remote was added
git remote -v

# Push your code to GitHub (main branch)
git push -u origin main

# If you get an error about 'master' branch, rename it to 'main' first:
git branch -M main
git push -u origin main
```

## Step 6: Verify Your Repository

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The `.gitignore` file should be visible
4. `node_modules/` should NOT be visible (excluded by .gitignore)

## Common Git Commands for Daily Use

```bash
# Check status of changed files
git status

# Add all changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push changes to GitHub
git push

# Pull latest changes from GitHub
git pull

# Create a new branch for features
git checkout -b feature-branch-name

# Switch back to main branch
git checkout main

# View commit history
git log --oneline
```

## Step 7: Set Up Git Configuration (First Time Only)

If this is your first time using Git, configure your identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## Authentication Options

### Option A: Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing

### Option B: SSH Keys (More Secure)
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to SSH agent: `ssh-add ~/.ssh/id_ed25519`
3. Copy public key: `cat ~/.ssh/id_ed25519.pub`
4. Add to GitHub: Settings → SSH and GPG keys → New SSH key
5. Use SSH URL: `git remote set-url origin git@github.com:YOUR_USERNAME/ora-voice-of-customer.git`

## Next Steps

Once your repository is set up, you'll be ready to:
1. Set up CI/CD pipeline with GitHub Actions
2. Configure automated deployments to Firebase Hosting
3. Deploy to your domain: oratf.info

## Troubleshooting

**Problem**: `git push` asks for username/password repeatedly
**Solution**: Set up SSH keys or use Personal Access Token

**Problem**: Changes not showing on GitHub
**Solution**: Make sure you committed and pushed: `git add .` → `git commit -m "message"` → `git push`

**Problem**: "Permission denied" error
**Solution**: Check your authentication method (Personal Access Token or SSH key)

---

**Ready for CI/CD setup tomorrow!** ✅
