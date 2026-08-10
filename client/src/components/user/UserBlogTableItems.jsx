import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const UserBlogTableItems = ({ blog, index, fetchBlogs }) => {

    const { axios, navigate } = useAppContext();

    const blogDate = new Date(blog.createdAt);

    const deleteBlog = async () => {
        const confirm = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirm) return;

        try {
            const { data } = await axios.delete("/api/blog/delete", {
                data: {
                    id: blog._id
                }
            });

            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <tr className="border-y border-gray-300">

            <th className="px-2 py-4">
                {index}
            </th>

            <td
                onClick={() => navigate(`/user/blog/${blog._id}`)}
                className="px-2 py-4 cursor-pointer hover:text-primary font-medium"
            >
                {blog.title}
            </td>

            <td className="px-2 py-4 max-sm:hidden">
                {blogDate.toDateString()}
            </td>

            <td className="px-2 py-4 max-sm:hidden">
                <p
                    className={
                        blog.isPublished
                            ? "text-green-600"
                            : "text-orange-700"
                    }
                >
                    {blog.isPublished ? "Published" : "Pending"}
                </p>
            </td>

            <td className="px-2 py-4">

                {!blog.isPublished && (
                    <img
                        src={assets.cross_icon}
                        alt="Delete"
                        onClick={deleteBlog}
                        className="w-8 hover:scale-110 transition-all cursor-pointer"
                    />
                )}

            </td>

        </tr>
    );
};

export default UserBlogTableItems;