import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import './i18n/config';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobBoard from './pages/JobBoard';
import JobMap from './pages/JobMap';
import SkillLibrary from './pages/SkillLibrary';
import Community from './pages/Community';
import Profile from './pages/Profile';
import EmployerPage from './pages/EmployerPage';
import Employers from './pages/Employers';
import Notifications from './pages/Notifications';
import ResumeBuilder from './pages/ResumeBuilder';
import NotFound from './pages/NotFound';

// Layout
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

function AppRoutes() {
  const { currentUser, loading } = useAuth();
  
  return (
    <Routes>
      {/* Landing page - show only when not authenticated */}
      <Route path="/" element={loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : currentUser ? <Navigate to="/dashboard" /> : <Landing />} />
      
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/jobs/map" element={<JobMap />} />
        <Route path="/skills" element={<SkillLibrary />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/employer/:id" element={<EmployerPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/resume" element={<ResumeBuilder />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
