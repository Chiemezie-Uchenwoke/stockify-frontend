import EditProductsButton from "./EditProductButton";

const ProductsInBatch = ({product, setMode, setSelectedProductId, setProductFormData}) => {

    return (
        <div className="border border-black/20 dark:border-white-shade/15 w-full py-6 px-4 rounded-2xl flex flex-col gap-2.5 bg-light-surface dark:bg-dark-surface shadow-lg">
            <h3 className="font-semibold capitalize text-xs sm:text-sm"> {product.productName} </h3>

            <p className="text-xs dark:text-white-shade/80"> Batch Name: {product.batchName} </p>

            <p className="flex items-center gap-2 text-xs dark:text-white-shade/80"> 
                <span>Quantity purchased </span>
                <span> {product.quantity} </span>
            </p>

            <div className="flex flex-col gap-2.5 min-[350px]:flex-row min-[350px]:justify-between dark:text-white-shade/80">
                <p className="text-xs ">
                    <span className="font-medium">Cost price</span>
                    <span> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(product.costPrice) }  </span>
                </p>

                <p className="text-xs">
                    <span className="font-medium">Selling price</span>
                    <span> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(product.sellingPrice) }  </span>
                </p>
            </div>

            <p className="text-xs flex gap-2 italic dark:font-light">
                <span>
                    {new Date(product.createdAt).toLocaleDateString("en-US", {dateStyle: "medium"}) }
                </span>
            </p>

            <EditProductsButton 
                onClick={() => {
                    setSelectedProductId(product.productId);
                    setProductFormData(product); // pass data to be edited
                    setMode("edit");
                }}
            />
        </div>
    )
};

export default ProductsInBatch;