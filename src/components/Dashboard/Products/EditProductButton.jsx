import { FaEdit } from "react-icons/fa";

const EditProductsButton = ({onClick}) => {
    return (
        <button 
            className="flex items-center gap-2 text-xs bg-pri-col/70 w-fit py-1 px-2 rounded-xl font-medium cursor-pointer hover:bg-pri-col/40 duration-200 active:translate-y-1 dark:text-white-shade/90 mt-1"
            onClick={onClick}
        >
            <FaEdit />
            Edit
        </button>
    )
};

export default EditProductsButton;