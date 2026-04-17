import { Outlet } from "react-router";
import useThemeStore from "../../stores/ThemeStore";
import DashboardHeaderLg from "./DashboardHeaderLg";
import DashboardHeaderSm from "./DashboardHeaderSm";
import SidebarLg from "./Sidebar/SidebarLg";
import SidebarSm from "./Sidebar/SidebarSm";
import LogoutButton from "../LogoutButton/LogoutButton";

const DashboardLayout = () => {
    const { theme } = useThemeStore();

    return (
        <>
            <DashboardHeaderLg />
            <DashboardHeaderSm />

            <div className={`${theme === "dark" ? "dark" : ""} w-full 2xl:w-[65%] 2xl:mx-auto 2xl:border-r 2xl:border-black/10 dark:border-white-shade/10 h-[calc(100vh-4rem)] md:flex`}>
                <aside className="hidden md:flex flex-col justify-between bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10 py-5 px-4 2xl:border-l">
                    <SidebarLg />

                    <div className="w-full border-t border-black/20 dark:border-white-shade/10 py-2">
                        <LogoutButton />
                    </div>
                </aside>

                <main className="w-full md:w-[calc(100%-20%)] lg:w-[calc(100%-18%)] h-[calc(100vh-8.5rem)] md:h-[calc(100vh-4rem)] overflow-y-auto py-5 px-4">
                    <Outlet />
                </main>

                <SidebarSm />
            </div>
        </>
    );
};

export default DashboardLayout;
