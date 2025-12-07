# Google OAuth & Firebase Authentication Onboarding

## 1. Redirect URIs
- Ensure your redirect URIs match exactly in both Firebase Console and Google Cloud Console (including protocol and path).
- Example: `https://your-app.firebaseapp.com/__/auth/handler`

## 2. Security Best Practices
- Always verify Firebase ID tokens on your backend before granting access.
- Use Firebase Admin SDK to verify tokens (see example below).
- Never trust tokens received directly from the client.

### Node.js Example (Backend Verification)
```js
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("./path/to/serviceAccountKey.json")),
});
async function verifyIdToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
```

## 3. Mobile Apps
- Android: Register your app’s SHA-1 fingerprint in Firebase Console.
- iOS: Use the reversed client ID (e.g., `com.googleusercontent.apps.YOUR_CLIENT_ID`) in your app’s configuration.

## 4. Environment Variables
- Store sensitive values in `.env.local` (never commit to git).
- Reference them in your code using `import.meta.env.VITE_...` (for Vite projects).

## 5. Sources
- [Firebase Docs](https://firebase.google.com/docs/auth/web/google-signin)
- [Google Identity Docs](https://developers.google.com/identity/protocols/oauth2)
