import { useEffect, useState } from "react";
import { getAllBatches } from "../../services/batchService";
// import { TbCurrencyNaira } from "react-icons/tb";
import useThemeStore from "../../stores/ThemeStore";

const RecentBatches = () => {
    const [batches, setBatches] = useState([]);
    const {theme} = useThemeStore();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBatches = async () => {
            const data = await getAllBatches();
            setBatches(data.batches || []);
            setLoading(false);
        };

        fetchBatches();
    }, []);

    const recentBatches = batches.slice(0, 5);

    if (!loading && recentBatches.length === 0) {
        return <p className="text-xs md:text-sm">No batches found.</p>;
    }

    return (
        <div className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-3`}>
            <div className="flex justify-between">
                <h2 className="text-xs md:text-sm font-bold">Recent Batches</h2>

                <p className="text-xs md:text-sm font-semibold">
                    {recentBatches.length}
                    <span> Result </span>
                </p>
            </div>
            
            <div className="flex flex-col gap-4">
                {
                    recentBatches.map((batch) => {
                        return (
                            <div
                                key={batch._id}
                                className="flex flex-col gap-2 border border-black/15 p-3 rounded-2xl bg-light-surface hover:brightness-99 dark:bg-dark-surface dark:border-white-shade/15 duration-200 select-none"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs md:text-sm font-semibold dark:text-white-shade/85">
                                        {batch.batchName}
                                    </h3>

                                    <p className="flex items-center gap-1 text-xs md:text-sm dark:text-white-shade/75">
                                        <span>Cost:</span>

                                        <span className="flex items-center">
                                            { new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(batch.totalCost) }
                                        </span>
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-xs dark:text-white-shade/65">
                                        {
                                            new Date(batch.importDate).toLocaleDateString("en-US", { dateStyle: "medium" })
                                        }
                                    </p>

                                    <p className={`capitalize text-xs py-1 px-1.5 rounded-lg ${batch.type === "import" ? "bg-purple-600 text-white-shade" : "bg-amber-600"}`}>
                                        {batch.type}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default RecentBatches;