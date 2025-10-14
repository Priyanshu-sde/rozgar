import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import SkillCard from '../components/SkillCard';
import { motion } from 'framer-motion';

const SkillLibrary = () => {
  const { t } = useTranslation();
  const { skills } = useApp();
  const { userProfile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [userSkillProgress, setUserSkillProgress] = useState({});

  const filteredSkills = skills.filter(skill => {
    if (activeTab === 'ai') return skill.source === 'agent';
    if (activeTab === 'community') return skill.source === 'community';
    return true;
  });

  const handleMarkProgress = (skillId) => {
    setUserSkillProgress({ ...userSkillProgress, [skillId]: 'in_progress' });
  };

  const handleMarkCompleted = async (skillId) => {
    setUserSkillProgress({ ...userSkillProgress, [skillId]: 'completed' });
    const skill = skills.find(s => s.id === skillId);
    if (skill && userProfile) {
      const newBadge = {
        id: `badge_${skillId}`,
        name: skill.title,
        icon: 'Award',
        earnedAt: new Date()
      };
      await updateProfile({
        badges: [...(userProfile.badges || []), newBadge],
        skills: [...(userProfile.skills || []), skill.title]
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('skills.title')}</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'ai', 'community'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t(`skills.${tab === 'all' ? 'allSkills' : tab === 'ai' ? 'aiSourced' : 'communitySourced'}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            userProgress={userSkillProgress[skill.id]}
            onMarkProgress={handleMarkProgress}
            onMarkCompleted={handleMarkCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillLibrary;
