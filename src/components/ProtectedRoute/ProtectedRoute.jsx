import useAuthStore from "../../stores/authStore";
import { Navigate, Outlet } from "react-router";
import AppLoadingSpinner from "../Spinner/AppLoadingSpinner";

const ProtectedRoute = () => {
    const {user, isLoading} = useAuthStore();

    if (isLoading) return <AppLoadingSpinner />

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute;