import { memo } from "react";
import { MdEdit } from "react-icons/md";

const BatchTable = ({batches}) => {
    return (
        <>
            <div className="w-full overflow-x-auto border border-black/20 rounded-2xl bg-light-surface dark:bg-dark-surface py-6 px-4 hidden sm:flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs sm:text-sm font-semibold dark:text-white-shade/80">All Batches</h2>
                    <p className="text-xs sm:text-sm">
                        <span> {batches.length} </span>
                        <span> {batches.length === 1 ? "Result" : "Results"} </span>
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
                        {
                            batches.map((batch, i) => {
                                return (
                                    <tr key={batch._id} className="">
                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            {i + 1} 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            {batch.batchName} 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            {batch.type} 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost) } 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            { new Date(batch.importDate).toLocaleDateString("en-US", {dateStyle: "medium"}) } 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-1 px-2 sm:py-2 sm:px-4"> 
                                            <button>
                                                    Update
                                            </button>     
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className=" sm:hidden flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs sm:text-sm font-semibold dark:text-white-shade/80">All Batches</h2>
                    <p className="text-xs sm:text-sm">
                        <span> {batches.length} </span>
                        <span> {batches.length === 1 ? "Result" : "Results"} </span>
                    </p>
                </div>

                <div className="">
                    {
                        batches.map((batch) => {
                            return (
                                <div 
                                    key={batch._id}
                                    className="border border-black/20 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface py-4 px-2 rounded-2xl flex flex-col gap-2.5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-xs font-semibold dark:text-white-shade/85"> {batch.batchName} </p>
                                        <p className="text-xs dark:text-white-shade/85"> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost) }  </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex gap-3 items-center">
                                            <p className="text-xs dark:text-white-shade/85"> {new Date(batch.importDate).toLocaleDateString("en-US", {dateStyle: "medium"}) } </p>
                                            <p className={`text-[8px] ${batch.type === "import" ? "bg-green-400/20" : "bg-purple-700/20"} p-0.5 capitalize tracking-wide dark:text-white-shade/85`}> {batch.type} </p>
                                        </div>

                                        <button className="text-xs bg-blue-500/80 text-white-shade py-1 px-1.5 flex items-center gap-1">
                                            <MdEdit />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default memo(BatchTable);