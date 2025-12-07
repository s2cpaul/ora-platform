# 🎥 ORA Platform - Video Walkthrough Script

**Guide for creating deployment video walkthrough**

---

## 🎬 Video Overview

**Target Audience**: Developers with basic Firebase/Supabase knowledge  
**Duration**: 15-20 minutes  
**Format**: Screen recording with voiceover  
**Tools**: OBS Studio, Loom, or Screenflow

---

## 📝 Video Script & Chapters

### **INTRO (1 min) - [00:00 - 01:00]**

**Visual**: ORA Platform homepage running locally

**Script**:
> "Hey everyone! In this video, I'll show you how to deploy the ORA Platform - a complete Voice of the Customer web template with AI learning, video libraries, PDF management, and revenue dashboards. By the end of this tutorial, you'll have a fully functioning app live on the internet. Let's get started!"

**On-screen text**:
- ✅ Supabase backend with storage
- ✅ Firebase hosting with Google Auth
- ✅ Video & PDF libraries
- ✅ Revenue tracking dashboards

---

### **CHAPTER 1: Prerequisites** (2 min) - [01:00 - 03:00]

**Visual**: Show each account creation

**Script**:
> "First, let's make sure you have everything you need. You'll need four accounts - all free tiers work perfectly for getting started."

**Show & Explain**:
1. **GitHub account** - github.com
2. **Supabase account** - supabase.com
3. **Firebase account** - console.firebase.google.com
4. **Google Cloud Console** - console.cloud.google.com (auto-created with Firebase)

**Terminal commands shown**:
```bash
# Check Node.js version
node --version
# Should be 18 or higher

# Check Git
git --version
```

---

### **CHAPTER 2: Download & Git Setup** (3 min) - [03:00 - 06:00]

**Visual**: Figma Make interface → VS Code

**Script**:
> "Now let's download the code from Figma Make and set up version control. This is important because we'll use Git for automated deployments later."

**Steps shown**:
1. Download code from Figma Make
2. Open in VS Code
3. Open terminal (Ctrl+\` or Cmd+\`)

**Terminal commands**:
```bash
# Initialize git repository
git init

# Check what files we have
ls -la

# View .gitignore to see protected files
cat .gitignore

# Create first commit
git add .
git commit -m "Initial commit: ORA platform"

# Create GitHub repository (show in browser)
# Then connect local to remote
git remote add origin https://github.com/s2cpaul/ora-platform.git
git branch -M main
git push -u origin main
```

**On-screen callout**:
⚠️ **Important**: Never commit `/utils/supabase/info.tsx` - it's in .gitignore!

---

### **CHAPTER 3: Supabase Backend Setup** (4 min) - [06:00 - 10:00]

**Visual**: Supabase Dashboard

**Script**:
> "Next, we'll set up our backend on Supabase. This handles file storage for videos and PDFs, plus our API server."

**Steps shown**:
1. **Create Project**:
   - Show Supabase dashboard
   - Click "New project"
   - Name: "ora-platform"
   - Set database password (show password manager)
   - Select region

2. **Get Credentials**:
   - Settings → API
   - Copy Project URL
   - Copy anon public key
   - Copy service_role key (blur on screen)

3. **Deploy Edge Function**:
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link
# Select ora-platform from list

# Deploy the server function
supabase functions deploy server

# Set secrets
supabase secrets set SUPABASE_URL=https://xxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...
supabase secrets set SUPABASE_ANON_KEY=eyJ...
supabase secrets set SUPABASE_DB_URL=postgresql://...
```

4. **Verify Buckets**:
   - Show Storage in Supabase Dashboard
   - Point out `make-3504d096-videos` and `make-3504d096-pdfs` buckets
   - "These were auto-created when we deployed the function!"

**On-screen callout**:
✅ Backend deployed! Server URL: `https://xxx.supabase.co/functions/v1/make-server-3504d096`

---

### **CHAPTER 4: Environment Configuration** (2 min) - [10:00 - 12:00]

**Visual**: VS Code editor

**Script**:
> "Now we need to configure our frontend to talk to the backend. We'll update the Supabase info file."

**Steps shown**:
1. Open `/utils/supabase/info.tsx`
2. Update values:
```typescript
export const projectId = 'your-actual-project-id';
export const publicAnonKey = 'eyJhbGciOiJI...';
```

3. Save file

**On-screen callout**:
💡 **Tip**: Get projectId from your Supabase project URL: `https://[projectId].supabase.co`

---

### **CHAPTER 5: Firebase & Google OAuth** (5 min) - [12:00 - 17:00]

**Visual**: Firebase Console + Google Cloud Console

**Script**:
> "Now let's set up Firebase for hosting and Google authentication. This is a few steps, but I'll walk you through each one."

**Steps shown**:

1. **Create Firebase Project**:
   - Firebase Console
   - "Add project"
   - Name: "ora-platform"
   - Enable Google Analytics (optional)

2. **Register Web App**:
   - Click web icon `</>`
   - App nickname: "ora-web-app"
   - Check "Set up Firebase Hosting"
   - Copy config

3. **Enable Google Sign-In**:
   - Authentication → Get started
   - Sign-in method → Google → Enable
   - Enter support email

4. **Google Cloud OAuth Setup**:
   - Go to console.cloud.google.com
   - Select Firebase project
   - APIs & Services → Credentials
   - Configure Consent Screen:
     - External
     - App name: "ORA Platform"
     - Support email: cara@oratf.info
   - Create OAuth Client ID:
     - Web application
     - Name: "ORA Web Client"
     - Authorized origins: `http://localhost:5173`
     - Redirect URIs: `http://localhost:5173/__/auth/handler`
     - **Show the `/__/auth/handler` pattern clearly**

5. **Add OAuth to Firebase**:
   - Back to Firebase → Authentication → Google
   - Web SDK configuration
   - Paste Client ID and Secret

**On-screen callout**:
⚠️ **Critical**: Redirect URI must include `/__/auth/handler` (note the double underscore)

---

### **CHAPTER 6: Local Testing** (2 min) - [17:00 - 19:00]

**Visual**: Terminal + Browser

**Script**:
> "Before we deploy to production, let's test everything locally to make sure it works!"

**Steps shown**:
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

**Browser walkthrough**:
1. Visit http://localhost:5173
2. Test dark/light mode toggle
3. Click Video Library
4. Enter email: cara@oratf.info
5. Upload test video
6. Show QR code generation
7. Navigate to PDF Library
8. Upload test PDF
9. "Everything works! Time to deploy!"

---

### **CHAPTER 7: Production Deployment** (3 min) - [19:00 - 22:00]

**Visual**: Terminal + Firebase Console

**Script**:
> "Now for the exciting part - let's deploy to production!"

**Steps shown**:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init
# Select: Hosting
# Public directory: dist
# Single-page app: Yes
# GitHub actions: No

# Build for production
npm run build

# Deploy!
firebase deploy
```

**Show output**:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/ora-platform
Hosting URL: https://ora-platform.web.app
```

**Browser**:
- Visit https://ora-platform.web.app
- "And we're live!"

---

### **CHAPTER 8: Post-Deployment Configuration** (2 min) - [22:00 - 24:00]

**Visual**: Google Cloud Console + Firebase Console

**Script**:
> "One last step - we need to authorize our production domain for OAuth."

**Steps shown**:

1. **Update OAuth Settings**:
   - Google Cloud Console → Credentials
   - Edit OAuth Client
   - Add Authorized origin: `https://ora-platform.web.app`
   - Add Redirect URI: `https://ora-platform.web.app/__/auth/handler`
   - Save

2. **Update Firebase Authorized Domains**:
   - Firebase Console → Authentication → Settings
   - Authorized domains → Add
   - Add: `ora-platform.web.app`

3. **Test Production**:
   - Visit production URL
   - Test Video Library login
   - Upload a video
   - "Perfect! Everything works in production!"

**On-screen callout**:
✅ **Your ORA Platform is live!**

---

### **CHAPTER 9: Bonus - CI/CD Setup** (Optional, 3 min) - [24:00 - 27:00]

**Visual**: GitHub Actions

**Script**:
> "As a bonus, let me show you how to set up automated deployments. After this, every time you push to GitHub, your site automatically redeploys!"

**Steps shown**:

1. Create `.github/workflows/deploy.yml`
2. Show workflow file (briefly)
3. Add GitHub secrets:
   - Repository → Settings → Secrets
   - Add: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `FIREBASE_TOKEN`

4. Get Firebase token:
```bash
firebase login:ci
# Copy token
```

5. Test automated deploy:
```bash
# Make a small change
echo "# ORA Platform" > README.md
git add README.md
git commit -m "Add README"
git push origin main
```

6. **Show GitHub Actions tab**:
   - Watch deployment run
   - Show successful deploy
   - Visit site to see changes

---

### **OUTRO** (1 min) - [27:00 - 28:00]

**Visual**: Deployed ORA Platform

**Script**:
> "And that's it! You now have a fully deployed ORA Platform with:
> - Supabase backend with file storage
> - Firebase hosting with Google OAuth
> - Automated deployments via GitHub Actions
> - Video and PDF libraries with access control
> - Revenue tracking dashboards
> 
> For more details, check out the deployment guide in your project files. If you have questions, reach out at cara@oratf.info or open a GitHub issue. Thanks for watching, and happy deploying!"

**On-screen text**:
- 📚 **Full Documentation**: `/DEPLOYMENT_GUIDE.md`
- ⚡ **Quick Start**: `/QUICK_START.md`
- ❓ **FAQ**: `/DEPLOYMENT_FAQ.md`
- 📧 **Support**: cara@oratf.info

---

## 🎥 Video Production Tips

### Recording Setup:
- **Resolution**: 1920x1080 (1080p)
- **Frame rate**: 30fps minimum
- **Screen recording area**: Full screen or application window
- **Cursor**: Enable cursor highlighting (yellow circle)
- **Audio**: Use good microphone, eliminate background noise

### Editing Tips:
- Add chapter markers for YouTube
- Speed up terminal commands (1.5x-2x)
- Slow down critical steps (OAuth setup)
- Add on-screen callouts for important warnings
- Include captions for accessibility
- Add music (low volume, non-distracting)

### Thumbnail Ideas:
- ORA logo + "Deploy in 20 Minutes"
- Side-by-side: Code → Live Site
- "Complete Deployment Walkthrough"

---

## 📤 Publishing

### YouTube:
- **Title**: "Deploy ORA Platform: Complete Guide (Firebase + Supabase + Google OAuth)"
- **Description**: Include all chapter timestamps
- **Tags**: firebase, supabase, deployment, react, web app, oauth, hosting
- **Playlist**: Create "ORA Platform Tutorials"

### Additional Platforms:
- Vimeo (for high quality)
- Loom (for quick shares)
- GitHub README (embed YouTube video)

---

## 🔄 Updates

**When to update video**:
- Major platform changes (new Firebase UI, Supabase dashboard redesign)
- Breaking changes in deployment process
- New required steps

**Quick updates**:
- Add annotation cards pointing to updated docs
- Pin comment with corrections
- Create short "Update" video addressing changes

---

*Ready to record? Use this script as your guide and feel free to adapt to your speaking style!*

*Last Updated: December 6, 2024*
