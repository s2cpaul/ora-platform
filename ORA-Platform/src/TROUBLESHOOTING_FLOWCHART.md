# 🔧 ORA Platform - Troubleshooting Flowchart

**Visual decision trees for common deployment issues**

---

## 📊 How to Use This Guide

Each flowchart below helps you diagnose and fix specific issues. Follow the decision tree from START → to resolution.

---

## 🌐 Issue #1: **App Not Loading After Deployment**

```
START: App deployed but shows blank page or error
│
├─ Does browser console show errors?
│  │
│  ├─ YES → Check error type:
│  │  │
│  │  ├─ "Cannot GET /" or 404
│  │  │  └─ FIX: Check build output directory
│  │  │     ├─ Firebase: Should be 'dist'
│  │  │     ├─ Verify: firebase.json → "public": "dist"
│  │  │     └─ Rebuild: npm run build && firebase deploy
│  │  │
│  │  ├─ "Failed to fetch" or network errors
│  │  │  └─ FIX: Check Supabase backend
│  │  │     ├─ Verify server deployed: supabase functions list
│  │  │     ├─ Check URL in /utils/supabase/info.tsx
│  │  │     └─ Test endpoint: curl https://xxx.supabase.co/functions/v1/make-server-3504d096/health
│  │  │
│  │  ├─ "Module not found" errors
│  │  │  └─ FIX: Reinstall dependencies
│  │  │     ├─ rm -rf node_modules package-lock.json
│  │  │     ├─ npm install
│  │  │     └─ npm run build && redeploy
│  │  │
│  │  └─ "Unauthorized" or CORS errors
│  │     └─ FIX: Update CORS settings
│  │        ├─ Supabase Dashboard → Settings → API → CORS
│  │        ├─ Add production domain: https://your-app.web.app
│  │        └─ Redeploy backend: supabase functions deploy server
│  │
│  └─ NO → Check deployment status:
│     ├─ Firebase: firebase hosting:channel:list
│     ├─ Vercel: Check dashboard for deploy status
│     └─ If deploy failed, check build logs
│
└─ RESOLVED: App loads successfully! ✅
```

---

## 🔐 Issue #2: **Google OAuth Not Working**

```
START: "Unauthorized" or "Redirect URI mismatch" error
│
├─ Error message says "redirect_uri_mismatch"?
│  │
│  ├─ YES → Fix redirect URIs:
│  │  │
│  │  └─ STEP 1: Check exact error message
│  │     ├─ Shows: "redirect_uri: http://localhost:5173/__/auth/handler"
│  │     │  └─ FIX: Add to Google Cloud Console
│  │     │     1. console.cloud.google.com
│  │     │     2. APIs & Services → Credentials
│  │     │     3. Edit OAuth Client
│  │     │     4. Authorized redirect URIs → Add:
│  │     │        ├─ http://localhost:5173/__/auth/handler
│  │     │        └─ https://your-domain.com/__/auth/handler
│  │     │     5. SAVE
│  │     │
│  │     └─ Shows production URL
│  │        └─ FIX: Add production redirect URI
│  │           ├─ Same as above, use production URL
│  │           └─ ⚠️ Must include /__/auth/handler path!
│  │
│  └─ NO → Check other causes:
│     │
│     ├─ Error: "This app is blocked"
│     │  └─ FIX: OAuth Consent Screen not published
│     │     1. Google Cloud Console → OAuth consent screen
│     │     2. Publishing status → PUBLISH APP
│     │     3. Or add test users if in Testing mode
│     │
│     ├─ Error: "Unauthorized domain"
│     │  └─ FIX: Add to Firebase authorized domains
│     │     1. Firebase Console → Authentication → Settings
│     │     2. Authorized domains → Add domain
│     │     3. Add: your-domain.com (no https://)
│     │
│     ├─ Error: "Provider not enabled"
│     │  └─ FIX: Enable Google sign-in
│     │     1. Firebase Console → Authentication
│     │     2. Sign-in method → Google
│     │     3. Enable toggle → SAVE
│     │
│     └─ Error: "Invalid client ID"
│        └─ FIX: Update Firebase OAuth config
│           1. Firebase → Authentication → Google
│           2. Web SDK configuration
│           3. Enter Client ID & Secret from Google Cloud
│           4. SAVE
│
└─ RESOLVED: OAuth working! ✅
```

---

## 📁 Issue #3: **File Uploads Failing**

```
START: Videos or PDFs not uploading
│
├─ Check browser console for errors
│  │
│  ├─ Error: "413 Payload Too Large"
│  │  └─ FIX: File size exceeds limit
│  │     ├─ Supabase Free: 50MB max per file
│  │     ├─ Compress file or upgrade Supabase plan
│  │     └─ For videos: Use video compression tool
│  │
│  ├─ Error: "403 Forbidden"
│  │  └─ FIX: Storage bucket permissions
│  │     1. Supabase → Storage → Buckets
│  │     2. Check bucket exists:
│  │        ├─ make-3504d096-videos
│  │        └─ make-3504d096-pdfs
│  │     3. If missing: Redeploy server
│  │        └─ supabase functions deploy server
│  │     4. Bucket policies should be PUBLIC for reads
│  │
│  ├─ Error: "Network request failed"
│  │  └─ FIX: Check backend server
│  │     1. Verify server is running
│  │     2. Test upload endpoint:
│  │        └─ curl -X POST https://xxx.supabase.co/functions/v1/make-server-3504d096/upload-video
│  │     3. Check server logs in Supabase Dashboard
│  │     4. Redeploy if needed: supabase functions deploy server
│  │
│  ├─ Error: "CORS policy" blocked
│  │  └─ FIX: Update CORS settings
│  │     1. Check /supabase/functions/server/index.tsx
│  │     2. Ensure CORS is enabled:
│  │        ```typescript
│  │        app.use('*', cors({ origin: '*' }))
│  │        ```
│  │     3. Redeploy: supabase functions deploy server
│  │
│  └─ No errors, but upload doesn't complete
│     └─ FIX: Check network/timeout
│        ├─ Slow internet? Try smaller file
│        ├─ Function timeout? Check execution time in Supabase
│        └─ Increase timeout if needed (Supabase settings)
│
└─ RESOLVED: Uploads working! ✅
```

---

## 🔑 Issue #4: **Video Library Access Control Not Working**

```
START: Can't access videos or seeing wrong videos
│
├─ Problem type?
│  │
│  ├─ Can't see ANY videos
│  │  └─ DEBUG:
│  │     1. Check email entry modal appeared
│  │     2. Verify email was entered
│  │     3. Check localStorage:
│  │        ├─ Open DevTools → Application → Local Storage
│  │        ├─ Look for: userEmail or videoLibraryEmail
│  │        └─ If missing: Enter email again
│  │     4. Check server response:
│  │        ├─ Network tab → Filter: /videos or /list-videos
│  │        ├─ Check response: Should return array
│  │        └─ If empty array: Email doesn't match any videos
│  │     5. Test with admin email:
│  │        ├─ Enter: cara@oratf.info
│  │        └─ Should see ALL videos
│  │
│  ├─ Seeing someone else's videos
│  │  └─ FIX: Server-side filtering issue
│  │     1. Check /supabase/functions/server/index.tsx
│  │     2. Verify email filtering logic:
│  │        ```typescript
│  │        const userEmail = url.searchParams.get('email');
│  │        // Filter by customerEmail OR isPublic OR isAdmin
│  │        ```
│  │     3. Check video metadata has customerEmail field
│  │     4. Redeploy: supabase functions deploy server
│  │
│  ├─ Can't upload videos
│  │  └─ See: Issue #3 (File Uploads Failing)
│  │
│  └─ Videos show but won't play
│     └─ FIX: Signed URL expired
│        1. Signed URLs expire after 1 year
│        2. Re-upload video or regenerate URL
│        3. Check video file exists in Storage:
│           ├─ Supabase → Storage → make-3504d096-videos
│           └─ Verify file is there
│        4. Check Network tab for 404 on video URL
│
└─ RESOLVED: Access control working! ✅
```

---

## 🔧 Issue #5: **Environment Variables Not Working**

```
START: "undefined" errors for config values
│
├─ Where is the error?
│  │
│  ├─ Frontend (browser console)
│  │  └─ Check variable source:
│  │     │
│  │     ├─ Using /utils/supabase/info.tsx?
│  │     │  └─ FIX:
│  │     │     1. Open /utils/supabase/info.tsx
│  │     │     2. Verify values are filled in:
│  │     │        export const projectId = 'xxx';
│  │     │        export const publicAnonKey = 'xxx';
│  │     │     3. NOT in .gitignore? (it should be!)
│  │     │     4. Save file
│  │     │     5. Restart dev server: npm run dev
│  │     │
│  │     └─ Using .env file?
│  │        └─ FIX:
│  │           1. Check .env file exists in project root
│  │           2. All frontend vars MUST start with VITE_
│  │              ├─ ✅ VITE_FIREBASE_API_KEY=xxx
│  │              └─ ❌ FIREBASE_API_KEY=xxx (won't work!)
│  │           3. Restart dev server after .env changes
│  │           4. In production:
│  │              ├─ Firebase: Can't use .env, hardcode in config
│  │              ├─ Vercel: Add in project settings → Env vars
│  │              └─ Netlify: Site settings → Env vars
│  │
│  └─ Backend (Supabase function)
│     └─ FIX:
│        1. Check secrets are set:
│           └─ supabase secrets list
│        2. Should see:
│           ├─ SUPABASE_URL
│           ├─ SUPABASE_SERVICE_ROLE_KEY
│           ├─ SUPABASE_ANON_KEY
│           └─ SUPABASE_DB_URL
│        3. If missing, set them:
│           └─ supabase secrets set KEY_NAME=value
│        4. Redeploy function:
│           └─ supabase functions deploy server
│        5. Check function logs:
│           └─ Supabase Dashboard → Functions → Logs
│
└─ RESOLVED: Environment variables loading! ✅
```

---

## 🚀 Issue #6: **Deployment Fails**

```
START: Build or deployment command fails
│
├─ Where does it fail?
│  │
│  ├─ Build fails (npm run build)
│  │  └─ Check error message:
│  │     │
│  │     ├─ "Cannot find module"
│  │     │  └─ FIX:
│  │     │     1. rm -rf node_modules package-lock.json
│  │     │     2. npm install
│  │     │     3. npm run build
│  │     │
│  │     ├─ TypeScript errors
│  │     │  └─ FIX:
│  │     │     1. Check the specific error
│  │     │     2. Fix type issues in mentioned files
│  │     │     3. Or temporarily: npm run build -- --mode production --no-typecheck
│  │     │
│  │     ├─ "Out of memory"
│  │     │  └─ FIX:
│  │     │     1. Increase Node memory:
│  │     │        └─ NODE_OPTIONS=--max-old-space-size=4096 npm run build
│  │     │     2. Or build on larger machine/CI
│  │     │
│  │     └─ Import/syntax errors
│  │        └─ FIX:
│  │           1. Check the error file and line number
│  │           2. Fix syntax (missing quotes, brackets, etc.)
│  │           3. Ensure all imports resolve
│  │
│  ├─ Firebase deploy fails
│  │  └─ Check error:
│  │     │
│  │     ├─ "Not logged in"
│  │     │  └─ FIX: firebase login
│  │     │
│  │     ├─ "Permission denied"
│  │     │  └─ FIX:
│  │     │     1. Verify Firebase project exists
│  │     │     2. Check .firebaserc file has correct project
│  │     │     3. firebase use --add (select project)
│  │     │
│  │     ├─ "Build folder not found"
│  │     │  └─ FIX:
│  │     │     1. Run npm run build first
│  │     │     2. Verify dist/ folder exists
│  │     │     3. Check firebase.json → "public": "dist"
│  │     │
│  │     └─ "Quota exceeded"
│  │        └─ FIX:
│  │           1. Check Firebase usage dashboard
│  │           2. Wait for quota reset or upgrade plan
│  │
│  ├─ Vercel deploy fails
│  │  └─ FIX:
│  │     1. Check Vercel dashboard for build logs
│  │     2. Ensure environment variables are set
│  │     3. Build command: npm run build
│  │     4. Output directory: dist
│  │
│  └─ Supabase function deploy fails
│     └─ Check error:
│        │
│        ├─ "Not linked to project"
│        │  └─ FIX: supabase link
│        │
│        ├─ "Syntax error in function"
│        │  └─ FIX:
│        │     1. Check /supabase/functions/server/index.tsx
│        │     2. Fix syntax errors
│        │     3. Test locally: supabase functions serve
│        │
│        └─ "Import not found"
│           └─ FIX:
│              1. Ensure imports use npm: or jsr: prefix
│              2. Example: import Stripe from 'npm:stripe'
│              3. Redeploy: supabase functions deploy server
│
└─ RESOLVED: Deployment successful! ✅
```

---

## 📱 Issue #7: **Site Works Locally But Not in Production**

```
START: Works on localhost:5173 but not on live site
│
├─ What's different in production?
│  │
│  ├─ Different domain/URL
│  │  └─ CHECK:
│  │     1. OAuth redirect URIs include production URL
│  │     2. Firebase authorized domains include production
│  │     3. Supabase CORS includes production
│  │     4. No hardcoded "localhost" in code
│  │
│  ├─ HTTPS vs HTTP
│  │  └─ CHECK:
│  │     1. All API calls use HTTPS in production
│  │     2. Mixed content errors in console?
│  │     3. Verify Supabase URLs use HTTPS
│  │
│  ├─ Environment variables
│  │  └─ CHECK:
│  │     1. Production env vars are set
│  │     2. Firebase: Hardcoded or Firebase config
│  │     3. Vercel/Netlify: Set in dashboard
│  │     4. Build includes env vars:
│  │        └─ Check build logs for "VITE_" variables
│  │
│  ├─ Caching issues
│  │  └─ FIX:
│  │     1. Hard refresh: Ctrl+Shift+R (Win) / Cmd+Shift+R (Mac)
│  │     2. Clear browser cache
│  │     3. Try incognito/private window
│  │     4. Check DevTools → Network → Disable cache
│  │
│  └─ Build output
│     └─ CHECK:
│        1. dist/ folder has all files
│        2. index.html exists in dist/
│        3. Assets are in dist/assets/
│        4. No 404s in Network tab
│
└─ RESOLVED: Production working! ✅
```

---

## 🆘 **Quick Reference: Common Errors**

| Error Message | Quick Fix |
|---------------|-----------|
| `redirect_uri_mismatch` | Add production URL to Google OAuth redirect URIs |
| `This app is blocked` | Publish OAuth consent screen or add test users |
| `403 Forbidden` | Check Supabase bucket permissions |
| `413 Payload Too Large` | File exceeds 50MB limit (compress or upgrade) |
| `Cannot GET /` | Wrong build output directory (should be `dist`) |
| `Module not found` | `rm -rf node_modules && npm install` |
| `Failed to fetch` | Supabase server not deployed or wrong URL |
| `CORS policy blocked` | Add domain to Supabase CORS settings |
| `Unauthorized domain` | Add domain to Firebase authorized domains |
| `Provider not enabled` | Enable Google in Firebase Authentication |

---

## 📞 **Still Stuck?**

### Debugging Checklist:
- [ ] Check browser console for errors (F12)
- [ ] Check Network tab for failed requests
- [ ] Check Supabase function logs
- [ ] Verify all credentials are correct
- [ ] Test with admin email: `cara@oratf.info`
- [ ] Clear cache and try incognito mode
- [ ] Check GitHub Issues for similar problems

### Get Help:
1. **Search FAQ**: `/DEPLOYMENT_FAQ.md`
2. **Full Guide**: `/DEPLOYMENT_GUIDE.md`
3. **Discord**: Supabase/Firebase communities
4. **Email**: cara@oratf.info
5. **GitHub**: Open an issue with:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, etc.)
   - What you've tried

---

**Remember**: 90% of deployment issues are OAuth redirect URIs or environment variables! ✨

*Last Updated: December 6, 2024*
