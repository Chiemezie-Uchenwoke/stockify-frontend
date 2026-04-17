import fetchWithAuth from "../utils/fetchWithAuth";

const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const getBatchExpenses = async (batchId) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/expense/${batchId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch batch expenses",
                expenses: [],
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "Expense record fetched successfully",
            expenses: data.expenses || [],
        };
    } catch (err) {
        console.error("Error fetching batch expenses: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
            expenses: [],
        };
    }
};

const addExpense = async (batchId, formData) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/expense/new/${batchId}`, {
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
                message: data.message || "Failed to add expense",
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "New expense added successfully",
        };
    } catch (err) {
        console.error("Error creating expense: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
        };
    }
};

const editExpense = async (expenseId, formData) => {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/api/expense/${expenseId}`, {
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
                message: data.message || "Failed to edit expense",
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "Expense updated successfully.",
            updatedExpense: data.updatedExpense,
        };
    } catch (err) {
        console.error("Error editing expense: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
        };
    }
};

const filterExpense = async (formData) => {
    try {
        const params = new URLSearchParams();
        if (formData.category) params.append("category", formData.category);
        if (formData.startDate) params.append("startDate", formData.startDate);
        if (formData.endDate) params.append("endDate", formData.endDate);

        const response = await fetchWithAuth(`${apiBaseUrl}/api/expense/filter?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to filter expense records",
                expenses: [],
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || "Expense filtering was successful",
            expenses: data.expenses || [],
        };
    } catch (err) {
        console.error("Error filtering expenses: ", err);
        return {
            success: false,
            message: "Network error. Please try again.",
            expenses: [],
        };
    }
};

export { getBatchExpenses, addExpense, editExpense, filterExpense };
