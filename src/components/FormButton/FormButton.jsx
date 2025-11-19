import { memo } from "react"

const FormButton = memo(({children}) => {
    return (
        <button 
            type="submit"
            className="bg-pri-col text-white-shade py-3 rounded-2xl font-medium active:translate-y-1 hover:bg-pri-hover duration-200 cursor-pointer"
        >
            {children}
        </button>
    )
});

export default FormButton;