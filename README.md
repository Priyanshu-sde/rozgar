# Rojgar - Jobs Near You

A LinkedIn-inspired, localized job and skill ecosystem built with React, Vite, Tailwind CSS, and Firebase. Rojgar connects job seekers with opportunities in their region, provides AI-curated skill resources, and fosters a community for professional growth.

## 🚀 Features

### Core Features
- **🔐 Authentication**: Email/Password and Google OAuth via Firebase Auth
- **💼 Job Board**: Browse jobs with advanced filters (location, skills, experience, type)
- **🗺️ Map View**: Interactive map showing job locations with markers
- **📚 Skill Library**: AI-sourced and community-sourced learning resources
- **👥 Community**: Post projects, share experiences, like and comment
- **🏢 Employer Profiles**: Verified employer pages with open positions
- **👤 User Profiles**: Public profiles with badges, skills, and projects
- **🔔 Notifications**: Real-time job alerts and activity notifications
- **📄 Resume Builder**: Client-side resume generation (placeholder)
- **🌍 Multilingual**: English and Hindi support via react-i18next

### Localized Features
- **📍 Location-based Search**: Filter jobs by city, district, pincode
- **📏 Distance Calculation**: "Jobs near me" with radius filter
- **🎯 Local-first**: Toggle to show only local opportunities
- **🗺️ Regional Insights**: Trending skills in your area

### AI Agent Simulation
- **🤖 Job Aggregation**: Simulated AI agent that periodically adds jobs
- **📊 Trend Analysis**: Regional job market insights
- **🎓 Skill Curation**: Automated skill resource recommendations
- **💡 Personalized Recommendations**: Job matching based on profile

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Firebase account (for production)
- Modern web browser

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd /home/priyanshu/code/projects/rojgar
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Firebase Setup

#### Get Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General > Your apps
4. Click "Add app" > Web (</>) icon
5. Register app and copy the configuration
6. Paste values into `.env` file

#### Enable Authentication:
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Email/Password"
3. Enable "Google" provider
4. Add your domain to authorized domains

#### Create Firestore Database:
1. Go to Firestore Database > Create database
2. Start in **test mode** (for development)
3. Choose a location close to your users

#### Set up Storage:
1. Go to Storage > Get started
2. Start in **test mode** (for development)

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📦 Project Structure

```
rojgar/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Badge.jsx
│   │   ├── EmployerCard.jsx
│   │   ├── JobCard.jsx
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PostCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── SkillCard.jsx
│   ├── contexts/            # React Context providers
│   │   ├── AppContext.jsx
│   │   └── AuthContext.jsx
│   ├── i18n/                # Internationalization
│   │   ├── config.js
│   │   └── locales/
│   │       ├── en.json
│   │       └── hi.json
│   ├── mocks/               # Mock data and seeding
│   │   └── seed.js
│   ├── pages/               # Page components
│   │   ├── Community.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EmployerPage.jsx
│   │   ├── Employers.jsx
│   │   ├── JobBoard.jsx
│   │   ├── JobMap.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── Signup.jsx
│   │   └── SkillLibrary.jsx
│   ├── utils/               # Utility functions
│   │   ├── aiAgent.js       # AI agent simulation
│   │   ├── comm.js          # SMS/WhatsApp placeholders
│   │   ├── firebase.js      # Firebase configuration
│   │   └── helpers.js       # Helper functions
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── .env.example             # Environment variables template
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🎯 Usage

### First Time Setup

1. **Start the app**: `npm run dev`
2. **Sign up**: Create an account or use Google Sign-In
3. **Explore**: The app will automatically seed mock data on first load

### Mock Data

The app uses localStorage for development. Mock data includes:
- 20 user profiles
- 50+ jobs (AI-sourced and recruiter-posted)
- 15 employers
- 10 skill resources
- 30 community posts

To reset mock data, open browser console and run:
```javascript
localStorage.clear()
```
Then refresh the page.

### Key Features to Test

1. **Job Search**:
   - Go to Jobs page
   - Use filters (location, job type, experience)
   - Toggle "Local Only" to see nearby jobs
   - Click "Show Map" for map view

2. **Skill Library**:
   - Browse AI-sourced and community skills
   - Mark skills as "In Progress"
   - Complete skills to earn badges
   - Badges appear on your profile

3. **Community**:
   - Create posts with title, description, tags
   - Like and comment on posts
   - Click usernames to view profiles

4. **Profile**:
   - View your profile or others' profiles
   - See badges, skills, and activity
   - Edit your profile (placeholder)

5. **Language Toggle**:
   - Click globe icon in navbar
   - Switch between English and Hindi

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding New Features

#### Add a new page:
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Sidebar.jsx`
4. Add translations in `src/i18n/locales/`

#### Add new translations:
1. Edit `src/i18n/locales/en.json`
2. Edit `src/i18n/locales/hi.json`
3. Use in components: `const { t } = useTranslation(); t('key.path')`

### Firestore Collections Schema

```javascript
// user_profiles
{
  id: string,
  displayName: string,
  userId: string,
  email: string,
  role: 'job_seeker' | 'recruiter',
  location: { city, district, state, pincode, lat, lng },
  headline: string,
  bio: string,
  photoURL: string,
  badges: Array,
  skills: Array,
  phone: string,
  notificationPreferences: Object,
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// jobs
{
  id: string,
  title: string,
  description: string,
  employerId: string,
  employerName: string,
  city: string,
  district: string,
  pincode: string,
  lat: number,
  lng: number,
  skillTags: Array,
  experienceLevel: 'entry' | 'mid' | 'senior',
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance',
  source: 'recruiter' | 'agent',
  salary: string,
  createdAt: Timestamp,
  expiresAt: Timestamp,
  metadata: Object
}

// skills
{
  id: string,
  title: string,
  description: string,
  source: 'agent' | 'community',
  url: string,
  category: string,
  createdByUserId: string (optional),
  rating: number,
  enrollments: number,
  metadata: Object,
  createdAt: Timestamp
}

// community_posts
{
  id: string,
  userId: string,
  userName: string,
  userPhoto: string,
  userHeadline: string,
  title: string,
  description: string,
  skillTags: Array,
  link: string (optional),
  likesCount: number,
  comments: Array,
  createdAt: Timestamp
}

// employers
{
  id: string,
  name: string,
  logo: string,
  description: string,
  industry: string,
  website: string,
  email: string,
  phone: string,
  address: Object,
  verified: boolean,
  employeeCount: string,
  foundedYear: number,
  openJobs: number,
  createdAt: Timestamp
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Netlify

1. Push code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. New site from Git
4. Add environment variables
5. Build command: `npm run build`
6. Publish directory: `dist`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔐 Security Notes

### For Production:

1. **Firebase Rules**: Update Firestore and Storage rules
   ```javascript
   // Firestore rules example
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /user_profiles/{userId} {
         allow read: if true;
         allow write: if request.auth.uid == userId;
       }
       match /jobs/{jobId} {
         allow read: if true;
         allow create: if request.auth != null;
       }
     }
   }
   ```

2. **Environment Variables**: Never commit `.env` file
3. **API Keys**: Restrict Firebase API keys to your domain
4. **Authentication**: Enable email verification for production

## 📱 SMS/WhatsApp Integration

The app includes placeholder functions for SMS and WhatsApp notifications in `src/utils/comm.js`.

### To implement:

1. **Choose Provider**: MSG91 (India), Twilio (Global), AWS SNS
2. **Sign up** and get API credentials
3. **Add to .env**:
   ```env
   VITE_SMS_API_KEY=your_api_key
   VITE_SMS_SENDER_ID=ROJGAR
   ```
4. **Implement in Cloud Function** (recommended for security):
   ```javascript
   // Firebase Cloud Function example
   exports.sendJobAlert = functions.firestore
     .document('jobs/{jobId}')
     .onCreate(async (snap, context) => {
       const job = snap.data();
       // Send SMS to matching users
       // Use MSG91 or Twilio API
     });
   ```

## 🤖 AI Agent Production Implementation

Current implementation is a simulation. For production:

### Option 1: Firebase Cloud Functions

```javascript
// Scheduled function to scrape jobs
exports.scrapeJobs = functions.pubsub
  .schedule('every 6 hours')
  .onRun(async (context) => {
    // Scrape job boards (Naukri, Indeed, LinkedIn)
    // Parse and store in Firestore
    // Send notifications to matching users
  });
```

### Option 2: Separate Microservice

- Deploy Python/Node.js scraper on AWS Lambda, Google Cloud Run, or Heroku
- Use Puppeteer/Selenium for scraping
- Store results in Firestore
- Trigger via cron job

### Recommended Tools:
- **Scraping**: Puppeteer, Cheerio, BeautifulSoup
- **Job APIs**: Adzuna API, Indeed API, LinkedIn API
- **ML Matching**: TensorFlow.js, scikit-learn

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up with email
- [ ] Sign in with Google
- [ ] Browse jobs
- [ ] Filter jobs by location
- [ ] View job on map
- [ ] Browse skills
- [ ] Mark skill as completed
- [ ] Create community post
- [ ] Like and comment on post
- [ ] View user profile
- [ ] View employer page
- [ ] Check notifications
- [ ] Switch language (EN/HI)
- [ ] Test on mobile

### Automated Tests (TODO)

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email: support@rojgar.example.com (placeholder)

## 🎉 Success Criteria

✅ App boots with `npm install` && `npm run dev`  
✅ Authentication flows work (Google + Email)  
✅ Job Board displays seeded jobs with filters  
✅ Map View shows job markers  
✅ Profile pages display user info and badges  
✅ Skill Library supports progress tracking  
✅ Community feed allows posting and commenting  
✅ Multilingual support (EN/HI) works  
✅ Responsive design on mobile and desktop  
✅ Mock data seeds automatically  

## 🚧 TODO for Production

- [ ] Implement real Firebase integration (replace mock data)
- [ ] Add SMS/WhatsApp notifications
- [ ] Implement actual AI job scraping
- [ ] Complete resume builder with PDF export
- [ ] Add image upload for profiles
- [ ] Implement job application flow
- [ ] Add employer dashboard
- [ ] Implement real-time chat/messaging
- [ ] Add payment integration for premium features
- [ ] Implement analytics and tracking
- [ ] Add comprehensive error handling
- [ ] Write unit and integration tests
- [ ] Optimize performance and bundle size
- [ ] Add PWA support for offline access
- [ ] Implement push notifications (FCM)

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Leaflet](https://react-leaflet.js.org/)
- [i18next](https://www.i18next.com/)

---

**Built with ❤️ for the Indian job market**

*Rojgar - Connecting talent with opportunity, one locality at a time.*
