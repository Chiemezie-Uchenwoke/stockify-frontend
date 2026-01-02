import SalesRecord from "./SalesRecord";
import ReturnToBatchButton from "./ReturnToBatchButton";
// import { useEffect } from "react";

const BatchSalesOverview = ({setMode, batchSales}) => {

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <ReturnToBatchButton 
                    onClick={() => setMode("view")}
                />

                <h2 className="text-xs lg:text-sm font-medium">
                    {batchSales.length === 0 ? "No sales recorded" : "Sales Records"}
                </h2>
            </div>

            <div className="overflow-x-auto">
                <SalesRecord 
                    batchSales={batchSales}
                />
            </div>
        </div>
    )
};

export default BatchSalesOverview;