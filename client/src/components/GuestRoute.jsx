import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const GuestRoute = () => {
    const { token } = useAppContext()

    return token ? <Navigate to="/" replace /> : <Outlet />
}

export default GuestRoute