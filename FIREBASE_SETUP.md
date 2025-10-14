# Firebase Setup Instructions

## Quick Fix for "API Key Not Valid" Error

The error you're seeing means the environment variables aren't being loaded. Here's how to fix it:

### Step 1: Create .env File

You need to manually create a `.env` file in the project root:

```bash
cp .env.example .env
```

Or create it manually with these contents (your credentials are already in `.env.example`):

```env
VITE_FIREBASE_API_KEY=AIzaSyCzZdhPjucVdiWE4Z9P-VSP2fWWynET2M0
VITE_FIREBASE_AUTH_DOMAIN=rojgar-738ca.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rojgar-738ca
VITE_FIREBASE_STORAGE_BUCKET=rojgar-738ca.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=352444988957
VITE_FIREBASE_APP_ID=1:352444988957:web:3505ff65f6ad146fc150f4
VITE_FIREBASE_MEASUREMENT_ID=G-7W9XMK98QZ

VITE_MAP_DEFAULT_CENTER_LAT=26.8467
VITE_MAP_DEFAULT_CENTER_LNG=80.9462
VITE_MAP_DEFAULT_ZOOM=10
```

### Step 2: Restart Dev Server

**IMPORTANT:** Vite only loads environment variables when it starts. You MUST restart:

```bash
# Stop the current server (Ctrl+C)
# Then start again:
npm run dev
```

### Step 3: Verify Firebase Console Settings

Make sure these are enabled in your Firebase Console:

1. **Authentication**:
   - Go to: https://console.firebase.google.com/project/rojgar-738ca/authentication
   - Enable "Email/Password" sign-in method
   - Enable "Google" sign-in method
   - Add authorized domains:
     - `localhost`
     - Your production domain (when deploying)

2. **Firestore Database**:
   - Go to: https://console.firebase.google.com/project/rojgar-738ca/firestore
   - Create database if not exists
   - Start in **test mode** for development
   - Location: Choose closest to your users (e.g., asia-south1)

3. **Storage** (Optional, for profile photos):
   - Go to: https://console.firebase.google.com/project/rojgar-738ca/storage
   - Get started
   - Start in **test mode** for development

## Alternative: Use Mock Data (No Firebase Required)

If you don't want to set up Firebase right now, the app works perfectly with mock data!

Just comment out the Firebase initialization in `src/utils/firebase.js`:

```javascript
// Comment out these lines:
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// And use mock implementations instead
export const auth = null;
export const db = null;
export const storage = null;
```

The app will automatically use localStorage-based mock data for all features.

## Troubleshooting

### Error: "API key not valid"
- **Solution**: Create `.env` file and restart dev server

### Error: "Firebase: Error (auth/unauthorized-domain)"
- **Solution**: Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### Error: "Missing or insufficient permissions"
- **Solution**: Update Firestore rules to allow read/write in test mode:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true; // Test mode only!
      }
    }
  }
  ```

### Environment variables not loading
- **Solution**: 
  1. Make sure `.env` file is in project root (same level as `package.json`)
  2. Variable names MUST start with `VITE_`
  3. Restart dev server after creating/editing `.env`

## Security Notes

⚠️ **IMPORTANT**: The credentials in your `.env.example` appear to be real Firebase credentials. 

For production:
1. Restrict API key to your domain in Firebase Console
2. Set proper Firestore security rules
3. Never commit `.env` to git (it's already in `.gitignore`)
4. Use environment variables in your deployment platform (Vercel, Netlify, etc.)

## Testing Authentication

Once Firebase is set up:

1. **Sign up with email**:
   - Go to `/signup`
   - Enter any email/password
   - Should create account and redirect to dashboard

2. **Sign in with Google**:
   - Click "Sign in with Google" button
   - Should open Google OAuth popup
   - After auth, redirects to dashboard

3. **Check Firebase Console**:
   - Go to Authentication → Users
   - You should see your newly created user

## Need Help?

- Check Firebase Console for errors
- Look at browser console for detailed error messages
- Verify all environment variables are spelled correctly
- Make sure you restarted the dev server after creating `.env`

---

**Quick Commands:**

```bash
# Create .env file
cp .env.example .env

# Restart dev server
npm run dev

# Check if .env exists
ls -la .env

# View environment variables (in browser console)
console.log(import.meta.env)
```
