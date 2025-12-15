import ProductsInBatch from "./ProductsInBatch";
import ReturnToBatchButton from "./ReturnToBatchButton";
import useBatchProducts from "../../../hooks/useBatchProducts";

const ProductCard = ({products, setMode}) => {
    const {setProducts} = useBatchProducts();
    return (
        <div className="flex flex-col gap-4">
            <ReturnToBatchButton 
                onClick={() => {
                    setMode("view");
                    setProducts([]);
                }}
            />

            <h2 className="text-sm font-semibold">{products.length === 0 ? "No Product(s) added yet" : "All Products"} </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {
                    products.map((product) => {
                        return (
                            <ProductsInBatch 
                                key={product.productId}
                                product={product}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ProductCard;