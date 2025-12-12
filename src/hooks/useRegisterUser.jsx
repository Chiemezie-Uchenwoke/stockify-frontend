import { useState } from "react";
import { signUp } from "../services/authService";
import validateEmail from "../utils/validateEmail";
import { useNavigate } from "react-router";

const useRegisterUser = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: ""
    });
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    const registerNewUser = async () => {
        setLoading(true);

        if (!formData.fullname || !formData.email || !formData.password) {
            setAlert({
                type: "error",
                title: "Incomplete credentials",
                message: "Missing required fields",
            });
            setLoading(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            setAlert({
                type: "error",
                title: "Invalid Email",
                message: "Check your email and try again"
            });
            setLoading(false);
            return;
        }

        try {
            const data = await signUp(formData);

            if (data.success) {
                setLoading(false);
                setFormData({
                    fullname: "",
                    email: "",
                    password: "",
                });

                setIsPasswordTouched(false);

                setAlert({
                    type: "success",
                    title: "Registration successful",
                    message: `${data.message}` || "Account created successfully."
                });

                setTimeout(() => navigate("/login"), 3000);
            } else {
                setAlert({
                    type: "error",
                    title: "Registration failed",
                    message: `${data.message}` || "Couldn't create account. Try again"
                });
                setLoading(false);
            }
            

        } catch (err) {
            console.error(err);
            setAlert({
                type: "error",
                title: "Error",
                message: "Something went wrong. Please try again."
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
        loading,
        isPasswordTouched,
        setIsPasswordTouched,
        registerNewUser,
    }

}

export default useRegisterUser;