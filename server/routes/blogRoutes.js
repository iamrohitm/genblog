import express from 'express'
import {addBlog, getAllblogs, getBlogById} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';


const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image') , addBlog);
blogRouter.get('/all', getAllblogs);
blogRouter.get('/:blogId', getBlogById);

export default blogRouter;