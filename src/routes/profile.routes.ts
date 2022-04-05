import { Router } from 'express';

import { psee, pseeemploye, pdelete, pdeleteemployee, pdeleteadministrator } from '../controllers/profile.controller'
import { TokenValidation } from '../libs/verifyToken'

const router = Router();

//get
router.get('/see',TokenValidation, psee);
router.get('/see/employee', TokenValidation, pseeemploye);

//delete
router.delete('/delete', TokenValidation, pdelete);
router.delete('/delete/employee', TokenValidation, pdeleteemployee);
router.delete('/delete/administrator', TokenValidation, pdeleteadministrator);

export default router;