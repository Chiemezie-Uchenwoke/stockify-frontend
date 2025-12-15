import AddProductsButton from "./AddProductsButton"
import ViewProductsButton from "./ViewProductsButton"

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

            <ViewProductsButton 
                label={"View Products"}
                onClick={() => {
                    setSelectedBatchId(_id);
                    setMode("products");
                    getProducts(_id);
                }}
            />
        </div>
    )
};

export default BatchCard;