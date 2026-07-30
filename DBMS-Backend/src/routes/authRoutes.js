import { Router } from 'express';
import { userSignUp, userSignIn, getCurrentUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', userSignUp);
router.post('/login', userSignIn);
router.get('/me', authMiddleware, getCurrentUser);

export default router;