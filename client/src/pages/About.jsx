import React from 'react';
import '../styles/Page.css';

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">About Us</h1>
        <div className="page-content">
          <p className='para-one'>
            Blogify is a modern blogging platform designed to bring writers and readers together in one simple and elegant space. Our goal is to make content creation easy, accessible, and enjoyable for everyone. We believe that ideas, stories, and knowledge have the power to inspire, educate, and connect people across the world.
          </p>
          <p className='para-two'>
            Our mission is to provide a clean and user-friendly platform where anyone can share their thoughts without unnecessary complexity. Whether you are a beginner exploring writing for the first time or an experienced blogger looking for a reliable platform, Blogify gives you the tools to express yourself freely and confidently.
          </p>
          <p className='para-three'>
            At Blogify, we focus on creating a distraction-free reading and writing experience. We support a wide range of topics and encourage originality, creativity, and meaningful discussions. Every voice matters, and every story deserves to be heard.
          </p>
          <p className='para-four' > 
            We aim to build a growing community that values learning, creativity, and collaboration. As we continue to improve and expand, our vision is to introduce more features that enhance user interaction, personalization, and content discovery. Join Blogify and be part of a platform where ideas turn into impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
