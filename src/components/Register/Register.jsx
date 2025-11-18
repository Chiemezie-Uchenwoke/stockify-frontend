import Logo from "../Logo/Logo";
import useThemeStore from "../../stores/ThemeStore";
import { Link } from "react-router";

const Register = () => {
    const {theme} = useThemeStore();

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

                <form className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="fullname"
                            className="sign-up-form-label"
                        >
                            Fullname
                        </label>

                        <input 
                            type="text" 
                            placeholder="Ex: John Doe" 
                            className="sign-up-form-input"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email"
                            className="sign-up-form-label"
                        >
                            Email
                        </label>

                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            className="sign-up-form-input"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="password"
                            className="sign-up-form-label"
                        >
                            Password
                        </label>

                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            className="sign-up-form-input"
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
                    <span className="dark:text-white-shade/80">Already have an account? </span>
                    <Link to={"/login"} className="text-pri-col font-medium dark:text-dark-accent">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;