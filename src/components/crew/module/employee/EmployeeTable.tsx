import { useState } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../../../HOC/ReusableDataTable/ReusableDataTable";
import { Phone, Mail, Eye, Edit3, Calendar, CreditCard, Briefcase, Building2 } from "lucide-react";

interface Employee {
    id: string;
    employee_id: string;
    name: string;
    position: string;
    department: string;
    status: "active" | "on leave";
    email: string;
    phone: string;
    avatar?: string;
    attendance: string;
    performance: string;
    initials: string;
}

const DUMMY_EMPLOYEES: Employee[] = [
    {
        id: "1",
        employee_id: "24ED-GD-002",
        name: "Jabastin",
        position: "Graphic Designer",
        department: "Design",
        status: "active",
        email: "designer_ops@elevateddigtech.in",
        phone: "7010814367",
        initials: "J",
        attendance: "91.7%",
        performance: "4.5/5.0",
    },
    {
        id: "2",
        employee_id: "EMP002",
        name: "Priya Patel",
        position: "Marketing Manager",
        department: "Marketing",
        status: "active",
        email: "priya.patel@exaltt.ai",
        phone: "+91 9876543213",
        initials: "PP",
        attendance: "100%",
        performance: "4.8/5.0"
    },
    {
        id: "3",
        employee_id: "EMP003",
        name: "Amit Kumar",
        position: "Sales Executive",
        department: "Sales",
        status: "on leave",
        email: "amit.kumar@exaltt.ai",
        phone: "+91 9876543215",
        initials: "AK",
        attendance: "83.3%",
        performance: "4.2/5.0"
    },
    

];

const EmployeeTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [isLoading] = useState(false);

    const profileTemplate = (rowData: Employee) => (
        <div className="flex items-center gap-4 py-1">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white ${rowData.name === 'Jabastin' || rowData.name === 'Amit Kumar' ? 'bg-gradient-to-br from-gray-400 to-gray-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                }`}>
                {rowData.initials}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="font-bold text-gray-800 truncate">{rowData.name}</span>
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">{rowData.employee_id}</span>
                <span className={`text-[10px] w-fit px-2 py-0.5 rounded-full font-bold uppercase mt-1.5 border ${rowData.status === 'active'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    {rowData.status}
                </span>
            </div>
        </div>
    );

    const designationTemplate = (rowData: Employee) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Briefcase size={12} className="text-gray-400" />
                </div>
                <span>{rowData.position}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Building2 size={12} className="text-gray-400" />
                </div>
                <span>{rowData.department}</span>
            </div>
        </div>
    );

    const contactTemplate = (rowData: Employee) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Phone size={12} className="text-gray-400" />
                </div>
                <span>{rowData.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Mail size={12} className="text-gray-400" />
                </div>
                <span className="truncate max-w-[140px] lowercase">{rowData.email}</span>
            </div>
        </div>
    );

    const statsTemplate = (value: string, label: string, colorClass: string, bgClass: string) => (
        <div className="flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
            <span className={`text-lg font-black tracking-tight ${colorClass}`}>{value}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{label}</span>
        </div>
    );

    const actionsTemplate = () => (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-blue-100/50" title="View">
                <Eye size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-emerald-100/50" title="Mark">
                <Edit3 size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-600 hover:text-white transition-all cursor-pointer border border-amber-100/50" title="Leave">
                <Calendar size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer border border-indigo-100/50" title="Pay">
                <CreditCard size={16} />
            </div>
        </div>
    );

    const columns: CrudColumn<Employee>[] = [
        { body: profileTemplate, header: "Employee", style: { minWidth: '220px' } },
        { body: designationTemplate, header: "Designation", style: { minWidth: '190px' } },
        { body: contactTemplate, header: "Contact", style: { minWidth: '190px' } },
        {
            body: (rowData) => statsTemplate(rowData.attendance, "Attendance", "text-emerald-600", "bg-emerald-50/50"),
            header: "Attendance",
            style: { minWidth: '120px', textAlign: 'center' }
        },
        {
            body: (rowData) => statsTemplate(rowData.performance, "Performance", "text-blue-600", "bg-blue-50/50"),
            header: "Performance",
            style: { minWidth: '120px', textAlign: 'center' }
        },
        { body: actionsTemplate, header: "Actions", style: { minWidth: '180px' } },
    ];

    return (
        <div className="mt-8 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white">
                <h2 className="text-lg font-extrabold text-gray-800 tracking-tight">Employee Management</h2>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{DUMMY_EMPLOYEES.length} Records</span>
                </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <ReusableCrudTable
                    data={DUMMY_EMPLOYEES}
                    columns={columns}
                    dataKey="id"
                    totalRecords={DUMMY_EMPLOYEES.length}
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
    )
}

export default EmployeeTable;