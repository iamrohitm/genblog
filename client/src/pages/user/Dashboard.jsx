import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const UserDashboard = () => {

    const { axios, user, navigate } = useAppContext();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/my-blogs');

            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    return (
        <div className='flex-1 bg-blue-50/50 p-6 md:p-10 overflow-y-auto'>

             <div>
                <h1 className='text-2xl font-semibold'>
                    Welcome, {user?.name}
                </h1>

                <p className='mt-1 text-gray-500'>
                    Manage your submitted blogs here.
                </p>
            </div>

            <button
                onClick={() => navigate('/user/addBlog')}
                className='px-5 py-2 bg-primary text-white rounded'
            >
                Write Blog
            </button>


            <div className='mt-8 bg-white rounded-lg shadow overflow-hidden'>

                <div className='p-5 border-b'>
                    <h2 className='text-lg font-semibold'>
                        My Blogs
                    </h2>
                </div>


                {loading ? (

                    <div className='p-6 text-gray-500'>
                        Loading blogs...
                    </div>

                ) : blogs.length === 0 ? (

                    <div className='p-6 text-gray-500'>
                        You haven't submitted any blogs yet.
                    </div>

                ) : (

                    <div className='overflow-x-auto'>

                        <table className='w-full text-sm'>

                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='text-left p-4'>Blog</th>
                                    <th className='text-left p-4'>Category</th>
                                    <th className='text-left p-4'>Status</th>
                                    <th className='text-left p-4'>Date</th>
                                </tr>
                            </thead>

                            <tbody>

                                {blogs.map((blog) => (

                                    <tr
                                        key={blog._id}
                                        className='border-t'
                                    >

                                        <td className='p-4'>
                                            <div className='flex items-center gap-3'>

                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className='w-14 h-10 object-cover rounded'
                                                />

                                                <span className='font-medium'>
                                                    {blog.title}
                                                </span>

                                            </div>
                                        </td>

                                        <td className='p-4'>
                                            {blog.category}
                                        </td>

                                        <td className='p-4'>

                                            {blog.isPublished ? (

                                                <span className='px-3 py-1 rounded-full text-xs bg-green-100 text-green-700'>
                                                    Published
                                                </span>

                                            ) : (

                                                <span className='px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700'>
                                                    Pending
                                                </span>

                                            )}

                                        </td>

                                        <td className='p-4 text-gray-500'>
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    )
}

export default UserDashboard