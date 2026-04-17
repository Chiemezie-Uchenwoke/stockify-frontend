import useThemeStore from "../../../stores/ThemeStore";

const DashboardPlaceholderView = ({ title, description }) => {
    const { theme } = useThemeStore();

    return (
        <section className={`${theme === "dark" ? "dark" : ""} rounded-lg border border-black/10 dark:border-white-shade/10 bg-white dark:bg-dark-surface p-6`}>
            <h2 className="text-lg font-semibold text-black/90 dark:text-white-shade">{title}</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white-shade/70">{description}</p>
        </section>
    );
};

export default DashboardPlaceholderView;
