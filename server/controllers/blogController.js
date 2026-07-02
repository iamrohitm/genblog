import fs from 'fs'
import imagekit from '../config/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'



export const addBlog = async(req , res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if(!title || !description || !category || !isPublished){
            return res.json({success: false, message: 'Missing fields'})
        }

        //before uploading img we need to convert into a proper format
        const fileBuffer = fs.readFileSync(imageFile.path);
        
        //uploading image in imageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        //optimizing url
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'},
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished});
        res.json({success: true, message: 'Blog created successfully!'});


    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//getAllblogs -> get all the blogs in Db which have isPublished

export const getAllblogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs})        
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}


//getBlogById
export const getBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message: 'Blog not found'})
        }

        res.json({success: true, blog})        
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}


//deleteBlogById -> you will have id is in req.body
export const deleteBlogById = async(req, res)=>{
    try{

        const {id} = req.body   
        await Blog.findByIdAndDelete(id);

        //delete all coments when blog is deleted
        await Comment.deleteMany({blogId: id})
        
        res.json({success: true, message: 'Blog deleted successfully'})
        
    }catch(error){
        res.json({success: false, message: error.message})
    }

}


//togglePublish -> you will have id is in req.body
export const togglePublish = async(req,res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);

        if(!blog){
            res.send({success: false, message: 'Blog not found'})
        }
        
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({
            success: true,
            message: `Blog ${
                blog.isPublished ? 'published' : 'unpublished'
            } successfully`,
            blog
        });
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async(req,res)=>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} = req.body;
        const comment = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comment})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}