# ❓ ORA Platform - Deployment FAQ

Common questions and answers for deploying the ORA platform.

---

## 🌐 General Deployment

### Q: Which hosting platform should I use?
**A:** We recommend **Firebase Hosting** for the best integration with authentication:
- ✅ **Firebase**: Best for Google OAuth, auto-SSL, global CDN, free tier
- ✅ **Vercel**: Fast deployment, great DX, auto-preview environments
- ✅ **Netlify**: Similar to Vercel, good for static sites

All three work perfectly with Supabase backend.

### Q: How long does deployment take?
**A:** 
- **Quick Deploy** (experienced devs): 30-60 minutes
- **Full Deploy** (first-timers): 2-4 hours
- **DNS Propagation**: Additional 1-24 hours for custom domains

### Q: Can I deploy without a custom domain?
**A:** Yes! You'll get:
- Firebase: `your-project.web.app` or `your-project.firebaseapp.com`
- Vercel: `your-project.vercel.app`
- Netlify: `your-project.netlify.app`

Add a custom domain anytime later.

### Q: Is the deployment free?
**A:** Yes, within generous free tiers:
- **Supabase**: 500MB database, 1GB file storage, 2GB bandwidth/month
- **Firebase**: 10GB hosting, 360MB/day downloads
- **Vercel/Netlify**: 100GB bandwidth/month

You'll only pay if you exceed these limits (which is rare for starting out).

---

## 🔑 Supabase & Backend

### Q: What is Supabase used for?
**A:** Supabase provides your backend:
- **Storage**: PDF & video files
- **Database**: Key-value store for app data
- **Edge Functions**: Backend API server
- **Authentication** (optional): Can integrate with Firebase Auth

### Q: Why deploy an Edge Function?
**A:** The server function handles:
- File uploads to storage buckets
- Email-based video access control
- Purchase tracking & receipt management
- API routes for frontend communication

### Q: Do I need to create database tables?
**A:** No! The platform uses a pre-configured key-value store (`kv_store_3504d096` table). No migrations or DDL needed.

### Q: Where do I find my Supabase credentials?
**A:** 
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Settings → API
4. Copy: Project URL, anon key, service_role key

### Q: What if my Supabase function fails to deploy?
**A:** Check these:
```bash
# Verify you're linked to correct project
supabase link

# Check for syntax errors in /supabase/functions/server/index.tsx
npm run build

# Redeploy with verbose logging
supabase functions deploy server --debug

# Verify secrets are set
supabase secrets list
```

### Q: How do I test my Supabase function locally?
**A:**
```bash
supabase start
supabase functions serve server --env-file .env
```

---

## 🔐 Firebase & Authentication

### Q: Why use Firebase instead of Supabase Auth?
**A:** Both work! We default to Firebase because:
- Easier Google OAuth setup
- Better documentation for beginners
- Built-in hosting integration
- You can switch to Supabase Auth later

### Q: Where do I get Firebase configuration?
**A:**
1. [Firebase Console](https://console.firebase.google.com/)
2. Project Settings → Your apps → Web app
3. Copy the config object

### Q: OAuth redirect URI not working?
**A:** Ensure exact match:
- ✅ `http://localhost:5173/__/auth/handler`
- ✅ `https://your-domain.com/__/auth/handler`
- ❌ `http://localhost:5173/auth/handler` (missing `__`)
- ❌ `https://your-domain.com/` (missing path)

**Critical**: The `__/auth/handler` path is specific to Firebase Auth.

### Q: "Unauthorized domain" error?
**A:** Add domain to Firebase:
1. Firebase Console → Authentication → Settings
2. Authorized domains → Add domain
3. Add: `your-domain.com` (no protocol, no trailing slash)

### Q: Can I use GitHub or Facebook login?
**A:** Yes! Enable in:
- Firebase Console → Authentication → Sign-in method
- Add provider (GitHub, Facebook, Twitter, etc.)
- Follow provider-specific setup instructions

---

## 📁 File Uploads & Storage

### Q: Where are videos and PDFs stored?
**A:** In Supabase Storage buckets:
- `make-3504d096-videos` - Video files & purchase receipts
- `make-3504d096-pdfs` - PDF library files

Buckets are auto-created on first server deployment.

### Q: What file size limits exist?
**A:**
- **Supabase Free Tier**: 50MB per file
- **Supabase Pro**: 5GB per file
- **Frontend upload**: Configurable in code (default: 100MB)

### Q: Videos not uploading?
**A:** Check:
1. File size under limit
2. Bucket exists in Supabase Storage
3. CORS configured (should auto-configure)
4. Browser console for specific errors
5. Server function deployed correctly

### Q: How does video access control work?
**A:**
1. User enters email in Video Library
2. Server filters videos where:
   - Video is public, OR
   - Customer email matches user email, OR
   - User email is admin (`cara@oratf.info` or `carapaulson1@gmail.com`)
3. Videos are served via signed URLs (expires in 1 year)

### Q: Can I change admin emails?
**A:** Yes! Edit `/supabase/functions/server/index.tsx`:
```typescript
const ADMIN_EMAILS = ['cara@oratf.info', 'carapaulson1@gmail.com', 'your-email@example.com'];
```
Then redeploy: `supabase functions deploy server`

---

## 🔧 Environment Variables

### Q: Why use `/utils/supabase/info.tsx` instead of `.env`?
**A:** 
- Figma Make's architecture requires this approach
- File is gitignored for security
- Easy to update without rebuild
- Works seamlessly with the existing codebase

### Q: When should I use `.env`?
**A:** For build-time variables:
- Firebase config
- Stripe keys
- OpenAI API keys
- Any `VITE_*` prefixed vars

### Q: Environment variables not working in production?
**A:** 
- **Firebase**: Can't use `.env` - hardcode in `/utils/firebase/config.ts` or use Firebase remote config
- **Vercel/Netlify**: Add to platform dashboard → Environment Variables
- Ensure `VITE_` prefix for frontend-accessible vars

### Q: How do I secure API keys?
**A:**
- ✅ **Backend keys**: Store in Supabase secrets (`supabase secrets set`)
- ✅ **Frontend keys**: Use `VITE_` prefix, but these are public
- ❌ **Never**: Commit `.env` or `/utils/supabase/info.tsx` to Git

---

## 🚀 CI/CD & Automation

### Q: Do I need CI/CD?
**A:** Not required, but recommended for:
- Automatic deploys on Git push
- Consistent builds
- Testing before deploy
- Team collaboration

### Q: How do I set up automated deployments?
**A:** See STEP 10 in `/DEPLOYMENT_GUIDE.md`. Quick version:
1. Create `.github/workflows/deploy.yml`
2. Add GitHub secrets (environment variables)
3. Get Firebase token: `firebase login:ci`
4. Push to main branch → auto-deploys!

### Q: Can I preview branches before merging?
**A:**
- **Vercel/Netlify**: Auto-creates preview URLs for PRs
- **Firebase**: Use `firebase hosting:channel:deploy preview-name`

---

## 🎨 Customization

### Q: Can I change the theme colors?
**A:** Yes! Edit `/styles/globals.css`:
```css
:root {
  --primary: 262.1 83.3% 57.8%; /* Purple */
  --secondary: 220 14.3% 95.9%; /* Light gray */
  /* etc. */
}
```

### Q: How do I add new pages?
**A:**
1. Create component in `/components/`
2. Add route in `/App.tsx`:
```typescript
{currentPage === 'new-page' && <NewPageComponent />}
```
3. Add navigation link in `/components/Navigation.tsx`

### Q: Can I remove features I don't need?
**A:** Yes! The platform is modular:
- Remove components you don't use
- Comment out routes in `/App.tsx`
- Remove navigation items

**Caution**: Keep Supabase backend if using Video/PDF libraries.

---

## 🐛 Troubleshooting

### Q: "Cannot find module" errors?
**A:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use fresh install
npm ci
```

### Q: Build succeeds but deploy fails?
**A:** Check:
1. All imports resolve correctly
2. Environment variables set in hosting platform
3. Build output directory correct (`dist` for Vite)
4. No hardcoded localhost URLs in code

### Q: Changes not showing after deploy?
**A:**
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Verify build completed successfully
3. Check deployment status in hosting dashboard
4. Firebase: `firebase deploy --only hosting` again

### Q: "403 Forbidden" errors?
**A:**
- **Storage**: Check bucket permissions in Supabase
- **Functions**: Verify CORS headers in server code
- **Auth**: Ensure user is authenticated

### Q: Performance is slow?
**A:**
- Enable Firebase CDN
- Optimize images (compress, WebP format)
- Lazy load components
- Add caching headers
- Consider Cloudflare in front

---

## 💰 Costs & Scaling

### Q: When will I need to pay?
**A:** When you exceed free tiers:
- **Supabase Free**: 500MB DB, 1GB storage, 2GB transfer/month
- **Firebase Free**: 10GB hosting, 360MB/day downloads
- **Typical cost at scale**: $25-50/month for 10K active users

### Q: How do I scale to handle more users?
**A:**
1. **Database**: Add indexes to Supabase tables
2. **Storage**: Upgrade Supabase plan
3. **Hosting**: Firebase auto-scales
4. **Functions**: Monitor execution time, optimize queries
5. **Caching**: Implement Redis or CDN caching

### Q: Can I migrate to a different host later?
**A:** Yes! The app is portable:
- Frontend: Works on any static host
- Backend: Can run on any Node.js/Deno platform
- Database: Supabase is PostgreSQL (standard)

---

## 📞 Support & Resources

### Q: Where can I get help?
**A:**
- **Documentation**: All guides in project root
- **Supabase Discord**: https://discord.supabase.com
- **Firebase Community**: https://firebase.google.com/community
- **GitHub Issues**: Open issue in your repo
- **Email**: cara@oratf.info

### Q: Is there a community?
**A:** 
- Join Supabase Discord for backend help
- Firebase has active forums
- Create GitHub discussions for your fork

### Q: Can I hire help for deployment?
**A:** Yes! Consider:
- Upwork for contractors
- Freelancer platforms
- Contact: cara@oratf.info for ORA-specific help

---

## 🎯 Best Practices

### Q: What should I do before deploying to production?
**A:**
- [ ] Test all features locally
- [ ] Set up proper error tracking (Sentry)
- [ ] Configure analytics (Firebase/Google Analytics)
- [ ] Add Terms of Service & Privacy Policy
- [ ] Set up automated backups
- [ ] Document any custom changes
- [ ] Test on mobile devices
- [ ] Run accessibility audit

### Q: How do I backup my data?
**A:**
- **Supabase**: Project Settings → Database → Backups (automatic on Pro)
- **Firebase**: `firebase projects:addsvc` for service account, then script backups
- **Manual**: Export from Supabase Dashboard regularly

### Q: Should I use staging environment?
**A:** Recommended for:
- Testing new features before production
- Trying integrations (Stripe, OpenAI)
- Training team members

**Setup**: Create second Supabase/Firebase project for staging.

---

**Still have questions?** Check `/DEPLOYMENT_GUIDE.md` or contact cara@oratf.info

*Last Updated: December 6, 2024*
