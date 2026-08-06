import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import logo from '../assets/logo.png'

const Navbar = () => {
    const {navigate, token, user} = useAppContext()

    const handleDashboard = () => {
        if (user?.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    };
    
    return (
        <div className='flex justify-between items-center py-5 mx-8  sm:mx-20 xl:mx-32'>
            {/* <h1 onClick={()=>navigate('/')} className='w-32 sm:w-44 cursor-pointer'>Logo</h1> */}
            <img
                src={logo}
                alt="GenBlog Logo"
                onClick={() => navigate('/')}
                className="h-12 w-auto cursor-pointer"
            />
            <button onClick={token ? handleDashboard : () => navigate('/login')}
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
            >
                {token ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" />
            </button>
        </div>
    )
}

export default Navbar
