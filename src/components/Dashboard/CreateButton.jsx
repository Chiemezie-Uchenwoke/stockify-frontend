import { AiOutlinePlus } from "react-icons/ai";

const CreateButton = ({label, onClick}) => {
    return (
        <button 
            onClick={onClick}
            className="text-xs w-14 h-14 rounded-full border border-black/20 flex flex-col items-center justify-center font-semibold bg-pri-col text-white-shade  cursor-pointer dark:border-white-shade/20 fixed bottom-28 right-4 shadow-lg dark:shadow-white-shade/10 z-20 active:translate-y-1 "
            aria-label={label}
        >
            <AiOutlinePlus />
            <span>{label}</span>
        </button>
    )
};

export default CreateButton;