import { useState } from "react";
import useThemeStore from "../../stores/ThemeStore";
import SidebarLg from "./Sidebar/SidebarLg";
import DashboardView from "./Views/DashboardView";
import BatchesView from "./Views/BatchesView";
import ProductsView from "./Views/ProductsView";

import SidebarSm from "./Sidebar/SidebarSm";
// import useAuthStore from "../../stores/authStore";
import LogoutButton from "../LogoutButton/LogoutButton";

const DashboardContent = () => {
    const [view, setView] = useState("dashboard");
    const {theme} = useThemeStore();
    // const {logout, user} = useAuthStore();
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full 2xl:w-[65%] 2xl:mx-auto 2xl:border-r 2xl:border-black/10 dark:border-white-shade/10  h-[calc(100vh-4rem)] md:flex `}>
            <aside className="hidden md:flex flex-col justify-between bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10 py-5 px-4 2xl:border-l">
                <SidebarLg 
                    currentView={view}
                    setView={setView} 
                />

                <div className="w-full border-t border-black/20 dark:border-white-shade/10 py-2">
                    <LogoutButton />
                </div>
            </aside>

            <div className="w-full md:w-[calc(100%-20%)] lg:w-[calc(100%-18%)] h-[calc(100vh-8.5rem)] md:h-[calc(100vh-4rem)] overflow-y-auto py-5 px-4">
                {view === "dashboard" && <DashboardView />}
                {view === "batches" && <BatchesView />}
                {view === "products" && <ProductsView />}
            </div>

            <SidebarSm 
                currentView={view}
                setView={setView}
            />
        </div>
    )
};

export default DashboardContent;