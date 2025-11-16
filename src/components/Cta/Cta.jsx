import { Link } from "react-router";
import { HiOutlineBolt } from "react-icons/hi2";
import { BsShield } from "react-icons/bs";
import { PiGlobeLight } from "react-icons/pi";
import useThemeStore from "../../stores/ThemeStore";

const Cta = () => {
    const {theme} = useThemeStore();

    return (
        <section className={`${theme === "dark" ? "dark" : ""} mt-16 bg-pri-col dark:bg-dark-surface py-16 flex flex-col items-center gap-5 px-2`}>
            <h2 className="capitalize font-bold text-white-shade text-2xl text-center sm:text-3xl">
                Ready to transform your business?
            </h2>

            <p className="text-center text-white-shade/80 w-full max-w-120 dark:text-white-shade/60">
                Streamline your inventory management with Stockify. Built for importers and retailers who demand simplicity and reliability.
            </p>

            <Link 
                to="/login"
                className="bg-light-surface text-pri-col hover:scale-105 hover:-translate-y-1 duration-200 py-3 lg:py-4 px-12 rounded-2xl font-medium capitalize lg:text-lg my-3 lg:my-4 dark:bg-pri-col dark:text-white-shade"
            >
                get started today
            </Link>

            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center text-xs sm:text-sm text-white-shade mt-2 dark:text-white-shade/50">
                <span className="flex items-center gap-2">
                    <HiOutlineBolt /> Real-time Updates
                </span>

                <span className="flex items-center gap-2">
                    <BsShield /> Enterprise Security
                </span>

                <span className="flex items-center gap-2">
                    <PiGlobeLight /> Global Ready
                </span>
            </div>
        </section>
    )
};

export default Cta;