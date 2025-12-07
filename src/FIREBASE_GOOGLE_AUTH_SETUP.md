# Firebase & Google OAuth Setup Guide

## Overview
Complete step-by-step guide to set up Firebase, Google Authentication, and deploy your ORA application to production.

---

## PART 1: Firebase Project Setup

### STEP 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: [Firebase Console](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click **"Add project"**
   - Project name: `ora-voice-of-customer` (or your choice)
   - Click **Continue**

3. **Google Analytics (Optional)**
   - Enable Google Analytics: **Yes** (recommended)
   - Select or create Analytics account
   - Click **Create project**
   - Wait for project creation (30-60 seconds)

4. **Project Created**
   - Click **Continue** to go to project dashboard

---

### STEP 2: Register Your Web App

1. **Add Web App to Firebase**
   - In Firebase Console, click the **Web icon** (</>)
   - App nickname: `ORA Web App`
   - ✅ Check **"Also set up Firebase Hosting"**
   - Click **Register app**

2. **Copy Firebase Configuration**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef",
     measurementId: "G-XXXXXXXXXX"
   };
   ```
   
   **IMPORTANT**: Save this - you'll need it in Step 4

3. **Click Continue to Console**

---

### STEP 3: Enable Google Authentication

1. **Navigate to Authentication**
   - In Firebase Console left sidebar
   - Click **Authentication**
   - Click **Get started**

2. **Enable Google Sign-In**
   - Click **Sign-in method** tab
   - Click **Google** provider
   - Toggle **Enable**
   - **Project support email**: Select your email
   - Click **Save**

3. **Configure Authorized Domains**
   - Still in **Sign-in method** tab
   - Scroll to **Authorized domains**
   - By default includes:
     - `localhost` (for development)
     - `your-project.firebaseapp.com`
     - `your-project.web.app`
   - To add custom domain (oratf.info):
     - Click **Add domain**
     - Enter: `oratf.info`
     - Click **Add**

---

### STEP 4: Configure Environment Variables

1. **Create Firebase Config File**

Create: `/src/config/firebase.ts`

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
```

2. **Update .env File**

Add to your `.env` file:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Replace all values with YOUR actual Firebase config from Step 2**

---

### STEP 5: Install Firebase Packages

1. **Install Firebase SDK**

```bash
npm install firebase
```

2. **Verify Installation**

```bash
npm list firebase
# Should show: firebase@latest
```

---

### STEP 6: Create Authentication Hook

Create: `/hooks/useAuth.ts`

```typescript
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut
  };
}
```

---

### STEP 7: Update Navigation with Auth

Update your `/components/Navigation.tsx` to include Google Sign-In:

```typescript
// Add at the top
import { useAuth } from '../hooks/useAuth';
import { LogIn, LogOut, User } from 'lucide-react';

// Inside Navigation component
const { user, signInWithGoogle, signOut } = useAuth();

// Add to navigation buttons
{!user ? (
  <Button 
    variant="outline" 
    size="sm" 
    onClick={signInWithGoogle}
    className="gap-2"
  >
    <LogIn className="h-4 w-4" />
    Sign In
  </Button>
) : (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt={user.displayName || 'User'} 
          className="h-8 w-8 rounded-full border-2 border-primary"
        />
      )}
      <span className="text-sm hidden lg:block">{user.displayName}</span>
    </div>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={signOut}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  </div>
)}
```

---

## PART 2: Firebase Hosting Setup

### STEP 8: Install Firebase CLI

1. **Install Firebase Tools Globally**

```bash
npm install -g firebase-tools
```

2. **Verify Installation**

```bash
firebase --version
# Should show version number
```

3. **Login to Firebase**

```bash
firebase login
```

This will:
- Open browser for Google authentication
- Ask for permissions
- Confirm successful login in terminal

---

### STEP 9: Initialize Firebase in Your Project

1. **Navigate to Project Root**

```bash
cd /path/to/your/project
```

2. **Initialize Firebase**

```bash
firebase init
```

3. **Select Features** (use spacebar to select, enter to confirm)
   - ✅ Hosting: Configure files for Firebase Hosting
   - ✅ (Optional) Firestore: If you plan to use database
   - ✅ (Optional) Functions: If you need serverless functions

4. **Project Setup**
   - **Use existing project**: Yes
   - Select: `your-project-id` (from dropdown)

5. **Hosting Setup**
   - **Public directory**: `dist` (Vite's build output)
   - **Configure as SPA**: Yes
   - **Set up automatic builds with GitHub**: No (for now, we'll do this later)
   - **Overwrite index.html**: No

6. **Files Created**
   - `firebase.json` - Firebase configuration
   - `.firebaserc` - Project aliases

---

### STEP 10: Configure firebase.json

Update your `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=7200"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

### STEP 11: Build and Deploy

1. **Build for Production**

```bash
npm run build
```

This creates optimized files in `dist/` directory

2. **Test Locally (Optional)**

```bash
firebase serve
```

Opens at: `http://localhost:5000`

3. **Deploy to Firebase**

```bash
firebase deploy
```

4. **Deployment Complete**
   - Hosting URL: `https://your-project.web.app`
   - Console will show the URL
   - Your app is now live! 🎉

---

### STEP 12: Connect Custom Domain (oratf.info)

1. **Add Custom Domain in Firebase**
   - Firebase Console → Hosting
   - Click **Add custom domain**
   - Enter: `oratf.info`
   - Click **Continue**

2. **Verify Ownership**
   - Firebase provides a TXT record
   - Add to your domain DNS settings
   - Format: `TXT` record with provided value
   - Wait for verification (can take up to 24 hours)

3. **Configure DNS Records**
   - After verification, Firebase provides A records
   - Add these A records to your domain:
     ```
     Type: A
     Name: @
     Value: (Firebase IP addresses)
     ```

4. **SSL Certificate**
   - Firebase automatically provisions SSL
   - Can take up to 24 hours
   - Your site will be accessible at `https://oratf.info`

---

## PART 3: Continuous Deployment with GitHub Actions

### STEP 13: Create GitHub Actions Workflow

1. **Create Workflow Directory**

```bash
mkdir -p .github/workflows
```

2. **Create Deployment Workflow**

Create: `.github/workflows/firebase-deploy.yml`

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_FIREBASE_MEASUREMENT_ID: ${{ secrets.VITE_FIREBASE_MEASUREMENT_ID }}
          VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: your-firebase-project-id
```

---

### STEP 14: Set Up GitHub Secrets

1. **Get Firebase Service Account Key**

```bash
firebase login:ci
```

This generates a token - copy it!

2. **Add Secrets to GitHub**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click **New repository secret**
   - Add each secret:

```
FIREBASE_SERVICE_ACCOUNT = (paste token from firebase login:ci)
VITE_FIREBASE_API_KEY = (from your .env)
VITE_FIREBASE_AUTH_DOMAIN = (from your .env)
VITE_FIREBASE_PROJECT_ID = (from your .env)
VITE_FIREBASE_STORAGE_BUCKET = (from your .env)
VITE_FIREBASE_MESSAGING_SENDER_ID = (from your .env)
VITE_FIREBASE_APP_ID = (from your .env)
VITE_FIREBASE_MEASUREMENT_ID = (from your .env)
VITE_OPENAI_API_KEY = (from your .env)
```

---

### STEP 15: Enable Automatic Deployments

1. **Commit and Push Workflow**

```bash
git add .github/workflows/firebase-deploy.yml
git commit -m "Add Firebase deployment workflow"
git push origin main
```

2. **Automatic Deployment**
   - Every push to `main` triggers deployment
   - View progress in GitHub Actions tab
   - Successful deployment updates live site

---

## PART 4: Testing & Verification

### STEP 16: Test Authentication

1. **Test Google Sign-In**
   - Visit your deployed site
   - Click **Sign In** button
   - Select Google account
   - Verify successful login
   - Check user name/photo displays

2. **Test Sign-Out**
   - Click **Sign Out** button
   - Verify user is logged out
   - UI returns to signed-out state

### STEP 17: Test on Multiple Devices

- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile iOS Safari
- ✅ Mobile Android Chrome
- ✅ Tablet devices

---

## Deployment Checklist

### Pre-Deployment
- [ ] Firebase project created
- [ ] Google Auth enabled
- [ ] Environment variables configured
- [ ] Firebase SDK installed
- [ ] Auth hooks implemented
- [ ] Navigation updated with sign-in
- [ ] Build tested locally

### Deployment
- [ ] Firebase CLI installed
- [ ] Firebase initialized in project
- [ ] Build successful (`npm run build`)
- [ ] Deployed to Firebase (`firebase deploy`)
- [ ] Live URL accessible
- [ ] SSL certificate active

### Custom Domain
- [ ] Custom domain added in Firebase
- [ ] DNS TXT record verified
- [ ] A records configured
- [ ] SSL provisioned
- [ ] Domain accessible via HTTPS

### CI/CD
- [ ] GitHub Actions workflow created
- [ ] GitHub secrets configured
- [ ] Automatic deployment working
- [ ] Build passing on push to main

### Testing
- [ ] Google Sign-In working
- [ ] Sign-Out working
- [ ] User data persists
- [ ] Mobile responsive
- [ ] All features functional

---

## Troubleshooting

### Google Sign-In Popup Blocked
**Solution**: 
- Check browser popup settings
- Add site to allowed popups
- Try incognito mode

### "Auth domain not authorized"
**Solution**:
- Firebase Console → Authentication → Settings
- Add domain to Authorized domains list

### Build Fails in GitHub Actions
**Solution**:
- Verify all secrets are set in GitHub
- Check secret names match workflow
- Review build logs for specific errors

### Custom Domain Not Working
**Solution**:
- DNS changes can take 24-48 hours
- Verify A records are correct
- Check SSL provisioning status in Firebase

---

## Next Steps

After deployment:
1. ✅ Monitor Firebase Analytics
2. ✅ Set up error tracking
3. ✅ Configure Firebase Firestore (if needed)
4. ✅ Add Firebase Cloud Functions
5. ✅ Implement user data persistence

---

**Status**: Firebase & Google OAuth Setup Complete
**Live at**: https://oratf.info
**Ready for**: Production use and continuous deployment
