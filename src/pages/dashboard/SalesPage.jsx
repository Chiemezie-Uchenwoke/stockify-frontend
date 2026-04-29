import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { filterSales, getAllSales, recordSale } from "../../services/salesService";
import { getAllBatches } from "../../services/batchService";
import { getProductsByBatch } from "../../services/productService";
import useThemeStore from "../../stores/ThemeStore";

const LIMIT = 10;

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(Number(amount || 0));

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "N/A");

const SalesPage = () => {
    const { theme } = useThemeStore();

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    const [batches, setBatches] = useState([]);
    const [batchProducts, setBatchProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [saleForm, setSaleForm] = useState({
        batchId: "",
        productId: "",
        quantitySold: "",
        sellingPrice: "",
        salesDate: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const [isFiltering, setIsFiltering] = useState(false);
    const [filterFormData, setFilterFormData] = useState({ startDate: "", endDate: "" });
    const [isFilterActive, setIsFilterActive] = useState(false);

    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    const inputClass = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none bg-light-surface dark:bg-dark-bg w-full";
    const selectClass = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none bg-light-surface dark:bg-dark-bg w-full [&>option]:text-black [&>option]:bg-white dark:[&>option]:text-white-shade dark:[&>option]:bg-dark-bg";

    const totalRevenue = useMemo(
        () => sales.reduce((sum, s) => sum + Number(s.sellingPrice || 0) * Number(s.quantitySold || 0), 0),
        [sales]
    );
    const totalUnitsSold = useMemo(() => sales.reduce((sum, s) => sum + Number(s.quantitySold || 0), 0), [sales]);

    const fetchSales = async (p = 1) => {
        setLoading(true);
        const res = await getAllSales(p, LIMIT);
        if (!res.success) {
            setAlert({ type: "error", title: "Sales", message: res.message });
        }
        setSales(res.sales || []);
        setPagination(res.pagination || null);
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            const batchRes = await getAllBatches();
            if (batchRes.success) setBatches(batchRes.batches || []);
            await fetchSales(1);
        };
        init();
    }, []);

    const goToPage = (p) => {
        setPage(p);
        if (isFilterActive) {
            handleFilterRequest(p);
        } else {
            fetchSales(p);
        }
    };

    const handleBatchChange = async (batchId) => {
        setSaleForm((prev) => ({ ...prev, batchId, productId: "", sellingPrice: "" }));
        setBatchProducts([]);
        if (!batchId) return;
        setLoadingProducts(true);
        const res = await getProductsByBatch(batchId);
        if (res.success) setBatchProducts(res.products || []);
        setLoadingProducts(false);
    };

    const handleProductChange = (productId) => {
        const product = batchProducts.find((p) => p.productId === productId);
        setSaleForm((prev) => ({
            ...prev,
            productId,
            sellingPrice: product ? String(product.sellingPrice) : "",
        }));
    };

    const handleRecordSale = async (e) => {
        e.preventDefault();
        const { batchId, productId, quantitySold, sellingPrice, salesDate } = saleForm;
        if (!batchId || !productId || !quantitySold || !sellingPrice || !salesDate) {
            setAlert({ type: "error", title: "Record Sale", message: "All fields are required." });
            return;
        }
        setSubmitting(true);
        const res = await recordSale({ quantitySold, sellingPrice, salesDate }, batchId, productId);
        if (!res.success) {
            setAlert({ type: "error", title: "Record Sale", message: res.message });
            setSubmitting(false);
            return;
        }
        setAlert({ type: "success", title: "Sale Recorded", message: res.message });
        setSaleForm({ batchId: "", productId: "", quantitySold: "", sellingPrice: "", salesDate: "" });
        setBatchProducts([]);
        setIsFilterActive(false);
        setPage(1);
        await fetchSales(1);
        setSubmitting(false);
    };

    const handleFilterRequest = async (p = 1) => {
        setIsFiltering(true);
        const res = await filterSales(filterFormData);
        if (!res.success) {
            setAlert({ type: "error", title: "Sales Filter", message: res.message });
            setIsFiltering(false);
            return;
        }
        setSales(res.sales || []);
        setPagination(null);
        setIsFilterActive(true);
        setIsFiltering(false);
    };

    const handleFilterSales = async (e) => {
        e.preventDefault();
        setPage(1);
        await handleFilterRequest(1);
    };

    const handleResetFilters = () => {
        setFilterFormData({ startDate: "", endDate: "" });
        setIsFilterActive(false);
        setPage(1);
        fetchSales(1);
    };

    const totalPages = pagination?.totalPages ?? 1;

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Total Revenue (this page)</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{formatCurrency(totalRevenue)}</p>
                </article>
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Total Units Sold (this page)</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{totalUnitsSold}</p>
                </article>
            </div>

            <div className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade mb-4">Record a Sale</h3>
                <form onSubmit={handleRecordSale} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-black/60 dark:text-white-shade/70">Batch</label>
                        <select
                            value={saleForm.batchId}
                            onChange={(e) => handleBatchChange(e.target.value)}
                            className={selectClass}
                            required
                        >
                            <option value="">Select batch</option>
                            {batches.map((b) => (
                                <option key={b._id} value={b._id}>{b.batchName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-black/60 dark:text-white-shade/70">Product</label>
                        <select
                            value={saleForm.productId}
                            onChange={(e) => handleProductChange(e.target.value)}
                            className={selectClass}
                            disabled={!saleForm.batchId || loadingProducts}
                            required
                        >
                            <option value="">
                                {loadingProducts ? "Loading..." : saleForm.batchId ? "Select product" : "Select batch first"}
                            </option>
                            {batchProducts.map((p) => (
                                <option key={p.productId} value={p.productId}>
                                    {p.productName} (Qty: {p.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-black/60 dark:text-white-shade/70">Quantity Sold</label>
                        <input
                            type="number" min="1" placeholder="0"
                            value={saleForm.quantitySold}
                            onChange={(e) => setSaleForm((p) => ({ ...p, quantitySold: e.target.value }))}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-black/60 dark:text-white-shade/70">Selling Price (₦)</label>
                        <input
                            type="number" min="0" step="0.01" placeholder="0.00"
                            value={saleForm.sellingPrice}
                            onChange={(e) => setSaleForm((p) => ({ ...p, sellingPrice: e.target.value }))}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-black/60 dark:text-white-shade/70">Sales Date</label>
                        <input
                            type="date"
                            value={saleForm.salesDate}
                            onChange={(e) => setSaleForm((p) => ({ ...p, salesDate: e.target.value }))}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-4 py-2 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? "Recording..." : "Record Sale"}
                        </button>
                    </div>
                </form>
            </div>

            <form onSubmit={handleFilterSales} className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-black/60 dark:text-white-shade/70">Start Date</label>
                    <input
                        type="date"
                        value={filterFormData.startDate}
                        onChange={(e) => setFilterFormData((p) => ({ ...p, startDate: e.target.value }))}
                        className={inputClass}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-black/60 dark:text-white-shade/70">End Date</label>
                    <input
                        type="date"
                        value={filterFormData.endDate}
                        onChange={(e) => setFilterFormData((p) => ({ ...p, endDate: e.target.value }))}
                        className={inputClass}
                    />
                </div>
                <button type="submit" disabled={isFiltering} className="rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-3 py-2 disabled:opacity-50 cursor-pointer">
                    {isFiltering ? "Filtering..." : "Filter"}
                </button>
                <button type="button" onClick={handleResetFilters} className="rounded-lg border border-black/15 dark:border-white-shade/20 text-sm dark:text-white-shade px-3 py-2 cursor-pointer">
                    Reset
                </button>
            </form>

            <div className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface overflow-hidden">
                {loading ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">Loading sales records...</p>
                ) : sales.length === 0 ? (
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">No sales records yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-black/5 dark:bg-white/5">
                                <tr className="text-left">
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Product</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Batch</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Qty Sold</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Unit Price</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Revenue</th>
                                    <th className="px-3 py-3 font-medium text-black/70 dark:text-white-shade/70">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale, index) => (
                                    <tr key={`${sale.salesId}-${index}`} className="border-t border-black/10 dark:border-white-shade/10">
                                        <td className="px-3 py-3 dark:text-white-shade capitalize">{sale.productName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70 capitalize">{sale.batchName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{sale.quantitySold}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(sale.sellingPrice)}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(Number(sale.sellingPrice) * Number(sale.quantitySold))}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatDate(sale.salesDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isFilterActive && totalPages > 1 && (
                <div className="flex items-center justify-between text-sm">
                    <p className="text-black/50 dark:text-white-shade/50">
                        Page {page} of {totalPages}
                        {pagination && <span> &middot; {pagination.total} records total</span>}
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

            <AlertMessage
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert({ type: "", title: "", message: "" })}
            />
        </section>
    );
};

export default SalesPage;
