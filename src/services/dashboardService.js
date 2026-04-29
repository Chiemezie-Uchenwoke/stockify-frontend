import fetchWithAuth from "../utils/fetchWithAuth";

const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const getDashboardStats = async () => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/dashboard/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch dashboard stats",
                stats: null,
            };
        }

        return {
            success: data.success ?? true,
            message: data.message,
            stats: data.stats,
        };
    } catch (err) {
        console.error("Error fetching dashboard stats: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
            stats: null,
        };
    }
};

export { getDashboardStats };
