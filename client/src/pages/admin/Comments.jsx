import { useEffect, useState } from "react"
import { comments_data } from "../../assets/assets"
import CommentTableItems from '../../components/admin/CommentTableItems'
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"


const Comments = () => {
 
  const {axios} = useAppContext()

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Not Approved');

  const fetchComments = async() => {
    // setComments(comments_data)
    try{
      const {data} = await axios.get('/api/admin/comments');
      data.success ? setComments(data.comments) : toast.error(data.message)
    }catch(error){
      toast.error(error.message)
    }finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchComments();
  },[])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
        
          <button 
            onClick={()=>setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs 
              ${filter == 'Approved' ? 'text-primary': 'text-gray-700'}`}
          >Approved</button>
        
          <button 
            onClick={()=>setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs 
              ${filter == 'Not Approved' ? 'text-primary': 'text-gray-700'}`}
          >Not Approved</button>

        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm  text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <tr
                        key={index}
                        className="border-y border-gray-200 animate-pulse"
                    >
                        <td className="px-6 py-4">
                            <div className="h-4 w-48 bg-gray-200 rounded" />
                            <div className="h-3 w-64 bg-gray-200 rounded mt-2" />
                        </td>

                        <td className="px-6 py-4 max-sm:hidden">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </td>

                        <td className="px-6 py-4">
                            <div className="h-8 w-16 bg-gray-200 rounded" />
                        </td>
                    </tr>
                ))
            ) : (
            comments.filter((comment)=>{
              if(filter == "Approved") return comment.isApproved == true;
              return comment.isApproved == false
            }).map((comment, index)=> <CommentTableItems key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments} /> )          
            )  
          }
          
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Comments 