import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const { axios, setToken, setUser, navigate } = useAppContext();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const {data} = await axios.post('/api/auth/login', {email, password})
      console.log(data)
      if(data.success){
        setToken(data.token)
        setUser(data.user);

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user));

        axios.defaults.headers.common['Authorization'] = data.token;
        toast.success("Login successful!")

        navigate('/');
      }else{
        toast.error(data.message)
        console.log(data)
      //  console.log(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Log</span>in
            </h1>
            <p className='font-light'>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} required placeholder='your email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>

            <div className='flex flex-col'>
              <label>Password</label> 
              <input type="password" onChange={(e)=>setPassword(e.target.value)} required placeholder='your password' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>

            <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
          </form>

          <p className='mt-6 text-sm text-gray-500'>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className='text-primary cursor-pointer hover:underline'
            >
              Sign up
            </span>
          </p>

        </div>
      </div>

      
    </div>
  )
}

export default Login
