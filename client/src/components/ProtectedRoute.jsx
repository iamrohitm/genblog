import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const ProtectedRoute = ({ role }) => {

    const { token, user, authLoading } = useAppContext();

    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;