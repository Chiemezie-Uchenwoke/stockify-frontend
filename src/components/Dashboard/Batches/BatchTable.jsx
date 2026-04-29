import { memo } from "react";
import { MdEdit } from "react-icons/md";

const BatchTable = ({ batches, setMode, setFormData, setSelectedBatchId, page, pagination, onPageChange }) => {
    const totalPages = pagination?.totalPages ?? 1;

    return (
        <>
            <div className="w-full overflow-x-auto border border-black/20 rounded-2xl bg-light-surface dark:bg-dark-surface py-6 px-4 pb-6 hidden sm:flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs sm:text-sm font-semibold dark:text-white-shade/80">All Batches</h2>
                    <p className="text-xs sm:text-sm dark:text-white-shade/60">
                        {pagination ? `${pagination.total} result${pagination.total !== 1 ? "s" : ""}` : `${batches.length} result${batches.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">S/N</th>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">Batch Name</th>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">Type</th>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">Total Cost</th>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">Date</th>
                            <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.map((batch, i) => {
                            const rowNum = pagination ? (page - 1) * pagination.limit + i + 1 : i + 1;
                            return (
                                <tr key={batch._id}>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center py-2 px-2 sm:py-2 sm:px-4 h-16">
                                        {rowNum}
                                    </td>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center py-2 px-2 sm:py-2 sm:px-4 capitalize h-16">
                                        {batch.batchName}
                                    </td>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 text-center py-2 px-2 sm:py-2 sm:px-4 capitalize font-medium h-16">
                                        <p className={batch.type === "import" ? "text-purple-400" : "text-amber-600"}>
                                            {batch.type}
                                        </p>
                                    </td>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center py-2 px-2 sm:py-2 sm:px-4 h-16">
                                        {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost)}
                                    </td>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center py-2 px-2 sm:py-2 sm:px-4 h-16">
                                        {new Date(batch.importDate).toLocaleDateString("en-US", { dateStyle: "medium" })}
                                    </td>
                                    <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center py-2 px-2 sm:py-2 sm:px-4 h-16">
                                        <button
                                            className="text-xs bg-blue-500/80 text-white-shade py-1 px-2.5 flex items-center gap-1 cursor-pointer mx-auto active:translate-y-0.5"
                                            onClick={() => {
                                                setMode("edit");
                                                setFormData({
                                                    ...batch,
                                                    importDate: new Date(batch.importDate).toISOString().split("T")[0],
                                                });
                                                setSelectedBatchId(batch._id);
                                            }}
                                        >
                                            <MdEdit /> Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {totalPages > 1 && onPageChange && (
                    <div className="flex items-center justify-between mt-4 text-sm">
                        <p className="text-xs dark:text-white-shade/60">Page {page} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => onPageChange(page - 1)}
                                className="text-xs px-3 py-1.5 border border-black/20 dark:border-white-shade/20 dark:text-white-shade rounded disabled:opacity-40 cursor-pointer"
                            >
                                Prev
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => onPageChange(page + 1)}
                                className="text-xs px-3 py-1.5 border border-black/20 dark:border-white-shade/20 dark:text-white-shade rounded disabled:opacity-40 cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="sm:hidden flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs font-semibold dark:text-white-shade/80">All Batches</h2>
                    <p className="text-xs dark:text-white-shade/60">
                        {pagination ? `${pagination.total} result${pagination.total !== 1 ? "s" : ""}` : `${batches.length} result${batches.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {batches.map((batch) => (
                        <div
                            key={batch._id}
                            className="border border-black/20 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface py-4 px-3 rounded-2xl flex flex-col gap-2.5"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-semibold capitalize dark:text-white-shade/85">{batch.batchName}</p>
                                <p className="text-xs dark:text-white-shade/85">
                                    {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex gap-3 items-center">
                                    <p className="text-xs dark:text-white-shade/85">
                                        {new Date(batch.importDate).toLocaleDateString("en-US", { dateStyle: "medium" })}
                                    </p>
                                    <p className={`text-[8px] ${batch.type === "import" ? "bg-green-400/20" : "bg-purple-700/20"} p-0.5 capitalize tracking-wide dark:text-white-shade/85`}>
                                        {batch.type}
                                    </p>
                                </div>
                                <button
                                    className="text-xs bg-blue-500/80 text-white-shade py-1 px-1.5 flex items-center gap-1 cursor-pointer"
                                    onClick={() => {
                                        setMode("edit");
                                        setFormData({
                                            ...batch,
                                            importDate: new Date(batch.importDate).toISOString().split("T")[0],
                                        });
                                        setSelectedBatchId(batch._id);
                                    }}
                                >
                                    <MdEdit /> Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && onPageChange && (
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-xs dark:text-white-shade/60">Page {page} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => onPageChange(page - 1)}
                                className="text-xs px-3 py-1.5 border border-black/20 dark:border-white-shade/20 dark:text-white-shade rounded disabled:opacity-40 cursor-pointer"
                            >
                                Prev
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => onPageChange(page + 1)}
                                className="text-xs px-3 py-1.5 border border-black/20 dark:border-white-shade/20 dark:text-white-shade rounded disabled:opacity-40 cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default memo(BatchTable);
