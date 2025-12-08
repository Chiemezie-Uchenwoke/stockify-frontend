import fetchWithAuth from "../utils/fetchWithAuth";

const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const getAllBatches = async () => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/batch/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Unable to fetch batches",
            };
        }

        return data;
    } catch (err) {
        console.error("Error getting batches: ", err);
        throw err;
    }
}

const addNewBatch = async (formData) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/batch/import`, {
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
                message: data.message || "Failed to add batch"
            }
        }

        return data;
    } catch (err){
        console.error("Error adding new batch: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
}

const editBatch = async (formData, batchId) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/batch/${batchId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to edit batch"
            }
        }

        return data;
    } catch (err){
        console.error("Error editing batch: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
}

export {getAllBatches, addNewBatch, editBatch};