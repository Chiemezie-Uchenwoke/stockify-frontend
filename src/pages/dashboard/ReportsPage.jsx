import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import useThemeStore from "../../stores/ThemeStore";
import { filterExpense } from "../../services/expenseService";
import { getAllSales } from "../../services/salesService";
import { getAllBatches } from "../../services/batchService";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

const ReportsCharts = lazy(() => import("../../components/Dashboard/Reports/ReportsCharts"));

const formatCurrency = (amount) => {
    const value = Number(amount || 0);
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
    }).format(value);
};

const ReportsPage = () => {
    const { theme } = useThemeStore();
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            const [salesResponse, expenseResponse, batchesResponse] = await Promise.all([
                getAllSales(),
                filterExpense({}),
                getAllBatches(),
            ]);

            if (!salesResponse.success || !expenseResponse.success || !batchesResponse.success) {
                setAlert({
                    type: "error",
                    title: "Reports",
                    message: salesResponse.message || expenseResponse.message || batchesResponse.message || "Unable to load report data",
                });
            }

            setSales(salesResponse.sales || []);
            setExpenses(expenseResponse.expenses || []);
            setBatches(batchesResponse.batches || []);
            setLoading(false);
        };

        fetchReportData();
    }, []);

    const totals = useMemo(() => {
        const totalSalesRevenue = sales.reduce((sum, sale) => sum + Number(sale.sellingPrice || 0) * Number(sale.quantitySold || 0), 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
        const netProfit = totalSalesRevenue - totalExpenses;
        const topSellingProduct = sales.reduce((top, sale) => {
            const revenue = Number(sale.sellingPrice || 0) * Number(sale.quantitySold || 0);
            if (revenue > top.revenue) {
                return { productName: sale.productName, revenue };
            }
            return top;
        }, { productName: "N/A", revenue: 0 });

        return {
            totalSalesRevenue,
            totalExpenses,
            netProfit,
            topSellingProduct,
        };
    }, [sales, expenses]);

    const chartStyles = useMemo(() => {
        const isDark = theme === "dark";
        return {
            tickColor: isDark ? "rgba(255,255,255,0.75)" : "rgba(17,24,39,0.75)",
            gridColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(17,24,39,0.12)",
            legendColor: isDark ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.85)",
        };
    }, [theme]);

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Sales Revenue</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{formatCurrency(totals.totalSalesRevenue)}</p>
                </article>
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Total Expenses</p>
                    <p className="text-xl font-semibold text-black/90 dark:text-white-shade mt-2">{formatCurrency(totals.totalExpenses)}</p>
                </article>
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Net Profit</p>
                    <p className={`text-xl font-semibold mt-2 ${totals.netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {formatCurrency(totals.netProfit)}
                    </p>
                </article>
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <p className="text-xs text-black/60 dark:text-white-shade/70">Top Product</p>
                    <p className="text-base font-semibold text-black/90 dark:text-white-shade mt-2">{totals.topSellingProduct.productName}</p>
                    <p className="text-xs text-black/60 dark:text-white-shade/70 mt-1">{formatCurrency(totals.topSellingProduct.revenue)}</p>
                </article>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade">Inventory Snapshot</h3>
                    <ul className="mt-3 flex flex-col gap-2 text-sm text-black/70 dark:text-white-shade/70">
                        <li>Total Batches: <span className="font-medium text-black/90 dark:text-white-shade">{batches.length}</span></li>
                        <li>Total Sales Records: <span className="font-medium text-black/90 dark:text-white-shade">{sales.length}</span></li>
                        <li>Total Expense Records: <span className="font-medium text-black/90 dark:text-white-shade">{expenses.length}</span></li>
                    </ul>
                </article>

                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                    <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade">Quick Insights</h3>
                    <ul className="mt-3 flex flex-col gap-2 text-sm text-black/70 dark:text-white-shade/70">
                        <li>Average Revenue / Sale: <span className="font-medium text-black/90 dark:text-white-shade">{formatCurrency(sales.length ? totals.totalSalesRevenue / sales.length : 0)}</span></li>
                        <li>Average Expense Record: <span className="font-medium text-black/90 dark:text-white-shade">{formatCurrency(expenses.length ? totals.totalExpenses / expenses.length : 0)}</span></li>
                        <li>Expense Ratio: <span className="font-medium text-black/90 dark:text-white-shade">{totals.totalSalesRevenue ? `${Math.round((totals.totalExpenses / totals.totalSalesRevenue) * 100)}%` : "0%"}</span></li>
                    </ul>
                </article>
            </div>

            <Suspense
                fallback={
                    <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                        <p className="text-sm text-black/70 dark:text-white-shade/70">Loading charts...</p>
                    </article>
                }
            >
                <ReportsCharts
                    totals={totals}
                    sales={sales}
                    expenses={expenses}
                    chartStyles={chartStyles}
                />
            </Suspense>

            {loading && (
                <p className="text-sm text-black/70 dark:text-white-shade/70">Loading report data...</p>
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

export default ReportsPage;
