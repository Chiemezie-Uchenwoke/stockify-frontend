import useAuthStore from "../../stores/authStore";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const LogoutButton = () => {
    const {logout} = useAuthStore();

    return (
        <button 
            className="flex items-center gap-2 text-sm p-2.5 rounded-lg cursor-pointer duration-200 hover:bg-gray-200 dark:hover:bg-dark-surface/60 w-full dark:text-white-shade/60"
            onClick={logout}
        >
            <span className="text-xs">
                <FaArrowRightFromBracket />
            </span>
        
            <span className="">
                Logout
            </span>
        </button>
    )
}

export default LogoutButton;