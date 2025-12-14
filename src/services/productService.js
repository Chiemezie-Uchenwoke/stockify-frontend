import fetchWithAuth from "../utils/fetchWithAuth";

const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const getProductsByBatch = async (batchId) => {
    try {

        const response = await fetchWithAuth(`${apiBaseUrl}/api/products/batch/${batchId}`, {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to get products",
            };
        };

        return {
            success: true,
            message: data.message,
            products: data.products,
        };

    } catch(err) {
        console.error("Error getting products: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
};

const addNewProduct = async (batchId, formData) => {
    try {

        const response = await fetchWithAuth(`${apiBaseUrl}/api/products/${batchId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to add new product",
            };
        };

        return {
            success: true,
            message: data.message,
        };

    } catch(err) {
        console.error("Error adding new product: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
};

export {getProductsByBatch, addNewProduct};