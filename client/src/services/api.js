import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  signin: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  }
};

export const blogAPI = {
  getAllPosts: async () => {
    const response = await api.get('/blog/posts');
    return response.data;
  },
  getPostById: async (id) => {
    const response = await api.get(`/blog/posts/${id}`);
    return response.data;
  },
  getMyPosts: async () => {
    const response = await api.get('/blog/my-posts');
    return response.data;
  },
  createPost: async (postData) => {
    // if postData is FormData, send multipart form data
    if (postData instanceof FormData) {
      const response = await api.post('/blog/posts', postData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    }
    const response = await api.post('/blog/posts', postData);
    return response.data;
  },
  updatePost: async (id, postData) => {
    if (postData instanceof FormData) {
      const response = await api.put(`/blog/posts/${id}`, postData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    }
    const response = await api.put(`/blog/posts/${id}`, postData);
    return response.data;
  },
  deletePost: async (id) => {
    const response = await api.delete(`/blog/posts/${id}`);
    return response.data;
  }
};

export default api;
