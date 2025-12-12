import useAuthStore from "../../stores/authStore";
import useThemeStore from "../../stores/ThemeStore";
import ThemeButton from "../ThemeButton/ThemeButton";
import LogoutButton from "../LogoutButton/LogoutButton";

const UserMenu = ({ref}) => {
    const {user} = useAuthStore();
    const {theme} = useThemeStore();

    return (
        <div 
            className={`${theme === "dark" ? "dark" : ""} flex flex-col items-start gap-3 absolute top-16 right-4 bg-light-surface border border-black/20 dark:border-white-shade/20 py-6 px-3 rounded-2xl w-70 dark:bg-dark-bg shadow-lg`}
            ref={ref}
        >
            <h3 className="text-sm font-medium">
                {user.fullname}  
            </h3>

            <p className="text-xs font-medium">
                {user.email}
            </p>

            <ThemeButton />

            <button className="text-sm cursor-pointer hover:underline">
                Settings
            </button>

            <LogoutButton />
        </div>
    )
};

export default UserMenu;