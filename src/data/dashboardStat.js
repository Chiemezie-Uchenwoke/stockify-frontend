import { FaChartLine } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { BsStack } from "react-icons/bs";

const dashboardStat = [
    {
        id: 1,
        statTitle: "Total Revenue",
        icon: TbCurrencyNaira,
        value: 0,
        iconBgColor: { darkTheme: "rgba(59,130,246,0.15)", lightTheme: "rgba(59,130,246,0.10)" },
        iconColor: { darkTheme: "#3b82f6", lightTheme: "#1e40af" },
    },
    {
        id: 2,
        statTitle: "Net Profit",
        icon: FaChartLine,
        value: 0,
        iconBgColor: { darkTheme: "rgba(34,197,94,0.15)", lightTheme: "rgba(34,197,94,0.10)" },
        iconColor: { darkTheme: "#22c55e", lightTheme: "#15803d" },
    },
    {
        id: 3,
        statTitle: "Total Products",
        icon: FaBox,
        value: 0,
        iconBgColor: { darkTheme: "rgba(168,85,247,0.15)", lightTheme: "rgba(168,85,247,0.10)" },
        iconColor: { darkTheme: "#a855f7", lightTheme: "#6b21a8" },
    },
    {
        id: 4,
        statTitle: "Total Batches",
        icon: BsStack,
        value: 0,
        iconBgColor: { darkTheme: "rgba(249,115,22,0.15)", lightTheme: "rgba(249,115,22,0.10)" },
        iconColor: { darkTheme: "#f97316", lightTheme: "#c2410c" },
    },
];

export default dashboardStat;