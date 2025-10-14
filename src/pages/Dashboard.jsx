import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Briefcase, BookmarkCheck, Eye, TrendingUp } from 'lucide-react';
import JobCard from '../components/JobCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  const { jobs } = useApp();

  const recommendedJobs = jobs.slice(0, 6);

  const stats = [
    { icon: Briefcase, label: t('dashboard.applications'), value: '12', color: 'bg-blue-50 text-blue-600' },
    { icon: BookmarkCheck, label: t('dashboard.savedJobs'), value: '8', color: 'bg-green-50 text-green-600' },
    { icon: Eye, label: t('dashboard.profileViews'), value: '45', color: 'bg-purple-50 text-purple-600' },
    { icon: TrendingUp, label: t('dashboard.jobAlerts'), value: '3', color: 'bg-orange-50 text-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {userProfile?.displayName}!
        </h1>
        <p className="text-gray-600 mb-8">{userProfile?.headline}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-card p-6"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboard.recommendedJobs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} job={job} showDistance />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
