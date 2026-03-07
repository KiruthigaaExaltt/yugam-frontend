import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../HOC/ReusableDataTable/ReusableDataTable";
import { Search, Plus, Eye, CheckCircle2, XCircle } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDebouncedValue } from "../../../customHooks/useDebouncedValue";

interface LeaveApplication {
    id: string;
    employee: string;
    initials: string;
    leaveType: string;
    fromDate: string;
    toDate: string;
    days: number;
    status: "approved" | "pending" | "rejected";
}

const DUMMY_LEAVES: LeaveApplication[] = [
    {
        id: "1",
        employee: "Amit Kumar",
        initials: "AK",
        leaveType: "sick",
        fromDate: "12/1/2024",
        toDate: "12/3/2024",
        days: 3,
        status: "approved",
    },
    {
        id: "2",
        employee: "Jabastin",
        initials: "J",
        leaveType: "casual",
        fromDate: "12/15/2024",
        toDate: "12/16/2024",
        days: 2,
        status: "pending",
    },
];

const LeaveTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedLeaves, setSelectedLeaves] = useState<LeaveApplication[]>([]);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const statusOptions = [
        { label: "All Status", value: "All Status" },
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" }
    ];

    const filteredLeaves = useMemo(() => {
        let filtered = [...DUMMY_LEAVES];

        if (selectedStatus && selectedStatus !== "All Status") {
            filtered = filtered.filter(leave => leave.status === selectedStatus);
        }

        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(leave =>
                leave.employee.toLowerCase().includes(searchLower) ||
                leave.leaveType.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [debouncedSearch, selectedStatus]);

    const employeeTemplate = (rowData: LeaveApplication) => (
        <div className="flex items-center gap-3 py-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${rowData.initials === 'AK' ? 'bg-blue-500' : 'bg-indigo-500'}`}>
                {rowData.initials}
            </div>
            <span className="font-semibold text-gray-800">{rowData.employee}</span>
        </div>
    );

    const leaveTypeTemplate = (rowData: LeaveApplication) => (
        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${rowData.leaveType === 'sick' ? 'bg-red-50 text-red-400' : 'bg-blue-50 text-blue-400'}`}>
            {rowData.leaveType}
        </span>
    );

    const statusTemplate = (rowData: LeaveApplication) => (
        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${rowData.status === 'approved'
            ? 'bg-emerald-50 text-emerald-600'
            : rowData.status === 'pending'
                ? 'bg-amber-50 text-amber-600'
                : 'bg-red-50 text-red-600'
            }`}>
            {rowData.status}
        </span>
    );

    const actionsTemplate = (rowData: LeaveApplication) => (
        <div className="flex items-center gap-2">
            {rowData.status === 'pending' ? (
                <>
                    <Button icon={<CheckCircle2 size={16} />} label="Approve" className="p-button-text p-button-sm flex items-center gap-1 h-8 px-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white" />
                    <Button icon={<XCircle size={16} />} label="Reject" className="p-button-text p-button-sm flex items-center gap-1 h-8 px-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white" />
                </>
            ) : null}
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-[var(--surface-border)]" title="View">
                <Eye size={16} />
            </div>
        </div>
    );

    const columns: CrudColumn<LeaveApplication>[] = [
        { body: employeeTemplate, header: "Employee", style: { minWidth: '200px' } },
        { body: leaveTypeTemplate, header: "Leave Type", style: { minWidth: '120px' } },
        { field: "fromDate", header: "From Date", style: { minWidth: '120px' } },
        { field: "toDate", header: "To Date", style: { minWidth: '120px' } },
        { field: "days", header: "Days", style: { minWidth: '80px' } },
        { body: statusTemplate, header: "Status", style: { minWidth: '120px' } },
        { body: actionsTemplate, header: "Actions", style: { minWidth: '220px' } },
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
                    placeholder="Search applicants..."
                    className="w-full !pl-12 pr-4 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all text-[var(--text-color)]"
                />
            </div>
            <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.value)}
                placeholder="All Status"
                className="w-40 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm flex items-center"
            />
        </div>

    );

    const toolbarRight = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
                className="h-10 px-4 bg-[var(--primary-color)] hover:opacity-90 border-none flex items-center gap-2 rounded-lg text-white font-medium w-full sm:w-auto justify-center"
            >
                <Plus size={18} />
                <span className="text-[14px]">Apply Leave</span>
            </Button>
        </div>
    );

    return (
        <>
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--surface-border)] shadow-sm">
                {headerFilters}
                {toolbarRight}
            </div>
            <div className="bg-[var(--surface-card)] rounded-xl shadow-sm border border-[var(--surface-border)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--surface-border)] flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[var(--text-color)]">
                        Leave Applications</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredLeaves.length} Records</span>
                    </div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <ReusableCrudTable
                        data={filteredLeaves}
                        columns={columns}
                        dataKey="id"
                        totalRecords={filteredLeaves.length}
                        selection={selectedLeaves}
                        onSelectionChange={setSelectedLeaves}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                        loading={false}
                        page={first / rows}
                        rows={rows}
                        onPageChange={(e: any) => {
                            setFirst(e.first);
                            setRows(e.rows);
                        }}
                        title=""
                        toolbar={false}
                        showSearch={false}
                        isCard={false}
                        showGridlines={false}
                    />
                </div>
            </div>
        </>
    );
};

export default LeaveTable;
