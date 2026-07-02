import express from 'express'
import { adminLogin, approveCoommentById, deleteCommentById, getAllBlogAdmin, getAllComments, getDashboard } from '../controllers/adminController.js'
import auth from '../middleware/auth.js';


const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);

adminRouter.get('/comments',auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogAdmin);
adminRouter.delete('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCoommentById);
adminRouter.get('/dashboard', auth, getDashboard);

export default adminRouter;
