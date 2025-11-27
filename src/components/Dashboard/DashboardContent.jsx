import { useState } from "react";
import useThemeStore from "../../stores/ThemeStore";
import SidebarLg from "./Sidebar/SidebarLg";
import DashboardView from "./Views/DashboardView";

import SidebarSm from "./Sidebar/SidebarSm";
import useAuthStore from "../../stores/authStore";
import LogoutButton from "../LogoutButton/LogoutButton";

const DashboardContent = () => {
    const [view, setView] = useState("dashboard");
    const {theme} = useThemeStore();
    const {logout, user} = useAuthStore();
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-[calc(100vh-4rem)] `}>
            <aside className="hidden md:flex flex-col justify-between bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10 py-5 px-4 ">
                <SidebarLg 
                    currentView={view}
                    setView={setView} 
                />

                <div className="w-full border-t border-black/20 dark:border-white-shade/10 py-2">
                    <LogoutButton />
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