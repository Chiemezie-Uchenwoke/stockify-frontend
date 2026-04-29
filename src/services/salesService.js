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
            message: data.message || "Sale recorded successfully",
        };

    } catch(err) {
        console.error("Error recording new sale: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
};

const getSales = async (batchId) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/sale/${batchId}`);
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to get batch sales",
            }
        }

        return {
            success: data.success ?? true,
            message: data.message || "Sales record fetched successfully",
            sales: data.sales,
        }

    } catch (err) {
        console.error("Error retrieving batch sales: ", err);
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
}

const getAllSales = async (page, limit) => {
    try {
        const params = new URLSearchParams();
        if (page !== undefined) params.append("page", page);
        if (limit !== undefined) params.append("limit", limit);
        const qs = params.toString();

        const response = await fetchWithAuth(`${apiBaseUrl}/api/sale/${qs ? "?" + qs : ""}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch sales records",
                sales: [],
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "Sales record fetched successfully",
            sales: data.sales || [],
            pagination: data.pagination,
        };
    } catch (err) {
        console.error("Error fetching sales records: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
            sales: [],
        };
    }
};

const filterSales = async (formData) => {
    try {
        const params = new URLSearchParams();
        if (formData.startDate) params.append("startDate", formData.startDate);
        if (formData.endDate) params.append("endDate", formData.endDate);

        const response = await fetchWithAuth(`${apiBaseUrl}/api/sale/filter?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to filter sales records",
                sales: [],
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "Sales filtering was successful.",
            sales: data.sales || [],
        };
    } catch (err) {
        console.error("Error filtering sales records: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
            sales: [],
        };
    }
};

export { recordSale, getSales, getAllSales, filterSales };