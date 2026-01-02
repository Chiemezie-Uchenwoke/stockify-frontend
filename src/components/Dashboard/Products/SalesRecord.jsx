import { memo } from "react";

const SalesRecord = ({batchSales}) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="whitespace-nowrap">
                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        SN
                    </th>

                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        Product Name
                    </th>

                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        Quantity purchased
                    </th>

                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        Quantity Sold
                    </th>

                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        Selling Price
                    </th>

                    <th className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 py-1 px-2 sm:py-2 sm:px-4">
                        Sales Date
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    batchSales.map((sale, index) => {
                        return (
                            <tr key={sale?.salesId} className="whitespace-nowrap">
                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12"> 
                                    {index + 1} 
                                </td>

                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12"> 
                                    {sale?.productName} 
                                </td>

                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12"> 
                                    {sale?.quantity} 
                                </td>

                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12"> 
                                    {sale?.quantitySold} 
                                </td>

                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12"> 
                                    {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(sale?.sellingPrice) }      
                                </td>

                                <td className="text-[10px] sm:text-xs border dark:border-white-shade/50 dark:text-white-shade/80 text-center whitespace-normal break-words py-2 px-2 sm:py-2 sm:px-4 h-12">
                                    { new Date(sale?.salesDate).toLocaleDateString("en-US", {dateStyle: "medium"}) } 
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default memo(SalesRecord);