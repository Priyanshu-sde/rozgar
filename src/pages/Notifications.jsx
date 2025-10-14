import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { formatDate } from '../utils/helpers';
import { Briefcase, Award, Heart, MessageCircle, UserPlus, Mail, Eye } from 'lucide-react';

const iconMap = {
  Briefcase, Award, Heart, MessageCircle, UserPlus, Mail, Eye
};

const Notifications = () => {
  const { t } = useTranslation();
  const { notifications, markNotificationRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('notifications.title')}</h1>
      <div className="space-y-3">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.icon] || Briefcase;
          return (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`bg-white rounded-lg shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-shadow ${
                !notif.read ? 'border-l-4 border-primary-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notif.createdAt)}</p>
                </div>
              </div>
            </div>
          );
        })}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">{t('notifications.noNotifications')}</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
