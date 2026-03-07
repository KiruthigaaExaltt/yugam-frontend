import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../HOC/ReusableDataTable/ReusableDataTable";
import { Eye, Edit3, Clock, Search, Plus } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDebouncedValue } from "../../../customHooks/useDebouncedValue";

interface AttendanceRecord {
    id: string;
    name: string;
    initials: string;
    checkIn: string;
    checkOut: string;
    workingHours: string;
    status: "present" | "on leave" | "absent" | "late";
    location: string;
}

const DUMMY_ATTENDANCE: AttendanceRecord[] = [
    {
        id: "1",
        name: "Jabastin",
        initials: "J",
        checkIn: "09:15",
        checkOut: "18:30",
        workingHours: "8.75h",
        status: "present",
        location: "Office",
    },
    {
        id: "2",
        name: "Priya Patel",
        initials: "PP",
        checkIn: "09:00",
        checkOut: "18:00",
        workingHours: "8h",
        status: "present",
        location: "Office",
    },
    {
        id: "3",
        name: "Amit Kumar",
        initials: "AK",
        checkIn: "-",
        checkOut: "-",
        workingHours: "-",
        status: "on leave",
        location: "WFH",
    },
];

const AttendanceTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedRecords, setSelectedRecords] = useState<AttendanceRecord[]>([]);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const statusOptions = [
        { label: "All Status", value: "All Status" },
        { label: "Present", value: "present" },
        { label: "Absent", value: "absent" },
        { label: "Late", value: "late" },
        { label: "On Leave", value: "on leave" }
    ];

    const filteredAttendance = useMemo(() => {
        let filtered = [...DUMMY_ATTENDANCE];

        if (selectedStatus && selectedStatus !== "All Status") {
            filtered = filtered.filter(record => record.status === selectedStatus);
        }

        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(record =>
                record.name.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [debouncedSearch, selectedStatus]);

    const employeeTemplate = (rowData: AttendanceRecord) => (
        <div className="flex items-center gap-3 py-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white ${rowData.name === 'Jabastin' || rowData.name === 'Amit Kumar' ? 'bg-blue-500' : 'bg-[#EAB308]'
                }`}>
                {rowData.initials}
            </div>
            <span className="font-semibold text-gray-700">{rowData.name}</span>
        </div>
    );

    const statusTemplate = (rowData: AttendanceRecord) => {
        const statusConfig = {
            present: "bg-emerald-50 text-emerald-600 border-emerald-100",
            absent: "bg-red-50 text-red-600 border-red-100",
            late: "bg-amber-50 text-amber-600 border-amber-100",
            "on leave": "bg-amber-100/50 text-amber-600 border-amber-200",
        };

        return (
            <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold lowercase border ${statusConfig[rowData.status]}`}>
                {rowData.status}
            </span>
        );
    };

    const actionsTemplate = () => (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-emerald-100/50" title="Mark">
                <Edit3 size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-blue-100/50" title="View">
                <Eye size={16} />
            </div>
        </div>
    );

    const columns: CrudColumn<AttendanceRecord>[] = [
        { body: employeeTemplate, header: "Employee", style: { minWidth: '180px' } },
        { field: "checkIn", header: "Check In", style: { minWidth: '120px' } },
        { field: "checkOut", header: "Check Out", style: { minWidth: '120px' } },
        { field: "workingHours", header: "Working Hours", style: { minWidth: '140px' } },
        { body: statusTemplate, header: "Status", style: { minWidth: '120px' } },
        { field: "location", header: "Location", style: { minWidth: '120px' } },
        { body: actionsTemplate, header: "Actions", style: { minWidth: '120px' } },
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
                    placeholder="Search attendance..."
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
                <span className="text-[14px]">Mark Attendance</span>
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
                    <div className="flex items-center gap-2">
                        <Clock size={20} className="text-[#0369A1]" />
                        <h2 className="text-lg font-bold text-gray-700">Today's Attendance</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredAttendance.length} Records</span>
                    </div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <ReusableCrudTable
                        data={filteredAttendance}
                        columns={columns}
                        dataKey="id"
                        totalRecords={filteredAttendance.length}
                        selection={selectedRecords}
                        onSelectionChange={setSelectedRecords}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                        page={first / rows}
                        rows={rows}
                        onPageChange={(e: any) => {
                            setFirst(e.first);
                            setRows(e.rows);
                        }}
                        loading={false}
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

export default AttendanceTable;
