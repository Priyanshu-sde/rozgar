# Rojgar - Quick Start Guide

Get Rojgar running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

That's it! The app will open at `http://localhost:3000`

## 🎯 First Steps

### Without Firebase (Development Mode)
The app works out of the box with mock data stored in localStorage.

1. **Sign Up**: Create an account with any email/password
2. **Explore**: Browse jobs, skills, and community posts
3. **Test Features**: All features work with mock data

### With Firebase (Production Mode)

1. **Create Firebase Project**:
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Follow the setup wizard

2. **Get Configuration**:
   - In Firebase Console → Project Settings → General
   - Scroll to "Your apps" → Click Web icon (</>)
   - Copy the config object

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and paste your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-app
   VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

4. **Enable Authentication**:
   - Firebase Console → Authentication → Sign-in method
   - Enable "Email/Password"
   - Enable "Google"

5. **Create Firestore Database**:
   - Firebase Console → Firestore Database
   - Click "Create database"
   - Start in test mode
   - Choose a location

6. **Restart App**:
   ```bash
   npm run dev
   ```

## 📱 Test Features

### Job Board
- Navigate to "Jobs" in sidebar
- Use filters to search
- Click "Show Map" for map view
- Toggle "Local Only" for nearby jobs

### Skill Library
- Go to "Skill Library"
- Click "View Resource" to open learning materials
- Click "Mark In Progress" to track learning
- Complete skills to earn badges

### Community
- Visit "Community" page
- Click "Create Post" to share
- Like and comment on posts
- Click usernames to view profiles

### Profile
- Click your avatar → Profile
- View your badges and skills
- Edit profile (placeholder)

### Language Switch
- Click globe icon (🌐) in navbar
- Switch between English and Hindi

## 🔧 Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Clear Mock Data
Open browser console and run:
```javascript
localStorage.clear()
```
Then refresh the page.

### Firebase Auth Not Working
1. Check `.env` file has correct values
2. Verify Firebase Auth is enabled
3. Add `localhost:3000` to authorized domains in Firebase Console

### Map Not Loading
1. Check internet connection (map tiles load from OpenStreetMap)
2. Verify Leaflet CSS is loading in browser console

## 📚 Next Steps

- Read full [README.md](./README.md) for detailed documentation
- Explore the codebase in `src/` directory
- Customize colors in `tailwind.config.js`
- Add your own features!

## 🎉 Demo Credentials

For testing without creating an account:

**Email**: demo@rojgar.com  
**Password**: demo123

(Note: These work with mock data only, not with real Firebase)

## 💡 Tips

- **Mock Data**: Automatically seeds 50+ jobs, 20 users, 15 employers
- **Real-time Updates**: AI agent adds new jobs every 5 minutes
- **Responsive**: Test on mobile by resizing browser
- **Offline**: Works offline with localStorage (no Firebase needed)

## 🚀 Deploy to Vercel

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main

# Then deploy
npx vercel
```

Follow the prompts and your app will be live!

---

**Need Help?** Check the main [README.md](./README.md) or open an issue on GitHub.
