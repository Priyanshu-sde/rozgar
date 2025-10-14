import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import EmployerCard from '../components/EmployerCard';

const Employers = () => {
  const { t } = useTranslation();
  const { employers } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('nav.employers')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employers.map((employer) => (
          <EmployerCard key={employer.id} employer={employer} />
        ))}
      </div>
    </div>
  );
};

export default Employers;
