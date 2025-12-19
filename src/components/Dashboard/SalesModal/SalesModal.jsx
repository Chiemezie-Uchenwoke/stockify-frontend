import CloseFormButton from "../CloseFormButton";
import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import FormButton from "../../FormButton/FormButton";
import { useEffect } from "react";

const SalesModal = ({setIsSalesModalOpen, salesFormData, setSalesFormData, selectedProduct, createSale, selectedBatchId, selectedProductId}) => {

    useEffect(() => {
        setSalesFormData({
            quantitySold: "",
            sellingPrice: selectedProduct?.sellingPrice || "",
            salesDate: "",
        });
    }, [selectedProduct, setSalesFormData]);

    const handleNewSales = () => {
        createSale(salesFormData, selectedBatchId, selectedProductId);
        setIsSalesModalOpen(false);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 bg-black/30 left-0 z-[100] dark:bg-black/40">
            <div className="w-[90%] max-w-80 bg-light-surface h-100 rounded-2xl py-6 px-5 dark:bg-dark-surface overflow-y-auto">
                <form 
                    className="flex flex-col gap-4"
                    onSubmit={handleNewSales}
                >
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
                            value={salesFormData.quantitySold}
                            onChange={(e) => setSalesFormData(prev => ({...prev, quantitySold: e.target.value}))}
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
                            value={salesFormData.sellingPrice}
                            onChange={(e) => setSalesFormData(prev => ({...prev, sellingPrice: e.target.value}))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <AuthFormLabel htmlFor={"salesDate"}>
                            Sales Date
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"salesDate"}
                            type="date"
                            value={salesFormData.salesDate}
                            onChange={(e) => setSalesFormData(prev => ({...prev, salesDate: e.target.value}))}
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