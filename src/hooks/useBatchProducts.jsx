import { useState } from "react";
import { addNewProduct, getProductsByBatch } from "../services/productService";

const useBatchProducts = () => {
  const [productFormData, setProductFormData] = useState({
    productName: "",
    quantity: "",
    costPrice: "",
    sellingPrice: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const resetAlert = () =>
    setAlert({ type: "", title: "", message: "" });

  const getProducts = async (batchId) => {
    try {
      const data = await getProductsByBatch(batchId);

      if (!data.success) {
        setAlert({
          type: "error",
          title: "Error",
          message: data.message,
        });
        return;
      }

      setProducts(data.products);
    } catch (err) {
      console.error("Error getting products: ", err);
    }
  };

  const addProduct = async (batchId) => {
    setLoading(true);
    resetAlert();

    const { productName, quantity, costPrice, sellingPrice } = productFormData;

    if (!productName || !quantity || !costPrice || !sellingPrice) {
      setAlert({
        type: "error",
        title: "Incomplete field(s)",
        message: "Missing required fields",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await addNewProduct(batchId, productFormData);

      if (!data.success) {
        setAlert({
          type: "error",
          title: "Error",
          message: data.message || "Error adding product",
        });
        return;
      }

      setAlert({
        type: "success",
        title: "New Product",
        message: data.message,
      });

      setProductFormData({
        productName: "",
        quantity: "",
        costPrice: "",
        sellingPrice: "",
      });

      await getProducts(batchId); // keep UI in sync
    } catch (err) {
      console.error("Error adding product: ", err);
      setAlert({
        type: "error",
        title: "Error",
        message: "Internal server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    productFormData,
    setProductFormData,
    alert,
    setAlert,
    loading,
    products,
    setProducts,
    addProduct,
    getProducts,
  };
};

export default useBatchProducts;
