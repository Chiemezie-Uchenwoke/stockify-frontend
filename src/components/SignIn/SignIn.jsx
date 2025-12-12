import Logo from "../Logo/Logo";
import { Link } from "react-router";
import useThemeStore from "../../stores/ThemeStore";
import FormButton from "../FormButton/FormButton";
import AuthFormLabel from "../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../AuthTextInput/AuthTextInput";
import AlertMessage from "../AlertMessage/AlertMessage";
import HandlePasswordError from "../PasswordError/HandlePasswordError";
import useLogin from "../../hooks/useLogin";

const SignIn = () => {
    const {theme} = useThemeStore();
    const {
        formData,
        setFormData,
        alert,
        setAlert,
        isPasswordTouched,
        setIsPasswordTouched,
        loading,
        loginUser
    } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser();
    }
    
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-screen flex justify-center items-center px-4`}>
            <div className="w-full max-w-100 border border-black/20 bg-light-surface rounded-2xl py-8 px-4 lg:px-6 flex flex-col gap-4 items-center dark:bg-dark-surface">
                <Logo 
                    iconWidth={2} 
                    iconHeight={2} 
                    iconSize={1} 
                    logoTextSize={1}
                />

                <div className="flex flex-col gap-4 self-start w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className="font-bold text-xl sm:text-2xl">
                            Login
                        </h2>

                        <p className="text-sm dark:text-white-shade/60">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form  
                        className="flex flex-col gap-3 w-full"
                        onSubmit={handleLogin}
                    >
                        <div className="flex flex-col gap-1">
                            <AuthFormLabel htmlFor={"email"}>
                                Email
                            </AuthFormLabel>

                            <AuthTextInput 
                                type="email"
                                id={"email"}
                                placeholder={"name@example.com"}
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <AuthFormLabel htmlFor={"password"}>
                                    Password
                                </AuthFormLabel>

                                <Link 
                                    className="forgot-password"
                                    to={"/forgot-password"}
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <AuthTextInput 
                                id={"password"}
                                type="password" 
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                                onBlur={() => setIsPasswordTouched(true)}
                            />

                            {
                                ( isPasswordTouched && Number(formData.password.length) < 8 ) ? <HandlePasswordError /> : null
                            }
                        </div>

                        <FormButton loading={loading}>
                            Sign In
                        </FormButton>

                    </form>

                    <p className="text-sm">
                        <span className="dark:text-white-shade/80">Don't have an account? </span>
                        <Link to={"/register"} className="text-pri-col font-medium dark:text-dark-accent">Sign Up</Link>
                    </p>
                    
                    <Link 
                        className="underline text-sm font-medium dark:text-white-shade/60 w-fit"
                        to={"/"}
                    >
                        Return Home
                    </Link>
                </div>
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

export default SignIn;