import { useState } from "react";
import useThemeStore from "../../stores/ThemeStore";
import SidebarLg from "./Sidebar/SidebarLg";
import DashboardView from "./Views/DashboardView";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import SidebarSm from "./Sidebar/SidebarSm";

const DashboardContent = () => {
    const [view, setView] = useState("dashboard");
    const {theme} = useThemeStore();
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-[calc(100vh-4rem)] `}>
            <aside className="hidden md:flex flex-col justify-between bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10 py-5 px-4 ">
                <SidebarLg 
                    currentView={view}
                    setView={setView} 
                />

                <div className="w-full border-t border-black/20 dark:border-white-shade/10 py-2">
                    <button className="flex items-center gap-2 text-sm p-2.5 rounded-lg cursor-pointer duration-200 hover:bg-gray-200 dark:hover:bg-dark-surface/60 w-full dark:text-white-shade/60">
                        <span className="text-xs">
                            <FaArrowRightFromBracket />
                        </span>

                        <span className="">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            <div className="w-full md:w-[calc(100%-18%)] lg:w-[calc(100%-20%)] ">
                {view === "dashboard" && <DashboardView />}
            </div>

            <SidebarSm 
                currentView={view}
                setView={setView}
            />
        </div>
    )
};

export default DashboardContent;