import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import UserBlogTableItems from "../../components/user/UserBlogTableItems";
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


            <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">

    <table className="w-full text-sm text-gray-500">

        <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>

                <th className="px-2 py-4 xl:px-6">
                    #
                </th>

                <th className="px-2 py-4">
                    Blog Title
                </th>

                <th className="px-2 py-4 max-sm:hidden">
                    Date
                </th>

                <th className="px-2 py-4 max-sm:hidden">
                    Status
                </th>

                <th className="px-2 py-4">
                    Actions
                </th>

            </tr>
        </thead>

        <tbody>

            {blogs.map((blog, index) => (
                <UserBlogTableItems
                    key={blog._id}
                    blog={blog}
                    index={index + 1}
                    fetchBlogs={fetchMyBlogs}
                />
            ))}

        </tbody>

    </table>

</div>

        </div>
    )
}

export default UserDashboard