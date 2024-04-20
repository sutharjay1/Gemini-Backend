import express from 'express';
import {
  handleUserLogin,
  handleUserRegister,
} from '../controller/user.controller.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', handleUserLogin);
router.post('/register', handleUserRegister);

router.post('/verify', verifyAuth);

export default router;
