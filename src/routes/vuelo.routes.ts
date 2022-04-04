import { Router } from 'express';

import { vcreate, vdelete, seevuelos, buyvuelos } from '../controllers/vuelos.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//post
router.post('/create', TokenValidation, vcreate);
router.post('/buy', TokenValidation, buyvuelos);

//get
router.get('/see', seevuelos);

//delete
router.delete('/delete', TokenValidation, vdelete);

export default router;