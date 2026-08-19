import React from 'react'

const DashboardSkeleton = () => {
    return (
        <div className="animate-pulse">

            {/* Stats cards */}
            <div className="flex flex-wrap items-center gap-4">

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow"
                    >
                        <div className="w-10 h-10 bg-gray-200 rounded" />

                        <div>
                            <div className="h-5 w-10 bg-gray-200 rounded" />
                            <div className="h-4 w-16 bg-gray-200 rounded mt-2" />
                        </div>
                    </div>
                ))}

            </div>

            {/* Latest Blogs */}
            <div className="flex items-center gap-3 m-4 mt-6">
                <div className="w-6 h-6 bg-gray-200 rounded" />
                <div className="h-5 w-28 bg-gray-200 rounded" />
            </div>

            {/* Table */}
            <div className="relative max-w-4xl overflow-hidden shadow rounded-lg bg-white">

                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-2 py-4">
                                <div className="h-3 w-4 bg-gray-200 rounded" />
                            </th>
                            <th className="px-2 py-4">
                                <div className="h-3 w-24 bg-gray-200 rounded" />
                            </th>
                            <th className="px-2 py-4">
                                <div className="h-3 w-12 bg-gray-200 rounded" />
                            </th>
                            <th className="px-2 py-4">
                                <div className="h-3 w-14 bg-gray-200 rounded" />
                            </th>
                            <th className="px-2 py-4">
                                <div className="h-3 w-14 bg-gray-200 rounded" />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index} className="border-y border-gray-200">

                                <td className="px-2 py-4">
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                </td>

                                <td className="px-2 py-4">
                                    <div className="h-4 w-40 bg-gray-200 rounded" />
                                </td>

                                <td className="px-2 py-4">
                                    <div className="h-4 w-24 bg-gray-200 rounded" />
                                </td>

                                <td className="px-2 py-4">
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                </td>

                                <td className="px-2 py-4">
                                    <div className="h-4 w-8 bg-gray-200 rounded" />
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default DashboardSkeleton