import React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASEURL

const AppContext = createContext();


export const AppProvider = ({children}) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]) 
    const [input, setInput] = useState("")
    const [authLoading, setAuthLoading] = useState(true);

    const fetchBlogs = async()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            console.log(data)
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogs();

        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token  && storedUser) {
            setToken(token);
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = token;
        }

        setAuthLoading(false);
    },[])

    const value = {
        axios, navigate, token, setToken,user,
        setUser,authLoading, blogs, setBlogs, input, setInput
    }



    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
