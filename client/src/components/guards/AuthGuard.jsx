import { Navigate, Outlet } from 'react-router'
import useAuthRequest from "../../hooks/useAuthRequest";

export default function AuthGuard() {

    const { isAuthenticated } = useAuthRequest();

    if (!isAuthenticated) {
        return < Navigate to={"/login"} />
    }

    return <Outlet />;
}