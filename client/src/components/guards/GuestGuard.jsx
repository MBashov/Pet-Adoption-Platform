import { Navigate, Outlet } from 'react-router'
import useAuthRequest from "../../hooks/useAuthRequest";

export default function GuestGuard() {

    const { isAuthenticated } = useAuthRequest();

    if (isAuthenticated) {
        return < Navigate to="/" />
    }

    return <Outlet />
}