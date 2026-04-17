import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { filterSales, getAllSales } from "../../services/salesService";
import useThemeStore from "../../stores/ThemeStore";

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

const SalesPage = () => {
    const { theme } = useThemeStore();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filterFormData, setFilterFormData] = useState({
        startDate: "",
        endDate: "",
    });
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    const totalRevenue = useMemo(() => {
        return sales.reduce((sum, sale) => sum + Number(sale.sellingPrice || 0) * Number(sale.quantitySold || 0), 0);
    }, [sales]);

    const totalUnitsSold = useMemo(() => {
        return sales.reduce((sum, sale) => sum + Number(sale.quantitySold || 0), 0);
    }, [sales]);

    const fetchSales = async () => {
        setLoading(true);
        const response = await getAllSales();
        if (!response.success) {
            setAlert({
                type: "error",
                title: "Sales",
                message: response.message,
            });
        }
        setSales(response.sales || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleFilterSales = async (e) => {
        e.preventDefault();
        setIsFiltering(true);
        setAlert({ type: "", title: "", message: "" });

        const response = await filterSales(filterFormData);
        if (!response.success) {
            setAlert({
                type: "error",
                title: "Sales Filter",
                message: response.message,
            });
            setIsFiltering(false);
            return;
        }

        setSales(response.sales || []);
        setAlert({
            type: "success",
            title: "Sales Filter",
            message: response.message,
        });
        setIsFiltering(false);
    };

    const handleResetFilters = () => {
        setFilterFormData({ startDate: "", endDate: "" });
        fetchSales();
    };

    const inputFieldClassName = "border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none";

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Total Revenue</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{formatCurrency(totalRevenue)}</p>
                </article>

                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Total Units Sold</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{totalUnitsSold}</p>
                </article>
            </div>

            <form onSubmit={handleFilterSales} className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="sales-filter-start-date" className="text-xs text-black/60 dark:text-white-shade/70">Start Date</label>
                    <input
                        id="sales-filter-start-date"
                        type="date"
                        value={filterFormData.startDate}
                        onChange={(e) => setFilterFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                        className={inputFieldClassName}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="sales-filter-end-date" className="text-xs text-black/60 dark:text-white-shade/70">End Date</label>
                    <input
                        id="sales-filter-end-date"
                        type="date"
                        value={filterFormData.endDate}
                        onChange={(e) => setFilterFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                        className={inputFieldClassName}
                    />
                </div>
                <button type="submit" disabled={isFiltering} className="rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-3 py-2 disabled:bg-pri-col/50 cursor-pointer">
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
                    <p className="text-sm text-black/70 dark:text-white-shade/70 p-4">No sales records available yet.</p>
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
                                    <tr key={`${sale.productId}-${sale.salesDate}-${index}`} className="border-t border-black/10 dark:border-white-shade/10">
                                        <td className="px-3 py-3 dark:text-white-shade">{sale.productName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{sale.batchName}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{sale.quantitySold}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(sale.sellingPrice)}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatCurrency(Number(sale.sellingPrice || 0) * Number(sale.quantitySold || 0))}</td>
                                        <td className="px-3 py-3 text-black/70 dark:text-white-shade/70">{formatDate(sale.salesDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

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
