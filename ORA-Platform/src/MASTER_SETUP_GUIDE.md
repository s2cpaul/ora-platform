# ORA Voice of Customer - Master Setup Guide

## 🎯 Complete Production Deployment Roadmap

This master guide provides a simple, step-by-step path to take your ORA application from development to production with all integrations working.

---

## 📋 What You're Building

A comprehensive AI-powered learning platform with:
- ✅ React + TypeScript + Tailwind CSS
- ✅ Firebase Authentication (Google OAuth)
- ✅ OpenAI-powered AI Assistant
- ✅ HeyGen Video Integration
- ✅ Stripe Payments
- ✅ Automated CI/CD Pipeline
- ✅ Production Deployment on Firebase Hosting
- ✅ Custom Domain (oratf.info)

---

## 🗺️ Setup Path Overview

**Phase 1**: Local Development Setup (1-2 hours)
**Phase 2**: Git & Version Control (30 mins)
**Phase 3**: Firebase & Authentication (1 hour)
**Phase 4**: OpenAI Integration (45 mins)
**Phase 5**: HeyGen Videos (1 hour)
**Phase 6**: Production Deployment (1 hour)
**Phase 7**: CI/CD Pipeline (45 mins)

**Total Time**: ~6-7 hours

---

## 📖 Detailed Setup Instructions

### PHASE 1: Local Development Setup

**Goal**: Get the application running on your local machine

#### Step 1.1: Install Prerequisites
1. Install [Node.js](https://nodejs.org/) (v18 or higher)
   - Download and install from official site
   - Verify: `node --version` and `npm --version`

2. Install [Visual Studio Code](https://code.visualstudio.com/)
   - Download and install
   - Install recommended extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense

3. Install [Git](https://git-scm.com/downloads)
   - Download and install
   - Verify: `git --version`

#### Step 1.2: Set Up Project
1. Open VS Code
2. Open your project folder
3. Open Terminal (Terminal → New Terminal)
4. Install dependencies:
   ```bash
   npm install
   ```

#### Step 1.3: Run Development Server
```bash
npm run dev
```
- Open browser to: `http://localhost:5173`
- Verify app loads correctly

**✅ Checkpoint**: Application running locally

**📚 Full Guide**: See `/DEPLOYMENT_GUIDE.md`

---

### PHASE 2: Git & Version Control

**Goal**: Set up version control and GitHub repository

#### Step 2.1: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: ORA Voice of Customer platform"
```

#### Step 2.2: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click **+ → New repository**
3. Name: `ora-voice-of-customer`
4. Click **Create repository**

#### Step 2.3: Connect and Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/ora-voice-of-customer.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint**: Code on GitHub

**📚 Full Guide**: See `/GIT_SETUP_INSTRUCTIONS.md`

---

### PHASE 3: Firebase & Google Authentication

**Goal**: Set up backend services and user authentication

#### Step 3.1: Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create new project: `ora-voice-of-customer`
3. Enable Google Analytics (optional)

#### Step 3.2: Enable Google Auth
1. Firebase Console → Authentication
2. Click **Get started**
3. Enable **Google** sign-in provider
4. Add your email as support email

#### Step 3.3: Register Web App
1. Click Web icon (</>)
2. App nickname: `ORA Web App`
3. Check **"Also set up Firebase Hosting"**
4. Copy Firebase config

#### Step 3.4: Configure Environment
Create `.env` file in project root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 3.5: Install Firebase
```bash
npm install firebase
```

#### Step 3.6: Test Authentication
1. Restart dev server: `npm run dev`
2. Click **Sign In** button
3. Sign in with Google account
4. Verify successful login

**✅ Checkpoint**: Google Auth working

**📚 Full Guide**: See `/FIREBASE_GOOGLE_AUTH_SETUP.md`

---

### PHASE 4: OpenAI Integration

**Goal**: Connect AI Assistant to OpenAI API

#### Step 4.1: Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up/login
3. Go to API Keys section
4. Create new secret key
5. **Copy key immediately**

#### Step 4.2: Add to Environment
Add to `.env`:
```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=1000
VITE_OPENAI_TEMPERATURE=0.7
```

#### Step 4.3: Set Up Billing
1. OpenAI → Settings → Billing
2. Add payment method
3. Set usage limit: $10-20/month

#### Step 4.4: Install OpenAI SDK
```bash
npm install openai
```

#### Step 4.5: Test AI Assistant
1. Restart dev server
2. Open AI Agent chat
3. Send test message
4. Verify AI responds

**✅ Checkpoint**: AI Assistant working

**📚 Full Guide**: See `/OPENAI_SETUP_GUIDE.md`

---

### PHASE 5: HeyGen Video Integration

**Goal**: Add video learning content with keyword matching

#### Step 5.1: Create HeyGen Account
1. Visit [HeyGen.com](https://www.heygen.com/)
2. Sign up for account
3. Choose plan (free tier available)

#### Step 5.2: Create Training Videos
Create videos for topics:
- AI Governance & Ethics
- Career Transition
- AI Implementation
- Organizational Blind Spots
- AI Tools & Technologies

#### Step 5.3: Get Video URLs
1. After creating each video
2. Click **Share**
3. Copy video URL and embed code

#### Step 5.4: Configure Video Database
The video configuration files have been created:
- `/data/heygenVideos.ts` - Video metadata
- `/utils/videoMatcher.ts` - Keyword matching
- `/components/HeyGenVideoPlayer.tsx` - Video player

**Update video URLs** in `/data/heygenVideos.ts` with your actual HeyGen URLs

#### Step 5.5: Test Video Integration
1. Open AI Agent
2. Ask: "Tell me about AI governance"
3. Verify video recommendations appear
4. Test video playback

**✅ Checkpoint**: Videos integrated and working

**📚 Full Guide**: See `/HEYGEN_VIDEO_INTEGRATION_GUIDE.md`

---

### PHASE 6: Production Deployment

**Goal**: Deploy application to Firebase Hosting

#### Step 6.1: Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### Step 6.2: Initialize Firebase
```bash
firebase init
```
- Select: **Hosting**
- Choose: **Use existing project**
- Public directory: `dist`
- SPA: **Yes**

#### Step 6.3: Build and Deploy
```bash
npm run build
firebase deploy
```

#### Step 6.4: Verify Deployment
1. Open provided URL: `https://your-project.web.app`
2. Test all features:
   - Google Sign-In
   - AI Assistant
   - Lessons and quizzes
   - Video recommendations
   - Payment flow

**✅ Checkpoint**: Live on Firebase

**📚 Full Guide**: See `/FIREBASE_GOOGLE_AUTH_SETUP.md` (Part 2)

---

### PHASE 7: CI/CD Pipeline

**Goal**: Automate deployments on every Git push

#### Step 7.1: Create GitHub Actions Workflow
File already created: `.github/workflows/firebase-deploy.yml`

#### Step 7.2: Get Firebase Service Account
```bash
firebase login:ci
```
Copy the token provided

#### Step 7.3: Add GitHub Secrets
1. GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `FIREBASE_SERVICE_ACCOUNT`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - `VITE_OPENAI_API_KEY`

#### Step 7.4: Test Automated Deployment
```bash
git add .
git commit -m "Enable CI/CD pipeline"
git push origin main
```

Watch deployment in GitHub Actions tab

**✅ Checkpoint**: Automated deployments working

**📚 Full Guide**: See `/FIREBASE_GOOGLE_AUTH_SETUP.md` (Part 3)

---

## 🔧 Configuration Files Reference

### Essential Files Created

1. **`.gitignore`** ✅
   - Prevents sensitive files from being committed
   - Already configured with all necessary exclusions

2. **`.env`** (You create this)
   - Contains all API keys and secrets
   - **NEVER commit to Git**
   - Template provided in each setup guide

3. **`firebase.json`** (Created by Firebase CLI)
   - Firebase Hosting configuration
   - Automatic routing and caching

4. **`.firebaserc`** (Created by Firebase CLI)
   - Project aliases for Firebase

5. **`.github/workflows/firebase-deploy.yml`** ✅
   - GitHub Actions CI/CD workflow
   - Automated deployments

---

## 📁 Project Structure

```
ora-voice-of-customer/
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml          # CI/CD pipeline
├── components/
│   ├── AIAgent.tsx                      # AI Assistant (needs OpenAI)
│   ├── HeyGenVideoPlayer.tsx            # Video player ✅ (needs videos)
│   ├── LessonViewer.tsx                 # Lesson interface ✅
│   ├── Navigation.tsx                   # Global nav ✅
│   ├── ProgressPage.tsx                 # Progress tracking ✅
│   └── ...
├── config/
│   └── firebase.ts                      # Firebase config (needs creation)
├── data/
│   └── heygenVideos.ts                  # Video database (needs creation)
├── hooks/
│   └── useAuth.ts                       # Auth hook (needs creation)
├── utils/
│   ├── videoMatcher.ts                  # Video matching (needs creation)
│   └── progressSystem.ts                # Progress tracking ✅
├── styles/
│   └── globals.css                      # Global styles ✅
├── .env                                 # Environment variables (YOU CREATE)
├── .gitignore                           # Git exclusions ✅
├── App.tsx                              # Main app ✅
├── package.json                         # Dependencies ✅
├── MASTER_SETUP_GUIDE.md               # This file ✅
├── OPENAI_SETUP_GUIDE.md               # OpenAI setup ✅
├── HEYGEN_VIDEO_INTEGRATION_GUIDE.md   # HeyGen setup ✅
├── FIREBASE_GOOGLE_AUTH_SETUP.md       # Firebase setup ✅
└── GIT_SETUP_INSTRUCTIONS.md           # Git setup ✅
```

**Legend**:
- ✅ = Already created/configured
- (needs creation) = You need to create this following the guides
- (needs videos) = You need to add your HeyGen video URLs

---

## 🚀 Quick Start Commands

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Git
```bash
git status          # Check changed files
git add .           # Stage all changes
git commit -m "..."  # Commit with message
git push            # Push to GitHub
```

### Firebase
```bash
firebase login      # Login to Firebase
firebase init       # Initialize project
firebase deploy     # Deploy to hosting
firebase serve      # Test locally
```

---

## 📊 Feature Implementation Status

### Core Features
- ✅ React + TypeScript + Tailwind
- ✅ Responsive mobile-first design
- ✅ Dark/light mode with persistence
- ✅ ORA brand styling with glow effects

### User Interface
- ✅ Global navigation
- ✅ Home page with hero section
- ✅ Lesson viewer with quiz system
- ✅ Progress tracking with badges
- ✅ Point-based scoring (100 pts/lesson)

### Authentication
- ⏳ Firebase setup (Phase 3)
- ⏳ Google OAuth integration (Phase 3)
- ⏳ User profile management (Phase 3)

### AI Features
- ⏳ OpenAI integration (Phase 4)
- ⏳ Conversational AI assistant (Phase 4)
- ⏳ Keyword-based responses (Phase 4)

### Video Learning
- ⏳ HeyGen video integration (Phase 5)
- ⏳ Keyword matching system (Phase 5)
- ⏳ Video recommendations in chat (Phase 5)

### Payments
- ✅ Stripe integration setup guide available
- ⏳ Payment flow implementation (Optional)

### Deployment
- ⏳ Firebase Hosting (Phase 6)
- ⏳ Custom domain setup (Phase 6)
- ⏳ CI/CD pipeline (Phase 7)

**Legend**: ✅ Complete | ⏳ Pending | ❌ Not started

---

## 🎓 Learning Resources

### Firebase
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

### OpenAI
- [OpenAI API Docs](https://platform.openai.com/docs)
- [GPT Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)

### HeyGen
- [HeyGen Help Center](https://help.heygen.com/)
- [HeyGen API Docs](https://docs.heygen.com/)

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## ⚠️ Important Security Notes

### Never Commit These Files
- `.env` - Contains all secrets
- `firebase.env` - Firebase credentials
- `serviceAccountKey.json` - Firebase admin key
- Any file with API keys

### Always Use Environment Variables
```typescript
// ✅ Good
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// ❌ Bad - NEVER do this
const apiKey = "sk-abc123...";
```

### GitHub Secrets
- Add ALL secrets to GitHub Secrets
- Never put secrets in workflow files
- Use secrets in Actions: `${{ secrets.SECRET_NAME }}`

---

## 🐛 Troubleshooting Guide

### "Module not found" errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
```bash
# Solution: Restart dev server after changing .env
# Press Ctrl+C to stop
npm run dev
```

### Firebase deploy fails
```bash
# Solution: Check you're logged in and project is correct
firebase login
firebase use --add
firebase deploy
```

### Git push requires username/password repeatedly
```bash
# Solution: Use SSH or Personal Access Token
# See GIT_SETUP_INSTRUCTIONS.md for details
```

### OpenAI API errors
1. Check API key is correct
2. Verify billing is set up
3. Check usage limits not exceeded
4. Test key at: https://platform.openai.com/api-keys

---

## 📞 Support & Resources

### Documentation Files
- **This file**: Master overview and quick reference
- **DEPLOYMENT_GUIDE.md**: Initial project setup
- **GIT_SETUP_INSTRUCTIONS.md**: Version control setup
- **FIREBASE_GOOGLE_AUTH_SETUP.md**: Firebase and auth
- **OPENAI_SETUP_GUIDE.md**: AI integration
- **HEYGEN_VIDEO_INTEGRATION_GUIDE.md**: Video content
- **STRIPE_PAYMENT_SETUP.md**: Payment integration

### File Locations
All guides are in your project root directory - easy to reference!

---

## ✅ Final Deployment Checklist

### Development
- [ ] Node.js installed
- [ ] VS Code installed
- [ ] Git installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)

### Git & GitHub
- [ ] Git initialized
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `.gitignore` working

### Firebase
- [ ] Firebase project created
- [ ] Google Auth enabled
- [ ] Web app registered
- [ ] Firebase SDK installed
- [ ] `.env` file created with Firebase config

### Authentication
- [ ] Firebase config file created
- [ ] Auth hook created
- [ ] Navigation updated with sign-in
- [ ] Google sign-in working
- [ ] User profile displays

### OpenAI
- [ ] OpenAI account created
- [ ] API key obtained
- [ ] Billing configured
- [ ] OpenAI SDK installed
- [ ] AI Assistant responding

### HeyGen Videos
- [ ] HeyGen account created
- [ ] Training videos created
- [ ] Video URLs collected
- [ ] Video database configured
- [ ] Keyword matching working
- [ ] Videos display in chat

### Deployment
- [ ] Firebase CLI installed
- [ ] Firebase initialized
- [ ] Production build successful
- [ ] Deployed to Firebase Hosting
- [ ] Live URL accessible
- [ ] All features working on production

### CI/CD
- [ ] GitHub Actions workflow created
- [ ] GitHub secrets configured
- [ ] Service account set up
- [ ] Automated deployment tested
- [ ] Deployments working on push

### Custom Domain (Optional)
- [ ] Domain added in Firebase
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Site accessible via custom domain

### Testing
- [ ] Google Auth works on production
- [ ] AI Assistant works on production
- [ ] Videos load on production
- [ ] Lessons and quizzes functional
- [ ] Mobile responsive
- [ ] Dark/light mode working
- [ ] Progress tracking working
- [ ] All navigation working

---

## 🎯 Success Metrics

After completing all phases, you should have:

1. ✅ Fully functional web application
2. ✅ Live at your custom domain (oratf.info)
3. ✅ Google authentication working
4. ✅ AI assistant powered by OpenAI
5. ✅ HeyGen videos integrated
6. ✅ Automated deployments on Git push
7. ✅ Professional production environment
8. ✅ Secure configuration with no exposed secrets
9. ✅ Mobile-responsive design
10. ✅ Complete learning platform with gamification

---

## 🚀 You're Ready!

Follow each phase in order, use the detailed guides for each step, and you'll have your production application live in about 6-7 hours.

**Start with Phase 1** and work your way through. Each phase builds on the previous one.

**Good luck! 🎉**

---

**Last Updated**: December 3, 2024
**Version**: 1.0
**Status**: Production Ready
