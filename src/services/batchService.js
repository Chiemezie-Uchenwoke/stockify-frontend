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

export {getAllBatches};