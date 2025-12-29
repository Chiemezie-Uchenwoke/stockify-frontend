import AddProductsButton from "./AddProductsButton"
import ViewButton from "./ViewProductsButton"

const BatchCard = ({batchName, onAddProduct, _id, setMode, getProducts, setSelectedBatchId}) => {
    return (
        <div 
            className="flex flex-col gap-3 w-full max-w-100 border border-black/20 dark:border-white-shade/15 rounded-2xl p-4 bg-light-surface dark:bg-dark-surface "
        >
            <h3 className="text-sm font-semibold capitalize dark:text-white-shade/80"> {batchName} </h3>

            <AddProductsButton 
                label={"Add Products"}
                onClick={() => {
                    onAddProduct();
                    setSelectedBatchId(_id);
                }}
            />

            <div className="flex flex-col items-start gap-3">
                <ViewButton 
                    label={"View Products"}
                    onClick={() => {
                        setSelectedBatchId(_id);
                        setMode("products");
                        getProducts(_id);
                    }}
                />

                <ViewButton 
                    label={"View Sales"}
                    onClick={() => {
                        setSelectedBatchId(_id);
                        setMode("batch-sales");
                        // getProducts(_id);
                    }}
                />
            </div>
        </div>
    )
};

export default BatchCard;