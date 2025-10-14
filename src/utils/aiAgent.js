/**
 * AI Agent Simulation Module
 * 
 * This module simulates an AI agent that:
 * 1. Scrapes and aggregates job listings from various sources
 * 2. Curates skill resources from online platforms
 * 3. Analyzes regional job trends
 * 4. Provides personalized job recommendations
 * 
 * TODO: Replace with actual serverless implementation (Firebase Cloud Functions, AWS Lambda, etc.)
 * 
 * Production implementation would:
 * - Run scheduled jobs to scrape job boards (Naukri, Indeed, LinkedIn, etc.)
 * - Use ML models for job matching and recommendations
 * - Aggregate skill resources from Coursera, Udemy, YouTube, etc.
 * - Analyze local job market trends
 */

import { v4 as uuidv4 } from 'uuid';

// Sample Indian cities with coordinates
export const INDIAN_CITIES = [
  { city: 'Sultanpur', district: 'Sultanpur', state: 'Uttar Pradesh', pincode: '228001', lat: 26.2647, lng: 82.0736 },
  { city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001', lat: 26.8467, lng: 80.9462 },
  { city: 'Kanpur', district: 'Kanpur', state: 'Uttar Pradesh', pincode: '208001', lat: 26.4499, lng: 80.3319 },
  { city: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', lat: 25.3176, lng: 82.9739 },
  { city: 'Allahabad', district: 'Prayagraj', state: 'Uttar Pradesh', pincode: '211001', lat: 25.4358, lng: 81.8463 },
  { city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', pincode: '282001', lat: 27.1767, lng: 78.0081 },
  { city: 'Meerut', district: 'Meerut', state: 'Uttar Pradesh', pincode: '250001', lat: 28.9845, lng: 77.7064 },
  { city: 'Bareilly', district: 'Bareilly', state: 'Uttar Pradesh', pincode: '243001', lat: 28.3670, lng: 79.4304 },
  { city: 'Aligarh', district: 'Aligarh', state: 'Uttar Pradesh', pincode: '202001', lat: 27.8974, lng: 78.0880 },
  { city: 'Gorakhpur', district: 'Gorakhpur', state: 'Uttar Pradesh', pincode: '273001', lat: 26.7606, lng: 83.3732 },
];

// Sample job titles and descriptions
const JOB_TEMPLATES = [
  {
    title: 'Sales Executive',
    description: 'Looking for energetic sales professionals to join our team. Good communication skills required.',
    skillTags: ['Sales', 'Communication', 'Customer Service'],
    experienceLevel: 'entry',
    jobType: 'full-time'
  },
  {
    title: 'Delivery Partner',
    description: 'Join our delivery team. Own vehicle preferred. Flexible working hours.',
    skillTags: ['Driving', 'Time Management', 'Customer Service'],
    experienceLevel: 'entry',
    jobType: 'part-time'
  },
  {
    title: 'Computer Operator',
    description: 'Data entry and basic computer operations. MS Office knowledge required.',
    skillTags: ['MS Office', 'Data Entry', 'Typing'],
    experienceLevel: 'entry',
    jobType: 'full-time'
  },
  {
    title: 'Retail Store Manager',
    description: 'Manage daily store operations, inventory, and staff. Retail experience required.',
    skillTags: ['Retail Management', 'Leadership', 'Inventory Management'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Accountant',
    description: 'Handle accounts, taxation, and financial reporting. Tally knowledge required.',
    skillTags: ['Accounting', 'Tally', 'GST', 'Excel'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Web Developer',
    description: 'Develop and maintain websites. Knowledge of HTML, CSS, JavaScript required.',
    skillTags: ['HTML', 'CSS', 'JavaScript', 'React', 'Web Development'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Graphic Designer',
    description: 'Create visual content for marketing and branding. Adobe Creative Suite experience required.',
    skillTags: ['Photoshop', 'Illustrator', 'Graphic Design', 'Creativity'],
    experienceLevel: 'entry',
    jobType: 'full-time'
  },
  {
    title: 'Customer Support Executive',
    description: 'Handle customer queries via phone and email. Good communication skills essential.',
    skillTags: ['Communication', 'Customer Service', 'Problem Solving'],
    experienceLevel: 'entry',
    jobType: 'full-time'
  },
  {
    title: 'Digital Marketing Executive',
    description: 'Manage social media, SEO, and online campaigns. Experience with Google Ads preferred.',
    skillTags: ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Electrician',
    description: 'Installation and maintenance of electrical systems. ITI certification preferred.',
    skillTags: ['Electrical Work', 'Maintenance', 'Safety'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Plumber',
    description: 'Plumbing installation and repair work. Experience in residential and commercial projects.',
    skillTags: ['Plumbing', 'Maintenance', 'Problem Solving'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Teacher',
    description: 'Teach students in primary/secondary school. B.Ed or relevant qualification required.',
    skillTags: ['Teaching', 'Communication', 'Subject Knowledge'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Nurse',
    description: 'Provide patient care in hospital/clinic. GNM/B.Sc Nursing required.',
    skillTags: ['Nursing', 'Patient Care', 'Medical Knowledge'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  },
  {
    title: 'Security Guard',
    description: 'Ensure safety and security of premises. Night shifts available.',
    skillTags: ['Security', 'Vigilance', 'Physical Fitness'],
    experienceLevel: 'entry',
    jobType: 'full-time'
  },
  {
    title: 'Cook/Chef',
    description: 'Prepare meals in restaurant/hotel. Experience in Indian cuisine preferred.',
    skillTags: ['Cooking', 'Food Preparation', 'Hygiene'],
    experienceLevel: 'mid',
    jobType: 'full-time'
  }
];

// Sample company names
const COMPANY_NAMES = [
  'Local Retail Store', 'Tech Solutions Pvt Ltd', 'City Hospital', 'Green Mart',
  'Digital Agency', 'Construction Co.', 'Food Paradise', 'Bright Future School',
  'Quick Delivery Services', 'Finance Consultants', 'Home Services', 'Fashion Boutique',
  'Auto Parts Store', 'Medical Clinic', 'IT Services', 'Manufacturing Unit'
];

// Sample skill resources
const SKILL_RESOURCES = [
  {
    title: 'Basic Computer Skills',
    description: 'Learn MS Office, email, and internet basics. Perfect for beginners.',
    category: 'Computer Skills',
    url: 'https://www.youtube.com/results?search_query=basic+computer+skills+hindi',
    source: 'agent'
  },
  {
    title: 'Spoken English Course',
    description: 'Improve your English speaking and communication skills.',
    category: 'Language',
    url: 'https://www.youtube.com/results?search_query=spoken+english+course',
    source: 'agent'
  },
  {
    title: 'Tally ERP Training',
    description: 'Complete Tally course for accounting and GST.',
    category: 'Accounting',
    url: 'https://www.youtube.com/results?search_query=tally+erp+course+hindi',
    source: 'agent'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, and React from scratch.',
    category: 'Web Development',
    url: 'https://www.youtube.com/results?search_query=web+development+course',
    source: 'agent'
  },
  {
    title: 'Digital Marketing Masterclass',
    description: 'Master SEO, social media marketing, and Google Ads.',
    category: 'Marketing',
    url: 'https://www.youtube.com/results?search_query=digital+marketing+course',
    source: 'agent'
  },
  {
    title: 'Graphic Design with Photoshop',
    description: 'Learn professional graphic design techniques.',
    category: 'Design',
    url: 'https://www.youtube.com/results?search_query=photoshop+course+hindi',
    source: 'agent'
  },
  {
    title: 'Excel for Data Analysis',
    description: 'Advanced Excel skills for business and data analysis.',
    category: 'Computer Skills',
    url: 'https://www.youtube.com/results?search_query=excel+advanced+course',
    source: 'agent'
  },
  {
    title: 'Mobile Repairing Course',
    description: 'Learn smartphone hardware and software repair.',
    category: 'Technical',
    url: 'https://www.youtube.com/results?search_query=mobile+repairing+course+hindi',
    source: 'agent'
  },
  {
    title: 'Tailoring and Fashion Design',
    description: 'Learn professional tailoring and garment making.',
    category: 'Skill Training',
    url: 'https://www.youtube.com/results?search_query=tailoring+course+hindi',
    source: 'agent'
  },
  {
    title: 'Python Programming',
    description: 'Learn Python programming from basics to advanced.',
    category: 'Programming',
    url: 'https://www.youtube.com/results?search_query=python+programming+hindi',
    source: 'agent'
  }
];

/**
 * Generate AI-sourced jobs
 * @param {number} count - Number of jobs to generate
 * @returns {Array} Array of job objects
 */
export const generateAIJobs = (count = 10) => {
  const jobs = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const template = JOB_TEMPLATES[Math.floor(Math.random() * JOB_TEMPLATES.length)];
    const location = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
    const company = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
    
    // Create expiry date (30-90 days from now)
    const expiryDate = new Date(now);
    expiryDate.setDate(expiryDate.getDate() + 30 + Math.floor(Math.random() * 60));
    
    jobs.push({
      id: uuidv4(),
      title: template.title,
      description: template.description,
      employerId: `employer_${Math.floor(Math.random() * 100)}`,
      employerName: company,
      city: location.city,
      district: location.district,
      state: location.state,
      pincode: location.pincode,
      lat: location.lat,
      lng: location.lng,
      skillTags: template.skillTags,
      experienceLevel: template.experienceLevel,
      jobType: template.jobType,
      source: 'agent',
      salary: generateSalaryRange(template.experienceLevel),
      createdAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last 7 days
      expiresAt: expiryDate,
      applicants: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 200),
      metadata: {
        scrapedFrom: 'AI Agent',
        verified: Math.random() > 0.3,
        featured: Math.random() > 0.8
      }
    });
  }
  
  return jobs;
};

/**
 * Generate salary range based on experience level
 */
const generateSalaryRange = (experienceLevel) => {
  const ranges = {
    entry: { min: 10000, max: 20000 },
    mid: { min: 20000, max: 40000 },
    senior: { min: 40000, max: 80000 }
  };
  
  const range = ranges[experienceLevel] || ranges.entry;
  return `₹${range.min.toLocaleString('en-IN')} - ₹${range.max.toLocaleString('en-IN')}/month`;
};

/**
 * Generate AI-sourced skill resources
 * @returns {Array} Array of skill resource objects
 */
export const generateAISkills = () => {
  return SKILL_RESOURCES.map(skill => ({
    id: uuidv4(),
    ...skill,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: (4 + Math.random()).toFixed(1),
    enrollments: Math.floor(Math.random() * 10000),
    metadata: {
      language: 'Hindi/English',
      duration: `${Math.floor(Math.random() * 20) + 5} hours`,
      level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
    }
  }));
};

/**
 * Analyze regional job trends
 * @param {Array} jobs - Array of job objects
 * @returns {Object} Trend analysis
 */
export const analyzeRegionalTrends = (jobs) => {
  const trends = {
    topSkills: {},
    topCities: {},
    topJobTypes: {},
    averageSalary: 0,
    totalJobs: jobs.length
  };
  
  jobs.forEach(job => {
    // Count skills
    job.skillTags.forEach(skill => {
      trends.topSkills[skill] = (trends.topSkills[skill] || 0) + 1;
    });
    
    // Count cities
    trends.topCities[job.city] = (trends.topCities[job.city] || 0) + 1;
    
    // Count job types
    trends.topJobTypes[job.jobType] = (trends.topJobTypes[job.jobType] || 0) + 1;
  });
  
  // Convert to sorted arrays
  trends.topSkills = Object.entries(trends.topSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
  
  trends.topCities = Object.entries(trends.topCities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, count]) => ({ city, count }));
  
  trends.topJobTypes = Object.entries(trends.topJobTypes)
    .map(([type, count]) => ({ type, count }));
  
  return trends;
};

/**
 * Get personalized job recommendations
 * @param {Object} userProfile - User profile with skills and preferences
 * @param {Array} allJobs - All available jobs
 * @returns {Array} Recommended jobs
 */
export const getJobRecommendations = (userProfile, allJobs) => {
  if (!userProfile || !allJobs || allJobs.length === 0) {
    return [];
  }
  
  const userSkills = userProfile.skills || [];
  const userLocation = userProfile.location || {};
  
  // Score each job based on skill match and location proximity
  const scoredJobs = allJobs.map(job => {
    let score = 0;
    
    // Skill matching (0-50 points)
    const matchingSkills = job.skillTags.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    score += (matchingSkills.length / job.skillTags.length) * 50;
    
    // Location proximity (0-30 points)
    if (userLocation.city && job.city === userLocation.city) {
      score += 30;
    } else if (userLocation.district && job.district === userLocation.district) {
      score += 20;
    } else if (userLocation.state && job.state === userLocation.state) {
      score += 10;
    }
    
    // Recency (0-20 points)
    const daysSincePosted = (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 20 - daysSincePosted);
    
    return { ...job, recommendationScore: score };
  });
  
  // Sort by score and return top 20
  return scoredJobs
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 20);
};

/**
 * Simulate periodic job scraping
 * This would run as a scheduled Cloud Function in production
 */
export const simulateJobScraping = (callback) => {
  console.log('[AI Agent] Starting job scraping simulation...');
  
  // Generate initial batch
  const initialJobs = generateAIJobs(20);
  callback(initialJobs);
  
  // Simulate periodic updates (every 5 minutes in dev)
  const interval = setInterval(() => {
    const newJobs = generateAIJobs(2); // Add 2 new jobs
    console.log('[AI Agent] Generated new jobs:', newJobs.length);
    callback(newJobs);
  }, 5 * 60 * 1000); // 5 minutes
  
  // Return cleanup function
  return () => clearInterval(interval);
};

/**
 * Get trending skills in region
 * @param {string} city - City name
 * @param {Array} jobs - All jobs
 * @returns {Array} Trending skills
 */
export const getTrendingSkills = (city, jobs) => {
  const cityJobs = city 
    ? jobs.filter(job => job.city === city)
    : jobs;
  
  const skillCounts = {};
  cityJobs.forEach(job => {
    job.skillTags.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  return Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count, trend: 'up' }));
};

export default {
  generateAIJobs,
  generateAISkills,
  analyzeRegionalTrends,
  getJobRecommendations,
  simulateJobScraping,
  getTrendingSkills,
  INDIAN_CITIES
};
