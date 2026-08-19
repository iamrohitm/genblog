import React from 'react'

const BlogCardSkeleton = () => {
    return (
        <div className="w-full min-w-0 bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">

            {/* Image */}
            <div className="w-full aspect-video bg-gray-200"></div>

            {/* Content */}
            <div className="p-5">

                {/* Category */}
                <div className="h-4 bg-gray-200 rounded w-24"></div>

                {/* Title */}
                <div className="h-6 bg-gray-200 rounded mt-3 w-4/5"></div>

                {/* Description */}
                <div className="h-4 bg-gray-200 rounded mt-3 w-full"></div>

                <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>

            </div>

        </div>
    )
}

export default BlogCardSkeleton