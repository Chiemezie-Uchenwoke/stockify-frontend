import useThemeStore from "../../../stores/ThemeStore";
import CreateButton from "../CreateButton";
import { useEffect, useState } from "react";
import { getAllBatches } from "../../../services/batchService";
import BatchTable from "../Batches/BatchTable";
import FilterForm from "../Batches/FilterForm";
import NewBatch from "../Batches/NewBatch";

const BatchesView = () => {
    const {theme} = useThemeStore();
    const [batches, setBatches] = useState([]);
    useEffect(() => {
        const fetchBatches = async () => {
            const data = await getAllBatches();
            setBatches(data.batches);
        }

        fetchBatches();
    }, []);

    return (
        <div className={`${theme === "dark" ? "dark" : "" } flex flex-col gap-8`}>
            <FilterForm />

            <CreateButton 
                label={"New"}
            />
    
            <BatchTable 
                batches={batches}
            />

            <NewBatch />

        </div>
    )
};

export default BatchesView;