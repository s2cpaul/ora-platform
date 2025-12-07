# Google OAuth Redirect URI Setup

## Steps

1. **Google Cloud Console**
   - Go to: APIs & Services → Credentials → OAuth 2.0 Client ID
   - Add your redirect URI (e.g., `https://ora-platform.firebaseapp.com/__/auth/handler`) under **Authorized redirect URIs**.

2. **Firebase Console**
   - Go to: Authentication → Settings → Authorized domains
   - Make sure `ora-platform.firebaseapp.com` is listed.
   - If you use a custom domain (e.g., `ora-platform.com`), add that too.

## ⚠️ Notes
- The `/__/auth/handler` part is required — Firebase uses it internally to complete the OAuth flow.
- If you deploy to multiple environments (staging, production), add each domain’s redirect URI in Google Cloud.

## Result
Once this is set, your Google Sign-In should work seamlessly with Firebase Authentication.

## Need Help?
- If you need help with custom domains, multiple environments, or troubleshooting, ask for step-by-step instructions or examples.
