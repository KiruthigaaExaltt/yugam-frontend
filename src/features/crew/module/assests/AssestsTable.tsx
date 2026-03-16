import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../../components/common/HOC/ReusableDataTable/ReusableDataTable";
import { Search, Plus, Eye, RefreshCw, Laptop, Monitor } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import AssestsForm from "./AssestsForm";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue";

interface Employee {
    id: string;
    employee_id: string;
    name: string;
    initials: string;
    asset: string;
    asset_icon: "laptop" | "monitor";
    asset_id: string;
    allocated_date: string;
    condition: "excellent" | "good";
    value: string;
    status: "allocated" | "returned";
}

const DUMMY_EMPLOYEES: Employee[] = [
    {
        id: "1",
        employee_id: "EMP001",
        name: "Jabastin",
        initials: "J",
        asset: "MacBook Pro 14",
        asset_icon: "laptop",
        asset_id: "LAPTOP-001",
        allocated_date: "1/15/2023",
        condition: "good",
        value: "₹150,000",
        status: "allocated"
    },
    {
        id: "2",
        employee_id: "EMP002",
        name: "Jabastin",
        initials: "J",
        asset: "Dell 27 4K Monitor",
        asset_icon: "monitor",
        asset_id: "MON-012",
        allocated_date: "1/15/2023",
        condition: "excellent",
        value: "₹35,000",
        status: "allocated"
    },
    {
        id: "3",
        employee_id: "EMP003",
        name: "Priya Patel",
        initials: "PP",
        asset: "HP EliteBook",
        asset_icon: "laptop",
        asset_id: "LAPTOP-015",
        allocated_date: "3/20/2023",
        condition: "good",
        value: "₹85,000",
        status: "allocated"
    }
];

const AssestsTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [isLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const statusOptions = [
        { label: "Filter by type", value: null },
        { label: "Allocated", value: "allocated" },
        { label: "Returned", value: "returned" }
    ];

    const filteredEmployees = useMemo(() => {
        let filtered = [...DUMMY_EMPLOYEES];

        // Status Filter
        if (selectedStatus && selectedStatus !== "All Status") {
            filtered = filtered.filter(emp => emp.status === selectedStatus);
        }

        // Global Search
        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(searchLower) ||
                emp.asset.toLowerCase().includes(searchLower) ||
                emp.asset_id.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [debouncedSearch, selectedStatus]);

    const onAdd = () => {
        setShowForm(true);
    };

    const profileTemplate = (rowData: Employee) => (
        <div className="flex items-center gap-4 py-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white ${rowData.name === 'Jabastin' ? 'bg-gradient-to-br from-blue-400 to-blue-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                {rowData.initials}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-800 text-sm truncate">{rowData.name}</span>
            </div>
        </div>
    );

    const assetTemplate = (rowData: Employee) => (
        <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
            {rowData.asset_icon === "laptop" ? <Laptop size={16} className="text-gray-400" /> : <Monitor size={16} className="text-gray-400" />}
            <span>{rowData.asset}</span>
        </div>
    );

    const assetIdTemplate = (rowData: Employee) => (
        <span className="text-sm text-gray-600 font-mono tracking-tight">{rowData.asset_id}</span>
    );

    const conditionTemplate = (rowData: Employee) => (
        <span className="text-[11px] w-fit px-3 py-1 rounded-md font-bold bg-blue-600 text-white">
            {rowData.condition}
        </span>
    );

    const valueTemplate = (rowData: Employee) => (
        <span className="text-sm text-gray-700 font-medium">{rowData.value}</span>
    );

    const allocatedDateTemplate = (rowData: Employee) => (
        <span className="text-sm text-gray-600">{rowData.allocated_date}</span>
    );

    const statusTemplate = (rowData: Employee) => (
        <span className={`text-[10px] w-fit px-2 py-0.5 rounded-full font-bold mt-1.5 border ${rowData.status === 'allocated'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
            : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
            {rowData.status}
        </span>
    );

    const actionsTemplate = () => (
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--surface-border)] bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors">
                <RefreshCw size={14} /> Return
            </button>
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer border border-[var(--surface-border)]" title="View">
                <Eye size={16} />
            </div>
        </div>
    );

    const columns: CrudColumn<Employee>[] = [
        { body: profileTemplate, header: "Employee", style: { minWidth: '160px' } },
        { body: assetTemplate, header: "Asset", style: { minWidth: '200px' } },
        { body: assetIdTemplate, header: "Asset ID", style: { minWidth: '120px' } },
        { body: allocatedDateTemplate, header: "Allocated Date", style: { minWidth: '130px' } },
        { body: conditionTemplate, header: "Condition", style: { minWidth: '100px' } },
        { body: valueTemplate, header: "Value", style: { minWidth: '100px' } },
        { body: statusTemplate, header: "Status", style: { minWidth: '100px' } },
        { body: actionsTemplate, header: "Actions", style: { minWidth: '140px' } },
    ];

    const headerFilters = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search users..."
                    className="w-full !pl-12 pr-4 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all text-[var(--text-color)]"
                />
            </div>
            <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.value)}
                placeholder="Filter by type"
                className="w-40 h-10 border-none bg-transparent shadow-none text-sm flex items-center text-gray-500"
            />
        </div>

    );
    const toolbarRight = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
                onClick={onAdd}
                className="h-9 px-4 bg-teal-500 hover:bg-teal-600 border-none flex items-center gap-2 rounded-lg text-white font-medium w-full sm:w-auto justify-center transition-colors"
                style={{ backgroundColor: '#00BFA6' }}
            >
                <Plus size={16} strokeWidth={3} />
                <span className="text-[13px] font-bold">Allocate Asset</span>
            </Button>
            <AssestsForm
                visible={showForm}
                onHide={() => setShowForm(false)}
            />
        </div>
    );

    return (
        <>
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--surface-border)] shadow-sm">
                {headerFilters}
                {toolbarRight}
            </div>

            <div className="bg-[var(--surface-card)] rounded-xl shadow-sm border border-[var(--surface-border)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--surface-border)] flex items-center gap-2">
                    <span className="text-blue-500"><Laptop size={18} /></span>
                    <h2 className="text-sm font-semibold text-gray-700">Employee Assets</h2>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <ReusableCrudTable
                        data={filteredEmployees}
                        columns={columns}
                        dataKey="id"
                        totalRecords={filteredEmployees.length}
                        selection={selectedEmployees}
                        onSelectionChange={setSelectedEmployees}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                        page={first / rows}
                        rows={rows}
                        onPageChange={(e: any) => {
                            setFirst(e.first);
                            setRows(e.rows);
                        }}
                        loading={isLoading}
                        title=""
                        toolbar={false}
                        showSearch={false}
                        isCard={false}
                        showGridlines={false}
                    />
                </div>
            </div>

        </>
    )
}
export default AssestsTable;  