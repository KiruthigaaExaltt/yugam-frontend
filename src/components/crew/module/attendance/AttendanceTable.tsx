import { useState } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../HOC/ReusableDataTable/ReusableDataTable";
import { Eye, Edit3, Clock } from "lucide-react";

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
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedRecords, setSelectedRecords] = useState<AttendanceRecord[]>([]);

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

    return (
        <div className="mt-8 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2 bg-white">
                <Clock size={20} className="text-[#0369A1]" />
                <h2 className="text-lg font-bold text-gray-700">Today's Attendance</h2>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <ReusableCrudTable
                    data={DUMMY_ATTENDANCE}
                    columns={columns}
                    dataKey="id"
                    totalRecords={DUMMY_ATTENDANCE.length}
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
    )
}

export default AttendanceTable;
