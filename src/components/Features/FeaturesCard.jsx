import { IoCheckmark } from "react-icons/io5";
import useThemeStore from "../../stores/ThemeStore";

const FeaturesCard = ({title, description, icon: Icon, keyFeatures, bgColor, iconColor}) => {
    const {theme} = useThemeStore();
    const currentBgColor = `${theme === "dark" ? bgColor.darkTheme : bgColor.lightTheme}`;
    const currentIconColor = `${theme === "dark" ? iconColor.darkTheme : iconColor.lightTheme}`;

    return (
        <div className={`${theme === "dark" ? "dark" : ""} border border-black/10 rounded-2xl py-8 px-4 lg:px-6 flex flex-col gap-4 bg-light-surface dark:bg-dark-surface hover:shadow-lg dark:hover:scale-97 duration-200 transition`}>
            <span 
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded border flex justify-center items-center border-black/10 text-xl `}
                style={{backgroundColor: currentBgColor, color: currentIconColor}}
            >
                <Icon />
            </span>

            <h3 className={`font-bold sm:text-lg`}>
                {title}
            </h3>

            <p className={`text-light-text-primary/60 dark:text-light-surface/70`}>
                {description}
            </p>

            <ul className={`flex flex-col gap-2`}>
                {
                    keyFeatures.map((f) => {
                        return (
                            <li 
                                key={f} 
                                className="flex items-center gap-2 text-light-text-primary/60 dark:text-light-surface/70 text-sm"
                            >
                                <IoCheckmark className="text-green-600" /> {f}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default FeaturesCard;
