import { Briefcase, MapPin, Clock, TrendingUp, Building2, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { formatDate, formatDistance, calculateDistance } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import clsx from 'clsx';

const JobCard = ({ job, onClick, onSave, isSaved = false, showDistance = false }) => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(job.id);
  };

  // Calculate distance if user location is available
  let distance = null;
  if (showDistance && userProfile?.location?.lat && job.lat) {
    distance = calculateDistance(
      userProfile.location.lat,
      userProfile.location.lng,
      job.lat,
      job.lng
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => onClick?.(job)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              {job.metadata?.featured && (
                <span className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{job.employerName}</span>
              {job.metadata?.verified && (
                <span className="text-primary-500">✓</span>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={saved ? t('jobs.unsaveJob') : t('jobs.saveJob')}
          >
            {saved ? (
              <BookmarkCheck className="w-5 h-5 text-primary-500" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Location and Distance */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.city}, {job.district}</span>
          </div>
          {distance !== null && (
            <div className="flex items-center gap-1 text-primary-600 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>{formatDistance(distance)}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillTags.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skillTags.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium text-gray-500">
              +{job.skillTags.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(job.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'px-2 py-1 text-xs font-medium rounded-full',
                job.source === 'agent'
                  ? 'bg-purple-50 text-purple-600'
                  : 'bg-green-50 text-green-600'
              )}
            >
              {job.source === 'agent' ? t('jobs.aiSourced') : t('jobs.recruiterPosted')}
            </span>
          </div>
        </div>

        {/* Salary if available */}
        {job.salary && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{job.salary}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
