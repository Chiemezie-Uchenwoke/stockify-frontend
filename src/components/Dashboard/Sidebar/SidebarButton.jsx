import { memo } from "react";
import useThemeStore from "../../../stores/ThemeStore";

const SidebarButton = ({icon: Icon, text, view, setView, isActive}) => {
    const {theme} = useThemeStore();

    return (
        <button
            onClick={() => setView(view)}
            className={`${theme === "dark" ? "dark" : ""} flex flex-col items-center md:flex-row gap-1 md:gap-2 text-xs md:text-sm ${isActive ? "text-pri-col dark:text-dark-accent md:bg-pri-col md:text-white-shade md:dark:text-white-shade md:hover:bg-pri-hover" : "text-black/50 md:text-black/80 dark:text-white-shade/70 hover:bg-gray-200 dark:hover:bg-dark-surface/60"} p-2.5 rounded-lg cursor-pointer duration-200 select-none`}

        >
            <span className="text-xs">
                <Icon />
            </span>

            <span className="">
                {text}
            </span>
        </button>
    )
};

export default memo(SidebarButton);