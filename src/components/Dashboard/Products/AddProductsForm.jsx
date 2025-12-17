import AuthFormLabel from "../../AuthFormLabel/AuthFormLabel";
import AuthTextInput from "../../AuthTextInput/AuthTextInput";
import CloseFormButton from "../CloseFormButton";
import FormButton from "../../FormButton/FormButton";

const AddProductsForm = ({formData, setMode, setProductFormData, selectedBatchId, loading, addProduct, editProduct, mode, selectedProductId}) => {

    const handleAddProductByBatch = () => {
        addProduct(selectedBatchId);
    }

    const handleEditProduct = () => {
        editProduct(selectedProductId, formData, selectedBatchId);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            handleAddProductByBatch();
        } else {
            handleEditProduct();
        }
    };


    
    return (
        <div 
            className="border border-black/20 dark:border-white-shade/15 py-6 px-4 rounded-2xl flex flex-col gap-8 bg-light-surface dark:bg-dark-surface"
        >
            <div 
                className="flex items-center justify-between"
            >
                <h2 className="text-xs sm:text-sm font-semibold"> { mode === "create" ? "Add product " : "Edit product" } </h2>

                <CloseFormButton 
                    onClick={() => {
                        mode === "create" ? setMode("view") : setMode("products");
                        setProductFormData({
                            productName: "",
                            quantity: "",
                            costPrice: "",
                            sellingPrice: "",
                        });
                    }}
                />
            </div>

            <form 
                className="w-full flex flex-col gap-8"
                onSubmit={(e) => {
                    handleSubmit(e);
                    mode === "create" ? setMode("create") : setMode("products");
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <AuthFormLabel htmlFor={"productName"}>
                            Product Name
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"productName"}
                            type="text"
                            placeholder={"Enter product name"}
                            value={formData.productName}
                            onChange={(e) => setProductFormData(prev => ({...prev, productName: e.target.value}))}
                        />
                    </div>

                    <div className="flex flex-col gap-2  w-full sm:w-1/2">
                        <AuthFormLabel htmlFor={"quantity"}>
                            Quantity
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"quantity"}
                            type="number"
                            placeholder={"Enter product quantity"}
                            value={formData.quantity}
                            onChange={(e) => setProductFormData(prev => ({...prev, quantity: e.target.value}))}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <AuthFormLabel htmlFor={"costPrice"}>
                            Cost Price
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"costPrice"}
                            type="number"
                            placeholder={"Enter cost price"}
                            value={formData.costPrice}
                            onChange={(e) => setProductFormData(prev => ({...prev, costPrice: e.target.value}))}
                        />
                    </div>

                    <div className="flex flex-col gap-2  w-full sm:w-1/2">
                        <AuthFormLabel htmlFor={"sellingPrice"}>
                            Selling Price
                        </AuthFormLabel>

                        <AuthTextInput 
                            id={"sellingPrice"}
                            type="number"
                            placeholder={"Enter selling price"}
                            value={formData.sellingPrice}
                            onChange={(e) => setProductFormData(prev => ({...prev, sellingPrice: e.target.value}))}
                        />
                    </div>
                </div>

                <FormButton loading={loading}>
                    {mode === "create" ? "Add Product" : "Update Product"}
                </FormButton>
            </form>
        </div>
    )
}

export default AddProductsForm;