import express from 'express'
import { adminLogin, approveCoommentById, deleteCommentById, getAllBlogAdmin, getAllComments, getDashboard } from '../controllers/adminController.js'
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';



const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);

adminRouter.get('/comments',auth, isAdmin, getAllComments);
adminRouter.get('/blogs', auth, isAdmin, getAllBlogAdmin);
adminRouter.delete('/delete-comment', auth, isAdmin, deleteCommentById);
adminRouter.post('/approve-comment', auth, isAdmin, approveCoommentById);
adminRouter.get('/dashboard', auth, isAdmin, getDashboard);

export default adminRouter;
