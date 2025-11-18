import Logo from "../Logo/Logo";
import { Link } from "react-router";
import useThemeStore from "../../stores/ThemeStore";

const SignIn = () => {
    const {theme} = useThemeStore();

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

                    <form  className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <label 
                                htmlFor="email"
                                className="sign-in-form-label"
                            >
                                Email
                            </label>

                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                className="sign-in-form-input"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <label 
                                    htmlFor="password"
                                    className="sign-in-form-label"
                                >
                                    Password
                                </label>

                                <Link 
                                    className="forgot-password"
                                    to={"/forgot-password"}
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="sign-in-form-input"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="bg-pri-col text-white-shade py-3 rounded-2xl font-medium active:translate-y-1 hover:bg-pri-hover duration-200 cursor-pointer"
                        >
                            Sign In
                        </button>

                    </form>

                    <p className="text-sm">
                        <span className="dark:text-white-shade/80">Don't have an account? </span>
                        <Link to={"/register"} className="text-pri-col font-medium dark:text-dark-accent">Sign Up</Link>
                    </p>
                    
                    <Link 
                        className="underline text-sm font-medium dark:text-white-shade/60"
                        to={"/"}
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;