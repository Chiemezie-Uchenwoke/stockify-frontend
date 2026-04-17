import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);

const ReportsCharts = ({ totals, sales, expenses, chartStyles }) => {
    const revenueVsExpenseData = {
        labels: ["Revenue", "Expenses", "Net Profit"],
        datasets: [
            {
                label: "Amount (NGN)",
                data: [totals.totalSalesRevenue, totals.totalExpenses, totals.netProfit],
                backgroundColor: ["rgba(59,130,246,0.8)", "rgba(239,68,68,0.8)", "rgba(34,197,94,0.8)"],
                borderRadius: 8,
            },
        ],
    };

    const salesByDate = sales.reduce((acc, sale) => {
        const dateKey = new Date(sale.salesDate).toISOString().split("T")[0];
        const revenue = Number(sale.sellingPrice || 0) * Number(sale.quantitySold || 0);
        acc[dateKey] = (acc[dateKey] || 0) + revenue;
        return acc;
    }, {});
    const salesTrendLabels = Object.keys(salesByDate).sort();
    const salesTrendData = {
        labels: salesTrendLabels,
        datasets: [
            {
                label: "Revenue by day (NGN)",
                data: salesTrendLabels.map((label) => salesByDate[label]),
                borderColor: "rgba(59,130,246,0.95)",
                backgroundColor: "rgba(59,130,246,0.2)",
                fill: true,
                tension: 0.35,
            },
        ],
    };

    const totalsByCategory = expenses.reduce((acc, expense) => {
        const category = expense.category || "Other";
        acc[category] = (acc[category] || 0) + Number(expense.amount || 0);
        return acc;
    }, {});
    const expenseCategoryLabels = Object.keys(totalsByCategory);
    const expenseCategoryData = {
        labels: expenseCategoryLabels,
        datasets: [
            {
                label: "Expense by category (NGN)",
                data: expenseCategoryLabels.map((label) => totalsByCategory[label]),
                backgroundColor: [
                    "rgba(59,130,246,0.85)",
                    "rgba(34,197,94,0.85)",
                    "rgba(251,191,36,0.85)",
                    "rgba(239,68,68,0.85)",
                    "rgba(168,85,247,0.85)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const sharedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: chartStyles.legendColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: chartStyles.tickColor,
                },
                grid: {
                    color: chartStyles.gridColor,
                },
            },
            y: {
                ticks: {
                    color: chartStyles.tickColor,
                },
                grid: {
                    color: chartStyles.gridColor,
                },
            },
        },
    };

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 h-80">
                    <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade mb-3">Revenue vs Expense</h3>
                    <Bar data={revenueVsExpenseData} options={sharedChartOptions} />
                </article>

                <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 h-80">
                    <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade mb-3">Sales Trend</h3>
                    {salesTrendData.labels.length > 0 ? (
                        <Line data={salesTrendData} options={sharedChartOptions} />
                    ) : (
                        <p className="text-sm text-black/70 dark:text-white-shade/70">No sales trend data yet.</p>
                    )}
                </article>
            </div>

            <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                <h3 className="text-sm font-semibold text-black/90 dark:text-white-shade mb-3">Expense Categories</h3>
                <div className="h-80">
                    {expenseCategoryData.labels.length > 0 ? (
                        <Doughnut
                            data={expenseCategoryData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: chartStyles.legendColor,
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p className="text-sm text-black/70 dark:text-white-shade/70">No expense category data yet.</p>
                    )}
                </div>
            </article>
        </>
    );
};

export default ReportsCharts;
