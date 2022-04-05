import { Router } from 'express';

import { cadd, csee, cseeemployee, cdelete, cdeleteemployee } from '../controllers/comment.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//post
router.post('/add', TokenValidation, cadd);

//get
router.get('/see',TokenValidation, csee);
router.get('/see/employee', TokenValidation, cseeemployee);

//delete
router.delete('/delete', TokenValidation, cdelete);
router.delete('/delete/employee', TokenValidation, cdeleteemployee);

export default router;