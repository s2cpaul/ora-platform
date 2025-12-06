# ORA Web Template - Deployment Guide for oratf.info

## Your Domain: oratf.info

This guide provides specific instructions for deploying your ORA web template to **oratf.info** and integrating it with Google Workspace.

---

## Quick Start: Recommended Path

**Best Option for Google Workspace Integration: Firebase Hosting**

Total setup time: **1-2 hours**

---

## Step-by-Step Deployment

### Part 1: Choose Your Hosting Platform

I recommend **Firebase Hosting** for best Google integration, but I'll provide instructions for all major platforms.

---

## Option A: Firebase Hosting (Recommended)

### Step 1: Set Up Firebase

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```
   - Use your Google Workspace email if possible

3. **Create Firebase Project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Click "Add project"
   - Name it: `ORA-TF` or `oratf-info`
   - Disable Google Analytics for now (can enable later)
   - Click "Create project"

4. **Initialize Firebase in Your Project**
   ```bash
   cd your-project-directory
   firebase init hosting
   ```
   
   Answer the prompts:
   ```
   ? Select a default Firebase project: Choose the project you just created
   ? What do you want to use as your public directory? dist
   ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
   ? Set up automatic builds and deploys with GitHub? No (for now)
   ? File dist/index.html already exists. Overwrite? No
   ```

### Step 2: Build and Deploy

1. **Build Your Production Site**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy --only hosting
   ```

3. **Your Temporary URLs**
   - `https://oratf-info.web.app` (or similar)
   - `https://oratf-info.firebaseapp.com` (or similar)
   - Test the site to make sure everything works!

### Step 3: Connect Your Custom Domain (oratf.info)

1. **In Firebase Console**
   - Go to your project
   - Click "Hosting" in left sidebar
   - Click "Add custom domain"

2. **Add Domain**
   - Enter: `oratf.info`
   - Click "Continue"

3. **Add www Subdomain** (Optional but recommended)
   - Also add: `www.oratf.info`
   - Set to redirect to `oratf.info`

4. **Firebase Will Provide DNS Records**
   
   You'll see something like:
   ```
   A Records:
   oratf.info → 151.101.1.195
   oratf.info → 151.101.65.195
   
   TXT Record (for verification):
   oratf.info → google-site-verification=XXXXXXXXXXXXX
   ```

   **Keep this page open!** You'll need these values.

### Step 4: Configure DNS

**Where is your domain registered?**

#### If with Google Domains:

1. **Go to [domains.google.com](https://domains.google.com)**
2. **Click on oratf.info**
3. **Click "DNS" in the left sidebar**
4. **Scroll to "Custom resource records"**

5. **Add the A Records from Firebase**
   ```
   Name: @
   Type: A
   TTL: 3600
   Data: 151.101.1.195
   ```
   Click "Add"
   
   ```
   Name: @
   Type: A
   TTL: 3600
   Data: 151.101.65.195
   ```
   Click "Add"

6. **Add the TXT Record for Verification**
   ```
   Name: @
   Type: TXT
   TTL: 3600
   Data: google-site-verification=XXXXXXXXXXXXX
   ```
   (Use the actual value Firebase gave you)

7. **If adding www subdomain:**
   ```
   Name: www
   Type: CNAME
   TTL: 3600
   Data: oratf.info
   ```

8. **IMPORTANT: Preserve Google Workspace Records**
   
   ⚠️ **Do NOT delete any existing records including:**
   - MX records (for Gmail at oratf.info)
   - TXT records with "v=spf1" (for email)
   - CNAME records like `mail`, `calendar`, `drive`
   
   Only ADD the new records above!

#### If with Another Registrar (GoDaddy, Namecheap, etc.):

1. **Login to your domain registrar**
2. **Find DNS Management/DNS Settings**
3. **Add the same A and TXT records as above**
4. **Preserve any existing MX and TXT records**

### Step 5: Verify and Wait

1. **Back in Firebase Console**
   - Click "Verify" after adding DNS records
   - May take a few minutes to verify

2. **DNS Propagation**
   - Can take 24-48 hours
   - Usually completes in 1-4 hours
   - Check progress: [whatsmydns.net](https://www.whatsmydns.net/?d=oratf.info&t=A)

3. **SSL Certificate**
   - Firebase automatically provisions SSL
   - Takes 5-15 minutes after DNS verification
   - Your site will be available at: **https://oratf.info**

---

## Option B: Vercel

### Step 1: Deploy to Vercel

1. **Sign up at [vercel.com](https://vercel.com)**
   - Use your GitHub account

2. **Push Your Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ora-template.git
   git push -u origin main
   ```

3. **Import Project in Vercel**
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework: Vite (auto-detected)
   - Click "Deploy"

4. **Wait for Deployment**
   - Takes 1-2 minutes
   - You'll get: `https://ora-template.vercel.app` (or similar)

### Step 2: Add Custom Domain

1. **In Vercel Dashboard**
   - Go to your project
   - Settings → Domains
   - Enter: `oratf.info`
   - Click "Add"

2. **Vercel Will Provide DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 3: Configure DNS (Same as Firebase Step 4 above)

Add these records to your DNS provider:

**For oratf.info:**
```
Name: @
Type: A
TTL: 3600
Data: 76.76.21.21
```

**For www.oratf.info:**
```
Name: www
Type: CNAME
TTL: 3600
Data: cname.vercel-dns.com
```

### Step 4: Verify
- Wait for DNS propagation
- Vercel auto-provisions SSL
- Your site: **https://oratf.info**

---

## Option C: Netlify

### Step 1: Deploy to Netlify

1. **Sign up at [netlify.com](https://netlify.com)**

2. **Drag and Drop Deploy (Quick Test)**
   - Build your site: `npm run build`
   - Drag the `dist` folder to Netlify
   - Get instant URL: `https://random-name.netlify.app`

3. **Or Deploy from Git (Recommended)**
   - "Add new site" → "Import an existing project"
   - Connect GitHub
   - Select repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy"

### Step 2: Add Custom Domain

1. **In Netlify Dashboard**
   - Site settings → Domain management
   - "Add custom domain"
   - Enter: `oratf.info`

2. **Netlify Provides DNS Records**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Step 3: Configure DNS
Add to your DNS provider (same process as above)

---

## Google Workspace Integration

### Your Email Setup

If you're using Google Workspace with oratf.info for email:

**Current MX Records (DO NOT DELETE):**
You should have these in your DNS:
```
Priority: 1   Server: ASPMX.L.GOOGLE.COM
Priority: 5   Server: ALT1.ASPMX.L.GOOGLE.COM
Priority: 5   Server: ALT2.ASPMX.L.GOOGLE.COM
Priority: 10  Server: ALT3.ASPMX.L.GOOGLE.COM
Priority: 10  Server: ALT4.ASPMX.L.GOOGLE.COM
```

**These must remain for email to work!**

### Set Up Google Services

#### 1. Google Analytics 4

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Admin → Create Property
   - Property name: "ORA TF"
   - Time zone: Your time zone
   - Currency: Your currency

2. **Get Measurement ID**
   - Admin → Data Streams → Add stream → Web
   - Website URL: `https://oratf.info`
   - Stream name: "ORA TF Website"
   - Copy Measurement ID: `G-XXXXXXXXXX`

3. **Add to Your Site**
   
   Edit `/index.html` and add to `<head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. **Redeploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   # or git push (for Vercel/Netlify)
   ```

#### 2. Google Search Console

1. **Add Property**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add property: `oratf.info`

2. **Verify Ownership (DNS Method)**
   - Choose "DNS record" verification
   - Add TXT record to DNS:
   ```
   Name: @
   Type: TXT
   Data: google-site-verification=YYYYYYYYYYYYYY
   ```

3. **Submit Sitemap**
   - Create `/public/sitemap.xml`:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://oratf.info/</loc>
       <lastmod>2025-11-08</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```
   - Submit: `https://oratf.info/sitemap.xml`

#### 3. Contact Form with Google Forms

1. **Create Google Form**
   - [forms.google.com](https://forms.google.com) → New form
   - Title: "ORA Contact Form"
   - Add fields: Name, Email, Subject, Message

2. **Get Embed Code**
   - Click "Send" → `<>` (embed icon)
   - Copy iframe code

3. **Add to Your Site**
   Create `/components/ContactForm.tsx`:
   ```tsx
   export function ContactForm() {
     return (
       <div className="w-full max-w-4xl mx-auto p-6">
         <h2 className="mb-6 text-center">Contact Us</h2>
         <iframe
           src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
           width="100%"
           height="800"
           frameBorder="0"
           marginHeight={0}
           marginWidth={0}
           className="w-full"
         >
           Loading…
         </iframe>
       </div>
     );
   }
   ```

4. **Link Responses to Gmail**
   - In Google Form → Responses → Click spreadsheet icon
   - Tools → Script editor
   - Add email notification script

#### 4. Professional Email Links

Update your site to use contact@oratf.info:

```tsx
// In Footer.tsx or Contact section
<a 
  href="mailto:contact@oratf.info?subject=ORA%20Inquiry"
  className="hover:underline"
>
  contact@oratf.info
</a>
```

#### 5. Google Calendar Integration

For scheduling demos:

```tsx
// Add to your site
<a
  href="https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
>
  Schedule a Demo
</a>
```

Or create a booking page:
- [calendar.google.com](https://calendar.google.com) → Settings → Appointment schedules
- Create booking page
- Share link from your website

---

## DNS Configuration Summary for oratf.info

Here's what your complete DNS should look like:

### For Firebase Hosting:
```
TYPE    NAME    VALUE
─────────────────────────────────────────────────────
A       @       151.101.1.195
A       @       151.101.65.195
CNAME   www     oratf.info
TXT     @       google-site-verification=XXXXX (Firebase)
TXT     @       google-site-verification=YYYYY (Search Console)
TXT     @       v=spf1 include:_spf.google.com ~all

MX      @       1 ASPMX.L.GOOGLE.COM
MX      @       5 ALT1.ASPMX.L.GOOGLE.COM
MX      @       5 ALT2.ASPMX.L.GOOGLE.COM
MX      @       10 ALT3.ASPMX.L.GOOGLE.COM
MX      @       10 ALT4.ASPMX.L.GOOGLE.COM
```

### For Vercel:
```
TYPE    NAME    VALUE
─────────────────────────────────────────────────────
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
TXT     @       google-site-verification=YYYYY (Search Console)
TXT     @       v=spf1 include:_spf.google.com ~all

[Same MX records as above for email]
```

---

## Post-Deployment Checklist

### Immediately After Deployment
- [ ] Test https://oratf.info loads correctly
- [ ] Test https://www.oratf.info redirects to main domain
- [ ] Verify SSL certificate is active (look for padlock in browser)
- [ ] Test dark/light mode toggle
- [ ] Test all navigation links
- [ ] Test on mobile device

### Within 24 Hours
- [ ] Verify DNS propagation globally: [whatsmydns.net](https://www.whatsmydns.net/?d=oratf.info&t=A)
- [ ] Test email still works: send test to your @oratf.info address
- [ ] Google Analytics tracking (check Real-Time reports)
- [ ] Google Search Console verified

### Within 1 Week
- [ ] Submit sitemap to Search Console
- [ ] Set up contact form
- [ ] Add social media meta tags
- [ ] Create Google My Business (if applicable)
- [ ] Set up monitoring/uptime alerts

### SEO Optimization
- [ ] Add meta descriptions to pages
- [ ] Optimize page titles
- [ ] Add Open Graph tags for social sharing:
   ```html
   <meta property="og:title" content="ORA - Observe Respond Act" />
   <meta property="og:description" content="Empowering Change Agents with AI Solutions" />
   <meta property="og:image" content="https://oratf.info/og-image.jpg" />
   <meta property="og:url" content="https://oratf.info" />
   <meta property="og:type" content="website" />
   
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:title" content="ORA - Observe Respond Act" />
   <meta name="twitter:description" content="Empowering Change Agents with AI Solutions" />
   <meta name="twitter:image" content="https://oratf.info/og-image.jpg" />
   ```

---

## Troubleshooting

### DNS Issues
**Problem**: Site not loading after 24 hours

**Check**:
1. DNS propagation: [whatsmydns.net/?d=oratf.info&t=A](https://www.whatsmydns.net/?d=oratf.info&t=A)
2. Correct DNS records in your registrar
3. No typos in domain name

**Fix**:
```bash
# Flush your local DNS cache
# Windows:
ipconfig /flushdns

# Mac:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux:
sudo systemd-resolve --flush-caches
```

### Email Stopped Working
**Problem**: Can't receive email at @oratf.info

**Check**:
1. MX records still present in DNS
2. SPF record includes Google: `v=spf1 include:_spf.google.com ~all`

**Test**:
- Google Admin Toolbox: [toolbox.googleapps.com/apps/checkmx](https://toolbox.googleapps.com/apps/checkmx/check)
- Enter: oratf.info
- Should show all 5 Google MX records

### SSL Certificate Issues
**Problem**: "Not Secure" or certificate error

**Wait**:
- Firebase: 5-15 minutes after DNS verification
- Vercel/Netlify: 5-10 minutes after DNS propagation

**If still not working**:
1. Verify DNS is fully propagated
2. Check hosting dashboard for SSL status
3. Contact hosting support

### Site Not Updating
**Problem**: Changes don't appear on oratf.info

**Fix**:
1. Clear browser cache: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. Verify build completed successfully
3. Check deployment status in hosting dashboard
4. Firebase: Run `firebase deploy --only hosting` again

---

## Estimated Timeline

| Task | Time |
|------|------|
| Build and first deployment | 15-30 min |
| DNS configuration | 15 min |
| DNS propagation wait | 1-24 hours |
| SSL certificate activation | 5-15 min after DNS |
| Google Analytics setup | 15 min |
| Google Search Console | 10 min |
| Google Forms contact form | 20 min |
| Testing and verification | 30 min |
| **Total active work** | **~2 hours** |
| **Total with DNS wait** | **Up to 26 hours** |

---

## Support Contacts

### Your Domain
- **Domain**: oratf.info
- **Registrar**: Check at [whois.net/oratf.info](https://whois.net/oratf.info)

### Hosting Support
- **Firebase**: [firebase.google.com/support](https://firebase.google.com/support)
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [netlify.com/support](https://netlify.com/support)

### Google Workspace
- **Admin Console**: [admin.google.com](https://admin.google.com)
- **Support**: [support.google.com/a](https://support.google.com/a)

---

## Next Steps

1. **Choose hosting platform** (I recommend Firebase)
2. **Deploy your site** (follow steps above)
3. **Configure DNS** for oratf.info
4. **Wait for propagation** (grab coffee! ☕)
5. **Test your site** at https://oratf.info
6. **Set up Google Analytics**
7. **Add to Google Search Console**
8. **Create contact form**
9. **Share with your community!** 🚀

---

## Quick Commands Reference

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Check deployment status
firebase hosting:channel:list

# Git deployment (for Vercel/Netlify)
git add .
git commit -m "Update site"
git push

# Check DNS
nslookup oratf.info
dig oratf.info

# Test local build
npm run preview
```

---

*Your ORA web template will be live at **https://oratf.info** soon!* 🎉

*Last Updated: November 8, 2025*
