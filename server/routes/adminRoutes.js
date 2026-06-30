import express from 'express'
import { adminLogin, approveCoommentById, deleteCommentById, getAllBlogAdmin, getAllComments, getDashboard } from '../controllers/adminController.js'
import auth from '../middleware/auth.js';


const adminRouter = express.Router();

adminRouter.post('/login',auth, adminLogin);

adminRouter.get('/commets',auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogAdmin);
adminRouter.get('/delete-comment', auth, deleteCommentById);
adminRouter.get('/approve-comment', auth, approveCoommentById);
adminRouter.get('/dashboard', auth, getDashboard);

export default adminRouter;
