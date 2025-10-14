import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Download } from 'lucide-react';

const ResumeBuilder = () => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();

  const handleDownload = () => {
    alert('Resume download feature - integrate html2canvas + jsPDF here');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('resume.title')}</h1>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Download className="w-5 h-5" />
          {t('resume.download')}
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-card p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{userProfile?.displayName}</h2>
          <p className="text-gray-600">{userProfile?.headline}</p>
          <p className="text-sm text-gray-500">{userProfile?.email} | {userProfile?.phone}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('resume.skills')}</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile?.skills?.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center mt-8">
          TODO: Implement full resume builder with html2canvas + jsPDF
        </p>
      </div>
    </div>
  );
};

export default ResumeBuilder;
