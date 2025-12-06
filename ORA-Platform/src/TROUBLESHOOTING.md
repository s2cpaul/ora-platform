# 🔧 Troubleshooting Guide

Common issues and solutions for deploying and running the ORA Platform.

---

## 🗄️ Supabase Issues

### Issue: "Failed to upload PDF"

**Symptoms**: Upload button doesn't work, error in console

**Solutions**:
1. Check Edge Function is deployed:
   ```bash
   supabase functions list
   ```

2. Verify secrets are set:
   ```bash
   supabase secrets list
   ```

3. Check browser console for specific error

4. Test Edge Function directly:
   ```bash
   curl https://[project-id].supabase.co/functions/v1/make-server-3504d096/health
   ```
   Should return: `{"status":"ok"}`

5. Verify CORS settings in Supabase Dashboard → Settings → API

6. Check `/utils/supabase/info.tsx` has correct credentials

### Issue: "Supabase function deployment fails"

**Solutions**:
1. Ensure you're logged in:
   ```bash
   supabase login
   ```

2. Link to correct project:
   ```bash
   supabase link
   ```

3. Check function code for syntax errors

4. Redeploy:
   ```bash
   supabase functions deploy make-server-3504d096 --no-verify-jwt
   ```

### Issue: "Cannot create bucket"

**Symptoms**: "Bucket already exists" or "Permission denied"

**Solutions**:
1. Check if bucket exists in Supabase Dashboard → Storage
2. Bucket is created automatically on first upload
3. If manual creation needed:
   - Go to Storage → Create bucket
   - Name: `make-3504d096-pdfs`
   - **Uncheck** "Public bucket"

### Issue: "Database connection failed"

**Solutions**:
1. Verify `SUPABASE_DB_URL` in `.env` is correct
2. Ensure password in connection string is correct (no special URL encoding issues)
3. Check database is running in Supabase Dashboard

---

## 🔐 Authentication Issues

### Issue: "Google OAuth not working"

**Symptoms**: "Redirect URI mismatch" or OAuth popup closes immediately

**Solutions**:
1. **Check Authorized Redirect URIs** in Google Cloud Console:
   - Must include: `https://[your-domain]/__/auth/handler`
   - Protocol must match (http vs https)
   - No trailing slashes
   - Exact domain match

2. **Check Authorized JavaScript Origins**:
   - Must include: `https://[your-domain]`
   - No path, no trailing slash

3. **Verify Firebase Auth is enabled**:
   - Firebase Console → Authentication → Sign-in method → Google → Enabled

4. **Check OAuth consent screen**:
   - Must be configured with support email

5. **Clear browser cache** and try in incognito mode

6. **Check Firebase authorized domains**:
   - Firebase Console → Authentication → Settings → Authorized domains
   - Add your production domain

### Issue: "Firebase initialization failed"

**Solutions**:
1. Check all Firebase env variables are set:
   ```bash
   # .env should have:
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_AUTH_DOMAIN=xxx
   VITE_FIREBASE_PROJECT_ID=xxx
   ```

2. Ensure variables start with `VITE_` for frontend access

3. Restart dev server after changing `.env`:
   ```bash
   npm run dev
   ```

4. For production, set environment variables in hosting platform dashboard

---

## 🌐 Deployment Issues

### Issue: "Environment variables undefined in production"

**Solutions**:
1. **Ensure variables start with `VITE_`** for frontend access:
   - ✅ `VITE_SUPABASE_URL`
   - ❌ `SUPABASE_URL` (won't work in browser)

2. **Set variables in hosting platform**:
   - **Vercel**: Dashboard → Project → Settings → Environment Variables
   - **Netlify**: Dashboard → Site → Site settings → Environment variables
   - **Firebase**: Use `firebase functions:config:set`

3. **Rebuild after setting variables**:
   - Changes to environment variables require a new build

4. **Check build logs** for environment variable errors

### Issue: "Build fails"

**Symptoms**: `npm run build` fails with errors

**Solutions**:
1. **Check for TypeScript errors**:
   ```bash
   npm run lint
   ```

2. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Check for missing dependencies**:
   ```bash
   npm install
   ```

4. **Look for import errors** in build output

5. **Ensure all used packages are in `package.json` dependencies**

### Issue: "Production site shows blank page"

**Solutions**:
1. **Check browser console** for errors

2. **Verify build output**:
   - `dist/` folder should exist
   - `dist/index.html` should exist

3. **Check public path** in hosting platform
   - Should point to `dist/` folder

4. **Check for HTTPS mixed content warnings**:
   - All resources should use HTTPS in production

5. **Verify SPA routing is configured**:
   - Single-page apps need catch-all routing to `index.html`

### Issue: "Deploy command not found"

**Solutions**:
1. **Install CLI tools globally**:
   ```bash
   npm install -g vercel
   # or
   npm install -g firebase-tools
   # or
   npm install -g netlify-cli
   ```

2. **Add to PATH** if needed (CLI installed but not found)

3. **Use npx** as alternative:
   ```bash
   npx vercel
   ```

---

## 🔄 Git/GitHub Issues

### Issue: "Git push rejected"

**Symptoms**: "Updates were rejected because the remote contains work that you do not have locally"

**Solutions**:
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

### Issue: "Accidentally committed .env file"

**⚠️ CRITICAL - IMMEDIATE ACTION REQUIRED**:

1. **Remove from repository**:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from repository"
   git push origin main
   ```

2. **Ensure .gitignore includes .env**:
   ```bash
   echo ".env" >> .gitignore
   git add .gitignore
   git commit -m "Add .env to gitignore"
   git push origin main
   ```

3. **ROTATE ALL EXPOSED CREDENTIALS**:
   - Create new Supabase service role key
   - Regenerate Firebase secrets if exposed
   - Update all API keys
   - Update all secrets in hosting platforms

4. **Delete GitHub repository** if keys were public and create a new one

### Issue: "Large files causing push to fail"

**Solutions**:
1. **Remove large files**:
   ```bash
   git rm --cached large-file.pdf
   ```

2. **Use Git LFS** for large files:
   ```bash
   git lfs install
   git lfs track "*.pdf"
   git add .gitattributes
   ```

3. **Check .gitignore** excludes:
   - `node_modules/`
   - `dist/`
   - `.env`

---

## 📱 Frontend Issues

### Issue: "Theme not persisting"

**Solutions**:
1. Check localStorage is enabled in browser
2. Clear browser cache
3. Check browser console for localStorage errors
4. Ensure theme toggle component is working

### Issue: "Navigation not working"

**Solutions**:
1. Check `currentPage` state is updating
2. Verify all navigation handlers are passed as props
3. Check browser console for errors
4. Ensure proper page state types in `App.tsx`

### Issue: "Components not rendering"

**Solutions**:
1. **Check imports**:
   - Verify component paths are correct
   - Ensure named exports match imports

2. **Check for errors in component**:
   - Look for syntax errors
   - Check for missing props

3. **Verify component is conditionally rendered**:
   - Check if `currentPage === "pdflibrary"` condition is met

### Issue: "Icons not showing"

**Solutions**:
1. Ensure lucide-react is installed:
   ```bash
   npm install lucide-react
   ```

2. Check icon imports:
   ```typescript
   import { Upload, FileText } from "lucide-react";
   ```

3. Clear browser cache and rebuild

---

## 🎨 Styling Issues

### Issue: "Tailwind classes not working"

**Solutions**:
1. Ensure Tailwind is properly installed:
   ```bash
   npm install -D tailwindcss@4.0.0 @tailwindcss/vite@4.0.0
   ```

2. Check `vite.config.ts` includes Tailwind:
   ```typescript
   import tailwindcss from '@tailwindcss/vite'
   
   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

3. Verify `/styles/globals.css` is imported in `main.tsx`

4. Rebuild:
   ```bash
   npm run dev
   ```

### Issue: "Dark mode not working"

**Solutions**:
1. Check HTML has `dark` class when dark mode is active:
   ```javascript
   document.documentElement.classList.add("dark")
   ```

2. Verify theme state is updating

3. Check CSS variables in `/styles/globals.css` for dark theme

4. Clear browser cache

---

## 🚀 Performance Issues

### Issue: "Slow page load"

**Solutions**:
1. **Run Lighthouse audit** (Chrome DevTools)
2. **Optimize images**:
   - Use WebP format
   - Compress images
   - Use appropriate sizes

3. **Code splitting**:
   - Use React.lazy for large components
   - Implement dynamic imports

4. **Reduce bundle size**:
   ```bash
   npm run build -- --analyze
   ```

5. **Enable compression** in hosting platform

### Issue: "PDF uploads slow"

**Solutions**:
1. **Check file size** (Supabase free tier: 50MB limit per file)
2. **Check internet connection**
3. **Verify Supabase region** is close to users
4. **Add upload progress indicator** (already implemented)
5. **Compress PDFs** before upload

---

## 🔍 Debugging Tips

### General Debugging Strategy

1. **Check browser console** (F12 → Console tab)
   - Look for errors (red)
   - Check warnings (yellow)
   - Read error messages carefully

2. **Check Network tab** (F12 → Network tab)
   - Look for failed requests (red)
   - Check request/response data
   - Verify API endpoints are correct

3. **Use React DevTools**
   - Inspect component props
   - Check state values
   - Track component re-renders

4. **Check Supabase logs**
   - Dashboard → Logs → Edge Functions
   - Look for function execution errors

5. **Test in isolation**
   - Comment out code to isolate issues
   - Test features one at a time
   - Use console.log strategically

### Useful Console Commands

```javascript
// Check if Supabase is configured
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)

// Check localStorage
console.log('Theme:', localStorage.getItem('theme'))
console.log('Sentiments:', localStorage.getItem('userSentiments'))

// Test API endpoint
fetch('https://[project].supabase.co/functions/v1/make-server-3504d096/health')
  .then(r => r.json())
  .then(console.log)

// Check environment variables (dev only!)
console.log(import.meta.env)
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide** thoroughly
2. **Read error messages** completely
3. **Search the error message** on Google/Stack Overflow
4. **Check official documentation**:
   - [Supabase Docs](https://supabase.com/docs)
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Vite Docs](https://vitejs.dev/)
   - [React Docs](https://react.dev/)

### When Asking for Help

**Provide**:
1. Exact error message (copy/paste)
2. What you were trying to do
3. What you've already tried
4. Relevant code snippets
5. Browser console output
6. Environment (OS, Node version, browser)

**Don't**:
1. Share credentials or API keys
2. Share entire codebase without context
3. Say "it doesn't work" without details

### Where to Get Help

- **Supabase**: [Discord](https://discord.supabase.com/)
- **Firebase**: [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- **React**: [Reactiflux Discord](https://www.reactiflux.com/)
- **General**: [Stack Overflow](https://stackoverflow.com/)

---

## 🎯 Preventive Measures

### To Avoid Future Issues

1. **Always use version control**
2. **Test locally before deploying**
3. **Keep dependencies updated** (carefully)
4. **Document changes** in commit messages
5. **Never commit secrets**
6. **Use environment variables**
7. **Keep backups** of important data
8. **Monitor error logs** regularly
9. **Test in multiple browsers**
10. **Have a rollback plan**

---

**Remember**: Most issues are configuration-related. Double-check your environment variables, credentials, and deployment settings first!

**Pro Tip**: When stuck, take a break, come back with fresh eyes, and read error messages more carefully. The answer is usually right there!
