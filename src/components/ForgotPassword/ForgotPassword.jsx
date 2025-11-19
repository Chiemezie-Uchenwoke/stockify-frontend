import Logo from "../Logo/Logo";
import { Link } from "react-router";
import useThemeStore from "../../stores/ThemeStore";
import { FaArrowLeft } from "react-icons/fa";
import FormButton from "../FormButton/FormButton";

const ForgotPassword = () => {
    const {theme} = useThemeStore();

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

                <form className="flex flex-col gap-4 self-start w-full">
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email"
                            className="text-sm font-medium"
                        >
                            Email
                        </label>

                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            className="w-full h-10 rounded border border-black/20 outline-0 text-sm px-3 focus:outline-1 outline-pri-col dark:border-white-shade/15"
                        />
                    </div>

                    <FormButton>
                        Reset Password
                    </FormButton>
                </form>

                <Link 
                    className="self-start text-sm underline font-medium flex items-center gap-2 dark:text-white-shade/60"
                    to={"/login"}
                >
                    <FaArrowLeft className="relative top-0.5" /> Back To Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;