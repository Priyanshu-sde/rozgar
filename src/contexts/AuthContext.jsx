import { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  resetPassword
} from '../utils/firebase';
import { getMockData } from '../mocks/seed';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Load or create user profile
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserProfile = async (user) => {
    try {
      // In production, fetch from Firestore
      // const { data } = await getDocument('user_profiles', user.uid);
      
      // For development, use mock data or create new profile
      const mockData = getMockData();
      let profile = mockData.userProfiles.find(p => p.email === user.email);
      
      if (!profile) {
        // Create new profile for this user
        profile = {
          id: user.uid,
          displayName: user.displayName || 'User',
          userId: user.email?.split('@')[0] || 'user',
          email: user.email,
          role: 'job_seeker',
          location: {
            city: 'Lucknow',
            district: 'Lucknow',
            state: 'Uttar Pradesh',
            pincode: '226001',
            lat: 26.8467,
            lng: 80.9462
          },
          headline: 'Looking for opportunities',
          bio: '',
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=0A66C2&color=fff&size=200`,
          badges: [],
          skills: [],
          phone: '',
          notificationPreferences: {
            email: true,
            sms: false,
            push: true,
            whatsapp: false
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Save to localStorage for persistence in dev
        const users = mockData.userProfiles;
        users.push(profile);
        localStorage.setItem('mock_users', JSON.stringify(users));
      }
      
      setUserProfile(profile);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        setError(error);
        return { success: false, error };
      }
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const { user, error } = await signInWithGoogle();
      if (error) {
        setError(error);
        return { success: false, error };
      }
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signup = async (email, password, additionalData = {}) => {
    try {
      setError(null);
      const { user, error } = await signUpWithEmail(email, password);
      if (error) {
        setError(error);
        return { success: false, error };
      }
      
      // Create user profile with additional data
      if (user) {
        const profile = {
          id: user.uid,
          displayName: additionalData.displayName || user.email?.split('@')[0] || 'User',
          userId: additionalData.userId || user.email?.split('@')[0] || 'user',
          email: user.email,
          role: additionalData.role || 'job_seeker',
          location: additionalData.location || {
            city: 'Lucknow',
            district: 'Lucknow',
            state: 'Uttar Pradesh',
            pincode: '226001',
            lat: 26.8467,
            lng: 80.9462
          },
          headline: additionalData.headline || 'Looking for opportunities',
          bio: additionalData.bio || '',
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(additionalData.displayName || 'User')}&background=0A66C2&color=fff&size=200`,
          badges: [],
          skills: additionalData.skills || [],
          phone: additionalData.phone || '',
          notificationPreferences: {
            email: true,
            sms: false,
            push: true,
            whatsapp: false
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Save to mock data
        const mockData = getMockData();
        mockData.userProfiles.push(profile);
        localStorage.setItem('mock_users', JSON.stringify(mockData.userProfiles));
        
        setUserProfile(profile);
      }
      
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { success, error } = await signOutUser();
      if (error) {
        setError(error);
        return { success: false, error };
      }
      setUserProfile(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const { success, error } = await resetPassword(email);
      if (error) {
        setError(error);
        return { success: false, error };
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      setError(null);
      
      // Update in mock data
      const mockData = getMockData();
      const index = mockData.userProfiles.findIndex(p => p.id === userProfile.id);
      if (index !== -1) {
        mockData.userProfiles[index] = {
          ...mockData.userProfiles[index],
          ...updates,
          updatedAt: new Date()
        };
        localStorage.setItem('mock_users', JSON.stringify(mockData.userProfiles));
        setUserProfile(mockData.userProfiles[index]);
      }
      
      // In production, update Firestore
      // await updateDocument('user_profiles', userProfile.id, updates);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    login,
    loginWithGoogle,
    signup,
    logout,
    forgotPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
