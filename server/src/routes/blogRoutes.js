import express from 'express';
import {
  getAllPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
import { authenticateUser } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.get('/my-posts', authenticateUser, getMyPosts);
router.post('/posts', authenticateUser, upload.array('images', 5), createPost);
router.put('/posts/:id', authenticateUser, upload.array('images', 5), updatePost);
router.delete('/posts/:id', authenticateUser, deletePost);

export default router;
