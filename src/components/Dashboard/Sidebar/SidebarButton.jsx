import { memo } from "react";

const SidebarButton = ({icon: Icon, text, view, setView, isActive}) => {
    return (
        <button
            onClick={() => setView(view)}
            className={`flex flex-col items-center md:flex-row gap-2 text-sm ${isActive ? "bg-pri-col text-white-shade" : ""} p-2.5 rounded-lg`}
        >
            <span className="text-xs">
                <Icon />
            </span>

            <span>
                {text}
            </span>
        </button>
    )
};

export default memo(SidebarButton);