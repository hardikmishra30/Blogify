import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-card">
      <div className="blog-card-content">
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span className="blog-card-author">By {post.author?.username || 'Anonymous'}</span>
          <span className="blog-card-date">{formatDate(post.created_at)}</span>
        </div>
        <Link to={`/blog/${post.id}`} className="blog-card-link">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
