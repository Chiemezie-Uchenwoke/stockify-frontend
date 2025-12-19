import fetchWithAuth from "../utils/fetchWithAuth";

const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const recordSale = async (formData, batchId, productId) => {
    try {

        const response = await fetchWithAuth(`${apiBaseUrl}/api/sale/${batchId}/${productId}`, {
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
                message: data.message || "Failed to record new sale",
            };
        };

        return {
            success: data.success ?? true,
            message: data.message,
        };

    } catch(err) {
        console.error("Error recording new sale: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
};

export {recordSale};