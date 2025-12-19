import CloseFormButton from "../CloseFormButton";
import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";

const SalesModal = ({setIsSalesModalOpen}) => {
    return (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 bg-black/30 left-0 z-[100] dark:bg-black/40">
            <div className="w-[90%] max-w-80 bg-light-surface h-100 rounded-2xl py-6 px-4 dark:bg-dark-surface overflow-y-auto">
                <form className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold dark:text-white-shade/80">Record a Sale</h3>

                        <CloseFormButton 
                            onClick={() => setIsSalesModalOpen(false)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <AuthFormLabel htmlFor={"quantitySold"}>
                            Quantity sold
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"quantitySold"}
                            type="number"
                            placeholder={"Enter quantity sold"}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <AuthFormLabel htmlFor={"sellingPrice"}>
                            Selling Price
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"sellingPrice"}
                            type="number"
                            placeholder={"Enter selling price"}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <AuthFormLabel htmlFor={"salesDate"}>
                            Sales Date
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"salesDate"}
                            type="date"
                        />
                    </div>

                    <FormButton>
                        Record Sale
                    </FormButton>
                </form>
            </div>
        </div>
    )
};

export default SalesModal;