import { IoMdClose } from "react-icons/io";

const CloseFormButton = ({onClick}) => {
    return (
        <button 
            className="border border-black/30 p-1 rounded cursor-pointer bg-white hover:brightness-95 dark:bg-dark-surface dark:border-white-shade/30 duration-200"
            type="button"
            onClick={onClick}
        >
            <IoMdClose />
        </button>
    )
};

export default CloseFormButton;