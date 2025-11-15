import { FaWarehouse, FaChartPie, FaReceipt, FaShieldAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const featuresData = [
    {
        id: 1,
        title: "Batch Management",
        description: "Organize products by import/retail batches with detailed tracking of costs and product quantities.",
        icon: FaWarehouse,
        keyFeature: ["Add import & retail batches", "View products in each batch"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
    {
        id: 2,
        title: "Sales Tracking",
        description: "Record sales easily and let your inventory update automatically with batch-based sales insights.",
        icon: FaChartLine,
        keyFeature: ["Automatic inventory updates", "Sales records by batch"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        description: "View important business metrics, track performance, and identify your top-selling products.",
        icon: FaChartPie,
        keyFeature: ["Performance analytics", "Best-selling products"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
    {
        id: 4,
        title: "Expense Management",
        description: "Track all expenses - shipping, customs, logistics and group them by batch for accurate cost reporting.",
        icon: FaReceipt,
        keyFeature: ["Expense batches", "Category filtering"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
    {
        id: 5,
        title: "Search & Filter",
        description: "Quickly find what you need with powerful search and filtering capabilities across all your data.",
        icon: IoSearch,
        keyFeature: ["Date range filtering", "Product and batch search"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
    {
        id: 6,
        title: "Secure & Reliable",
        description: "Enterprise-grade security with user authentication, password recovery, and data protection features.",
        icon: FaShieldAlt,
        keyFeature: ["User authentication", "Password recovery"],
        bgColor: {darkTheme: "", lightTheme: ""},
        iconColor: {darkTheme: "", lightTheme: ""},
    },
];

export default featuresData;