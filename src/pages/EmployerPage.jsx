import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { Building2, MapPin, Users, Globe, Mail, Phone, CheckCircle } from 'lucide-react';
import JobCard from '../components/JobCard';

const EmployerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { employers, jobs } = useApp();
  
  const employer = employers.find(e => e.id === id);
  const employerJobs = jobs.filter(j => j.employerId === id);

  if (!employer) {
    return <div className="max-w-4xl mx-auto px-4 py-8">{t('errors.notFound')}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <div className="flex items-start gap-6">
          {employer.logo ? (
            <img src={employer.logo} alt={employer.name} className="w-24 h-24 rounded-lg" />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-primary-100 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-primary-600" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{employer.name}</h1>
              {employer.verified && <CheckCircle className="w-6 h-6 text-green-500" />}
            </div>
            <p className="text-gray-600 mb-4">{employer.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{employer.address.city}, {employer.address.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{employer.employeeCount} {t('employer.employees')}</span>
              </div>
              {employer.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {t('employer.website')}
                  </a>
                </div>
              )}
              {employer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{employer.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('employer.openJobs')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employerJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {employerJobs.length === 0 && (
        <div className="text-center py-12 text-gray-500">{t('employer.noOpenJobs')}</div>
      )}
    </div>
  );
};

export default EmployerPage;
