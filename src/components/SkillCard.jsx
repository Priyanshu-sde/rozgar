import { ExternalLink, Star, Users, Clock, Award, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import clsx from 'clsx';

const SkillCard = ({ skill, onMarkProgress, onMarkCompleted, userProgress = null }) => {
  const { t } = useTranslation();
  const [showBadge, setShowBadge] = useState(false);

  const handleMarkCompleted = () => {
    setShowBadge(true);
    setTimeout(() => setShowBadge(false), 3000);
    onMarkCompleted?.(skill.id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {skill.title}
              </h3>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {skill.category}
              </span>
            </div>
            <span
              className={clsx(
                'px-2 py-1 text-xs font-medium rounded-full',
                skill.source === 'agent'
                  ? 'bg-purple-50 text-purple-600'
                  : 'bg-blue-50 text-blue-600'
              )}
            >
              {skill.source === 'agent' ? t('skills.aiSourced') : t('skills.communitySourced')}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {skill.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            {skill.metadata?.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{skill.metadata.duration}</span>
              </div>
            )}
            {skill.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>{skill.rating}</span>
              </div>
            )}
            {skill.enrollments && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{skill.enrollments.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Level Badge */}
          {skill.metadata?.level && (
            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
                {skill.metadata.level}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              {t('skills.viewResource')}
            </a>
          </div>

          {/* Progress Actions */}
          <div className="flex items-center gap-2 mt-3">
            {userProgress === 'completed' ? (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {t('skills.completed')}
              </div>
            ) : userProgress === 'in_progress' ? (
              <>
                <button
                  onClick={() => onMarkCompleted?.(skill.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('skills.markCompleted')}
                </button>
              </>
            ) : (
              <button
                onClick={() => onMarkProgress?.(skill.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                {t('skills.markInProgress')}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Badge Earned Animation */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('skills.badgeEarned')}
            </h3>
            <p className="text-gray-600">
              {t('skills.congratulations')}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SkillCard;
