import Logo from "../Logo/Logo";
import useThemeStore from "../../stores/ThemeStore";
import NavLinkItem from "../NavLink/NavLink";
import navLinks from "../../data/navLink";
import ThemeButton from "../ThemeButton/ThemeButton";

const HeaderLg = () => {
    const {theme} = useThemeStore();

    return (
        <header className={`${theme === "dark" ? "dark" : "light"} bg-light-surface dark:bg-dark-surface w-full h-18 border-b border-black/10 dark:border-white-shade/15 hidden lg:flex items-center sticky top-0 left-0 z-50 `}>
            <div className="container text-white-shade flex items-center justify-between">
                <Logo 
                    iconWidth={2.5} 
                    iconHeight={2.5} 
                    iconSize={1.5} 
                    logoTextSize={1.2}
                />

                <div className="flex gap-8 items-center">
                    <ThemeButton iconSize={1.3} />

                    {
                        navLinks.map((linkItem) => {
                            return (
                                <NavLinkItem 
                                    key={linkItem.id}
                                    {...linkItem}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderLg;