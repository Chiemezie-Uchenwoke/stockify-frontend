import Logo from "../Logo/Logo";
import { FaRegUser} from "react-icons/fa";
import useThemeStore from "../../stores/ThemeStore";
import UserMenu from "./UserProfileMenu";
import { useState } from "react";

const DashboardHeaderLg = () => {
    const {theme} = useThemeStore();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className={`${theme === "dark" ? "dark" : ""} w-full 2xl:w-[65%] 2xl:border 2xl:mx-auto h-16 hidden md:flex items-center justify-between border-b border-black/15 dark:border-white-shade/10 px-4 bg-light-surface dark:bg-dark-bg sticky top-0 left-0 z-50`}>
            <Logo 
                iconWidth={2} 
                iconHeight={2} 
                iconSize={1} 
                logoTextSize={1}
            />

            <div className="flex items-center gap-4">
                <button 
                    className="border border-black/30 p-2 rounded cursor-pointer bg-light-surface hover:brightness-95 duration-200 dark:bg-transparent dark:border-white-shade/30 dark:text-white-shade/70 outline-0"
                    onClick={() => setIsUserMenuOpen(prev => !prev)}
                >
                    <FaRegUser />
                </button>
            </div>

            {isUserMenuOpen && 
                <UserMenu />
            }
        </header>
    )
};

export default DashboardHeaderLg;