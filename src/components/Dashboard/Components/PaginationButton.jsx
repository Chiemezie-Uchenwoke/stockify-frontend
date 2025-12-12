const PaginationButton = ({label, disabled, onClick}) => {
    return (
        <button
            className={`flex items-center gap-2 border border-black/20 py-2 px-6 rounded-3xl bg-pri-col text-white-shade outline-0 ${disabled ? "bg-pri-col/60" : "active:translate-y-1"} cursor-pointer text-xs lg:text-sm shadow hover:brightness-95 duration-200 font-medium`}
            disabled = {disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )
};

export default PaginationButton;