import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Community = () => {
  const { t } = useTranslation();
  const { communityPosts, createPost, likePost, addComment } = useApp();
  const { userProfile } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '', link: '' });

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost({
      userId: userProfile.id,
      userName: userProfile.displayName,
      userPhoto: userProfile.photoURL,
      userHeadline: userProfile.headline,
      title: formData.title,
      description: formData.description,
      skillTags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      link: formData.link || null
    });
    setFormData({ title: '', description: '', tags: '', link: '' });
    setShowCreateModal(false);
  };

  const handleComment = (postId, text) => {
    addComment(postId, {
      id: uuidv4(),
      userId: userProfile.id,
      userName: userProfile.displayName,
      userPhoto: userProfile.photoURL,
      text,
      createdAt: new Date()
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('community.title')}</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5" />
          {t('community.createPost')}
        </button>
      </div>

      <div className="space-y-6">
        {communityPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={likePost}
            onComment={handleComment}
            currentUserId={userProfile?.id}
          />
        ))}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={t('community.createPost')}
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('community.postTitle')}</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('community.postDescription')}</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('community.tags')}</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Comma separated"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('community.addLink')}</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
          >
            {t('community.publish')}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Community;
