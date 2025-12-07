# ⚡ ORA Platform - Quick Start Guide

**For experienced developers who want to deploy fast**

---

## 📋 Prerequisites
- Node.js 18+, Git, GitHub account
- Supabase account + Firebase account
- 30-60 minutes

---

## 🚀 5-Step Deployment

### **STEP 1: Get the Code** (2 min)
```bash
# Download from Figma Make, then:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/s2cpaul/ora-platform.git
git push -u origin main
```

---

### **STEP 2: Supabase Backend** (10 min)
```bash
# Install & login
npm install -g supabase
supabase login
supabase link

# Deploy server
supabase functions deploy server

# Set secrets
supabase secrets set SUPABASE_URL=https://xxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
supabase secrets set SUPABASE_ANON_KEY=your-key
supabase secrets set SUPABASE_DB_URL=postgresql://...
```

**Get credentials**: Supabase Dashboard → Settings → API

**Buckets**: Auto-created on first deploy
- `make-3504d096-pdfs`
- `make-3504d096-videos`

---

### **STEP 3: Configure Environment** (5 min)

Edit `/utils/supabase/info.tsx`:
```typescript
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

---

### **STEP 4: Firebase & OAuth** (15 min)
```bash
# Install & login
npm install -g firebase-tools
firebase login
firebase init
# Select: Hosting, dist folder, SPA: Yes
```

**Firebase Console**:
1. Create project
2. Enable Authentication → Google
3. Get config from Project Settings

**Google Cloud Console**:
1. APIs & Services → Credentials
2. Configure Consent Screen
3. Create OAuth Client ID
4. Add origins: `http://localhost:5173`, `https://your-domain.com`
5. Add redirects: Add `/__/auth/handler` to each origin

---

### **STEP 5: Deploy** (5 min)
```bash
# Install & build
npm install
npm run build

# Deploy to Firebase
firebase deploy

# OR deploy to Vercel
npm install -g vercel
vercel --prod
```

**Your app is live!** 🎉

---

## ✅ Post-Deployment Checklist

### Immediately Test:
- [ ] App loads at production URL
- [ ] Dark/light mode toggle works
- [ ] Video Library email authentication works
- [ ] Admin access works: `cara@oratf.info` & `carapaulson1@gmail.com`
- [ ] PDF Library uploads work
- [ ] All navigation links work

### Configure:
- [ ] Update OAuth redirect URLs with production domain
- [ ] Add production domain to Firebase authorized domains
- [ ] Update Supabase CORS settings

---

## 🔧 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Supabase functions not working | `supabase secrets list` → `supabase functions deploy server` |
| Video Library not loading | Check email param: `?email=user@example.com` |
| OAuth not working | Verify redirect URIs match exactly |
| Environment variables undefined | Ensure `VITE_` prefix for frontend vars |
| Build fails | Check `/utils/supabase/info.tsx` exists |

---

## 📚 Need More Details?

- **Full Guide**: `/DEPLOYMENT_GUIDE.md` (step-by-step with explanations)
- **Video Setup**: `/HEYGEN_VIDEO_INTEGRATION_GUIDE.md`
- **Stripe Payments**: `/STRIPE_PAYMENT_SETUP.md`
- **Git Setup**: `/GIT_SETUP_INSTRUCTIONS.md`

---

## 🆘 Support
- **Docs**: [Supabase](https://supabase.com/docs) | [Firebase](https://firebase.google.com/docs)
- **Contact**: cara@oratf.info
- **Issues**: Open a GitHub issue

---

## 🚀 What's Next?

### Optional Integrations:
1. **Stripe Payments** - See `/STRIPE_PAYMENT_SETUP.md`
2. **OpenAI Integration** - See `/OPENAI_SETUP_GUIDE.md`
3. **HeyGen Videos** - See `/HEYGEN_VIDEO_INTEGRATION_GUIDE.md`
4. **CI/CD Pipeline** - See STEP 10 in `/DEPLOYMENT_GUIDE.md`

### Production Optimization:
- Set up custom domain
- Enable Firebase Analytics
- Configure error tracking (Sentry)
- Set up automated backups

---

**Total Time**: 30-60 minutes from download to live deployment ⚡

*Last Updated: December 6, 2024*
