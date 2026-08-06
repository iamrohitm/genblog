import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import logo from '../../assets/logo.png'

const Layout = () => {

    const { navigate, axios, setToken, setUser } = useAppContext();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        axios.defaults.headers.common['Authorization'] = null;

        setToken(null);
        setUser(null);

        navigate('/');
    };

    return (
        <>
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>

                <img
                    src={logo}
                    alt="GenBlog Logo"
                    onClick={() => navigate('/')}
                    className="h-10 w-auto cursor-pointer"
                />

                <button
                    onClick={logout}
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
                >
                    Logout
                </button>

            </div>

            <div className='flex h-[calc(100vh-70px)]'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout