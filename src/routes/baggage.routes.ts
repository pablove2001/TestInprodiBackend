import { Router } from 'express';

import { badd, bsee, bseeemployee, bdelete, bdeleteemployee } from '../controllers/baggage.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//post
router.post('/add', TokenValidation, badd);

//get
router.get('/see',TokenValidation, bsee);
router.get('/see/employee', TokenValidation, bseeemployee);

//delete
router.delete('/delete', TokenValidation, bdelete);
router.delete('/delete/employee', TokenValidation, bdeleteemployee);

export default router;