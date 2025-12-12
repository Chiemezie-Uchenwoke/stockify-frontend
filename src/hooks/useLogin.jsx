import { login } from "../services/authService";
import { useState } from "react";
import validateEmail from "../utils/validateEmail";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";

const useLogin = () => {

    const navigate = useNavigate();
    const {setUser, setIsAuthenticated, setIsLoading} = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: "",
    });
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    

    const loginUser = async () => {
        setLoading(true);

        if (!formData.email || !formData.password) {
            setAlert({
                type: "error",
                title: "Incomplete credentials",
                message: "Missing required fields",
            });
            setLoading(false);
            return;
        }

        if (!validateEmail(formData.email)){
            setAlert({
                type: "error",
                title: "Invalid email",
                message: "Check your email and try again.",
            });
            setLoading(false);
            return;
        }

        try {
            const data = await login(formData);

            if (data.success) {
                setLoading(false);
                setIsLoading(false);
                setUser(data.user);
                setIsAuthenticated(true);
                setFormData({
                    email: "",
                    password: "",
                });

                setIsPasswordTouched(false);

                setAlert({
                    type: "success",
                    title: "Sign in successful.",
                    message: data.message || "You logged in successfully",
                });

                setTimeout(() => navigate("/dashboard"), 3000);

            } else {
                setAlert({
                    type: "error",
                    title: "Sign in failed",
                    message: data.message,
                });

                setLoading(false);
            }

        } catch(err) {
            console.error("Error sigining in: ", err);
            setAlert({
                type: "error",
                title: "Error",
                message: "Internal server error. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        formData,
        setFormData,
        alert,
        setAlert,
        isPasswordTouched,
        setIsPasswordTouched,
        loading,
        loginUser
    }
    
}

export default useLogin;