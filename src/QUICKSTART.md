# 🚀 Quick Start - First Deployment

## Your First 30 Minutes

This is a streamlined checklist for your first deployment. For detailed instructions, see `DEPLOYMENT_GUIDE.md`.

---

## ✅ Phase 1: Local Setup (10 minutes)

### Step 1: Download & Initialize
```bash
# Navigate to your project folder
cd ora-platform

# Initialize git
git init

# Install dependencies
npm install
```

### Step 2: Create Accounts
- [ ] Create [Supabase account](https://supabase.com/)
- [ ] Create [Firebase account](https://firebase.google.com/)
- [ ] Create [GitHub account](https://github.com/)

### Step 3: Environment Setup
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials (we'll get these next)
code .env
```

---

## ✅ Phase 2: Supabase Setup (10 minutes)

### Step 1: Create Project
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New project"**
3. Name: `ora-platform`
4. Set strong password (save it!)
5. Click **"Create"**

### Step 2: Get Credentials
1. **Settings** → **API**
   - Copy **Project URL** → Add to `.env` as `VITE_SUPABASE_URL`
   - Copy **anon public key** → Add to `.env` as `VITE_SUPABASE_ANON_KEY`
   - Copy **service_role key** → Add to `.env` as `SUPABASE_SERVICE_ROLE_KEY`

2. **Settings** → **Database**
   - Copy **URI** connection string → Add to `.env` as `SUPABASE_DB_URL`
   - Replace `[YOUR-PASSWORD]` with your database password

### Step 3: Update Frontend Config
Edit `/utils/supabase/info.tsx`:
```typescript
// Replace with your actual values
export const projectId = 'xxxxxxxxxxxxx'; // From your Supabase URL
export const publicAnonKey = 'eyJhbGciOiJIUzI1...'; // Your anon key
```

### Step 4: Deploy Backend
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project (select from list)
supabase link

# Deploy Edge Function
supabase functions deploy make-server-3504d096

# Set secrets
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
supabase secrets set SUPABASE_DB_URL=postgresql://...
```

---

## ✅ Phase 3: Test Locally (5 minutes)

```bash
# Start dev server
npm run dev
```

Visit `http://localhost:5173` and test:
- [ ] App loads
- [ ] Dark/light mode works
- [ ] Navigation works
- [ ] Click **Library** in nav
- [ ] Try uploading a test PDF

**If PDF upload works, your backend is connected! 🎉**

---

## ✅ Phase 4: Push to GitHub (5 minutes)

### Step 1: Create GitHub Repo
1. Go to [GitHub](https://github.com/new)
2. Repository name: `ora-platform`
3. **Private** repository
4. **DO NOT** initialize with anything
5. Click **"Create repository"**

### Step 2: Push Code
```bash
# Add all files
git add .

# First commit
git commit -m "Initial commit: ORA platform"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/s2cpaul/ora-platform.git

# Push
git branch -M main
git push -u origin main
```

**Your code is now safely backed up! 🎉**

---

## ✅ Phase 5: Deploy to Production (Optional - can do later)

### Fastest Option: Vercel (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel

# When prompted:
# - Link to existing project? No
# - Project name: ora-platform
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
```

Vercel will automatically:
- Deploy your app
- Give you a live URL
- Set up auto-deploy on git push

**Your app is live! 🚀**

---

## 🎯 You're Done!

### What You've Accomplished:
✅ Set up Supabase backend with PDF storage  
✅ Configured environment variables  
✅ Tested locally  
✅ Pushed to GitHub for version control  
✅ (Optional) Deployed to production  

### Your URLs:
- **Local Dev**: http://localhost:5173
- **GitHub Repo**: https://github.com/s2cpaul/ora-platform
- **Production** (if deployed): Check Vercel dashboard

---

## 🔜 Next Steps (Do Later)

### Google OAuth Setup
Follow **STEP 5** in `DEPLOYMENT_GUIDE.md` to enable Google Sign-In

### Firebase Hosting (Alternative to Vercel)
Follow **STEP 7 Option A** in `DEPLOYMENT_GUIDE.md`

### Continuous Deployment
Follow **STEP 9** in `DEPLOYMENT_GUIDE.md` for GitHub Actions

### Add More Features
- Stripe payment integration
- OpenAI API for AI assistant
- HeyGen video integration
- Custom domain

---

## 📋 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Git
git status              # Check what changed
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Supabase
supabase link           # Link to project
supabase functions deploy make-server-3504d096  # Deploy backend
supabase secrets list   # View secrets

# Deployment
vercel                  # Deploy to Vercel
firebase deploy         # Deploy to Firebase
```

---

## 🆘 Quick Troubleshooting

### "PDF upload not working"
1. Check `.env` has correct Supabase credentials
2. Verify Edge Function is deployed: `supabase functions list`
3. Check browser console for errors

### "Environment variables undefined"
1. Restart dev server after changing `.env`
2. Ensure frontend vars start with `VITE_`
3. For production, set variables in hosting platform

### "Git push rejected"
```bash
git pull origin main --rebase
git push origin main
```

---

## 📚 Full Documentation

For detailed explanations, see:
- **Complete Guide**: `DEPLOYMENT_GUIDE.md`
- **Project Overview**: `README.md`
- **Environment Setup**: `.env.example`

---

**Questions?** Check `DEPLOYMENT_GUIDE.md` or open an issue on GitHub.

**Ready?** Let's start with Phase 1! ⬆️
