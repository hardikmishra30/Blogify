import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';
import '../styles/MyPosts.css';

const MyPosts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const data = await blogAPI.getMyPosts();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [isAuthenticated, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await blogAPI.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="my-posts-page">
      <div className="container">
        <h1 className="page-title">My Posts</h1>
        {loading ? (
          <p className="loading">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-item-content">
                  <h3 className="post-item-title">{post.title}</h3>
                  <p className="post-item-excerpt">{post.excerpt}</p>
                  <div className="post-item-meta">
                    <span className="post-item-date">{formatDate(post.created_at)}</span>
                    <span className={`post-item-status ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="post-item-actions">
                  <button
                    className="btn btn-small btn-primary"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-posts">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
