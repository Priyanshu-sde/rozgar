import { Award, Code, FileSpreadsheet, MessageCircle, TrendingUp, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/helpers';

const iconMap = {
  Code: Code,
  FileSpreadsheet: FileSpreadsheet,
  MessageCircle: MessageCircle,
  TrendingUp: TrendingUp,
  Megaphone: Megaphone,
  Award: Award
};

const Badge = ({ badge, size = 'md', showName = true, showDate = false }) => {
  const Icon = iconMap[badge.icon] || Award;
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg`}
      >
        <Icon className={`${iconSizes[size]} text-white`} />
      </div>
      {showName && (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{badge.name}</p>
          {showDate && badge.earnedAt && (
            <p className="text-xs text-gray-500">{formatDate(badge.earnedAt)}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Badge;
