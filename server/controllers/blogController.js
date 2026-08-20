import fs from 'fs'
import imagekit from '../config/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import main from '../config/gemini.js'
import { redisClient } from '../config/redis.js';



export const addBlog = async(req , res)=>{
    try {
        const {title, description, category} = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if(!title || !description || !category ){
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

        await Blog.create({title, description, category, image, isPublished: false, author: req.user.id});

        await redisClient.del('genblog:blogs');

        res.json({success: true, message: 'Blog created successfully!'});


    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//getAllblogs -> get all the blogs in Db which have isPublished

export const getAllblogs = async(req,res)=>{
    try {
        // const blogs = await Blog.find({isPublished: true});
        // res.json({success: true, blogs})   
         // 1. Check Redis first
        const cachedBlogs = await redisClient.get('genblog:blogs');

        if (cachedBlogs) {

            console.log('Redis cache HIT');

            return res.json({
                success: true,
                blogs: JSON.parse(cachedBlogs)
            });
        }

        console.log('Redis cache MISS');

        // 2. Redis doesn't have the blogs
        const blogs = await Blog.find({
            isPublished: true
        });

        // 3. Store blogs in Redis
        await redisClient.set(
            'genblog:blogs',
            JSON.stringify(blogs),
            {
                EX: 60
            }
        );

        // 4. Return blogs
        res.json({
            success: true,
            blogs
        });     
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}


//getBlogById
export const getBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
            .populate('author', 'name');
        // console.log("BLOG:", blog);
        // console.log("AUTHOR:", blog?.author);

        if(!blog){
            return res.json({success: false, message: 'Blog not found'})
        }

        res.json({success: true, blog})        
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

export const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.id
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};


//deleteBlogById -> you will have id is in req.body
// export const deleteBlogById = async(req, res)=>{
//     try{

//         const {id} = req.body   
//         await Blog.findByIdAndDelete(id);

//         //delete all coments when blog is deleted
//         await Comment.deleteMany({blogId: id})
        
//         res.json({success: true, message: 'Blog deleted successfully'})
        
//     }catch(error){
//         res.json({success: false, message: error.message})
//     }

// }
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;

        console.log("Delete ID:", id);
        console.log("Logged in user:", req.user);

        let blog;

        if (req.user.role === 'admin') {
            blog = await Blog.findById(id);
        } else {
            blog = await Blog.findOne({
                _id: id,
                author: req.user.id
            });
        }
         
        console.log("Found blog:", blog);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // User can delete only their own unpublished blog
        if (req.user.role === 'user') {

            // if (blog.author.toString() !== req.user.id) {
            //     return res.status(403).json({
            //         success: false,
            //         message: 'You can only delete your own blogs'
            //     });
            // }

            if (blog.isPublished) {
                return res.status(403).json({
                    success: false,
                    message: 'Published blogs cannot be deleted'
                });
            }
        }

        // Admin can delete any blog

        await Blog.findByIdAndDelete(id);

        // Delete comments belonging to this blog
        await Comment.deleteMany({ blog: id });

        // Invalidate public blogs cache
        await redisClient.del('genblog:blogs'); 

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//togglePublish -> you will have id is in req.body
export const togglePublish = async(req,res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(404).json({success: false, message: 'Blog not found'})
        }
        
        blog.isPublished = !blog.isPublished;
        await blog.save();

        // Invalidate public blogs cache
        await redisClient.del('genblog:blogs');

        res.json({
            success: true,
            message: `Blog ${
                blog.isPublished ? 'published' : 'unpublished'
            } successfully`,
            blog
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
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

export const generateContent = async(req,res)=>{
    try {   
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success:true, content})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}