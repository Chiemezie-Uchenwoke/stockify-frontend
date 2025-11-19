import Logo from "../Logo/Logo";
import { FaRegUser, FaPlus } from "react-icons/fa";

const DashboardHeaderLg = () => {
    return (
        <header className="w-full h-16 hidden md:flex items-center justify-between border-b border-black/15 px-4 ">
            <Logo 
                iconWidth={2} 
                iconHeight={2} 
                iconSize={1} 
                logoTextSize={1}
            />

            <div className="flex items-center gap-4">
                <button className="border border-black/30 p-2 rounded cursor-pointer bg-light-surface hover:brightness-95 duration-200">
                    <FaRegUser />
                </button>

                <button 
                    className="flex items-center gap-2 bg-pri-col text-white-shade py-2 px-4 rounded-lg font-medium text-sm cursor-pointer hover:bg-pri-hover duration-200"
                >
                    <FaPlus /> New Batch
                </button>
            </div>
        </header>
    )
};

export default DashboardHeaderLg;