//Handling the URL routes for each CRUD operation for uItems
//-----------------------------{Imports}-----------
import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import uItemController from '../controllers/uItemController.js'
import requireOwner from '../middleware/requireOwner.js';

//---------------------------{Variables} ----------------
const router = express.Router();

//-------------------------------{routes defined}
router.post('/create', requireAuth, uItemController.createItem);
router.get('/user-items', requireAuth, uItemController.getUserItems);
router.get('/all-items', uItemController.getAllItems);
router.patch('/update', requireAuth, requireOwner, uItemController.updateItem);
router.delete('/delete', requireAuth, requireOwner, uItemController.deleteItem);

export default router;
