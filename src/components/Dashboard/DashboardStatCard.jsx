import { memo } from "react";
import useThemeStore from "../../stores/ThemeStore";
import { TbCurrencyNaira } from "react-icons/tb";

const DashboardStatCard = ({statTitle, icon: Icon, value, iconBgColor, iconColor}) => {
    const {theme} = useThemeStore();
    const currentIconColor = theme === "dark" ? iconColor.darkTheme : iconColor.lightTheme;
    const currentIconBgColor = theme === "dark" ? iconBgColor.darkTheme : iconBgColor.lightTheme;

    return (
        <div className={`${theme === "dark" ? "dark" : ""} border border-black/15 dark:border-white-shade/20 py-6 px-4 rounded-2xl bg-light-surface dark:bg-dark-surface hover:shadow-lg duration-200 flex flex-col gap-1`}>
            <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm text-light-text-primary/60 dark:text-white-shade/60">
                    {statTitle}
                </p>

                <span
                    style={{backgroundColor: currentIconBgColor, color: currentIconColor}}
                    className="text-sm p-3 rounded-lg"
                >
                    <Icon />
                </span>
            </div>

            <p className={`${statTitle === "Total Revenue" || statTitle === "Net Profit" ? "flex items-center gap-2" : "" } font-bold`}>
                <span>
                    {statTitle === "Total Revenue" || statTitle === "Net Profit" ? <TbCurrencyNaira /> : null}
                </span>

                <span>
                    {value.toLocaleString()}
                </span>
            </p>
        </div>
    )
}

export default memo(DashboardStatCard);