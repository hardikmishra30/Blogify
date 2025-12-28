# Full Stack Blog Website

A modern, responsive blog platform built with Node.js, Express, React, and Supabase.

## Features

- User authentication with SHA-256 password hashing
- Create, read, update, and delete blog posts
- Responsive design for mobile and desktop
- Hero section with call-to-action
- Multiple routes: Home, Blog, About, Contact
- User dashboard to manage posts
- Secure password storage and authentication

## Tech Stack

### Backend
- Node.js with Express.js
- ES6 modules
- Supabase (PostgreSQL database)
- SHA-256 password hashing
- RESTful API architecture

### Frontend
- React 18
- React Router for navigation
- Axios for API requests
- Vite for build tooling
- Modern CSS with responsive design

## Project Structure

```
blog-website/
├── server/              # Backend Express server
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Authentication middleware
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── server.js    # Main server file
│   └── package.json
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json
│
└── package.json         # Root package file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for both the server and client.

### 2. Configure Environment Variables

Update the `server/.env` file with your Supabase credentials:

```env
PORT=3010
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database migrations have already been applied. The following tables are created:

- **users**: Stores user accounts with hashed passwords
- **blog_posts**: Stores blog posts with author references

### 4. Run the Application

#### Development Mode (runs both server and client):

```bash
npm run dev
```

- Backend runs on: http://localhost:3010
- Frontend runs on: http://localhost:3000

#### Production Mode:

```bash
# Build the frontend
npm run build

# Start the server
npm run start:server
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in to existing account

### Blog Posts
- `GET /api/blog/posts` - Get all published posts
- `GET /api/blog/posts/:id` - Get single post by ID
- `GET /api/blog/my-posts` - Get authenticated user's posts
- `POST /api/blog/posts` - Create new post (requires auth)
- `PUT /api/blog/posts/:id` - Update post (requires auth)
- `DELETE /api/blog/posts/:id` - Delete post (requires auth)

## Pages

- **Home** (`/`) - Hero section with recent posts
- **Blog** (`/blog`) - All published blog posts
- **Blog Post** (`/blog/:id`) - Individual blog post view
- **Create Post** (`/create-post`) - Create new blog post (authenticated)
- **My Posts** (`/my-posts`) - Manage your posts (authenticated)
- **Sign In** (`/signin`) - User login
- **Sign Up** (`/signup`) - User registration
- **About** (`/about`) - About page
- **Contact** (`/contact`) - Contact information

## Security Features

- SHA-256 password hashing
- Row Level Security (RLS) on database
- JWT-style token authentication
- Protected routes requiring authentication
- Secure API endpoints

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## Future Enhancements

- Rich text editor for blog posts
- Image upload functionality
- Comments system
- Post categories and tags
- Search functionality
- User profiles
- Social media sharing
