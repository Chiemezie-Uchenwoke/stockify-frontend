import { RiDashboardFill } from "react-icons/ri";
import { BsStack } from "react-icons/bs";
import { FaBox, FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import { FaChartBar, FaGear } from "react-icons/fa6";

const sidebarViews = [
    {
        id: 1,
        text: "Dashboard",
        icon: RiDashboardFill,
        path: "/dashboard",
    },
    {
        id: 2,
        text: "Batches",
        icon: BsStack,
        path: "/dashboard/batches",
    },
    {
        id: 3,
        text: "Products",
        icon: FaBox,
        path: "/dashboard/products",
    },
    {
        id: 4,
        text: "Sales",
        icon: FaReceipt,
        path: "/dashboard/sales",
    },
    {
        id: 5,
        text: "Expenses",
        icon: FaMoneyBillWave,
        path: "/dashboard/expenses",
    },
    {
        id: 6,
        text: "Reports",
        icon: FaChartBar,
        path: "/dashboard/reports",
    },
    {
        id: 7,
        text: "Settings",
        icon: FaGear,
        path: "/dashboard/settings",
    },
];

export default sidebarViews;