import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { getMockData } from '../mocks/seed';
import { MapPin, Mail, Phone, Edit } from 'lucide-react';
import Badge from '../components/Badge';
import { getInitials, getAvatarColor } from '../utils/helpers';

const Profile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { userProfile: currentUser } = useAuth();
  
  const mockData = getMockData();
  const profile = id ? mockData.userProfiles.find(p => p.id === id) : currentUser;
  const isOwnProfile = !id || id === currentUser?.id;

  if (!profile) {
    return <div className="max-w-4xl mx-auto px-4 py-8">{t('errors.notFound')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
        <div className="px-6 pb-6">
          <div className="flex items-start gap-6 -mt-16 mb-6">
            {profile.photoURL ? (
              <img src={profile.photoURL} alt={profile.displayName} className="w-32 h-32 rounded-full border-4 border-white" />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: getAvatarColor(profile.displayName) }}>
                {getInitials(profile.displayName)}
              </div>
            )}
            <div className="flex-1 mt-16">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.displayName}</h1>
                  <p className="text-gray-600">{profile.headline}</p>
                  <p className="text-sm text-gray-500">@{profile.userId}</p>
                </div>
                {isOwnProfile && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    <Edit className="w-4 h-4" />
                    {t('profile.editProfile')}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{profile.location.city}, {profile.location.state}</span>
            </div>
            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>

          {profile.bio && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('profile.about')}</h2>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.skills')}</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.badges && profile.badges.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.badges')}</h2>
              <div className="flex flex-wrap gap-6">
                {profile.badges.map((badge) => (
                  <Badge key={badge.id} badge={badge} showDate />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
