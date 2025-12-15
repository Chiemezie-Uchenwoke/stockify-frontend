const ViewProductsButton = ({label, onClick}) => {
    return (
        <button 
            className="text-xs font-medium hover:underline cursor-pointer dark:text-white-shade/80 outline-0            "
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default ViewProductsButton;