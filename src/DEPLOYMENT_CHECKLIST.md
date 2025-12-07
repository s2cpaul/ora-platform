# ✅ Deployment Checklist

Use this checklist to ensure you complete all deployment steps correctly.

---

## 📝 Pre-Deployment

- [ ] All features tested locally
- [ ] Code is working without errors
- [ ] Environment variables documented
- [ ] Git repository is clean (`git status`)
- [ ] All sensitive data removed from code
- [ ] `.gitignore` is properly configured

---

## 🔐 Account Setup

- [ ] **Supabase Account**
  - [ ] Project created
  - [ ] Project ID copied
  - [ ] Anon key copied
  - [ ] Service role key copied (keep secret!)
  - [ ] Database URL copied

- [ ] **Firebase Account**
  - [ ] Project created
  - [ ] Web app registered
  - [ ] Firebase config copied
  - [ ] Authentication enabled

- [ ] **GitHub Account**
  - [ ] Repository created
  - [ ] Repository is private (recommended initially)

- [ ] **Google Cloud Console**
  - [ ] OAuth consent screen configured
  - [ ] OAuth client ID created
  - [ ] Authorized domains added

---

## 🔧 Environment Configuration

### Local Environment (.env)

- [ ] `.env` file created (from `.env.example`)
- [ ] `VITE_SUPABASE_URL` set
- [ ] `VITE_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `SUPABASE_DB_URL` set
- [ ] Firebase variables set (if using OAuth)
- [ ] `.env` is in `.gitignore` (verify!)

### Supabase Info File

- [ ] `/utils/supabase/info.tsx` updated with your credentials
  - [ ] `projectId` matches your Supabase project
  - [ ] `publicAnonKey` matches your anon key

### Supabase Secrets (for Edge Functions)

```bash
supabase secrets set SUPABASE_URL=xxx
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxx
supabase secrets set SUPABASE_DB_URL=xxx
```

- [ ] `SUPABASE_URL` secret set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` secret set
- [ ] `SUPABASE_DB_URL` secret set
- [ ] Secrets verified: `supabase secrets list`

---

## 🗄️ Backend Deployment (Supabase)

### Supabase CLI Setup

- [ ] Supabase CLI installed: `npm install -g supabase`
- [ ] Logged in: `supabase login`
- [ ] Project linked: `supabase link`

### Edge Functions Deployment

- [ ] Edge function deployed: `supabase functions deploy make-server-3504d096`
- [ ] Function is running (check Supabase dashboard)
- [ ] Test function: `curl https://[project].supabase.co/functions/v1/make-server-3504d096/health`

### Storage Setup

- [ ] PDF bucket created automatically (on first upload)
- [ ] Bucket name: `make-3504d096-pdfs`
- [ ] Bucket is private (default)

### Database Setup

- [ ] KV store table exists (pre-configured)
- [ ] Table name: `kv_store_3504d096`

---

## 💻 Frontend Deployment

### Build Test

- [ ] Production build successful: `npm run build`
- [ ] No build errors
- [ ] `dist/` folder created
- [ ] Preview works: `npm run preview`

### Choose Deployment Platform

#### Option A: Vercel
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Logged in: `vercel login`
- [ ] Deployed: `vercel`
- [ ] Production deploy: `vercel --prod`
- [ ] Environment variables set in Vercel dashboard

#### Option B: Firebase Hosting
- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Logged in: `firebase login`
- [ ] Initialized: `firebase init hosting`
- [ ] Built: `npm run build`
- [ ] Deployed: `firebase deploy`

#### Option C: Netlify
- [ ] Netlify CLI installed: `npm install -g netlify-cli`
- [ ] Logged in: `netlify login`
- [ ] Built: `npm run build`
- [ ] Deployed: `netlify deploy --prod --dir=dist`

### Production Environment Variables

Platform-specific - set in hosting dashboard:

- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `VITE_FIREBASE_API_KEY` (if using Firebase Auth)
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`

---

## 🔐 OAuth Configuration (Google Sign-In)

### Firebase Authentication

- [ ] Google sign-in enabled in Firebase Console
- [ ] Support email added
- [ ] OAuth Client ID and Secret added to Firebase

### Google Cloud Console

- [ ] OAuth consent screen configured
  - [ ] App name set
  - [ ] Support email set
  - [ ] Developer contact set

- [ ] OAuth Client ID created
  - [ ] Authorized JavaScript origins added:
    - [ ] `http://localhost:5173` (development)
    - [ ] Production URL (e.g., `https://ora-platform.web.app`)
  
  - [ ] Authorized redirect URIs added:
    - [ ] `http://localhost:5173/__/auth/handler`
    - [ ] `https://[production-url]/__/auth/handler`

### Firebase Authorized Domains

- [ ] Production domain added to Firebase authorized domains
- [ ] Localhost is pre-authorized

---

## 🧪 Testing

### Local Testing

- [ ] App runs locally: `npm run dev`
- [ ] All pages load
- [ ] Navigation works
- [ ] Dark/light mode works
- [ ] PDF Library loads
- [ ] PDF upload works
- [ ] PDF download works
- [ ] AI Agent opens
- [ ] Sentiment check-in works

### Production Testing

- [ ] App loads on production URL
- [ ] No console errors
- [ ] HTTPS is working
- [ ] All pages load
- [ ] PDF upload works (backend connection)
- [ ] PDF download works (Supabase Storage)
- [ ] Google OAuth works (if configured)
- [ ] Theme persistence works
- [ ] Mobile responsive
- [ ] Performance is good (Lighthouse score)

---

## 🔄 Version Control (Git/GitHub)

### Initial Setup

- [ ] Git initialized: `git init`
- [ ] `.gitignore` present and correct
- [ ] GitHub repository created
- [ ] Remote added: `git remote add origin [url]`
- [ ] First commit made
- [ ] Pushed to GitHub: `git push -u origin main`

### Verify Git Security

- [ ] `.env` is NOT in repository
- [ ] `node_modules/` is NOT in repository
- [ ] No API keys in code
- [ ] `/utils/supabase/info.tsx` is ignored or sanitized for production

---

## 🤖 Continuous Deployment (Optional)

### GitHub Actions Setup

- [ ] `.github/workflows/deploy.yml` created
- [ ] Workflow file configured for your platform
- [ ] GitHub Secrets added:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `FIREBASE_TOKEN` (if using Firebase)
  - [ ] Platform-specific secrets

### Test Auto-Deploy

- [ ] Make a small change
- [ ] Commit and push to `main`
- [ ] Check GitHub Actions tab
- [ ] Deployment succeeds
- [ ] Production updates automatically

---

## 📊 Post-Deployment

### Documentation

- [ ] README.md updated with production URLs
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Team members have access

### Monitoring

- [ ] Supabase dashboard bookmarked
- [ ] Firebase console bookmarked
- [ ] Hosting platform dashboard bookmarked
- [ ] Error tracking set up (optional: Sentry)
- [ ] Analytics configured (optional)

### Security

- [ ] Service role key is secret (not in frontend)
- [ ] CORS configured in Supabase
- [ ] OAuth redirect URIs are correct
- [ ] No exposed credentials in GitHub
- [ ] Rate limiting considered (Supabase default)

### Performance

- [ ] Lighthouse audit run
  - [ ] Performance > 80
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 80

- [ ] Images optimized
- [ ] Bundle size reasonable
- [ ] Lazy loading implemented

---

## 🎯 Final Verification

### All Systems Go

- [ ] **Frontend**: Live on production URL
- [ ] **Backend**: Supabase Edge Functions running
- [ ] **Database**: KV store working
- [ ] **Storage**: PDF uploads/downloads working
- [ ] **Auth**: Google OAuth configured (if needed)
- [ ] **Git**: Code on GitHub with version control
- [ ] **CI/CD**: Auto-deploy working (if configured)

### URLs Documented

- [ ] **Production App**: `https://_______________`
- [ ] **GitHub Repo**: `https://github.com/_______________`
- [ ] **Supabase Project**: `https://app.supabase.com/project/_______________`
- [ ] **Firebase Console**: `https://console.firebase.google.com/project/_______________`

---

## 🎉 Deployment Complete!

Date completed: _______________

Deployed by: _______________

Notes:
```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## 🔜 Next Steps

- [ ] Add custom domain
- [ ] Set up Stripe payments
- [ ] Integrate OpenAI API
- [ ] Add HeyGen videos
- [ ] Configure AdMob
- [ ] Set up email notifications
- [ ] Add PWA manifest
- [ ] Implement offline mode
- [ ] Create backup strategy
- [ ] Plan scaling strategy

---

## 📞 Support Contacts

- **Supabase Support**: https://supabase.com/support
- **Firebase Support**: https://firebase.google.com/support
- **GitHub Support**: https://support.github.com

---

**Pro Tip**: Print this checklist or keep it open in a separate window as you deploy!

**Remember**: Take your time, follow each step carefully, and verify as you go. Deployment is a one-time setup that gets easier each time you do it.
