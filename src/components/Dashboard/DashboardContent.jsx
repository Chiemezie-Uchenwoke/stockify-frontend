import useThemeStore from "../../stores/ThemeStore";

const DashboardContent = () => {
    const {theme} = useThemeStore();
    
    return (
        <div className={`${theme === "dark" ? "dark" : ""} w-full h-[calc(100vh-4rem)] `}>
            <div className="hidden md:block bg-light-surface w-[20%] lg:w-[18%] h-full border-r border-black/10 dark:bg-dark-bg dark:border-white-shade/10">
                <div className="">

                </div>
            </div>

            <div className="w-full md:w-[calc(100%-18%)] lg:w-[calc(100%-20%)] ">

            </div>
        </div>
    )
};

export default DashboardContent;