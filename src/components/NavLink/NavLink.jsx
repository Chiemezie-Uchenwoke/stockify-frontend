import { Link } from "react-router"
import useThemeStore from "../../stores/ThemeStore";


const NavLinkItem = ({path, pageText, isRegister}) => {
    const {theme} = useThemeStore();

    return (
        <Link to={path} className={`${theme === "dark" ? "dark" : "light"} text-light-text-primary dark:text-white-shade capitalize font-medium ${isRegister ? "bg-pri-col text-white-shade py-2 px-8 rounded-2xl hover:bg-pri-hover" : ""}`}>
            {pageText}
        </Link>
    )   
}

export default NavLinkItem;