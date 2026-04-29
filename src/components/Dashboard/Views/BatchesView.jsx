import useThemeStore from "../../../stores/ThemeStore";
import CreateButton from "../CreateButton";
import { useEffect, useState } from "react";
import BatchTable from "../Batches/BatchTable";
import FilterForm from "../Batches/FilterForm";
import BatchForm from "../Batches/BatchForm";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { addNewBatch, editBatch, filterBatch, getAllBatches } from "../../../services/batchService";

const LIMIT = 10;

const BatchesView = () => {
    const { theme } = useThemeStore();
    const [batches, setBatches] = useState([]);
    const [mode, setMode] = useState("list");
    const [formData, setFormData] = useState({ batchName: "", importDate: "", totalCost: "", type: "" });
    const [alert, setAlert] = useState({ type: "", message: "", title: "" });
    const [loading, setLoading] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [filterFormData, setFilterFormData] = useState({ startDate: "", endDate: "" });
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const fetchBatches = async (p = 1) => {
        const data = await getAllBatches(p, LIMIT);
        setBatches(data.batches || []);
        setPagination(data.pagination || null);
    };

    useEffect(() => {
        fetchBatches(1);
    }, []);

    const handlePageChange = (p) => {
        setPage(p);
        fetchBatches(p);
    };

    const handleAddNewBatch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", message: "", title: "" });

        if (!formData.batchName || !formData.importDate || !formData.totalCost || !formData.type) {
            setAlert({ type: "error", title: "New Batch", message: "Missing required fields" });
            setLoading(false);
            return;
        }

        try {
            const data = await addNewBatch(formData);
            if (!data.success) {
                setAlert({ type: "error", title: "New Batch", message: data.message });
                return;
            }
            setAlert({ type: "success", title: "New Batch", message: data.message });
            setFormData({ batchName: "", importDate: "", totalCost: "", type: "" });
            setMode("list");
            setIsFilterActive(false);
            setPage(1);
            await fetchBatches(1);
        } catch (err) {
            console.error(err);
            setAlert({ type: "error", title: "New batch", message: "Failed to add new batch" });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", message: "", title: "" });

        if (!formData.batchName || !formData.importDate || !formData.totalCost || !formData.type) {
            setAlert({ type: "error", title: "Edit Batch", message: "Missing required fields" });
            setLoading(false);
            return;
        }

        try {
            const data = await editBatch(formData, selectedBatchId);
            if (!data.success) {
                setAlert({ type: "error", title: "Edit Batch", message: data.message });
                return;
            }
            setAlert({ type: "success", title: "Edit Batch", message: data.message });
            setFormData({ batchName: "", importDate: "", totalCost: "", type: "" });
            setMode("list");
            await fetchBatches(page);
        } catch (err) {
            console.error(err);
            setAlert({ type: "error", title: "Edit batch", message: "Failed to edit batch" });
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", message: "", title: "" });

        if (!filterFormData.startDate || !filterFormData.endDate) {
            setAlert({ type: "error", title: "Error filtering Batch", message: "Start date and end date are required." });
            setLoading(false);
            return;
        }

        try {
            const data = await filterBatch(filterFormData);
            if (!data.success) {
                setAlert({ type: "error", title: "Error", message: data.message });
                return;
            }
            setAlert({ type: "success", title: "Filter Batch", message: data.message });
            setMode("list");
            setBatches(data.batches || []);
            setPagination(null);
            setIsFilterActive(true);
            setPage(1);
        } catch (err) {
            console.error(err);
            setAlert({ type: "error", title: "Error", message: "Failed to filter batches" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-8 2xl:gap-12`}>
            {mode === "list" && (
                <FilterForm
                    setMode={setMode}
                    filterFormData={filterFormData}
                    setFilterFormData={setFilterFormData}
                    handleFilter={handleFilter}
                    loading={loading}
                    setBatches={() => { setIsFilterActive(false); setPage(1); fetchBatches(1); }}
                    getAllBatches={getAllBatches}
                />
            )}

            {mode === "list" && (
                <CreateButton label={"New"} onClick={() => setMode("newBatch")} />
            )}

            {mode === "list" && (
                <BatchTable
                    batches={batches}
                    setMode={setMode}
                    setFormData={setFormData}
                    setSelectedBatchId={setSelectedBatchId}
                    page={page}
                    pagination={isFilterActive ? null : pagination}
                    onPageChange={handlePageChange}
                />
            )}

            {mode === "newBatch" && (
                <BatchForm
                    setMode={setMode}
                    loading={loading}
                    formData={formData}
                    setFormData={setFormData}
                    handleAddNewBatch={handleAddNewBatch}
                    formType={"create"}
                />
            )}

            {mode === "edit" && (
                <BatchForm
                    setMode={setMode}
                    loading={loading}
                    formData={formData}
                    setFormData={setFormData}
                    handleEdit={handleEdit}
                    formType={"edit"}
                />
            )}

            <AlertMessage
                type={alert.type}
                message={alert.message}
                title={alert.title}
                onClose={() => setAlert({ type: "", title: "", message: "" })}
            />
        </div>
    );
};

export default BatchesView;
