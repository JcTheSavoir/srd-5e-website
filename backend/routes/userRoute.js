//Handling the URL routes for each CRUD operation for users
//-----------------------------{Imports}-----------
import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import userController from '../controllers/userController.js';

//---------------------------{Variables} ----------------
const router = express.Router();

//-------------------------------{routes defined}
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', requireAuth, userController.logout);
router.get('/check-auth', requireAuth, userController.checkAuth);

export default router;
