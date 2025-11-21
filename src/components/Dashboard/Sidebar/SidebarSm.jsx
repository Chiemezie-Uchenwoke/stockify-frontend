import sidebarViews from "../../../data/sidebarViewsData";
import SidebarButton from "./SidebarButton";
import useThemeStore from "../../../stores/ThemeStore";

const SidebarSm = ({currentView, setView}) => {
    const {theme} = useThemeStore();

    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-18 border-t border-black/10 fixed bottom-0 left-0 z-30 bg-light-surface dark:bg-dark-surface md:hidden`}>
            <div className="container flex overflow-x-auto h-full items-center justify-between gap-3">
                {
                    sidebarViews.map((item) => {
                        return (
                            <SidebarButton 
                                key={item.id}
                                {...item}
                                isActive={item.view === currentView}
                                setView={setView}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SidebarSm;