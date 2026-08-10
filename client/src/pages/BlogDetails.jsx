import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const BlogDetails = () => {

    const { id } = useParams()
    const { axios, navigate } = useAppContext()

    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`)

            if (data.success) {
                setBlog(data.blog)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p>Loading blog...</p>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-gray-500">Blog not found</p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-5 py-2 bg-primary text-white rounded"
                >
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <div className="flex-1 bg-blue-50/50 min-h-full overflow-y-auto">

            <div className="max-w-4xl mx-auto bg-white my-8 p-6 md:p-10 rounded shadow">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm text-gray-500 hover:text-primary"
                >
                    ← Back
                </button>

                {/* Category */}
                <p className="text-sm text-primary font-medium mb-3">
                    {blog.category}
                </p>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {blog.title}
                </h1>

                {/* Image */}
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full mt-6 rounded-lg"
                />

                {/* Description */}
                <div
                    className="mt-8 prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: blog.description
                    }}
                />

                {/* Status */}
                <div className="mt-8 pt-5 border-t">

                    <span className="font-medium">
                        Status:
                    </span>

                    <span className="ml-2">
                        {blog.isPublished ? 'Published' : 'Pending'}
                    </span>

                </div>

            </div>

        </div>
    )
}

export default BlogDetails