import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";
import { IoMdClose } from "react-icons/io";

const NewBatch = () => {
    return (
        <form 
            className="border border-black/20 dark:border-white-shade/10 py-6 px-4 lg:px-6 rounded-2xl bg-light-surface dark:bg-dark-surface flex flex-col gap-8"
        >
            <div className="flex items-center justify-between">
                <h2 className="font-semibold dark:text-white-shade/80 text-xs sm:text-sm"> Add New Import or Retail Batch </h2>
                
                <button 
                    className="border border-black/30 p-1 rounded cursor-pointer bg-white hover:brightness-95 dark:bg-dark-surface dark:border-white-shade/30 duration-200"
                    type="button"
                >
                    <IoMdClose />
                </button>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row">
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"batchName"}>
                        Batch Name
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"batchName"}
                        type="text"
                        placeholder={"Enter batch name"}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"importDate"}>
                        Import Date
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"importDate"}
                        type="date"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row">
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"totalCost"}>
                        Total Cost
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"totalCost"}
                        type="number"
                        placeholder={"Enter amount"}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"type"}>
                        Type
                    </AuthFormLabel>

                    <select id="type" className="form-select">
                        <option value="choose"> Choose </option>
                        <option value="import"> Import </option>
                        <option value="retail"> Retail </option>
                    </select>
                </div>
            </div>

            <FormButton loading={""}>
                Submit
            </FormButton>
        </form>
    )
};

export default NewBatch; 