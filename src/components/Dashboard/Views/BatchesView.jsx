import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";
import useThemeStore from "../../../stores/ThemeStore";
import { FiRefreshCw } from "react-icons/fi";

const BatchesView = () => {
    const {theme} = useThemeStore();

    return (
        <div className={`${theme === "dark" ? "dark" : "" } border border-black/15 dark:border-white-shade/15 rounded-2xl bg-light-surface dark:bg-dark-bg py-6 px-4`}>
            <form className="flex flex-col gap-4">
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
        </div>
    )
};

export default BatchesView;