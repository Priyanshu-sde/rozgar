import { createContext, useContext, useReducer, useEffect } from 'react';
import { getMockData, addMockJob, addMockPost } from '../mocks/seed';
import { generateAIJobs } from '../utils/aiAgent';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Initial state
const initialState = {
  jobs: [],
  skills: [],
  communityPosts: [],
  employers: [],
  notifications: [],
  filters: {
    location: null,
    radius: 50,
    jobType: [],
    experienceLevel: [],
    source: [],
    skills: [],
    localOnly: false
  },
  searchQuery: '',
  loading: false,
  error: null
};

// Action types
const ActionTypes = {
  SET_JOBS: 'SET_JOBS',
  ADD_JOB: 'ADD_JOB',
  SET_SKILLS: 'SET_SKILLS',
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  SET_EMPLOYERS: 'SET_EMPLOYERS',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LIKE_POST: 'LIKE_POST',
  ADD_COMMENT: 'ADD_COMMENT'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_JOBS:
      return { ...state, jobs: action.payload, loading: false };
    
    case ActionTypes.ADD_JOB:
      return { ...state, jobs: [action.payload, ...state.jobs] };
    
    case ActionTypes.SET_SKILLS:
      return { ...state, skills: action.payload, loading: false };
    
    case ActionTypes.SET_POSTS:
      return { ...state, communityPosts: action.payload, loading: false };
    
    case ActionTypes.ADD_POST:
      return { ...state, communityPosts: [action.payload, ...state.communityPosts] };
    
    case ActionTypes.SET_EMPLOYERS:
      return { ...state, employers: action.payload, loading: false };
    
    case ActionTypes.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    
    case ActionTypes.ADD_NOTIFICATION:
      return { ...state, notifications: [action.payload, ...state.notifications] };
    
    case ActionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    
    case ActionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case ActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.LIKE_POST:
      return {
        ...state,
        communityPosts: state.communityPosts.map(post =>
          post.id === action.payload
            ? { ...post, likesCount: post.likesCount + 1 }
            : post
        )
      };
    
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        communityPosts: state.communityPosts.map(post =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        )
      };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      const mockData = getMockData();
      
      dispatch({ type: ActionTypes.SET_JOBS, payload: mockData.jobs });
      dispatch({ type: ActionTypes.SET_SKILLS, payload: mockData.skills });
      dispatch({ type: ActionTypes.SET_POSTS, payload: mockData.communityPosts });
      dispatch({ type: ActionTypes.SET_EMPLOYERS, payload: mockData.employers });
      
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.error('Error loading data:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  // Simulate AI agent adding new jobs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newJobs = generateAIJobs(1);
      if (newJobs.length > 0) {
        const job = newJobs[0];
        addMockJob(job);
        dispatch({ type: ActionTypes.ADD_JOB, payload: job });
        
        // Add notification
        dispatch({
          type: ActionTypes.ADD_NOTIFICATION,
          payload: {
            id: `notif_${Date.now()}`,
            type: 'job_alert',
            title: 'New Job Alert',
            message: `New ${job.title} position in ${job.city}`,
            icon: 'Briefcase',
            read: false,
            link: `/jobs/${job.id}`,
            createdAt: new Date()
          }
        });
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const createJob = (jobData) => {
    const job = {
      id: `job_${Date.now()}`,
      ...jobData,
      source: 'recruiter',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addMockJob(job);
    dispatch({ type: ActionTypes.ADD_JOB, payload: job });
    return job;
  };

  const createPost = (postData) => {
    const post = {
      id: `post_${Date.now()}`,
      ...postData,
      likesCount: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addMockPost(post);
    dispatch({ type: ActionTypes.ADD_POST, payload: post });
    return post;
  };

  const likePost = (postId) => {
    dispatch({ type: ActionTypes.LIKE_POST, payload: postId });
    
    // Update in localStorage
    const posts = JSON.parse(localStorage.getItem('mock_posts') || '[]');
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index].likesCount += 1;
      localStorage.setItem('mock_posts', JSON.stringify(posts));
    }
  };

  const addComment = (postId, comment) => {
    dispatch({
      type: ActionTypes.ADD_COMMENT,
      payload: { postId, comment }
    });
    
    // Update in localStorage
    const posts = JSON.parse(localStorage.getItem('mock_posts') || '[]');
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index].comments.push(comment);
      localStorage.setItem('mock_posts', JSON.stringify(posts));
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query });
  };

  const markNotificationRead = (notificationId) => {
    dispatch({ type: ActionTypes.MARK_NOTIFICATION_READ, payload: notificationId });
  };

  const addNotification = (notification) => {
    dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
  };

  const value = {
    ...state,
    createJob,
    createPost,
    likePost,
    addComment,
    setFilters,
    setSearchQuery,
    markNotificationRead,
    addNotification,
    refreshData: loadData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
