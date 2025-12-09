import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";
import { IoMdClose } from "react-icons/io";

const BatchForm = ({setMode, loading, formData, setFormData, handleAddNewBatch, formType="create", handleEdit}) => {
    return (
        <form 
            className="border border-black/20 dark:border-white-shade/10 py-6 px-4 rounded-2xl bg-light-surface dark:bg-dark-surface flex flex-col gap-8"
            onSubmit={formType === "create" ? handleAddNewBatch : handleEdit}
        >
            <div className="flex items-center justify-between">
                <h2 className="font-semibold dark:text-white-shade/80 text-xs sm:text-sm"> 
                    {formType === "create" ? "Add New Import or Retail Batch" : "Edit Batch"}
                </h2>
                
                <button 
                    className="border border-black/30 p-1 rounded cursor-pointer bg-white hover:brightness-95 dark:bg-dark-surface dark:border-white-shade/30 duration-200"
                    type="button"
                    onClick={() => {
                        setMode("list");
                        setFormData({
                            batchName: "",
                            importDate: "",
                            totalCost: "",
                            type: "",
                        });
                    }}
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
                        placeholder={"Ex: Batch-Nov-2025-A"}
                        value={formData.batchName}
                        onChange={(e) => setFormData((prev) => ({...prev, batchName: e.target.value}))}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"importDate"}>
                        Import Date
                    </AuthFormLabel>

                    <AuthTextInput 
                        id={"importDate"}
                        type="date"
                        value={formData.importDate}
                        onChange={(e) => setFormData((prev) => ({...prev, importDate: e.target.value}))}
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
                        value={formData.totalCost}
                        onChange={(e) => setFormData((prev) => ({...prev, totalCost: e.target.value}))}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <AuthFormLabel htmlFor={"type"}>
                        Type
                    </AuthFormLabel>

                    <select 
                        id="type" 
                        className="form-select"
                        value={formData.type}
                        onChange={(e) => setFormData((prev) => ({...prev, type: e.target.value}))}
                    >
                        <option value="choose"> Choose </option>
                        <option value="import"> Import </option>
                        <option value="retail"> Retail </option>
                    </select>
                </div>
            </div>

            <FormButton loading={loading}>
                {formType === "create" ? "Submit" : "Save"}
            </FormButton>
        </form>
    )
};

export default BatchForm; 