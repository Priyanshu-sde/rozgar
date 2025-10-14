import { Home, Briefcase, BookOpen, Users, Building2, User, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: Briefcase, label: t('nav.jobs'), path: '/jobs' },
    { icon: BookOpen, label: t('nav.skills'), path: '/skills' },
    { icon: Users, label: t('nav.community'), path: '/community' },
    { icon: Building2, label: t('nav.employers'), path: '/employers' },
    { icon: User, label: t('nav.profile'), path: '/profile' }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-30',
          'w-64 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
          <span className="text-lg font-semibold">{t('app.name')}</span>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
