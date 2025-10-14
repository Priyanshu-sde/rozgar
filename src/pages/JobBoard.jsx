import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Filter, MapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { calculateDistance } from '../utils/helpers';

const JobBoard = () => {
  const { t } = useTranslation();
  const { jobs, filters, setFilters } = useApp();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (filters.localOnly && userProfile?.location) {
      result = result.filter(job => job.city === userProfile.location.city);
    }

    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.jobType));
    }

    if (filters.experienceLevel.length > 0) {
      result = result.filter(job => filters.experienceLevel.includes(job.experienceLevel));
    }

    if (filters.source.length > 0) {
      result = result.filter(job => filters.source.includes(job.source));
    }

    if (userProfile?.location?.lat && filters.radius) {
      result = result.filter(job => {
        const distance = calculateDistance(
          userProfile.location.lat,
          userProfile.location.lng,
          job.lat,
          job.lng
        );
        return distance <= filters.radius;
      });
    }

    return result;
  }, [jobs, filters, userProfile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('jobs.title')}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            {t('jobs.filters')}
          </button>
          <button
            onClick={() => navigate('/jobs/map')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <MapIcon className="w-5 h-5" />
            {t('jobs.showMap')}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('jobs.jobType')}</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">{t('common.all')}</option>
                <option value="full-time">{t('jobs.fullTime')}</option>
                <option value="part-time">{t('jobs.partTime')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('jobs.experienceLevel')}</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">{t('common.all')}</option>
                <option value="entry">{t('jobs.entry')}</option>
                <option value="mid">{t('jobs.mid')}</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.localOnly}
                  onChange={(e) => setFilters({ localOnly: e.target.checked })}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-sm font-medium text-gray-700">{t('jobs.localOnly')}</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} showDistance />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('jobs.noJobs')}</p>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
