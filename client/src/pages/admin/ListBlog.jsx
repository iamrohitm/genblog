import { useEffect, useState } from "react"
import { blog_data } from "../../assets/assets"
import BlogTableItems from "../../components/admin/BlogTableItems"
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
 

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {axios, navigate} = useAppContext()

  const fetchBlogs = async() => {
    // setBlogs(blog_data)
     try{
      const {data} = await axios.get("/api/admin/blogs");

      if(data.success){
        setBlogs(data.blogs);
      }else{
        toast.error(data.message)
      }
    }catch(error){
        toast.error(error.message)
    }finally {
        setLoading(false);
    }
  }
  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                <th scope="col" className="px-2 py-4">Blog Title</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              { loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <tr key={index} className="border-y border-gray-200 animate-pulse">
                            <td className="px-2 py-4 xl:px-6">
                                <div className="h-4 w-4 bg-gray-200 rounded" />
                            </td>

                            <td className="px-2 py-4">
                                <div className="h-4 bg-gray-200 rounded w-48" />
                            </td>

                            <td className="px-2 py-4 max-sm:hidden">
                                <div className="h-4 bg-gray-200 rounded w-24" />
                            </td>

                            <td className="px-2 py-4 max-sm:hidden">
                                <div className="h-4 bg-gray-200 rounded w-20" />
                            </td>

                            <td className="px-2 py-4">
                                <div className="h-4 bg-gray-200 rounded w-16" />
                            </td>
                        </tr>
                    ))
                ) : (
                
                blogs.map((blog, index)=>{
                  return <BlogTableItems key={blog._id} blog={blog} index={index + 1} fetchBlogs={fetchBlogs}/>
                })
                )
              }
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default ListBlog