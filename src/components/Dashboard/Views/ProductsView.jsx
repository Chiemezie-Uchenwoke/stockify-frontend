import { useEffect, useState } from "react";
import useThemeStore from "../../../stores/ThemeStore";
import { getAllBatches } from "../../../services/batchService";
import { getAllProducts, addNewProduct, editProduct } from "../../../services/productService";
import AlertMessage from "../../AlertMessage/AlertMessage";

const LIMIT = 10;

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(Number(amount || 0));

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "N/A");

const emptyForm = { productName: "", batchId: "", quantity: "", costPrice: "", sellingPrice: "" };

const ProductsView = () => {
    const { theme } = useThemeStore();

    const [products, setProducts] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [editFormData, setEditFormData] = useState(emptyForm);

    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    const inputClass = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none bg-light-surface dark:bg-dark-bg w-full";
    const selectClass = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none bg-light-surface dark:bg-dark-bg w-full [&>option]:text-black [&>option]:bg-white dark:[&>option]:text-white-shade dark:[&>option]:bg-dark-bg";

    const fetchProducts = async (p = page) => {
        setLoading(true);
        const res = await getAllProducts(p, LIMIT);
        if (res.success) {
            setProducts(res.products);
            setPagination(res.pagination || null);
        } else {
            setAlert({ type: "error", title: "Products", message: res.message });
        }
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            const batchRes = await getAllBatches();
            if (batchRes.success) setBatches(batchRes.batches || []);
            setLoading(true);
            const res = await getAllProducts(1, LIMIT);
            if (res.success) {
                setProducts(res.products);
                setPagination(res.pagination || null);
            } else {
                setAlert({ type: "error", title: "Products", message: res.message });
            }
            setLoading(false);
        };
        init();
    }, []);

    const goToPage = (p) => {
        setPage(p);
        fetchProducts(p);
    };

    const openAddModal = () => {
        setFormData({ ...emptyForm, batchId: batches[0]?._id || "" });
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setFormData(emptyForm);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!formData.batchId || !formData.productName || !formData.quantity || !formData.costPrice || !formData.sellingPrice) {
            setAlert({ type: "error", title: "Add Product", message: "All fields are required." });
            return;
        }
        setSubmitting(true);
        const { batchId, ...rest } = formData;
        const res = await addNewProduct(batchId, rest);
        if (!res.success) {
            setAlert({ type: "error", title: "Add Product", message: res.message });
            setSubmitting(false);
            return;
        }
        setAlert({ type: "success", title: "Add Product", message: res.message });
        closeAddModal();
        await fetchProducts(1);
        setPage(1);
        setSubmitting(false);
    };

    const openEditModal = (product) => {
        setEditingProductId(product.productId);
        setEditFormData({
            productName: product.productName,
            batchId: product.batchId,
            quantity: String(product.quantity),
            costPrice: String(product.costPrice),
            sellingPrice: String(product.sellingPrice),
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingProductId(null);
        setEditFormData(emptyForm);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editFormData.productName || !editFormData.quantity || !editFormData.costPrice || !editFormData.sellingPrice) {
            setAlert({ type: "error", title: "Edit Product", message: "All fields are required." });
            return;
        }
        setSubmitting(true);
        const { productName, quantity, costPrice, sellingPrice } = editFormData;
        const res = await editProduct(editingProductId, { productName, quantity, costPrice, sellingPrice });
        if (!res.success) {
            setAlert({ type: "error", title: "Edit Product", message: res.message });
            setSubmitting(false);
            return;
        }
        setAlert({ type: "success", title: "Edit Product", message: res.message });
        closeEditModal();
        await fetchProducts(page);
        setSubmitting(false);
    };

    const totalPages = pagination?.totalPages ?? 1;

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-black/90 dark:text-white-shade">Products</h2>
                    {pagination && (
                        <p className="text-xs text-black/50 dark:text-white-shade/50 mt-0.5">
                            {pagination.total} product{pagination.total !== 1 ? "s" : ""} total
                        </p>
                    )}
                </div>
                <button
                    onClick={openAddModal}
                    className="rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-4 py-2 cursor-pointer"
                >
                    + Add Product
                </button>
            </div>

            <div className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface overflow-hidden">
                {loading ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">
                        No products yet. Create a batch first, then add products to it.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-black/5 dark:bg-white/5">
                                <tr className="text-left">
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Product</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Batch</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Qty</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Cost Price</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Selling Price</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Added</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.productId} className="border-t border-black/10 dark:border-white-shade/10">
                                        <td className="px-3 py-3 font-medium dark:text-white-shade capitalize">{p.productName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70 capitalize">{p.batchName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{p.quantity}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(p.costPrice)}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(p.sellingPrice)}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatDate(p.createdAt)}</td>
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() => openEditModal(p)}
                                                className="text-xs rounded-md border border-black/15 dark:border-white-shade/20 text-black/80 dark:text-white-shade px-2 py-1 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                                            >
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

            {totalPages > 1 && (
                <div className="flex items-center justify-between text-sm">
                    <p className="text-black/50 dark:text-white-shade/50">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page <= 1}
                            onClick={() => goToPage(page - 1)}
                            className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white-shade/20 dark:text-white-shade disabled:opacity-40 cursor-pointer"
                        >
                            Prev
                        </button>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => goToPage(page + 1)}
                            className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white-shade/20 dark:text-white-shade disabled:opacity-40 cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-lg rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-5">
                        <h2 className="text-base font-semibold text-black/90 dark:text-white-shade mb-4">Add Product</h2>
                        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2 flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Batch</label>
                                <select
                                    value={formData.batchId}
                                    onChange={(e) => setFormData((p) => ({ ...p, batchId: e.target.value }))}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select batch</option>
                                    {batches.map((b) => (
                                        <option key={b._id} value={b._id}>{b.batchName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2 flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={formData.productName}
                                    onChange={(e) => setFormData((p) => ({ ...p, productName: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Quantity</label>
                                <input
                                    type="number" min="0" placeholder="0"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData((p) => ({ ...p, quantity: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Cost Price (₦)</label>
                                <input
                                    type="number" min="0" step="0.01" placeholder="0.00"
                                    value={formData.costPrice}
                                    onChange={(e) => setFormData((p) => ({ ...p, costPrice: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Selling Price (₦)</label>
                                <input
                                    type="number" min="0" step="0.01" placeholder="0.00"
                                    value={formData.sellingPrice}
                                    onChange={(e) => setFormData((p) => ({ ...p, sellingPrice: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2 flex justify-end gap-2 mt-1">
                                <button type="button" onClick={closeAddModal} className="px-4 py-2 rounded-lg border border-black/15 dark:border-white-shade/20 text-sm dark:text-white-shade cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium disabled:opacity-50 cursor-pointer">
                                    {submitting ? "Saving..." : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-lg rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-5">
                        <h2 className="text-base font-semibold text-black/90 dark:text-white-shade mb-4">Edit Product</h2>
                        <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2 flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Product Name</label>
                                <input
                                    type="text"
                                    value={editFormData.productName}
                                    onChange={(e) => setEditFormData((p) => ({ ...p, productName: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Quantity</label>
                                <input
                                    type="number" min="0"
                                    value={editFormData.quantity}
                                    onChange={(e) => setEditFormData((p) => ({ ...p, quantity: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Cost Price (₦)</label>
                                <input
                                    type="number" min="0" step="0.01"
                                    value={editFormData.costPrice}
                                    onChange={(e) => setEditFormData((p) => ({ ...p, costPrice: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-black/60 dark:text-white-shade/70">Selling Price (₦)</label>
                                <input
                                    type="number" min="0" step="0.01"
                                    value={editFormData.sellingPrice}
                                    onChange={(e) => setEditFormData((p) => ({ ...p, sellingPrice: e.target.value }))}
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2 flex justify-end gap-2 mt-1">
                                <button type="button" onClick={closeEditModal} className="px-4 py-2 rounded-lg border border-black/15 dark:border-white-shade/20 text-sm dark:text-white-shade cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium disabled:opacity-50 cursor-pointer">
                                    {submitting ? "Updating..." : "Update Product"}
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

export default ProductsView;
