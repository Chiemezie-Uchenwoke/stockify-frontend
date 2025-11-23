import { memo } from "react";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const FormButton = memo(({children, loading}) => {
    return (
        <button 
            type="submit"
            className="bg-pri-col text-white-shade py-3 rounded-2xl font-medium active:translate-y-1 hover:bg-pri-hover duration-200 cursor-pointer flex justify-center disabled:bg-pri-col/50"
            disabled={loading}
        >
            {loading ? <ButtonSpinner /> : `${children}`}
        </button>
    )
});

export default FormButton;