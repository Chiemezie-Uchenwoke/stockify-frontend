import { useState } from "react";
import useThemeStore from "../../stores/ThemeStore";
import SidebarLg from "./Sidebar/SidebarLg";
import DashboardView from "./Views/DashboardView";

const DashboardContent = () => {
    const [view, setView] = useState("dashboard");
    const {theme} = useThemeStore();
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-[calc(100vh-4rem)] `}>
            <aside className="hidden md:block bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10">
                <SidebarLg 
                    currentView={view}
                    setView={setView} 
                />
            </aside>

            <div className="w-full md:w-[calc(100%-18%)] lg:w-[calc(100%-20%)] ">
                {view === "dashboard" && <DashboardView />}
            </div>
        </div>
    )
};

export default DashboardContent;