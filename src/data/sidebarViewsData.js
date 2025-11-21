import { RiDashboardFill } from "react-icons/ri";
import { BsStack } from "react-icons/bs";
import { FaBox, FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import { FaChartBar, FaGear } from "react-icons/fa6";

const sidebarViews = [
    {
        id: 1,
        text: "Dashboard",
        icon: RiDashboardFill,
        view: "dashboard",
    },
    {
        id: 2,
        text: "Batches",
        icon: BsStack,
        view: "batches",
    },
    {
        id: 3,
        text: "Products",
        icon: FaBox,
        view: "products",
    },
    {
        id: 4,
        text: "Sales",
        icon: FaReceipt,
        view: "sales",
    },
    {
        id: 5,
        text: "Expenses",
        icon: FaMoneyBillWave,
        view: "expenses",
    },
    {
        id: 6,
        text: "Reports",
        icon: FaChartBar,
        view: "reports",
    },
    {
        id: 7,
        text: "Settings",
        icon: FaGear,
        view: "settings",
    },
];

export default sidebarViews;