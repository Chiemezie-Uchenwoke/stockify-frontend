import Logo from "../Logo/Logo";
import useThemeStore from "../../stores/ThemeStore";
import { Link } from "react-router";
import FormButton from "../FormButton/FormButton";
import AuthFormLabel from "../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../AuthTextInput/AuthTextInput";
import AlertMessage from "../AlertMessage/AlertMessage";
import { useState } from "react";
import { signUp } from "../../services/authService";
import validateEmail from "../../utils/validateEmail";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const {theme} = useThemeStore();
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

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

    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-screen flex justify-center items-center px-4 overflow-y-auto`}>
            <div className="w-full max-w-100 border border-black/20 bg-light-surface rounded-2xl py-8 px-4 lg:px-6 flex flex-col gap-4 items-center dark:bg-dark-surface">
                <Logo 
                    iconWidth={2} 
                    iconHeight={2} 
                    iconSize={1} 
                    logoTextSize={1}
                />

                <div className="flex flex-col gap-1 self-start w-full">
                    <h2 className="font-bold text-xl sm:text-2xl">
                        Create an account
                    </h2>

                    <p className="text-sm dark:text-white-shade/60">
                        Enter your details below to create an account
                    </p>
                </div>

                <form 
                    className="flex flex-col gap-3 w-full"
                    onSubmit={handleSignUp}
                >
                    <div className="flex flex-col gap-1">
                        <AuthFormLabel htmlFor={"fullname"}>
                            Fullname
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"fullname"}
                            type="text" 
                            placeholder="Ex: John Doe"
                            value={formData.fullname}
                            onChange={(e) => setFormData((prev) => ({...prev, fullname: e.target.value}))}
                        />
                    </div>

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

                    <div className="flex flex-col gap-1">
                        <AuthFormLabel htmlFor={"password"}>
                            Password
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"password"}
                            type="password" 
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                        />
                    </div>

                    <FormButton loading={loading}>
                        Register
                    </FormButton>
                </form>

                <p className="text-sm">
                    <span className="dark:text-white-shade/80">Already have an account? </span>
                    <Link to={"/login"} className="text-pri-col font-medium dark:text-dark-accent">Login</Link>
                </p>
            </div>

            <AlertMessage 
                title={alert.title} 
                message={alert.message} 
                type={alert.type} 
                onClose={() => setAlert({type: "", message: "", title: ""})}
            />
        </div>
    );
};

export default Register;