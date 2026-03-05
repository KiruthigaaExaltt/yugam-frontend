import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../HOC/ReusableDataTable/ReusableDataTable";
import { Eye, Edit3, Search, Plus, MapPin } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDebouncedValue } from "../../../customHooks/useDebouncedValue";

interface AttendanceRecord {
    id: string;
    name: string;
    employee_id: string;
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
        employee_id: "24ED-GD-002",
        name: "Jabastin",
        initials: "J",
        checkIn: "09:15 AM",
        checkOut: "06:30 PM",
        workingHours: "8.75h",
        status: "present",
        location: "Office",
    },
    {
        id: "2",
        employee_id: "EMP002",
        name: "Priya Patel",
        initials: "PP",
        checkIn: "09:00 AM",
        checkOut: "06:00 PM",
        workingHours: "8.0h",
        status: "present",
        location: "Office",
    },
    {
        id: "3",
        employee_id: "EMP003",
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
    const [statusFilter, setStatusFilter] = useState<string | null>("All Status");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedRecords, setSelectedRecords] = useState<AttendanceRecord[]>([]);
    const [isLoading] = useState(false);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const statusOptions = [
        { label: 'All Status', value: 'All Status' },
        { label: 'Present', value: 'present' },
        { label: 'Absent', value: 'absent' },
        { label: 'Late', value: 'late' },
        { label: 'On Leave', value: 'on leave' }
    ];

    const filteredRecords = useMemo(() => {
        let filtered = [...DUMMY_ATTENDANCE];

        // Status Filter
        if (statusFilter !== "All Status") {
            filtered = filtered.filter(rec => rec.status === statusFilter);
        }

        // Global Search
        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(rec =>
                rec.name.toLowerCase().includes(searchLower) ||
                rec.employee_id.toLowerCase().includes(searchLower) ||
                rec.location.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [debouncedSearch, statusFilter]);

    const employeeTemplate = (rowData: AttendanceRecord) => (
        <div className="flex items-center gap-4 py-1">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white ${rowData.name === 'Jabastin' || rowData.name === 'Amit Kumar' ? 'bg-gradient-to-br from-gray-400 to-gray-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                }`}>
                {rowData.initials}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="font-bold text-gray-800 truncate">{rowData.name}</span>
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">{rowData.employee_id}</span>
                <span className={`text-[10px] w-fit px-2 py-0.5 rounded-full font-bold uppercase mt-1.5 border ${rowData.status === 'present'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : rowData.status === 'absent'
                        ? 'bg-red-50 text-red-600 border-red-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    {rowData.status}
                </span>
            </div>
        </div>
    );

    const timeTemplate = (time: string, label: string) => (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-700">{time}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
    );

    const locationTemplate = (rowData: AttendanceRecord) => (
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center border border-[var(--surface-border)]">
                <MapPin size={12} className="text-gray-400" />
            </div>
            <span>{rowData.location}</span>
        </div>
    );

    const hoursTemplate = (value: string) => (
        <div className="flex justify-center w-full">
            <div className="inline-flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-gray-50/50 border border-transparent hover:border-[var(--surface-border)] transition-colors">
                <span className="text-lg font-black tracking-tight text-blue-600">{value}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Working Hrs</span>
            </div>
        </div>
    );

    const actionsTemplate = () => (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-[var(--surface-border)]" title="Edit">
                <Edit3 size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-[var(--surface-border)]" title="View">
                <Eye size={16} />
            </div>
        </div>
    );

    const columns: CrudColumn<AttendanceRecord>[] = [
        { body: employeeTemplate, header: "Employee", style: { minWidth: '220px' } },
        { body: (rowData) => timeTemplate(rowData.checkIn, "Check In"), header: "Check In", style: { minWidth: '130px' } },
        { body: (rowData) => timeTemplate(rowData.checkOut, "Check Out"), header: "Check Out", style: { minWidth: '130px' } },
        { body: (rowData) => hoursTemplate(rowData.workingHours), header: "Hours", style: { minWidth: '140px', textAlign: 'center' }, headerStyle: { textAlign: 'center', display: 'flex', justifyContent: 'center' } },
        { body: locationTemplate, header: "Location", style: { minWidth: '150px' } },
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
                value={statusFilter}
                options={statusOptions}
                onChange={(e) => setStatusFilter(e.value)}
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
                    <h2 className="text-lg font-semibold text-[var(--text-color)]">
                        Attendance Management</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredRecords.length} Records</span>
                    </div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <ReusableCrudTable
                        data={filteredRecords}
                        columns={columns}
                        dataKey="id"
                        totalRecords={filteredRecords.length}
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

export default AttendanceTable;
