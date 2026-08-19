import { useState } from "react"
import { blog_data, blogCategories } from "../assets/assets"
import {motion, spring} from 'motion/react'
import BlogCard from "./BlogCard"
import { useAppContext } from "../context/AppContext"
import BlogCardSkeleton from "./skeleton/BlogCardSkeleton"
// import BlogCardSkeleton from "../skeleton/BlogCardSkeleton";

const BlogList= () => { 
    const [menu, setMenu] = useState('All')
    const {blogs, input, blogsLoading} = useAppContext();

    const filteredBlogs = () => {
        if(input == ''){
            return blogs
        }
        return blogs.filter((blog)=>
            blog.title.toLowerCase().includes(input.toLowerCase()) || 
            blog.category.toLowerCase().includes(input.toLowerCase())
        )
    }

  return (
    <div>
        <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
            {blogCategories.map(item=>(
                <div key={item} className="relative">
                    <button onClick={()=>setMenu(item)} 
                        className={`cursor-pointer text-gray-500 ${menu == item && 'text-white px-4 pt-0.5'}`}>
                        {item}
                        {
                            menu === item && (
                                <motion.div 
                                layoutId="underline"
                                transition={{type: 'spring', stiffness: 500, damping: 30}}
                                className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"></motion.div>
                            )
                        }
                        </button>    
                </div>
            ))}
        </div>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* {
                filteredBlogs().filter((blog)=> menu === 'All' ? true : blog.category === menu).map((blog)=>
                <BlogCard key={blog._id} blog={blog} />
                )
            } */}
            {
    blogsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
            ))}
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs()
                .filter((blog) =>
                    menu === 'All' ? true : blog.category === menu
                )
                .map((blog) => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                    />
                ))}
        </div>
    )
}
        </div>

    </div>
  )
}

export default BlogList