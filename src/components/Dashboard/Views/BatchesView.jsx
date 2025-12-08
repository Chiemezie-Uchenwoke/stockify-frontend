import useThemeStore from "../../../stores/ThemeStore";
import CreateButton from "../CreateButton";
import { useEffect, useState } from "react";
import { getAllBatches } from "../../../services/batchService";
import BatchTable from "../Batches/BatchTable";
import FilterForm from "../Batches/FilterForm";
import BatchForm from "../Batches/BatchForm";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { addNewBatch, editBatch } from "../../../services/batchService";

const BatchesView = () => {
    const {theme} = useThemeStore();
    const [batches, setBatches] = useState([]);
    const [mode, setMode] = useState("list");
    const [formData, setFormData] = useState({
        batchName: "",
        importDate: "",
        totalCost: "",
        type: "",
    });
    const [alert, setAlert] = useState({
        type: "",
        message: "",
        title: "",
    });
    const [loading, setLoading] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState(null);

    useEffect(() => {
        const fetchBatches = async () => {
            const data = await getAllBatches(); 
            setBatches(data.batches);
        }

        fetchBatches();
    }, []);

    const handleAddNewBatch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", message: "", title: "" });

        if (!formData.batchName || !formData.importDate || !formData.totalCost || !formData.type) {
            setAlert({
                type: "error",
                title: "New Batch",
                message: "Missing required fields"
            });
            setLoading(false);
            return;
        }

        try {
            const data = await addNewBatch(formData);

            if (!data.success) {
                setAlert({
                    type: "error",
                    title: "New Batch",
                    message: data.message
                });
                return;
            }

            setAlert({
                type: "success",
                title: "New Batch",
                message: data.message
            });

            setFormData({
                batchName: "",
                importDate: "",
                totalCost: "",
                type: "",
            });

            setMode("list");
            const refreshed = await getAllBatches();
            setBatches(refreshed.batches);

        } catch(err) {
            console.error(err);
            setAlert({
                type: "error",
                title: "New batch",
                message: "Failed to add new batch"
            });
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", message: "", title: "" });

        if (!formData.batchName || !formData.importDate || !formData.totalCost || !formData.type) {
            setAlert({
                type: "error",
                title: "Edit Batch",
                message: "Missing required fields"
            });
            setLoading(false);
            return;
        }

        try {
            const data = await editBatch(formData, selectedBatchId);

            if (!data.success) {
                setAlert({
                    type: "error",
                    title: "Edit Batch",
                    message: data.message
                });
                return;
            }

            setAlert({
                type: "success",
                title: "Edit Batch",
                message: data.message
            });

            setFormData({
                batchName: "",
                importDate: "",
                totalCost: "",
                type: "",
            });
            
            setMode("list");

            const refreshed = await getAllBatches();
            setBatches(refreshed.batches);

        } catch(err) {
            console.error(err);
            setAlert({
                type: "error",
                title: "Edit batch",
                message: "Failed to edit batch"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`${theme === "dark" ? "dark" : "" } flex flex-col gap-8`}>
            { 
                mode === "list" && 
                <FilterForm setMode={setMode} />
            }

            {
                mode === "list" &&
                <CreateButton 
                    label={"New"}
                    onClick={() => setMode("newBatch")}
                />
            }
    
            {
                mode === "list" && 
                <BatchTable 
                    batches={batches}
                    setMode={setMode}
                    setFormData={setFormData}
                    setSelectedBatchId={setSelectedBatchId}
                />
            }

            {
                mode === "newBatch" && 
                <BatchForm 
                    setMode={setMode} 
                    loading={loading} 
                    formData={formData}
                    setFormData={setFormData}
                    handleAddNewBatch={handleAddNewBatch}
                    formType={"create"}
                />
            }

            {
                mode === "edit" && 
                <BatchForm 
                    setMode={setMode} 
                    loading={loading} 
                    formData={formData}
                    setFormData={setFormData}
                    handleEdit={handleEdit}
                    formType={"edit"}
                />
            }

            <AlertMessage 
                type={alert.type}
                message={alert.message}
                title={alert.title}
                onClose={() => setAlert({type: "", title: "", message: ""})}
            />

        </div>
    )
};

export default BatchesView;