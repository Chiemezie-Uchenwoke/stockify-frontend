import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";
import useThemeStore from "../../../stores/ThemeStore";
import { FiRefreshCw } from "react-icons/fi";
import CreateButton from "../CreateButton";
import { useEffect, useState } from "react";
import { getAllBatches } from "../../../services/batchService";
import BatchTable from "../BatchTable";

const BatchesView = () => {
    const {theme} = useThemeStore();
    const [batches, setBatches] = useState([]);
    useEffect(() => {
        const fetchBatches = async () => {
            const data = await getAllBatches();
            setBatches(data.batches);
        }

        fetchBatches();
    }, []);

    return (
        <div className={`${theme === "dark" ? "dark" : "" } flex flex-col gap-8`}>
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

            <CreateButton 
                label={"New"}
            />
    
            <BatchTable 
                batches={batches}
            />
        </div>
    )
};

export default BatchesView;