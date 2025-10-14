# Deployment Guide

Complete guide to deploying Rojgar to production.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Pros**: Zero config, automatic HTTPS, global CDN, free tier  
**Best for**: Quick deployment, hobby projects, production apps

#### Steps:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/rojgar.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com/
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Add Environment Variables**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env`:
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     VITE_FIREBASE_MEASUREMENT_ID
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live at `https://your-app.vercel.app`

5. **Update Firebase**:
   - Add your Vercel domain to Firebase authorized domains
   - Firebase Console → Authentication → Settings → Authorized domains

#### Continuous Deployment:
Every push to `main` branch automatically deploys!

---

### Option 2: Netlify

**Pros**: Great DX, form handling, serverless functions  
**Best for**: Static sites with serverless needs

#### Steps:

1. **Push to GitHub** (same as Vercel)

2. **Deploy to Netlify**:
   - Go to https://www.netlify.com/
   - Click "New site from Git"
   - Connect to GitHub and select repository

3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Environment Variables**:
   - Site settings → Build & deploy → Environment
   - Add all Firebase variables

5. **Deploy**:
   - Click "Deploy site"
   - Your app is live at `https://your-app.netlify.app`

---

### Option 3: Firebase Hosting

**Pros**: Integrated with Firebase services, fast CDN  
**Best for**: Apps already using Firebase

#### Steps:

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Initialize Hosting**:
   ```bash
   firebase init hosting
   ```
   
   Select:
   - Use existing project (your Firebase project)
   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub deploys: `No` (or Yes if you want CI/CD)

4. **Build**:
   ```bash
   npm run build
   ```

5. **Deploy**:
   ```bash
   firebase deploy --only hosting
   ```

6. **Your app is live**:
   ```
   https://your-project-id.web.app
   ```

#### Custom Domain:
```bash
firebase hosting:channel:deploy production --expires 30d
```

---

### Option 4: AWS Amplify

**Pros**: AWS integration, scalable  
**Best for**: Enterprise apps, AWS ecosystem

#### Steps:

1. Push to GitHub
2. Go to AWS Amplify Console
3. Connect repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Add environment variables
6. Deploy

---

## 🔐 Production Checklist

### Before Deploying:

- [ ] **Environment Variables**: All Firebase keys configured
- [ ] **Firebase Rules**: Update Firestore and Storage rules
- [ ] **API Keys**: Restrict Firebase API key to your domain
- [ ] **Authentication**: Configure OAuth redirect URLs
- [ ] **Error Tracking**: Add Sentry or similar (optional)
- [ ] **Analytics**: Configure Google Analytics (optional)
- [ ] **Performance**: Run Lighthouse audit
- [ ] **SEO**: Add meta tags in `index.html`
- [ ] **Favicon**: Replace default favicon
- [ ] **404 Page**: Verify NotFound page works

### Firebase Security Rules:

#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /user_profiles/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    // Jobs
    match /jobs/{jobId} {
      allow read: if true;
      allow create: if request.auth != null && 
                      request.auth.token.role == 'recruiter';
      allow update, delete: if request.auth != null && 
                               resource.data.employerId == request.auth.uid;
    }
    
    // Skills
    match /skills/{skillId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    
    // Community posts
    match /community_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
    
    // Employers
    match /employers/{employerId} {
      allow read: if true;
      allow write: if request.auth.uid == employerId;
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile_photos/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth.uid == userId &&
                     request.resource.size < 5 * 1024 * 1024 &&
                     request.resource.contentType.matches('image/.*');
    }
    
    match /resumes/{userId}/{fileName} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId &&
                     request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

---

## 🌐 Custom Domain

### Vercel:
1. Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS

### Firebase:
```bash
firebase hosting:channel:deploy production
```
Then add custom domain in Firebase Console.

---

## 📊 Monitoring

### Add Error Tracking (Sentry):

1. **Install**:
   ```bash
   npm install @sentry/react
   ```

2. **Configure** in `src/main.jsx`:
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: import.meta.env.MODE,
   });
   ```

### Add Analytics:

1. **Google Analytics** (already in Firebase)
2. **Vercel Analytics**: Enable in dashboard
3. **Custom events**: Track user actions

---

## 🚀 Performance Optimization

### Before Production:

1. **Build Analysis**:
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

2. **Lighthouse Audit**:
   - Open DevTools → Lighthouse
   - Run audit
   - Fix issues

3. **Image Optimization**:
   - Use WebP format
   - Lazy load images
   - Use CDN for assets

4. **Code Splitting**:
   - Already configured with Vite
   - Lazy load routes if needed

5. **Caching**:
   - Configure service worker (PWA)
   - Set cache headers

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Fails:
- Check Node version (16+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### Firebase Auth Not Working:
- Verify authorized domains in Firebase Console
- Check environment variables
- Ensure OAuth redirect URLs are correct

### Blank Page After Deploy:
- Check browser console for errors
- Verify base URL in `vite.config.js`
- Check routing configuration

### Slow Performance:
- Enable gzip compression
- Use CDN for assets
- Optimize images
- Enable caching

---

## 📱 PWA (Progressive Web App)

To make Rojgar installable:

1. **Install Vite PWA Plugin**:
   ```bash
   npm install vite-plugin-pwa -D
   ```

2. **Configure** in `vite.config.js`:
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'
   
   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'Rojgar - Jobs Near You',
           short_name: 'Rojgar',
           description: 'Localized job and skill ecosystem',
           theme_color: '#0A66C2',
           icons: [
             {
               src: '/icon-192.png',
               sizes: '192x192',
               type: 'image/png'
             },
             {
               src: '/icon-512.png',
               sizes: '512x512',
               type: 'image/png'
             }
           ]
         }
       })
     ]
   })
   ```

---

## ✅ Post-Deployment

1. **Test all features** on production
2. **Monitor errors** in Sentry
3. **Check analytics** for user behavior
4. **Gather feedback** from users
5. **Iterate and improve**

---

**Your Rojgar app is now live! 🎉**
