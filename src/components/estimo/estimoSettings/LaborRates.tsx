import { useState } from "react";
import { Button } from "primereact/button";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../HOC/ReusableDataTable/ReusableDataTable";
import { Pencil, Trash2, Plus } from "lucide-react";

interface LaborRate {
    id: string;
    category: string;
    rate: string;
    uom: string;
}

const sampleLaborRates: LaborRate[] = [
    { id: "1", category: "Skilled", rate: "₹800", uom: "Day" },
    { id: "2", category: "Semi-skilled", rate: "₹600", uom: "Day" },
    { id: "3", category: "Unskilled", rate: "₹400", uom: "Day" },
    { id: "4", category: "Supervisor", rate: "₹1200", uom: "Day" },
];

const LaborRates = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);

    const actionsBodyTemplate = (rowData: LaborRate) => {
        return (
            <div className="flex gap-2">
                <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                    onClick={() => console.log("Edit", rowData)}
                >
                    <Pencil size={18} />
                </button>
                <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                    onClick={() => console.log("Delete", rowData)}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        );
    };

    const columns: CrudColumn<LaborRate>[] = [
        { field: "category", header: "Category", style: { minWidth: "200px" } },
        { field: "rate", header: "Rate per Day", style: { minWidth: "150px" } },
        { field: "uom", header: "UOM", style: { minWidth: "100px" } },
        {
            header: "Actions",
            body: actionsBodyTemplate,
            style: { minWidth: "100px" },
        },
    ];

    const headerButton = (
        <Button
            label="Add Labor Rate"
            icon={<Plus size={14} className="mr-1" />}
            className="bg-(--primary-color)! border-none! shadow-none outline-none! focus:ring-0 focus:outline-none! px-3 py-1.5 text-white hover:opacity-90 transition-all flex items-center text-sm font-semibold"
            onClick={() => console.log("Add New Labor Rate")}
            style={{ borderRadius: 'var(--border-radius)', boxShadow: 'none', outline: 'none' }}
        />
    );

    return (
        <div className="mt-4">
            <ReusableCrudTable<LaborRate>
                data={sampleLaborRates}
                columns={columns}
                dataKey="id"
                totalRecords={sampleLaborRates.length}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
                page={page}
                rows={rows}
                onPageChange={(e) => {
                    setPage(e.page);
                    setRows(e.rows);
                }}
                loading={false}
                title="Labor Rate Configuration"
                headerFilters={headerButton}
                showSearch={false}
                showGridlines={false}
                isCard={true}
            />
        </div>
    );
};

export default LaborRates;