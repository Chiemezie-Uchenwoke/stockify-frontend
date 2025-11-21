import { memo } from "react";
import useThemeStore from "../../../stores/ThemeStore";

const SidebarButton = ({icon: Icon, text, view, setView, isActive}) => {
    const {theme} = useThemeStore();

    return (
        <button
            onClick={() => setView(view)}
            className={`${theme === "dark" ? "dark" : ""} flex flex-col items-center md:flex-row gap-2 text-sm dark:text-white-shade/70 ${isActive ? "bg-pri-col text-white-shade hover:bg-pri-hover" : "hover:bg-gray-200 dark:hover:bg-dark-surface/60"} p-2.5 rounded-lg cursor-pointer duration-200 `}
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