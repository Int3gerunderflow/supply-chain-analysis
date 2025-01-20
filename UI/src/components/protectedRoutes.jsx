import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./auth"

export const ProtectedRoute = () => {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/map" />
    }
    else{
        return <Outlet/>
    }
}