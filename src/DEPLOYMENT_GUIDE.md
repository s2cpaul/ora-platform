# 🚀 ORA Platform - Complete Deployment Guide (Updated December 2024)

## Overview
This comprehensive guide will walk you through deploying the complete ORA platform - a Voice of the Customer style web template for a Global Gen-AI Community featuring mobile-first micro-learning, AI enablement, and dual-revenue strategies (B2B/Enterprise + Consumer App).

---

## 📋 Current Platform Features

### ✅ Core Features Implemented
- **Multi-Page Navigation System** - Home, Lessons, Purchase, Revenue Dashboards, Library
- **Dark/Light Mode Toggle** - Persistent theme with system preference detection
- **Speech-to-Text Functionality** - Voice input capabilities
- **Video Library System** - Full CRUD operations with email-based access control
- **PDF Library System** - Upload, download, search, QR code generation
- **Lesson Viewing Experience** - Interactive learning with video integration
- **Multi-Select Quiz System** - Gamification with progress tracking
- **AI Notebook** - Interactive mind maps and note-taking
- **Sentiment Check-In System** - 45+ sentiment options with tracking
- **Revenue Dashboards** - B2B/Enterprise, Veterans IAP, Profit Projections
- **Purchase System** - Multiple service packages with add-ons
- **Express Checkout** - Fast checkout for seasonal campaigns
- **Progress Tracking** - User progress and achievement system
- **Social Media Strategy** - Content planning and scheduling tools

### 🔒 Security & Access Control
- **Email-Based Video Authentication** - Videos restricted to purchasers + admin
- **Admin Access** - `Cara@oratf.info` and `carapaulson1@gmail.com`
- **Purchase Tracking** - Receipt images, customer emails, order scripts
- **Supabase Backend** - Secure server-side filtering and storage

### 💰 Revenue Model Features
- **B2B/Enterprise** - $20K entry point white-label training platforms
- **Consumer App** - AdMob monetization, IAP ($29.99-$99.99), Premium subscriptions ($19.99/month)
- **Free Veterans Access** - Commitment to provide free learning to all American Military Veterans
- **Seasonal Campaigns** - "What Moves You?" promotional packages ($24)

---

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Node.js** 18+ installed ([Download](https://nodejs.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **Visual Studio Code** installed ([Download](https://code.visualstudio.com/))
- [ ] **GitHub account** ([Sign up](https://github.com/))
- [ ] **Supabase account** ([Sign up](https://supabase.com/))
- [ ] **Firebase account** ([Sign up](https://console.firebase.google.com/))
- [ ] **Google Cloud Console** access (for OAuth)
- [ ] **Stripe account** (for payments - optional initially)

---

## STEP 1: Download Your Code from Figma Make

Your code is currently running in Figma Make. You need to download it to your local machine.

### Option A: Manual Download
1. In Figma Make, look for the **"Download"** or **"Export"** button
2. Save all files to a folder named `ora-platform`

### Option B: Copy Files Manually
Create a new folder and copy all the files you see in this project.

### Important Files to Verify:
```
ora-platform/
├── /components/
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── VideoLibrary.tsx
│   ├── PDFLibrary.tsx
│   ├── LessonViewer.tsx
│   ├── AINotebook.tsx
│   ├── SentimentCheckIn.tsx
│   ├── PurchasePage.tsx
│   ├── ExpressCheckout.tsx
│   └── ... (all other components)
├── /supabase/
│   └── /functions/
│       └── /server/
│           ├── index.tsx
│           └── kv_store.tsx
├── /utils/
│   └── /supabase/
│       ├── info.tsx
│       └── info-example.tsx
├── App.tsx
├── package.json
├── .gitignore
└── README.md
```

---

## STEP 2: Set Up Git Version Control

### 2.1 Initialize Git Repository

Open Visual Studio Code and open your `ora-platform` folder, then open the integrated terminal (Ctrl+` or Cmd+`).

```bash
# Initialize git repository
git init

# Check status
git status
```

### 2.2 Connect to GitHub Repository

The official repository for this project is:
[https://github.com/s2cpaul/ora-platform](https://github.com/s2cpaul/ora-platform)

If you have not already, add it as your remote:

```bash
# Add GitHub remote
git remote add origin https://github.com/s2cpaul/ora-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2.3 Create .gitignore File

Ensure your `.gitignore` file includes:

```gitignore
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/

# production
dist/
build/

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDE
.vscode/
.idea/

# Supabase
.supabase/

# Environment variables
/utils/supabase/info.tsx
```

### 2.4 Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `ora-platform`
4. Keep it **Private** (recommended for now)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### 2.5 Connect Local Repository to GitHub

```bash
# Add all files (gitignore will exclude sensitive files)
git add .

# Create first commit
git commit -m "Initial commit: ORA platform with Video Library, PDF Library, and full feature set"

# Add GitHub remote (your username: s2cpaul)
git remote add origin https://github.com/s2cpaul/ora-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Checkpoint**: Your code is now on GitHub with version control!

---

## STEP 3: Set Up Supabase Backend

### 3.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New project"**
3. Fill in:
   - **Name**: `ora-platform`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes ~2 minutes)

### 3.2 Get Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://naskxuojfdqcunotdjzi.supabase.co`)
   - **Project API Key** → **anon public** key
   - **Project API Key** → **service_role** key (keep secret!)

3. Go to **Settings** → **Database**
4. Scroll down to **Connection string** → **URI** 
5. Copy it and replace `[YOUR-PASSWORD]` with your database password

### 3.3 Install Supabase CLI

```bash
# Install Supabase CLI globally
npm install -g supabase

# Verify installation
supabase --version

# Login to Supabase
supabase login
```

This will open a browser window to authenticate. Follow the prompts.

### 3.4 Link Your Project

```bash
# Link to your Supabase project (you'll be prompted to select it)
supabase link
```

### 3.5 Deploy Edge Functions

The ORA platform uses a Supabase Edge Function for the backend server.

```bash
# Deploy the backend server
supabase functions deploy server

# Set environment secrets for the function
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
supabase secrets set SUPABASE_ANON_KEY=your-anon-key-here
supabase secrets set SUPABASE_DB_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

⚠️ **IMPORTANT**: The server function is named `server` and will be accessible at:
`https://your-project.supabase.co/functions/v1/make-server-3504d096`

> **Local Development Note:** When testing your frontend locally, always use `http://localhost:5173` as your app URL. This ensures your API calls and OAuth flows work as expected in development.

### 3.6 Verify Buckets Are Created

The server automatically creates these storage buckets on startup:
- `make-3504d096-pdfs` - For PDF library files
- `make-3504d096-videos` - For video library files and purchase receipts

You can verify in **Supabase Dashboard** → **Storage**.

---

## Authentication

Supabase works through a mixture of JWT and Key authentication.

- If no `Authorization` header is included, the API assumes you are making a request as an anonymous user (using the anon key).
- If an `Authorization` header is included, the API "switches" to the role of the user making the request (using their JWT). See the User Management section in Supabase docs for more details.

**Best Practice:** Always set your keys as environment variables and never hardcode them in your codebase.

### Client API Keys
- Client keys allow "anonymous access" to your database until the user logs in.
- After login, the client library will automatically use the user's own login token for requests.
- In this documentation, we refer to the key as `SUPABASE_KEY`.
- You can find your anon key in the Supabase Dashboard → Settings → API.

**Example usage:**
```js
const SUPABASE_URL = "https://naskxuojfdqcunotdjzi.supabase.co";
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY); // Use anon key for client-side
```

### Service Keys
- Service keys have FULL access to your data, bypassing any security policies.
- **Never expose service keys in client-side or browser code.** Use only on a secure server.
- In this documentation, we refer to the key as `SERVICE_KEY`.
- You can find your service_role key in the Supabase Dashboard → Settings → API.

**Example usage:**
```js
const SUPABASE_URL = "https://naskxuojfdqcunotdjzi.supabase.co";
const supabase = createClient(SUPABASE_URL, process.env.SERVICE_KEY); // Use service_role key for server-side only
```

**Security Reminder:**
- Use the anon key for all frontend and public code.
- Use the service_role key only in backend/server environments (never in the browser).
- Store all keys in environment variables, not in your codebase.

---

## STEP 4: Set Up Environment Variables

### 4.1 Update Supabase Info File

Edit `/utils/supabase/info.tsx`:

```typescript
// /utils/supabase/info.tsx
export const projectId = 'your-actual-project-id'; // From your Supabase project URL
export const publicAnonKey = 'your-actual-anon-key'; // From Supabase Settings → API
```

⚠️ **IMPORTANT**: This file contains your Supabase credentials. It's in `.gitignore` to prevent committing to GitHub.

### 4.2 Create Environment Variables for Build (Optional)

If you want to use environment variables during build, create a `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://naskxuojfdqcunotdjzi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=sb_secret_o9EvjtBzaH8LMmnUJ1cyRA_DjFWsVCA

# Firebase (we'll fill this in next step)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# Stripe (optional)
VITE_STRIPE_PUBLISHABLE_KEY=sb_publishable_1OQwO9LQ_xq03AwYUQRURQ_rb06rFeZ
STRIPE_SECRET_KEY=sk_test_...
```

**⚠️ IMPORTANT**: Never commit `.env` to Git! It's in `.gitignore` for security.

> **🚨 Security Check Recommended (CVE-2025-55182):**
> If you are running React or Next.js applications, immediately update to the latest stable versions (React 19.2.1 or the relevant version of Next.js) and redeploy your application. This critical vulnerability affects older versions. Run:
> 
> ```bash
> npm install react@latest react-dom@latest
> # For Next.js projects:
> npm install next@latest
> npm update
> ```
> 
> After updating, rebuild and redeploy your app to ensure you are protected.

---

## STEP 5: Set Up Firebase & Google OAuth

### 5.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `ora-platform`
4. Enable Google Analytics (optional - recommended for tracking)
5. Click **"Create project"**

### 5.2 Register Web App

1. In Firebase Console, click the **web icon** (`</>`)
2. Register app nickname: `ora-web-app`
3. **Check** "Also set up Firebase Hosting"
4. Click **"Register app"**
5. Copy the Firebase configuration object

### 5.3 Add Firebase Config

You can add Firebase config directly in your code or use environment variables.

**Option A: Direct in Code** (easier for initial setup)

Create `/utils/firebase/config.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

**Option B: Using Environment Variables**

Add to your `.env`:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5.4 Set Up Google OAuth

#### A. Enable Google Sign-In in Firebase

1. In Firebase Console → **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click **"Google"**
5. **Enable** the toggle
6. Enter support email
7. Click **"Save"**

#### B. Set Up Google Cloud Console OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **"Configure Consent Screen"**
5. Choose **"External"** → **"Create"**
6. Fill in:
   - **App name**: ORA Platform
   - **User support email**: cara@oratf.info
   - **Developer contact**: cara@oratf.info
7. Click **"Save and Continue"** through all steps

#### C. Create OAuth Client ID

1. Still in **Credentials**, click **"Create Credentials"** → **"OAuth client ID"**
2. Application type: **"Web application"**
3. Name: `ORA Web Client`
4. **Authorized JavaScript origins**:
   - `http://localhost:5173` (for development)
   - `https://your-domain.com` (add your production domain later)
5. **Authorized redirect URIs**:
   - `http://localhost:5173/__/auth/handler`
   - `https://your-domain.com/__/auth/handler`
6. Click **"Create"**
7. Copy the **Client ID** and **Client Secret**

#### D. Add OAuth Credentials to Firebase

1. Back in Firebase Console → **Authentication** → **Sign-in method** → **Google**
2. Expand **"Web SDK configuration"**
3. Enter your **Client ID** and **Client Secret**
4. Click **"Save"**

**✅ Checkpoint**: Google OAuth is now configured!

---

## STEP 6: Test Locally

### 6.1 Install Dependencies

```bash
npm install
# or
bun install
```

### 6.2 Run Development Server

```bash
npm run dev
```

### 6.3 Test All Features

> **Note:** Always use `http://localhost:5173` as your local development URL. This is the default for Vite projects. Make sure to open your browser at this address when testing locally.

Visit `http://localhost:5173` and test:

#### Core Navigation & UI
- ✅ Dark/Light mode toggle works
- ✅ Navigation between all pages works
- ✅ Footer displays correctly

#### Video Library
- ✅ Email authentication modal appears
- ✅ Enter admin email: `Cara@oratf.info` or `carapaulson1@gmail.com`
- ✅ Upload a test video
- ✅ Videos are filtered by customer email
- ✅ QR codes generate for videos
- ✅ Video player works

#### PDF Library
- ✅ Upload a test PDF
- ✅ Search and filter PDFs
- ✅ QR codes generate for PDFs
- ✅ Download PDFs works

#### Learning Features
- ✅ Lesson viewer displays correctly
- ✅ Multi-select quiz system works
- ✅ Progress tracking updates
- ✅ AI Notebook and mind maps work

#### Sentiment & Tracking
- ✅ Sentiment check-in appears after 6 minutes
- ✅ 45+ sentiment options available
- ✅ Sentiment tracking dashboard works

#### Purchase System
- ✅ Purchase page displays packages correctly
- ✅ "What Moves You?" seasonal campaign shows
- ✅ Express checkout works
- ✅ Add-ons can be selected

#### Revenue Dashboards
- ✅ B2B/Enterprise dashboard displays
- ✅ Veterans IAP Revenue dashboard displays
- ✅ Profit Projections dashboard displays

**✅ Checkpoint**: Everything works locally!

---

## STEP 7: Deploy to Production

### Option A: Deploy to Firebase Hosting (Recommended)

#### 7.1 Install Firebase CLI

```bash
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
```

When prompted:
- Select: **"Hosting"**
- Project: Choose your `ora-platform` project
- Public directory: **`dist`**
- Single-page app: **Yes**
- GitHub actions: **No** (we'll set this up later)

#### 7.2 Build and Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

**✅ Your app is live!** Firebase will give you a URL like:
`https://ora-platform.web.app`

### Option B: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Add environment variables in Vercel Dashboard:
- Go to your project → **Settings** → **Environment Variables**
- Add all `VITE_*` variables

### Option C: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Add environment variables in Netlify Dashboard:
- Go to **Site settings** → **Environment variables**
- Add all `VITE_*` variables

---

## STEP 8: Post-Deployment Configuration

### 8.1 Update OAuth Redirect URLs

> **Reminder:** Be sure to add `http://localhost:5173` to your list of **Authorized JavaScript origins** and **Authorized redirect URIs** in the Google Cloud Console for OAuth. This ensures Google Sign-In works during local development.

1. Go to **Google Cloud Console** → **Credentials**
2. Edit your OAuth client
3. Add your production URL to:
   - **Authorized JavaScript origins**: `https://your-app.web.app`
   - **Authorized redirect URIs**: `https://your-app.web.app/__/auth/handler`
   - **(For local development, also add)**: `http://localhost:5173` and `http://localhost:5173/__/auth/handler`
4. Click **"Save"**

### 8.2 Update Firebase Authorized Domains

> **Reminder:** Add `localhost` and `localhost:5173` to your **Authorized domains** in Firebase Console → Authentication → Settings. This is required for Firebase Auth to work locally.

1. Firebase Console → **Authentication** → **Settings**
2. Scroll to **"Authorized domains"**
3. Add your production domain
4. Add `localhost` and `localhost:5173`
5. Click **"Add domain"**

### 8.3 Update Supabase CORS

1. Supabase Dashboard → **Settings** → **API**
2. Scroll to **"CORS"**
3. Add your production domain: `https://your-app.web.app`

### 8.4 Test Production Features

Visit your production URL and verify:
- ✅ All pages load correctly
- ✅ Video Library authentication works
- ✅ PDF Library uploads work
- ✅ Theme toggle persists
- ✅ Admin access works with both admin emails

**✅ Checkpoint**: Production is fully configured!

---

## STEP 9: Set Up Stripe Payments (Optional but Recommended)

### 9.1 Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Complete account verification

### 9.2 Get Stripe Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

### 9.3 Add Stripe to Environment

Add to `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=sb_publishable_1OQwO9LQ_xq03AwYUQRURQ_rb06rFeZ
STRIPE_SECRET_KEY=sk_test_...
```

Add to Supabase secrets:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
```

### 9.4 Implement Stripe in Server

Your server at `/supabase/functions/server/index.tsx` should include Stripe endpoints. Add:

```typescript
import Stripe from 'npm:stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
});

// Create payment intent
app.post("/make-server-3504d096/create-payment-intent", async (c) => {
  const { amount, packageId, email } = await c.req.json();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: { packageId, email },
  });
  
  return c.json({ clientSecret: paymentIntent.client_secret });
});
```

Redeploy your server:

```bash
supabase functions deploy server
```

**✅ Checkpoint**: Stripe payments are now integrated!

---

## STEP 10: Continuous Deployment Pipeline

### 10.1 Set Up GitHub Actions (Firebase)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
      
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### 10.2 Add GitHub Secrets

1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add each environment variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`

4. Get Firebase token:
```bash
firebase login:ci
```
Copy the token and add as `FIREBASE_TOKEN` secret.

### 10.3 Test Automated Deployment

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

Go to GitHub → **Actions** tab to watch the deployment!

**✅ Checkpoint**: Every push to `main` now auto-deploys!

---

## STEP 11: Video Library Email Access Control Setup

### 11.1 Verify Admin Emails

The platform has two admin emails hardcoded in `/supabase/functions/server/index.tsx`:
- `cara@oratf.info`
- `carapaulson1@gmail.com`

These emails can view ALL videos regardless of purchase status.

### 11.2 How Video Access Works

1. **Email Authentication**: Users must enter their email to access the Video Library
2. **Server-Side Filtering**: The server filters videos based on:
   - Public videos (visible to all)
   - Videos with matching customer email
   - All videos for admin emails
3. **Purchase Tracking**: Each video can have:
   - Customer Email
   - Purchase Receipt Image
   - Order Script

### 11.3 Test Video Access Control

1. Upload a video with a specific customer email (e.g., `customer@test.com`)
2. Log out and log back in with a different email
3. Verify you cannot see the customer's video
4. Log in with admin email to see all videos

**✅ Checkpoint**: Video access control is working!

---

## 🎉 Deployment Complete!

### Your ORA Platform is Now:
✅ Version controlled with Git/GitHub  
✅ Backend deployed on Supabase with Edge Functions  
✅ Storage buckets created for PDFs and Videos  
✅ Frontend deployed on Firebase/Vercel/Netlify  
✅ Google OAuth configured  
✅ Email-based video access control active  
✅ Purchase tracking implemented  
✅ Continuous deployment pipeline active  
✅ Environment variables secured  
✅ Admin access configured for both emails  

### Production URLs:
- **App**: https://your-app.web.app
- **API**: https://your-project.supabase.co/functions/v1/make-server-3504d096
- **GitHub**: https://github.com/s2cpaul/ora-platform
- **Supabase Dashboard**: https://app.supabase.com/

### Admin Access:
- **Admin Emails**: `Cara@oratf.info` and `carapaulson1@gmail.com`
- **Video Library**: Full access to all videos
- **PDF Library**: Full access to all PDFs
- **Purchase Details**: Visible in Video Library list view

---

## 🔧 Troubleshooting

### Issue: "Supabase functions not working"
**Solution:**
- Check secrets are set: `supabase secrets list`
- Redeploy: `supabase functions deploy server`
- Verify function name is correct in fetch calls: `make-server-3504d096`

### Issue: "Video Library authentication not working"
**Solution:**
- Check email is being sent as query parameter: `?email=user@example.com`
- Verify admin emails match exactly (case-insensitive)
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

### Issue: "Videos not uploading"
**Solution:**
- Verify bucket exists: `make-3504d096-videos`
- Check Supabase Storage CORS settings
- Ensure file size is under limit
- Check browser console for errors

### Issue: "PDFs not uploading"
**Solution:**
- Verify bucket exists: `make-3504d096-pdfs`
- Check Supabase Storage CORS settings
- Verify PDF file type is allowed
- Check server logs in Supabase Dashboard

### Issue: "Google OAuth not working"
**Solution:**
- Verify authorized domains in Google Cloud Console
- Check redirect URIs match exactly
- Ensure Firebase Auth is enabled
- Clear browser cache and cookies

### Issue: "Environment variables undefined"
**Solution:**
- Ensure all variables start with `VITE_` for frontend access
- Rebuild after changing .env: `npm run build`
- Check GitHub secrets are set correctly
- Verify `/utils/supabase/info.tsx` is updated

### Issue: "Purchase receipt images not showing"
**Solution:**
- Check signed URL expiration (1 year default)
- Verify image uploaded successfully to `make-3504d096-videos` bucket
- Check network tab for 404 errors
- Regenerate signed URLs if expired

### Issue: "Sentiment check-in not appearing"
**Solution:**
- Wait 6 minutes on the same page
- Check localStorage for `lastSentimentCheckIn` timestamp
- Clear localStorage to reset timer
- Verify component is mounted in App.tsx

---

## 📚 Next Steps

### Immediate Tasks:
1. ✅ **Custom Domain** - Set up custom domain for production
2. ✅ **SSL Certificate** - Ensure HTTPS is working
3. ✅ **Analytics** - Configure Firebase Analytics
4. ✅ **Error Tracking** - Set up Sentry or similar

### Feature Enhancements:
5. **Stripe Integration** - Complete payment processing
6. **HeyGen Video Integration** - Connect video generation API
7. **OpenAI Integration** - Add AI assistant functionality
8. **Mobile App** - Convert to PWA or native app
9. **AdMob Integration** - Set up mobile monetization
10. **Email Notifications** - Send purchase confirmations

### Business Operations:
11. **Terms of Service** - Add legal pages
12. **Privacy Policy** - GDPR compliance
13. **Cookie Consent** - EU compliance
14. **Customer Support** - Set up help desk
15. **Backup Strategy** - Automated database backups

---

## 🆘 Support Resources

### Documentation:
- **Supabase Docs**: https://supabase.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **GitHub Actions**: https://docs.github.com/actions
- **Vite Docs**: https://vitejs.dev/guide/
- **Stripe Docs**: https://stripe.com/docs

### Platform-Specific Guides:
- **Video Library Setup**: See `/HEYGEN_VIDEO_INTEGRATION_GUIDE.md`
- **Stripe Payments**: See `/STRIPE_PAYMENT_SETUP.md`
- **Firebase/Google OAuth**: See `/FIREBASE_GOOGLE_AUTH_SETUP.md`
- **Git Setup**: See `/GIT_SETUP_INSTRUCTIONS.md`

### Community Support:
- **GitHub Issues**: Open issues for bugs or questions
- **Supabase Discord**: https://discord.supabase.com
- **Firebase Community**: https://firebase.google.com/community

---

## 📊 Monitoring & Maintenance

### Daily Checks:
- Monitor Supabase function logs
- Check storage usage in Supabase Dashboard
- Review Firebase Analytics

### Weekly Tasks:
- Review user feedback
- Check error rates
- Update dependencies: `npm update`

### Monthly Tasks:
- Review security vulnerabilities: `npm audit`
- Backup database
- Review and rotate API keys
- Check storage costs

---

## 🚀 Ready to Scale?

Once you're comfortable with the deployment and the platform is running smoothly:

1. **Load Testing** - Test with multiple concurrent users
2. **Performance Optimization** - Optimize images, lazy loading
3. **CDN Setup** - Use Firebase CDN or Cloudflare
4. **Database Indexing** - Optimize Supabase queries
5. **Caching Strategy** - Implement Redis or similar
6. **Multi-Region Deployment** - Expand globally

---

**Questions?** Open an issue on GitHub or contact: cara@oratf.info

**Ready for production?** Review the checklist in `/DEPLOYMENT_CHECKLIST.md`

---

*Last Updated: December 6, 2024*  
*ORA Platform Version: 2.0*  
*Deployment Guide Version: 2.0*
