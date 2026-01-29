import express from 'express';
import { getThumbnailById, getUserThumbnails } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';


const UserRouter = express.Router();    

UserRouter.get('/thumbnails',protect, getUserThumbnails);
UserRouter.get('/thumbnails/:id',protect ,getThumbnailById);

export default UserRouter;