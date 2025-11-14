import { Link } from "react-router";
import useThemeStore from "../../stores/ThemeStore";
import { motion } from "motion/react" // eslint-disable-line no-unused-vars
import heroImage from "../../assets/hero_1.jpg";

const Hero = () => {
    const {theme} = useThemeStore();

    return (
        <section 
            className={`${theme === "dark" ? "dark" : ""} w-full min-h-[calc(100vh-4.25rem)] 2xl:min-h-[calc(70vh-4.25rem)] flex justify-center items-center bg-pri-col/5 bg-top bg-cover bg-no-repeat relative before:absolute before:w-full before:h-full before:bg-dark-bg/82 dark:before:bg-dark-bg/83 `}
            style={{backgroundImage: `url(${heroImage})`}}
        >
            <div className="container h-full flex flex-col items-center justify-center gap-7 lg:gap-8 py-16 lg:py-18">                
                <motion.h1 
                    className="font-bold text-3xl md:text-4xl lg:text-6xl text-center w-full max-w-80 sm:max-w-100 md:max-w-120 lg:max-w-200 relative z-2 text-light-surface"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} 
                    whileHover={{ scale: 1.05, y: -5 }}
                >
                    Track. Analyze. Grow your business.
                </motion.h1>

                <p className="text-center w-full max-w-120 sm:max-w-130 lg:max-w-150 lg:text-lg text-light-surface relative z-2">
                    Stockify helps importers and retailers manage inventory, expenses, and sales easily so you can streamline your operations and grow your business.
                </p>

                <div className="flex flex-col items-center gap-4 w-full pt-3 sm:flex-row sm:justify-center">
                    <Link 
                        to={"/login"}
                        className="bg-light-surface dark:bg-transparent dark:border-pri-col dark:text-dark-accent dark:hover:bg-pri-col dark:hover:text-dark-text-primary  hover:brightness-95 border border-black/15 duration-200 py-3 lg:py-4 px-12 rounded-2xl font-medium w-full text-center sm:w-fit relative z-2 lg:text-lg"
                    >
                        Sign In
                    </Link>

                    <Link 
                        to={"/register"}
                        className="bg-pri-col hover:bg-pri-hover border border-black/10 duration-200 text-light-surface py-3 lg:py-4 px-12 rounded-2xl font-medium w-full text-center sm:w-fit relative z-2 lg:text-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero;