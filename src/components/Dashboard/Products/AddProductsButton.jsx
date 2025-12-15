const AddProductsButton = ({label, onClick}) => {
    return (
        <button 
            className="bg-pri-col text-white rounded py-1 text-xs font-medium cursor-pointer hover:brightness-90 duration-200 active:translate-y-1 "
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default AddProductsButton;