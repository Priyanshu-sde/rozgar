import { Heart, MessageCircle, Share2, ExternalLink, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { formatDate, getInitials, getAvatarColor } from '../utils/helpers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onLike, onComment, currentUserId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(post.id);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment?.(post.id, commentText);
      setCommentText('');
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() => handleUserClick(post.userId)}
              className="flex-shrink-0"
            >
              {post.userPhoto ? (
                <img
                  src={post.userPhoto}
                  alt={post.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: getAvatarColor(post.userName) }}
                >
                  {getInitials(post.userName)}
                </div>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <button
                onClick={() => handleUserClick(post.userId)}
                className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
              >
                {post.userName}
              </button>
              <p className="text-sm text-gray-600 line-clamp-1">
                {post.userHeadline}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {post.description}
          </p>
        </div>

        {/* Link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-4"
          >
            <ExternalLink className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-primary-600 font-medium truncate">
              {post.link}
            </span>
          </a>
        )}

        {/* Tags */}
        {post.skillTags && post.skillTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.skillTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 text-sm text-gray-600">
          <span>{post.likesCount} {t('community.like')}</span>
          <span>{post.comments?.length || 0} {t('community.comments')}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
              liked
                ? 'text-red-500 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">{t('community.like')}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{t('community.comment')}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">{t('community.share')}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Comment Input */}
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t('community.writeComment')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('common.send')}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {post.comments?.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <button
                    onClick={() => handleUserClick(comment.userId)}
                    className="flex-shrink-0"
                  >
                    {comment.userPhoto ? (
                      <img
                        src={comment.userPhoto}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: getAvatarColor(comment.userName) }}
                      >
                        {getInitials(comment.userName)}
                      </div>
                    )}
                  </button>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <button
                      onClick={() => handleUserClick(comment.userId)}
                      className="font-semibold text-sm text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {comment.userName}
                    </button>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
