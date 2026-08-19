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

    const handleSubscribe = async () => {
        try {
            const { data } = await axios.post('/api/payment/create-order');

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            const order = data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'GenBlog',
                description: 'GenBlog AI - 1 Month Access',
                order_id: order.id,

                handler: async function (response) {
                    try {
                        console.log(response);

                        const { data } = await axios.post(
                            '/api/payment/verify',
                            response
                        );

                        if (data.success) {
                            toast.success(data.message);
                            console.log('Subscription expires:', data.subscriptionExpiry);
                        } else {
                            toast.error(data.message);
                        }

                    } catch (error) {
                        toast.error(error.message);
                    }
                },

                theme: {
                    color: '#000000'
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

//     return (
//         <div className='flex-1 bg-blue-50/50 p-6 md:p-10 overflow-y-auto'>
//             {/* <button
//                 onClick={handleSubscribe}
//                 className="px-5 py-2 bg-primary text-white rounded"
//             >
//                 Subscribe ₹1
//             </button> */}

//              <div>
//                 <h1 className='text-2xl font-semibold'>
//                     Welcome, {user?.name}
//                 </h1>

//                 <p className='mt-1 text-gray-500'>
//                     Manage your submitted blogs here.
//                 </p>
//             </div>

//             <button
//                 onClick={() => navigate('/user/addBlog')}
//                 className='px-5 py-2 bg-primary text-white rounded'
//             >
//                 Write Blog
//             </button>


//             <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">

//     <table className="w-full text-sm text-gray-500">

//         <thead className="text-xs text-gray-600 text-left uppercase">
//             <tr>

//                 <th className="px-2 py-4 xl:px-6">
//                     #
//                 </th>

//                 <th className="px-2 py-4">
//                     Blog Title
//                 </th>

//                 <th className="px-2 py-4 max-sm:hidden">
//                     Date
//                 </th>

//                 <th className="px-2 py-4 max-sm:hidden">
//                     Status
//                 </th>

//                 <th className="px-2 py-4">
//                     Actions
//                 </th>

//             </tr>
//         </thead>

//         <tbody>

//             {blogs.map((blog, index) => (
//                 <UserBlogTableItems
//                     key={blog._id}
//                     blog={blog}
//                     index={index + 1}
//                     fetchBlogs={fetchMyBlogs}
//                 />
//             ))}

//         </tbody>

//     </table>

// </div>

//         </div>
//     )

    return (
        <div className="flex-1 bg-blue-50/50 p-6 md:p-10 overflow-y-auto">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Welcome, {user?.name}
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage your submitted blogs here.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/user/addBlog')}
                        className="px-5 py-2 bg-primary text-white rounded"
                    >
                        Write Blog
                    </button>
                </div>

                <div className="relative mt-6 overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">

                    <table className="w-full text-sm text-gray-500">

                        <thead className="text-xs text-gray-600 text-left uppercase">
                            <tr>
                                <th className="px-2 py-4 xl:px-6">#</th>
                                <th className="px-2 py-4">Blog Title</th>
                                <th className="px-2 py-4 max-sm:hidden">Date</th>
                                <th className="px-2 py-4 max-sm:hidden">Status</th>
                                <th className="px-2 py-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <tr
                                        key={index}
                                        className="border-y border-gray-200 animate-pulse"
                                    >
                                        <td className="px-2 py-4">
                                            <div className="h-4 w-4 bg-gray-200 rounded" />
                                        </td>

                                        <td className="px-2 py-4">
                                            <div className="h-4 w-48 bg-gray-200 rounded" />
                                        </td>

                                        <td className="px-2 py-4 max-sm:hidden">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>

                                        <td className="px-2 py-4 max-sm:hidden">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>

                                        <td className="px-2 py-4">
                                            <div className="h-4 w-8 bg-gray-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                            blogs.map((blog, index) => (
                                <UserBlogTableItems
                                    key={blog._id}
                                    blog={blog}
                                    index={index + 1}
                                    fetchBlogs={fetchMyBlogs}
                                />
                            )))
                            }
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default UserDashboard