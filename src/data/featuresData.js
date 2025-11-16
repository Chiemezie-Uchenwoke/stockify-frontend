import { FaWarehouse, FaChartPie, FaReceipt, FaShieldAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const featuresData = [
    {
        id: 1,
        title: "Batch Management",
        description: "Organize products by import/retail batches with detailed tracking of costs and product quantities.",
        icon: FaWarehouse,
        keyFeatures: ["Add import & retail batches", "View products in each batch"],
        bgColor: { darkTheme: "rgba(59,130,246,0.15)", lightTheme: "rgba(59,130,246,0.10)" },
        iconColor: { darkTheme: "#3b82f6", lightTheme: "#1e40af" },
    },
    {
        id: 2,
        title: "Sales Tracking",
        description: "Record sales easily and let your inventory update automatically with batch-based sales insights.",
        icon: FaChartLine,
        keyFeatures: ["Automatic inventory updates", "Sales records by batch"],
        bgColor: { darkTheme: "rgba(34,197,94,0.15)", lightTheme: "rgba(34,197,94,0.10)" },
        iconColor: { darkTheme: "#22c55e", lightTheme: "#15803d" },
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        description: "View important business metrics, track performance, and identify your top-selling products.",
        icon: FaChartPie,
        keyFeatures: ["Performance analytics", "Best-selling products"],
        bgColor: { darkTheme: "rgba(168,85,247,0.15)", lightTheme: "rgba(168,85,247,0.10)" },
        iconColor: { darkTheme: "#a855f7", lightTheme: "#6b21a8" },
    },
    {
        id: 4,
        title: "Expense Management",
        description: "Track all expenses - shipping, customs, logistics and group them by batch for accurate cost reporting.",
        icon: FaReceipt,
        keyFeatures: ["Expense batches", "Category filtering"],
        bgColor: { darkTheme: "rgba(249,115,22,0.15)", lightTheme: "rgba(249,115,22,0.10)" },
        iconColor: { darkTheme: "#f97316", lightTheme: "#c2410c" },
    },
    {
        id: 5,
        title: "Search & Filter",
        description: "Quickly find what you need with powerful search and filtering capabilities across all your data.",
        icon: IoSearch,
        keyFeatures: ["Date range filtering", "Product and batch search"],
        bgColor: { darkTheme: "rgba(100,116,139,0.15)", lightTheme: "rgba(100,116,139,0.10)" },
        iconColor: { darkTheme: "#64748b", lightTheme: "#334155" },
    },
    {
        id: 6,
        title: "Secure & Reliable",
        description: "Enterprise-grade security with user authentication, password recovery, and data protection features.",
        icon: FaShieldAlt,
        keyFeatures: ["User authentication", "Password recovery"],
        bgColor: { darkTheme: "rgba(239,68,68,0.15)", lightTheme: "rgba(239,68,68,0.10)" },
        iconColor: { darkTheme: "#ef4444", lightTheme: "#991b1b" },
    },
];

export default featuresData;