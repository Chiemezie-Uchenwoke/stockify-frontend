import { FiMoon } from "react-icons/fi";
import { PiSunLight } from "react-icons/pi";
import useThemeStore from "../../stores/ThemeStore";

const ThemeButton = ({iconSize}) => {
    const {theme, toggleTheme} = useThemeStore();

    return (
        <button
            className="cursor-pointer select-none text-light-text-primary dark:text-white-shade"
            onClick={toggleTheme}
            style={{fontSize: `${iconSize}rem`}}
        >
            {theme === "dark" ? <PiSunLight /> : <FiMoon />}
        </button>
    )
}

export default ThemeButton;