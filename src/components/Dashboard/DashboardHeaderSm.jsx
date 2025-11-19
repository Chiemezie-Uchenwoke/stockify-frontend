import Logo from "../Logo/Logo";
import useThemeStore from "../../stores/ThemeStore";
import { FaRegUser} from "react-icons/fa";

const DashboardHeaderSm = () => {
    const {theme} = useThemeStore();

    return (
        <header className={`${theme === "dark" ? "dark" : ""} w-full h-16 md:hidden bg-light-surface dark:bg-dark-bg border-b border-black/15 dark:border-white-shade/10 sticky top-0 left-0 flex items-center`}>
            <div className="w-full h-full px-2 flex justify-between items-center">
                <Logo 
                    iconWidth={2} 
                    iconHeight={2} 
                    iconSize={1} 
                    logoTextSize={1}
                />

                <button className="border border-black/30 w-9 h-9 rounded-full cursor-pointer bg-light-surface hover:brightness-95 duration-200 dark:bg-transparent dark:border-white-shade/20 flex justify-center items-center dark:text-white-shade/70">
                    <FaRegUser />
                </button>
            </div>
        </header>
    )
};

export default DashboardHeaderSm;