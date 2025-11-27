import useThemeStore from "../../stores/ThemeStore";

const AppLoadingSpinner = () => {
    const {theme} = useThemeStore();
    return (
        <div className={`${theme === "dark" ? "dark" : ""} flex items-center justify-center w-full h-screen`}>
            <div className="w-10 h-10 border-4 border-gray-300 border-t-pri-col dark:border-t-accent-col rounded-full animate-spin"></div>
        </div>
    )
}

export default AppLoadingSpinner;