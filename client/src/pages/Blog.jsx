import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../services/api';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogAPI.getAllPosts();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">All Blog Posts</h1>
        {loading ? (
          <p className="loading">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="no-posts">No posts available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
