import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await blogAPI.getPostById(id);
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading-container"><p className="loading">Loading post...</p></div>;
  }

  if (!post) {
    return <div className="loading-container"><p className="loading">Post not found</p></div>;
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <article className="blog-post">
          {post.images && post.images.length > 0 && (
            <div className="post-image-wrap">
              <img
                src={post.images[0]}
                alt={post.title || 'Post image'}
                className="post-image"
              />
            </div>
          )}
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By {post.author?.username || 'Anonymous'}</span>
            <span className="post-date">{formatDate(post.created_at)}</span>
          </div>
          <div className="post-content">{post.content}</div>
        </article>
        <button className="btn btn-secondary" onClick={() => navigate('/blog')}>
          ← Back to Blog
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
