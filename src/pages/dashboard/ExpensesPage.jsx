import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { getAllBatches } from "../../services/batchService";
import { addExpense, editExpense, filterExpense } from "../../services/expenseService";
import useThemeStore from "../../stores/ThemeStore";

const expenseCategories = ["Shipping", "Customs", "Transport", "Warehouse", "Other"];

const formatCurrency = (amount) => {
    const value = Number(amount || 0);
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
    }).format(value);
};

const formatDate = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString();
};

const ExpensesPage = () => {
    const { theme } = useThemeStore();
    const [batches, setBatches] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        batchId: "",
        category: "Shipping",
        description: "",
        amount: "",
        expenseDate: "",
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        category: "Shipping",
        description: "",
        amount: "",
        expenseDate: "",
    });
    const [filterFormData, setFilterFormData] = useState({
        category: "",
        startDate: "",
        endDate: "",
    });
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    const totalExpense = useMemo(() => {
        return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    }, [expenses]);

    const fetchPageData = async () => {
        setLoading(true);
        const [batchesResponse, expensesResponse] = await Promise.all([
            getAllBatches(),
            filterExpense({}),
        ]);

        if (batchesResponse.success) {
            setBatches(batchesResponse.batches || []);
            setFormData((prev) => ({
                ...prev,
                batchId: prev.batchId || batchesResponse.batches?.[0]?._id || "",
            }));
        }

        if (expensesResponse.success) {
            setExpenses(expensesResponse.expenses || []);
        } else {
            setAlert({
                type: "error",
                title: "Expenses",
                message: expensesResponse.message,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPageData();
    }, []);

    const resetForm = () => {
        setFormData({
            batchId: batches[0]?._id || "",
            category: "Shipping",
            description: "",
            amount: "",
            expenseDate: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setAlert({ type: "", title: "", message: "" });

        const payload = {
            category: formData.category,
            description: formData.description,
            amount: formData.amount,
            expenseDate: formData.expenseDate || new Date().toISOString(),
        };

        const response = await addExpense(formData.batchId, payload);

        if (!response.success) {
            setAlert({
                type: "error",
                title: "Expense",
                message: response.message,
            });
            setSubmitting(false);
            return;
        }

        setAlert({
            type: "success",
            title: "New Expense",
            message: response.message,
        });

        resetForm();
        await fetchPageData();
        setSubmitting(false);
    };

    const handleApplyFilter = async (e) => {
        e.preventDefault();
        const response = await filterExpense(filterFormData);

        if (!response.success) {
            setAlert({
                type: "error",
                title: "Filter Expenses",
                message: response.message,
            });
            return;
        }

        setExpenses(response.expenses || []);
    };

    const handleEditExpense = (expense) => {
        setEditingExpenseId(expense.expenseId);
        setEditFormData({
            category: expense.category,
            description: expense.description,
            amount: String(expense.amount || ""),
            expenseDate: expense.expenseDate ? new Date(expense.expenseDate).toISOString().split("T")[0] : "",
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingExpenseId(null);
        setEditFormData({
            category: "Shipping",
            description: "",
            amount: "",
            expenseDate: "",
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingExpenseId) return;

        setSubmitting(true);
        setAlert({ type: "", title: "", message: "" });

        const payload = {
            category: editFormData.category,
            description: editFormData.description,
            amount: editFormData.amount,
            expenseDate: editFormData.expenseDate,
        };

        const response = await editExpense(editingExpenseId, payload);

        if (!response.success) {
            setAlert({
                type: "error",
                title: "Edit Expense",
                message: response.message,
            });
            setSubmitting(false);
            return;
        }

        setAlert({
            type: "success",
            title: "Edit Expense",
            message: response.message,
        });

        closeEditModal();
        await fetchPageData();
        setSubmitting(false);
    };

    const selectFieldClassName = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none bg-light-surface dark:bg-dark-bg [&>option]:text-black [&>option]:bg-white dark:[&>option]:text-white-shade dark:[&>option]:bg-dark-bg";
    const inputFieldClassName = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none";

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                <p className="text-xs text-black/60 dark:text-white-shade/70">Total Expense</p>
                <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{formatCurrency(totalExpense)}</p>
            </article>

            <form onSubmit={handleSubmit} className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-batch" className="text-xs text-black/60 dark:text-white-shade/70">Batch</label>
                    <select
                        id="expense-batch"
                        value={formData.batchId}
                        onChange={(e) => setFormData((prev) => ({ ...prev, batchId: e.target.value }))}
                        className={selectFieldClassName}
                        required
                    >
                        {batches.map((batch) => (
                            <option key={batch._id} value={batch._id}>{batch.batchName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-category" className="text-xs text-black/60 dark:text-white-shade/70">Category</label>
                    <select
                        id="expense-category"
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className={selectFieldClassName}
                    >
                        {expenseCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-amount" className="text-xs text-black/60 dark:text-white-shade/70">Amount</label>
                    <input
                        id="expense-amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        className={inputFieldClassName}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-date" className="text-xs text-black/60 dark:text-white-shade/70">Expense Date</label>
                    <input
                        id="expense-date"
                        type="date"
                        value={formData.expenseDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, expenseDate: e.target.value }))}
                        className={inputFieldClassName}
                    />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                    <label htmlFor="expense-description" className="text-xs text-black/60 dark:text-white-shade/70">Description</label>
                    <textarea
                        id="expense-description"
                        rows={3}
                        placeholder="Enter expense description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        className="border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none resize-none"
                        required
                    />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                    <button type="submit" disabled={submitting} className="rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-4 py-2 disabled:bg-pri-col/50 cursor-pointer">
                        {submitting ? "Saving..." : "Add Expense"}
                    </button>
                </div>
            </form>

            <form onSubmit={handleApplyFilter} className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-filter-category" className="text-xs text-black/60 dark:text-white-shade/70">Filter Category</label>
                    <select
                        id="expense-filter-category"
                        value={filterFormData.category}
                        onChange={(e) => setFilterFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className={selectFieldClassName}
                    >
                        <option value="">All Categories</option>
                        {expenseCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-filter-start-date" className="text-xs text-black/60 dark:text-white-shade/70">Start Date</label>
                    <input
                        id="expense-filter-start-date"
                        type="date"
                        value={filterFormData.startDate}
                        onChange={(e) => setFilterFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                        className={inputFieldClassName}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="expense-filter-end-date" className="text-xs text-black/60 dark:text-white-shade/70">End Date</label>
                    <input
                        id="expense-filter-end-date"
                        type="date"
                        value={filterFormData.endDate}
                        onChange={(e) => setFilterFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                        className={inputFieldClassName}
                    />
                </div>
                <button type="submit" className="rounded-lg border border-black/15 dark:border-white-shade/20 text-sm dark:text-white-shade px-3 py-2 cursor-pointer">
                    Apply Filter
                </button>
            </form>

            <div className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface overflow-hidden">
                {loading ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">Loading expense records...</p>
                ) : expenses.length === 0 ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">No expense records available yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-black/5 dark:bg-white/5">
                                <tr className="text-left">
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Batch</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Category</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Description</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Amount</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Date</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense) => (
                                    <tr key={expense.expenseId} className="border-t border-black/10 dark:border-white-shade/10">
                                        <td className="px-3 py-3 dark:text-white-shade">{expense.batchName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{expense.category}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{expense.description}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(expense.amount)}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatDate(expense.expenseDate)}</td>
                                        <td className="px-3 py-3">
                                            <button onClick={() => handleEditExpense(expense)} className="text-xs rounded-md border border-black/15 dark:border-white-shade/20 text-black/80 dark:text-white-shade px-2 py-1 cursor-pointer">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-lg rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                        <h2 className="text-base font-semibold text-black/90 dark:text-white-shade">Edit Expense</h2>
                        <form onSubmit={handleEditSubmit} className="mt-4 grid grid-cols-1 gap-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="edit-expense-category" className="text-xs text-black/60 dark:text-white-shade/70">Category</label>
                                <select
                                    id="edit-expense-category"
                                    value={editFormData.category}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, category: e.target.value }))}
                                    className={selectFieldClassName}
                                    required
                                >
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="edit-expense-amount" className="text-xs text-black/60 dark:text-white-shade/70">Amount</label>
                                <input
                                    id="edit-expense-amount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={editFormData.amount}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, amount: e.target.value }))}
                                    className={inputFieldClassName}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="edit-expense-date" className="text-xs text-black/60 dark:text-white-shade/70">Expense Date</label>
                                <input
                                    id="edit-expense-date"
                                    type="date"
                                    value={editFormData.expenseDate}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, expenseDate: e.target.value }))}
                                    className={inputFieldClassName}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="edit-expense-description" className="text-xs text-black/60 dark:text-white-shade/70">Description</label>
                                <textarea
                                    id="edit-expense-description"
                                    rows={3}
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, description: e.target.value }))}
                                    className="border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none resize-none"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="rounded-lg border border-black/15 dark:border-white-shade/20 text-sm dark:text-white-shade px-4 py-2 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-4 py-2 disabled:bg-pri-col/50 cursor-pointer"
                                >
                                    {submitting ? "Updating..." : "Update Expense"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AlertMessage
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert({ type: "", title: "", message: "" })}
            />
        </section>
    );
};

export default ExpensesPage;
