import { Router } from 'express';

import { vcreate, vdelete, seevuelos,  seevuelosemployee } from '../controllers/vuelos.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//post
router.post('/create', TokenValidation, vcreate);

//get
router.get('/see', seevuelos);
router.get('/see/employee', TokenValidation, seevuelosemployee);

//delete
router.delete('/delete', TokenValidation, vdelete);

export default router;