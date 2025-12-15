import { useState } from "react";
import useThemeStore from "../../../stores/ThemeStore";
import BatchCard from "../Products/BatchCard";
import { getAllBatches } from "../../../services/batchService";
import { useEffect } from "react";
import AddProductsForm from "../Products/AddProductsForm";
import useBatchProducts from "../../../hooks/useBatchProducts";
import AlertMessage from "../../AlertMessage/AlertMessage";
import ProductCard from "../Products/ProductsCard";

const ProductsView = () => {
    const {theme} = useThemeStore();
    const [mode, setMode] = useState("view");
    const [allBatches, setAllBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const {
        productFormData,
        setProductFormData,
        alert,
        setAlert,
        loading,
        products,
        addProduct,
        getProducts,
    } = useBatchProducts();

    useEffect(() => {
        const fetchAllBatches = async () => {
            const data = await getAllBatches();
            setAllBatches(data.batches);
        }

        fetchAllBatches();
    }, []);

    return (
        <div className={`${theme === "dark" ? "dark" : ""} `}>
            {
                mode === "view" &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 lg:gap-8">
                    {
                        allBatches.map((batch) => {
                            return (
                                <BatchCard 
                                    key={batch._id}
                                    {...batch}
                                    onAddProduct={() => setMode("create")}
                                    setSelectedBatchId={() => setSelectedBatchId(batch._id)}
                                    setMode={setMode}
                                    getProducts={getProducts}
                                />
                            )
                        })
                    }
                </div>
            }

            {
                mode === "create" &&
                <AddProductsForm 
                    setMode={setMode}
                    formData={productFormData}
                    setProductFormData={setProductFormData}
                    addProduct={addProduct}
                    getProducts={getProducts}
                    selectedBatchId={selectedBatchId}
                    loading={loading}
                />
            }

            {
                mode === "products" &&
                <ProductCard 
                    setMode={setMode}
                    products={products}
                />
            }

            <AlertMessage 
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert({type: "", title: "", message: ""})}
            />
        </div>
    )
};

export default ProductsView;