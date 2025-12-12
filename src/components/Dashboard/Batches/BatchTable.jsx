import { memo, useState } from "react";
import { MdEdit } from "react-icons/md";
import PaginationButton from "../Components/PaginationButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const BatchTable = ({batches, setMode, setFormData, setSelectedBatchId}) => {

    const totalBatches = batches.length;
    const [batchRange, setBatchRange] = useState({
        minRange: 0,
        maxRange: 8
    });
    const prevBtnDisable = batchRange.minRange === 0 ? true : false;
    const nextBtnDisable = batchRange.maxRange === totalBatches ? true : false;
 
    return (
        <>
            <div className="w-full overflow-x-auto border border-black/20 rounded-2xl bg-light-surface dark:bg-dark-surface py-6 px-4 pb-10 hidden sm:flex flex-col gap-2">
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
                            batches.slice(batchRange.minRange, batchRange.maxRange).map((batch, i) => {
                                return (
                                    <tr key={batch._id} className="">
                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-20"> 
                                            {batchRange.minRange + i + 1} 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 capitalize h-20"> 
                                            {batch.batchName} 
                                        </td>

                                        <td className={`text-[10px] sm:text-xs border dark:border-white-shade/50  text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 capitalize font-medium h-20`}> 
                                            <p className={`${batch.type === "import" ? "text-purple-400 " : "text-amber-600"}`}>
                                                {batch.type} 
                                            </p>
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-20"> 
                                            {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost) } 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-20"> 
                                            { new Date(batch.importDate).toLocaleDateString("en-US", {dateStyle: "medium"}) } 
                                        </td>

                                        <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-20 "> 
                                            <button 
                                                className=" text-xs bg-blue-500/80 text-white-shade py-1 px-2.5 flex items-center gap-1 cursor-pointer mx-auto active:translate-y-0.5"
                                                onClick={() => {
                                                    setMode("edit");
                                                    setFormData({
                                                        ...batch,
                                                        importDate: new Date(batch.importDate).toISOString().split("T")[0],
                                                    });
                                                    setSelectedBatchId(batch._id);
                                                }}
                                            >
                                                <MdEdit />
                                                Edit
                                            </button>     
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {
                    totalBatches >= batchRange.maxRange &&
                    <div className="flex justify-center gap-8 mt-8">
                        <PaginationButton 
                            label={"Previous"}
                            disabled={prevBtnDisable}
                            onClick={() =>
                                setBatchRange((prev) => ({
                                    minRange: Math.max(prev.minRange - 8, 0),
                                    maxRange: Math.max(prev.maxRange - 8, 8)
                                }))
                            }
                        />
                    
                        <PaginationButton 
                            label={"Next"}
                            onClick={() => setBatchRange(prev => ({minRange: prev.minRange + 8, maxRange: Math.min(prev.maxRange + 8, totalBatches)}))}
                            disabled={nextBtnDisable}
                        />
                    </div>
                }
            </div>

            <div className=" sm:hidden flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs sm:text-sm font-semibold dark:text-white-shade/80">All Batches</h2>
                    <p className="text-xs sm:text-sm">
                        <span> {batches.length} </span>
                        <span> {batches.length === 1 ? "Result" : "Results"} </span>
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {
                        batches.slice(batchRange.minRange, batchRange.maxRange).map((batch) => {
                            return (
                                <div 
                                    key={batch._id}
                                    className="border border-black/20 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface py-4 px-2 rounded-2xl flex flex-col gap-2.5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-xs font-semibold capitalize dark:text-white-shade/85"> {batch.batchName} </p>
                                        <p className="text-xs dark:text-white-shade/85"> {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost) }  </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex gap-3 items-center">
                                            <p className="text-xs dark:text-white-shade/85"> {new Date(batch.importDate).toLocaleDateString("en-US", {dateStyle: "medium"}) } </p>
                                            <p className={`text-[8px] ${batch.type === "import" ? "bg-green-400/20" : "bg-purple-700/20"} p-0.5 capitalize tracking-wide dark:text-white-shade/85`}> {batch.type} </p>
                                        </div>

                                        <button 
                                            className="text-xs bg-blue-500/80 text-white-shade py-1 px-1.5 flex items-center gap-1"
                                            onClick={() => {
                                                setMode("edit");
                                                setFormData({
                                                    ...batch,
                                                    importDate: new Date(batch.importDate).toISOString().split("T")[0],
                                                });
                                                setSelectedBatchId(batch._id);
                                            }}
                                        >
                                            <MdEdit />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {
                    totalBatches >= batchRange.maxRange &&
                    <div className="flex justify-center gap-8 mt-8">
                        <PaginationButton 
                            label={"Previous"}
                            disabled={prevBtnDisable}
                            onClick={() =>
                                setBatchRange((prev) => ({
                                    minRange: Math.max(prev.minRange - 8, 0),
                                    maxRange: Math.max(prev.maxRange - 8, 8)
                                }))
                            }
                        />
                    
                        <PaginationButton 
                            label={"Next"}
                            onClick={() => setBatchRange(prev => ({minRange: prev.minRange + 8, maxRange: Math.min(prev.maxRange + 8, totalBatches)}))}
                            disabled={nextBtnDisable}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default memo(BatchTable);