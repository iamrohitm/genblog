import express from 'express'
import {addBlog, deleteBlogById, getAllblogs, getBlogById, togglePublish} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';


const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image') , addBlog);
blogRouter.get('/all', getAllblogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.delete('/:deleteId', deleteBlogById);
blogRouter.patch('/:id', togglePublish);


export default blogRouter;