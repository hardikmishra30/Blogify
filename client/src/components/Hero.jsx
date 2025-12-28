import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Blog</h1>
        <p className="hero-subtitle">
          Discover amazing stories, insights, and ideas from our community of writers
        </p>
        <div className="hero-buttons">
          <Link to="/blog" className="btn btn-primary">
            Explore Blog
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
