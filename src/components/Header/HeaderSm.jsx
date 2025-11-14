import useThemeStore from "../../stores/ThemeStore";
import Logo from "../Logo/Logo";
import ThemeButton from "../ThemeButton/ThemeButton";
import NavLinkItem from "../NavLink/NavLink";
import navLinks from "../../data/navLink";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

const HeaderSm = () => {
    const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
    const {theme} = useThemeStore();

    return (
        <header className={`${theme === "dark" ? "dark" : "light"} bg-light-surface dark:bg-dark-bg w-full h-17 border-b border-black/10 dark:border-white-shade/15 flex lg:hidden items-center sticky top-0 left-0 z-50 `}>
            <nav className="px-2 w-full h-full flex items-center justify-between relative">
                <Logo 
                    iconWidth={2.45} 
                    iconHeight={2.45} 
                    iconSize={1.5} 
                    logoTextSize={1.05}
                />

                <div className="flex gap-5 items-center">
                    <ThemeButton iconSize={1.3} />

                    <div>
                        <button 
                            className="border border-black/30 p-1 text-xl rounded"
                            onClick={() => setIsMobileDropdownVisible(prev => !prev)}
                        >
                            <IoMdMenu />
                        </button>

                        {
                            isMobileDropdownVisible &&
                            <ul className="absolute top-full left-0 w-full max-w-60 bg-light-surface border-r border-t border-black/10 h-[calc(100vh-4.25rem)] flex flex-col justify-center items-center gap-8 shadow-lg z-40">
                                {
                                    navLinks.map((linkItem) => {
                                        return (
                                            <li>
                                                <NavLinkItem 
                                                    key={linkItem.id}
                                                    {...linkItem}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderSm;