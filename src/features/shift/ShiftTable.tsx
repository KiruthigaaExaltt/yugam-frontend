import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../components/common/HOC/ReusableDataTable/ReusableDataTable";
import { Search, Plus, Eye, Edit2, Play, PauseCircle, Clock, Coffee } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import ShiftForm from "./ShiftForm";

interface Shift {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    workingHours: string;
    breakDuration: string;
    days: string[];
    status: "active" | "inactive";
    assignedCount: number;
}

const DUMMY_SHIFTS: Shift[] = [
    {
        id: "1",
        name: "Morning Shift",
        startTime: "09:00",
        endTime: "18:00",
        workingHours: "8h",
        breakDuration: "60min",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        status: "active",
        assignedCount: 2
    },
    {
        id: "2",
        name: "Evening Shift",
        startTime: "14:00",
        endTime: "23:00",
        workingHours: "8h",
        breakDuration: "60min",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        status: "active",
        assignedCount: 0
    },
    {
        id: "3",
        name: "Night Shift",
        startTime: "23:00",
        endTime: "08:00",
        workingHours: "8h",
        breakDuration: "60min",
        days: ["Mon", "Tue", "Wed", "Thu", "Sun"],
        status: "inactive",
        assignedCount: 0
    }
];

const ShiftTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
    const [isLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const filteredShifts = useMemo(() => {
        let filtered = [...DUMMY_SHIFTS];

        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(shift =>
                shift.name.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [debouncedSearch]);

    const handleEdit = (id: string) => {
        setSelectedShiftId(id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedShiftId(null);
        setShowForm(true);
    };

    const nameTemplate = (rowData: Shift) => (
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rowData.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                {rowData.status === 'active' ? <Play size={16} /> : <PauseCircle size={16} />}
            </div>
            <span className="font-bold text-gray-800 text-sm tracking-tight">{rowData.name}</span>
        </div>
    );

    const timingTemplate = (rowData: Shift) => (
        <span className="text-sm font-medium text-gray-600">{rowData.startTime} - {rowData.endTime}</span>
    );

    const hoursTemplate = (rowData: Shift) => (
        <div className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-wider">
            <Clock size={14} className="text-gray-300" />
            {rowData.workingHours}
        </div>
    );

    const breakTemplate = (rowData: Shift) => (
        <div className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-wider">
            <Coffee size={14} className="text-gray-300" />
            {rowData.breakDuration}
        </div>
    );

    const daysTemplate = (rowData: Shift) => (
        <div className="flex gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span 
                    key={day} 
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                        rowData.days.includes(day) 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'bg-gray-50 text-gray-300 border-transparent'
                    }`}
                >
                    {day.charAt(0)}
                </span>
            ))}
        </div>
    );

    const statusTemplate = (rowData: Shift) => (
        <span className={`text-[10px] w-fit px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${
            rowData.status === 'active' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
            : 'bg-gray-50 text-gray-400 border-gray-100'
        }`}>
            {rowData.status}
        </span>
    );

    const actionsTemplate = (rowData: Shift) => (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => handleEdit(rowData.id)}
                className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all border border-gray-100" title="Edit"
            >
                <Edit2 size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all border border-gray-100" title="View">
                <Eye size={14} />
            </button>
        </div>
    );

    const columns: CrudColumn<Shift>[] = [
        { body: nameTemplate, header: "Shift Name", style: { minWidth: '180px' } },
        { body: timingTemplate, header: "Timing", style: { minWidth: '140px' } },
        { body: hoursTemplate, header: "Hours", style: { minWidth: '120px' } },
        { body: breakTemplate, header: "Break", style: { minWidth: '120px' } },
        { body: daysTemplate, header: "Working Days", style: { minWidth: '180px' } },
        { field: "assignedCount", header: "Assigned", style: { minWidth: '100px' } },
        { body: statusTemplate, header: "Status", style: { minWidth: '100px' } },
        { body: actionsTemplate, header: "Actions", style: { minWidth: '100px' } },
    ];

    const headerFilters = (
        <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <InputText
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search shifts..."
                className="w-full !pl-12 pr-4 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm focus:border-blue-500 transition-all"
            />
        </div>
    );

    const toolbarRight = (
        <Button
            onClick={handleAdd}
            className="h-9 px-4 bg-teal-500 hover:bg-teal-600 border-none flex items-center gap-2 rounded-lg text-white font-bold transition-all"
            style={{ backgroundColor: '#00BFA6' }}
        >
            <Plus size={16} strokeWidth={3} />
            <span className="text-[12px] uppercase tracking-wider">Create Shift</span>
        </Button>
    );

    return (
        <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--surface-border)] shadow-sm">
                {headerFilters}
                {toolbarRight}
            </div>

            <div className="bg-[var(--surface-card)] rounded-xl shadow-sm border border-[var(--surface-border)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--surface-border)] flex items-center gap-2">
                    <span className="text-blue-500"><Clock size={18} /></span>
                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-tight">Shift Schedules</h2>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <ReusableCrudTable
                        data={filteredShifts}
                        columns={columns}
                        dataKey="id"
                        totalRecords={filteredShifts.length}
                        selection={selectedShifts}
                        onSelectionChange={setSelectedShifts}
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

            <ShiftForm 
                visible={showForm}
                onHide={() => setShowForm(false)}
                shiftId={selectedShiftId}
            />
        </div>
    );
};

export default ShiftTable;
