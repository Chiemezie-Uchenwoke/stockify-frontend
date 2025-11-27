import useAuthStore from "../../stores/authStore";
import { Navigate, Outlet } from "react-router";
import AppLoadingSpinner from "../Spinner/AppLoadingSpinner";

const ProtectedRoute = () => {
    const {user, loading} = useAuthStore();

    if (loading) return <AppLoadingSpinner />

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute;