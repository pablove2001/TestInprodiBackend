import { Router } from 'express';

import { buyvuelos, seebuy } from '../controllers/buy.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//get
router.get('/see', TokenValidation, seebuy);

//patch
router.patch('/add', TokenValidation, buyvuelos);

export default router;