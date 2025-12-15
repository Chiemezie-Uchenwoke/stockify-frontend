const AddProductsButton = ({label, onClick}) => {
    return (
        <button 
            className=""
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default AddProductsButton;