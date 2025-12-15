import { FaArrowLeft } from "react-icons/fa";

const ReturnToBatchButton = ({onClick}) => {
    return (
        <button 
            className="border border-black/20 shadow dark:border-white-shade/15 w-12 h-12 flex flex-col justify-center items-center rounded-2xl bg-pri-col/20 cursor-pointer hover:bg-pri-col/40 duration-200"
            onClick={onClick}
        >
            <FaArrowLeft className="text-sm" />
            <span className="text-[10px] capitalize ">Return </span>
        </button>
    )
};

export default ReturnToBatchButton;