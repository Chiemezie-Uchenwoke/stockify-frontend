import Logo from "../Logo/Logo";
import { Link } from "react-router";
import useThemeStore from "../../stores/ThemeStore";
import { FaArrowLeft,  FaEye, FaEyeSlash  } from "react-icons/fa";
import FormButton from "../FormButton/FormButton";
import AuthFormLabel from "../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../AuthTextInput/AuthTextInput";
import { useState } from "react";
import AlertMessage from "../AlertMessage/AlertMessage";
import { requestPasswordReset, resetPassword, verifyToken } from "../../services/authService";
import validateEmail from "../../utils/validateEmail";
import { useNavigate } from "react-router";
import HandlePasswordError from "../PasswordError/HandlePasswordError";

const ForgotPassword = () => {
    const {theme} = useThemeStore();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: "",
    });
   
    const [formData, setFormData] = useState({
        email: "",
        token: "",
        newPassword: "",
    });
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [resetStep, setResetStep] = useState(1);
    const inputType = showPassword ? "text" : "password";

    const handleTogglePasswordVisibility = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleRequestPasswordReset = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            setAlert({
                type: "error",
                title: "Couldn't process request",
                message: "Your account email is required",
            });
            return;
        };

        if (!validateEmail(formData.email)) {
            setAlert({
                type: "error",
                title: "Invalid email",
                message: "Check your email and try again.",
            });
        };
        
        try {
            const data = await requestPasswordReset(formData);

            if (data.success) {
                setAlert({
                    type: "success",
                    title: "Request received",
                    message: data.message,
                })
            
                setResetStep(2);
            }

        } catch(err){
            console.error(err);
            setAlert({
                type: "error",
                title: "Error",
                message: `Error processing request`,
            });
        }
    }

    const handleVerifyToken = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.token) {
            setAlert({
                type: "error",
                title: "Couldn't process request",
                message: "Missing email or token",
            });
            return;
        };

        try {
            const data = await verifyToken(formData);

            if (data.success) {
                setAlert({
                    type: "success",
                    title: "Token verified",
                    message: data.message,
                });

                setResetStep(3);
            }

        } catch (err) {
            console.error(err);
            setAlert({
                type: "error",
                title: "Error",
                message: `Error processing request`,
            });
        }
    }   

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.newPassword) {
            const missingFields = [];

            if (!formData.email) missingFields.push("Email");
            if (!formData.newPassword) missingFields.push("Password");

            setAlert({
                type: "error",
                title: "Couldn't process request",
                message: `Missing required field(s): ${missingFields.join(", ")}`,
            });
            return;
        };

        try {
            const data = await resetPassword(formData);
            console.log(data);

            if (data.success) {
                setAlert({
                    type: "success",
                    title: "Request granted",
                    message: data.message,
                });

                setIsPasswordTouched(false);

                setFormData({
                    email: "",
                    token: "",
                    newPassword: "",
                });

                setResetStep(1);

                setTimeout(() => navigate("/login"), 3000);
            }

        } catch (err) {
            console.error(err);
            setAlert({
                type: "error",
                title: "Error",
                message: `Error processing request`,
            });
        }
    }


    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-screen flex justify-center items-center px-4`}>
            <div className="w-full max-w-100 border border-black/20 bg-light-surface rounded-2xl py-8 px-4 lg:px-6 flex flex-col gap-5 items-center dark:bg-dark-surface">
                <Logo 
                    iconWidth={2} 
                    iconHeight={2} 
                    iconSize={1} 
                    logoTextSize={1}
                />

                <div className="flex flex-col gap-2 w-full">
                    <h2 className="font-bold text-xl sm:text-2xl">
                        Forgot Password
                    </h2>

                    <p className="text-sm dark:text-white-shade/60">
                        Enter your email address and we'll send you instructions to reset your password
                    </p>
                </div>

                <form 
                    className="flex flex-col gap-4 self-start w-full"
                    onSubmit={
                            resetStep === 1 ? handleRequestPasswordReset : resetStep === 2 ? handleVerifyToken : handleResetPassword
                        }
                >
                    {
                        resetStep === 1 &&
                        <div className="flex flex-col gap-1">
                            <AuthFormLabel htmlFor={"email"}>
                                Email
                            </AuthFormLabel>

                            <AuthTextInput 
                                id={"email"}
                                type="email" 
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            />
                        </div>
                    }

                    {
                        (resetStep === 2) && 
                        <div className="flex flex-col gap-1">
                            <AuthFormLabel htmlFor={"token"}>
                                Token
                            </AuthFormLabel>

                            <AuthTextInput 
                                id={"token"}
                                type="text" 
                                placeholder="Enter token"
                                value={formData.token}
                                onChange={(e) => setFormData(prev => ({...prev, token: e.target.value}))}
                            />
                        </div>
                    }

                    {
                        (resetStep === 3) &&
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <AuthFormLabel htmlFor={"newPassword"}>
                                    Password
                                </AuthFormLabel>

                                <button 
                                    type="button" 
                                    className="text-sm flex items-center gap-2 cursor-pointer"
                                    onClick={handleTogglePasswordVisibility}
                                >
                                    {inputType === "password" ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <AuthTextInput 
                                id={"newPassword"}
                                type={inputType} 
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
                                onBlur={() => setIsPasswordTouched(true)}
                            />

                            {
                                ( isPasswordTouched && Number(formData.newPassword.length) < 8 ) ? <HandlePasswordError /> : null
                            }
                        </div>
                    }

                    <FormButton>
                        {resetStep === 1 ? "Send Instructions" : resetStep === 2 ? "Verify Token" : "Reset Password"}
                    </FormButton>
                </form>

                <Link 
                    className="self-start text-sm underline font-medium flex items-center gap-2 dark:text-white-shade/60"
                    to={"/login"}
                >
                    <FaArrowLeft className="relative top-0.5" /> Back To Login
                </Link>
            </div>

            <AlertMessage 
                type={alert.type} 
                title={alert.title} 
                message={alert.message} 
                onClose={() => setAlert({type: "", title: "", message: ""})} 
            />
        </div>
    );
};

export default ForgotPassword;