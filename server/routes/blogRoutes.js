import express from 'express'
import {addBlog, addComment, deleteBlogById, generateContent, getAllblogs, getBlogById, getBlogComments, togglePublish} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';



const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image') , addBlog);
blogRouter.get('/all', getAllblogs);
blogRouter.get('/:blogId', getBlogById);

blogRouter.delete('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish',auth,  togglePublish);

blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments)

blogRouter.post('/generate',auth, generateContent)


export default blogRouter;