/**
 * Mock data seeding utilities
 * 
 * This file provides functions to seed the application with sample data
 * for development and testing purposes.
 * 
 * In production, this would be replaced with actual Firestore data.
 */

import { v4 as uuidv4 } from 'uuid';
import { generateAIJobs, generateAISkills, INDIAN_CITIES } from '../utils/aiAgent';

/**
 * Generate sample user profiles
 */
export const generateUserProfiles = (count = 20) => {
  const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Rajesh', 'Pooja', 'Vikram', 'Anjali', 'Suresh', 'Kavita', 'Arun', 'Deepika', 'Manoj', 'Ritu', 'Sanjay'];
  const lastNames = ['Kumar', 'Sharma', 'Singh', 'Verma', 'Gupta', 'Yadav', 'Patel', 'Mishra', 'Pandey', 'Joshi'];
  const roles = ['job_seeker', 'recruiter'];
  const headlines = [
    'Looking for opportunities in sales',
    'Experienced web developer',
    'Digital marketing professional',
    'Seeking part-time work',
    'Fresh graduate looking for entry-level position',
    'Skilled accountant with 5+ years experience',
    'Graphic designer and creative professional',
    'Customer service expert',
    'Experienced teacher',
    'IT professional'
  ];
  
  const profiles = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const location = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    profiles.push({
      id: uuidv4(),
      displayName: `${firstName} ${lastName}`,
      userId: `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: role,
      location: {
        city: location.city,
        district: location.district,
        state: location.state,
        pincode: location.pincode,
        lat: location.lat,
        lng: location.lng
      },
      headline: headlines[Math.floor(Math.random() * headlines.length)],
      bio: `Passionate professional with experience in various fields. Looking to grow and contribute to a dynamic organization.`,
      photoURL: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0A66C2&color=fff&size=200`,
      badges: generateRandomBadges(),
      skills: generateRandomSkills(),
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      notificationPreferences: {
        email: true,
        sms: Math.random() > 0.5,
        push: true,
        whatsapp: Math.random() > 0.5
      },
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }
  
  return profiles;
};

/**
 * Generate random badges for user
 */
const generateRandomBadges = () => {
  const allBadges = [
    { id: 'web-dev-complete', name: 'Web Development', icon: 'Code', earnedAt: new Date() },
    { id: 'excel-master', name: 'Excel Master', icon: 'FileSpreadsheet', earnedAt: new Date() },
    { id: 'communication-pro', name: 'Communication Pro', icon: 'MessageCircle', earnedAt: new Date() },
    { id: 'sales-champion', name: 'Sales Champion', icon: 'TrendingUp', earnedAt: new Date() },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: 'Megaphone', earnedAt: new Date() }
  ];
  
  const count = Math.floor(Math.random() * 3);
  return allBadges.slice(0, count);
};

/**
 * Generate random skills for user
 */
const generateRandomSkills = () => {
  const allSkills = [
    'Communication', 'MS Office', 'Sales', 'Customer Service', 'Data Entry',
    'Accounting', 'Tally', 'Excel', 'HTML', 'CSS', 'JavaScript', 'React',
    'Digital Marketing', 'SEO', 'Social Media', 'Photoshop', 'Graphic Design',
    'Teaching', 'Leadership', 'Time Management', 'Problem Solving'
  ];
  
  const count = 3 + Math.floor(Math.random() * 5);
  const shuffled = allSkills.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Generate sample employers
 */
export const generateEmployers = (count = 15) => {
  const companyNames = [
    'Tech Solutions Pvt Ltd', 'Digital Agency India', 'Retail Mart',
    'City Hospital', 'Green Foods', 'Construction Co.',
    'Fashion Boutique', 'Auto Parts Store', 'Finance Consultants',
    'IT Services', 'Manufacturing Unit', 'Education Institute',
    'Healthcare Clinic', 'Logistics Company', 'Real Estate Developers'
  ];
  
  const employers = [];
  
  for (let i = 0; i < count; i++) {
    const location = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
    const companyName = companyNames[i % companyNames.length];
    
    employers.push({
      id: uuidv4(),
      name: companyName,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=random&size=200`,
      description: `Leading company in our sector, committed to excellence and employee growth.`,
      industry: ['Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Services'][Math.floor(Math.random() * 5)],
      website: `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      email: `hr@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: {
        street: `${Math.floor(Math.random() * 500) + 1}, Main Road`,
        city: location.city,
        district: location.district,
        state: location.state,
        pincode: location.pincode,
        lat: location.lat,
        lng: location.lng
      },
      verified: Math.random() > 0.3,
      employeeCount: ['1-10', '11-50', '51-200', '201-500', '500+'][Math.floor(Math.random() * 5)],
      foundedYear: 2000 + Math.floor(Math.random() * 24),
      openJobs: Math.floor(Math.random() * 10),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }
  
  return employers;
};

/**
 * Generate sample community posts
 */
export const generateCommunityPosts = (userProfiles, count = 30) => {
  const postTitles = [
    'Just completed my web development course!',
    'Looking for freelance opportunities',
    'Tips for acing job interviews',
    'My journey from job seeker to employed',
    'Best resources for learning digital marketing',
    'How I improved my communication skills',
    'Sharing my portfolio website',
    'Question about salary negotiation',
    'Excited to start my new job!',
    'Recommendations for online courses',
    'My experience with remote work',
    'How to build a strong LinkedIn profile',
    'Career advice for fresh graduates',
    'Freelancing vs Full-time: My thoughts',
    'Skills that helped me get hired'
  ];
  
  const posts = [];
  
  for (let i = 0; i < count; i++) {
    const user = userProfiles[Math.floor(Math.random() * userProfiles.length)];
    const title = postTitles[Math.floor(Math.random() * postTitles.length)];
    const likesCount = Math.floor(Math.random() * 50);
    const commentsCount = Math.floor(Math.random() * 20);
    
    // Generate comments
    const comments = [];
    for (let j = 0; j < commentsCount; j++) {
      const commenter = userProfiles[Math.floor(Math.random() * userProfiles.length)];
      comments.push({
        id: uuidv4(),
        userId: commenter.id,
        userName: commenter.displayName,
        userPhoto: commenter.photoURL,
        text: ['Great post!', 'Thanks for sharing!', 'Very helpful', 'I agree', 'Interesting perspective'][Math.floor(Math.random() * 5)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      });
    }
    
    posts.push({
      id: uuidv4(),
      userId: user.id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userHeadline: user.headline,
      title: title,
      description: `This is a detailed post about ${title.toLowerCase()}. I wanted to share my experience and insights with the community. Feel free to ask questions or share your thoughts!`,
      skillTags: user.skills.slice(0, 3),
      link: Math.random() > 0.7 ? 'https://example.com/resource' : null,
      likesCount: likesCount,
      comments: comments,
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }
  
  return posts.sort((a, b) => b.createdAt - a.createdAt);
};

/**
 * Generate sample notifications
 */
export const generateNotifications = (userId, count = 10) => {
  const notificationTypes = [
    { type: 'job_alert', message: 'New job matching your profile', icon: 'Briefcase' },
    { type: 'application_update', message: 'Your application was viewed', icon: 'Eye' },
    { type: 'skill_completed', message: 'Congratulations! You earned a badge', icon: 'Award' },
    { type: 'post_like', message: 'Someone liked your post', icon: 'Heart' },
    { type: 'post_comment', message: 'New comment on your post', icon: 'MessageCircle' },
    { type: 'connection', message: 'New connection request', icon: 'UserPlus' },
    { type: 'message', message: 'You have a new message', icon: 'Mail' }
  ];
  
  const notifications = [];
  
  for (let i = 0; i < count; i++) {
    const notif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    notifications.push({
      id: uuidv4(),
      userId: userId,
      type: notif.type,
      title: notif.message,
      message: `${notif.message}. Click to view details.`,
      icon: notif.icon,
      read: Math.random() > 0.5,
      link: '/dashboard',
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    });
  }
  
  return notifications.sort((a, b) => b.createdAt - a.createdAt);
};

/**
 * Seed all mock data
 */
export const seedAllData = () => {
  console.log('[Seed] Generating mock data...');
  
  // Generate data
  const userProfiles = generateUserProfiles(20);
  const employers = generateEmployers(15);
  const jobs = generateAIJobs(50);
  const skills = generateAISkills();
  const communityPosts = generateCommunityPosts(userProfiles, 30);
  
  // Store in localStorage for persistence during development
  localStorage.setItem('mock_users', JSON.stringify(userProfiles));
  localStorage.setItem('mock_employers', JSON.stringify(employers));
  localStorage.setItem('mock_jobs', JSON.stringify(jobs));
  localStorage.setItem('mock_skills', JSON.stringify(skills));
  localStorage.setItem('mock_posts', JSON.stringify(communityPosts));
  
  console.log('[Seed] Mock data generated and stored:');
  console.log(`- ${userProfiles.length} user profiles`);
  console.log(`- ${employers.length} employers`);
  console.log(`- ${jobs.length} jobs`);
  console.log(`- ${skills.length} skills`);
  console.log(`- ${communityPosts.length} community posts`);
  
  return {
    userProfiles,
    employers,
    jobs,
    skills,
    communityPosts
  };
};

/**
 * Get mock data from localStorage
 */
export const getMockData = () => {
  try {
    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    const employers = JSON.parse(localStorage.getItem('mock_employers') || '[]');
    const jobs = JSON.parse(localStorage.getItem('mock_jobs') || '[]');
    const skills = JSON.parse(localStorage.getItem('mock_skills') || '[]');
    const posts = JSON.parse(localStorage.getItem('mock_posts') || '[]');
    
    // If no data exists, seed it
    if (users.length === 0) {
      return seedAllData();
    }
    
    return {
      userProfiles: users,
      employers,
      jobs,
      skills,
      communityPosts: posts
    };
  } catch (error) {
    console.error('[Seed] Error loading mock data:', error);
    return seedAllData();
  }
};

/**
 * Clear all mock data
 */
export const clearMockData = () => {
  localStorage.removeItem('mock_users');
  localStorage.removeItem('mock_employers');
  localStorage.removeItem('mock_jobs');
  localStorage.removeItem('mock_skills');
  localStorage.removeItem('mock_posts');
  console.log('[Seed] Mock data cleared');
};

/**
 * Add new job to mock data
 */
export const addMockJob = (job) => {
  const jobs = JSON.parse(localStorage.getItem('mock_jobs') || '[]');
  jobs.unshift(job);
  localStorage.setItem('mock_jobs', JSON.stringify(jobs));
  return job;
};

/**
 * Add new post to mock data
 */
export const addMockPost = (post) => {
  const posts = JSON.parse(localStorage.getItem('mock_posts') || '[]');
  posts.unshift(post);
  localStorage.setItem('mock_posts', JSON.stringify(posts));
  return post;
};

/**
 * Update user profile in mock data
 */
export const updateMockUserProfile = (userId, updates) => {
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates, updatedAt: new Date() };
    localStorage.setItem('mock_users', JSON.stringify(users));
    return users[index];
  }
  return null;
};

export default {
  seedAllData,
  getMockData,
  clearMockData,
  generateUserProfiles,
  generateEmployers,
  generateCommunityPosts,
  generateNotifications,
  addMockJob,
  addMockPost,
  updateMockUserProfile
};
