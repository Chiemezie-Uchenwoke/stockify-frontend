import { useEffect, useState } from "react";
import { FaChartLine, FaBox } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsStack } from "react-icons/bs";
import useThemeStore from "../../../stores/ThemeStore";
import DashboardStatCard from "../DashboardStatCard";
import RecentBatches from "../recentBatches";
import { getDashboardStats } from "../../../services/dashboardService";

const statConfig = [
    {
        key: "totalRevenue",
        statTitle: "Total Revenue",
        icon: TbCurrencyNaira,
        iconBgColor: { darkTheme: "rgba(59,130,246,0.15)", lightTheme: "rgba(59,130,246,0.10)" },
        iconColor: { darkTheme: "#3b82f6", lightTheme: "#1e40af" },
    },
    {
        key: "netProfit",
        statTitle: "Net Profit",
        icon: FaChartLine,
        iconBgColor: { darkTheme: "rgba(34,197,94,0.15)", lightTheme: "rgba(34,197,94,0.10)" },
        iconColor: { darkTheme: "#22c55e", lightTheme: "#15803d" },
    },
    {
        key: "totalProducts",
        statTitle: "Total Products",
        icon: FaBox,
        iconBgColor: { darkTheme: "rgba(168,85,247,0.15)", lightTheme: "rgba(168,85,247,0.10)" },
        iconColor: { darkTheme: "#a855f7", lightTheme: "#6b21a8" },
    },
    {
        key: "totalBatches",
        statTitle: "Total Batches",
        icon: BsStack,
        iconBgColor: { darkTheme: "rgba(249,115,22,0.15)", lightTheme: "rgba(249,115,22,0.10)" },
        iconColor: { darkTheme: "#f97316", lightTheme: "#c2410c" },
    },
];

const DashboardView = () => {
    const { theme } = useThemeStore();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await getDashboardStats();
            if (res.success) setStats(res.stats);
            setLoading(false);
        };
        fetchStats();
    }, []);

    return (
        <div className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-8`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statConfig.map((cfg) => (
                    <DashboardStatCard
                        key={cfg.key}
                        statTitle={cfg.statTitle}
                        icon={cfg.icon}
                        value={loading || !stats ? 0 : (stats[cfg.key] ?? 0)}
                        iconBgColor={cfg.iconBgColor}
                        iconColor={cfg.iconColor}
                    />
                ))}
            </div>

            <RecentBatches />
        </div>
    );
};

export default DashboardView;
