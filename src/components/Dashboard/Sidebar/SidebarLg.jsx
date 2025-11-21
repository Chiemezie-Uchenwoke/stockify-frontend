import SidebarButton from "./SidebarButton";
import sidebarViews from "../../../data/sidebarViewsData";

const SidebarLg = ({currentView, setView}) => {
    return (
        <div className="hidden md:flex flex-col gap-1 py-5 px-4 w-full"
        >
            {
                sidebarViews.map((view) => {
                    return (
                        <SidebarButton 
                            key={view.id}
                            {...view}
                            setView={setView}
                            isActive={view.view === currentView}
                        />
                    )
                })
            }
        </div>
    )
};

export default SidebarLg;