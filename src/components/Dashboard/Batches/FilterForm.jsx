import { FiRefreshCw } from "react-icons/fi";
import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";

const FilterForm = () => {
    return (
        <form className="border border-black/20 dark:border-white-shade/15 rounded-2xl py-6 px-4 flex flex-col gap-4 bg-light-surface dark:bg-dark-bg ">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold dark:text-white-shade/85">Filter Batches</h3>
                <button 
                    type="reset" 
                    className="text-sm text-pri-col dark:text-dark-accent font-semibold flex items-center gap-2 cursor-pointer"
                >
                    <FiRefreshCw />
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="flex flex-col gap-1.5">
                    <AuthFormLabel htmlFor={"startDate"}>
                        Start Date
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"startDate"}
                        type="date"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <AuthFormLabel htmlFor={"endDate"}>
                        End Date
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"endDate"}
                        type="date"
                    />
                </div>
            </div>

            <FormButton loading={""}>
                Apply Filter
            </FormButton>
        </form>
    )
}

export default FilterForm;