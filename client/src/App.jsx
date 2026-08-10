import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { Route, Routes } from 'react-router-dom'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import ListBlog from './pages/admin/ListBlog'
import Login from './components/admin/Login'
import Signup from './components/admin/Signup'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import UserLayout from './pages/user/Layout'
import UserDashboard from './pages/user/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import UserAddBlog from './pages/user/AddBlog'
import BlogDetails from './pages/BlogDetails'
import GuestRoute from './components/GuestRoute'



const App = () => {
  const {token} = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route element={<GuestRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Route>

         {/* ADMIN */}
        <Route element={<ProtectedRoute role="admin" />}>
            <Route path='/admin' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='addBlog' element={<AddBlog />} />
                <Route path='listBlog' element={<ListBlog />} />
                <Route path='comments' element={<Comments />} />
                <Route path="blog/:id" element={<BlogDetails />} />
            </Route>
        </Route>


        {/* USER */}
        <Route element={<ProtectedRoute role="user" />}>
            <Route path='/user' element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path='addBlog' element={<UserAddBlog />} />
                <Route path="blog/:id" element={<BlogDetails />} />
            </Route>
        </Route>


      </Routes>
    </div>
  )
}

export default App