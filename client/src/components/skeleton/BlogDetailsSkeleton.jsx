import React from 'react'

const BlogDetailsSkeleton = () => {
    return (
        <div className="flex-1 bg-blue-50/50 min-h-full overflow-y-auto">

            <div className="max-w-4xl mx-auto bg-white my-8 p-6 md:p-10 rounded shadow">

                {/* Back button */}
                <div className="h-4 w-16 bg-gray-200 rounded mb-6"></div>

                {/* Category */}
                <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>

                {/* Title */}
                <div className="h-10 md:h-12 w-4/5 bg-gray-200 rounded"></div>

                {/* Image */}
                <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg mt-6"></div>

                {/* Description */}
                <div className="mt-8">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mt-3"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded mt-3"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded mt-3"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mt-3"></div>
                </div>

                {/* Status */}
                <div className="mt-8 pt-5 border-t">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>

            </div>

        </div>
    )
}

export default BlogDetailsSkeleton