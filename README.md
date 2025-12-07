# ora-platform

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Node.js** 18+ installed ([Download](https://nodejs.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **Visual Studio Code** installed ([Download](https://code.visualstudio.com/))
- [ ] **GitHub account** ([Sign up](https://github.com/))
- [ ] **Supabase account** ([Sign up](https://supabase.com/))
- [ ] **Firebase account** ([Sign up](https://console.firebase.google.com/))
- [ ] **Google Cloud Console** access (for OAuth)
- [ ] **Stripe account** (for payments - optional initially)

## Pro tip: Make sure your .gitignore includes:

```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
```

**Pro tip for macOS users:**
To install the Supabase CLI, use Homebrew:

```bash
brew install supabase/tap/supabase
```

This is the recommended method for Mac. For other platforms, see the official Supabase CLI docs.

---

# ORA-Global-AI-Community-UI

This is a code bundle for ORA-Global-AI-Community-UI. The original project is available at https://www.figma.com/design/Q1Oja4U0Wxhtd9XrT79Q3c/ORA-Global-AI-Community-UI.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

---

**Vite Development Server**

- VITE v7.2.6 ready in 377 ms
- Local:   http://localhost:5173/
- Network: use --host to expose
- Press h + enter to show help

## Automate Your Git Workflow

To automate staging, committing, rebasing, and pushing changes, use the provided script:

1. Save the following as `git-auto.sh` in your project root:

```sh
#!/bin/zsh

# Stage all changes
git add .

# Use a default commit message
git commit -m "Automated commit: update and resolve changes" || echo "No changes to commit."

# Pull and rebase with remote main
git pull --rebase origin main

# Push to remote main
git push origin main
```

2. Make the script executable:
```sh
chmod +x git-auto.sh
```

3. Run the script to automate your workflow:
```sh
./git-auto.sh
```

This will stage, commit, rebase, and push your changes automatically, activating your GitHub Actions workflow on every push.
