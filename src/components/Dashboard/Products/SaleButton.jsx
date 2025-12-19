import { FaReceipt } from "react-icons/fa";

const SaleButton = ({onClick}) => {
    return (
        <button 
            className="flex items-center gap-2 text-xs bg-green-600/70 w-fit py-1 px-2 rounded-xl font-medium cursor-pointer hover:bg-green-700/70 duration-200 active:translate-y-1 dark:text-white-shade mt-1"
            onClick={onClick}
        >
            <FaReceipt />
            Record Sale
        </button>
    )
};

export default SaleButton;