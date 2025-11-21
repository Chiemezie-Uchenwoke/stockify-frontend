import SidebarButton from "./SidebarButton";
import sidebarViews from "../../../data/sidebarViewsData";

const SidebarLg = ({currentView, setView}) => {
    return (
        <div className="hidden md:flex flex-col gap-1 w-full h-[80%] overflow-y-auto py-1"
        >
            {
                sidebarViews.map((item) => {
                    return (
                        <SidebarButton 
                            key={item.id}
                            {...item}
                            setView={setView}
                            isActive={item.view === currentView}
                        />
                    )
                })
            }
        </div>
    )
};

export default SidebarLg;