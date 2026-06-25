import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'

const AddBlog = () => {
  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [categoty, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmithandler = async(e)=> {
    e.preventDefault();
  }

  const editorRef = useRef(null)
  const quillRef = useRef(null) 

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  },[])
  
  return (
    <form onSubmit={onSubmithandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll' >
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' alt="" />
          <input type="file" id='image' hidden required onChange={(e)=>setImage(e.target.files[0])} />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={e => setTitle(e.title.value)}
          value={title}
          required
        />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} >

          </div>

          <button
            type='button'
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-2 py-1.5 rounded hover:underline cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Blog categoty</p>
        <select 
          onChange={e => setCategory(e.target.value)}
          name='category'
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
        >
          <option value="" >Select Category</option>
          {
            blogCategories.map((item,index)=>(
              <option value={item} key={index} >{item}</option>
            ))
          }

        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer'
            onChange={e => setIsPublished(e.target.checked)}
          />
        </div>

        <button type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm' >
          Add Blog
        </button>

      </div>
    
    </form>
  )
}

export default AddBlog
