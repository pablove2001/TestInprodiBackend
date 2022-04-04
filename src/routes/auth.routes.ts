import { Router } from 'express';
const router = Router();

import { signup, signin, profile, testing} from '../controllers/auth.controller'
import { TokenValidation } from '../libs/verifyToken'

//post
router.post('/signup', signup);
router.post('/signin', signin);

//get
router.get('/profile', TokenValidation, profile);
router.get('/testing',  TokenValidation, testing);

//pablo
router.get('/vuelos', TokenValidation, profile);

export default router;
