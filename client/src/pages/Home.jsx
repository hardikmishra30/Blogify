import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const data = await blogAPI.getAllPosts();
        setRecentPosts(data.posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="home">
      <Hero />
      <section className="recent-posts">
        <div className="container">
          <h2 className="section-title">Recent Posts</h2>
          {loading ? (
            <p className="loading">Loading posts...</p>
          ) : recentPosts.length > 0 ? (
            <div className="blog-grid">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="no-posts">No posts available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
