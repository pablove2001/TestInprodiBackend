import { Router } from 'express';
const router = Router();

import { signup, signin } from '../controllers/auth.controller'
import { TokenValidation } from '../libs/verifyToken'

//post
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
