import { CheckCircle2, XCircle, Clock, TrendingUp } from "lucide-react";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    colorClass: string;
    bgClass: string;
}

const StatCard = ({ icon, label, value, colorClass, bgClass }: StatCardProps) => (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgClass} ${colorClass}`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span>
            <span className={`text-2xl font-black tracking-tight ${colorClass}`}>{value}</span>
        </div>
    </div>
);

interface AttendanceItemProps {
    date: string;
    checkIn: string;
    checkOut: string;
    hours: string;
    status: string;
}

const AttendanceItem = ({ date, checkIn, checkOut, hours, status }: AttendanceItemProps) => {
    const isPresent = status.toLowerCase() === "present";
    const isLate = status.toLowerCase() === "late";


    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none group gap-3 sm:gap-0">
            <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-bold text-gray-700 text-sm">{date}</span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider sm:normal-case">{checkIn} - {checkOut}</span>
            </div>
            
            <div className="flex items-center justify-between sm:justify-start sm:gap-8">
                <span className="text-gray-500 font-bold text-xs tracking-tight">{hours}</span>
                <span className={`px-2.5 sm:px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                    isPresent ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    isLate ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-red-50 text-red-600 border-red-100"
                }`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

const AttendanceTab = ({ employee }: { employee: any }) => {
    const attendanceStats = [
        { label: "Total Present", value: "22", icon: <CheckCircle2 size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Total Absent", value: "2", icon: <XCircle size={24} />, color: "text-red-500", bg: "bg-red-50" },
        { label: "Late Arrivals", value: "1", icon: <Clock size={24} />, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Attendance Rate", value: employee.attendance || "91.7%", icon: <TrendingUp size={24} />, color: "text-blue-500", bg: "bg-blue-50" },
    ];

    const recentRecords = [
        { date: "2024-01-25", checkIn: "09:15", checkOut: "18:30", hours: "8h 15m", status: "Present" },
        { date: "2024-01-24", checkIn: "09:00", checkOut: "18:00", hours: "8h 0m", status: "Present" },
        { date: "2024-01-23", checkIn: "10:30", checkOut: "18:00", hours: "7h 30m", status: "Late" },
        { date: "2024-01-22", checkIn: "- -", checkOut: "- -", hours: "0h 0m", status: "Absent" },
        { date: "2024-01-21", checkIn: "09:05", checkOut: "18:10", hours: "8h 5m", status: "Present" },
    ];

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {attendanceStats.map((stat, index) => (
                    <StatCard 
                        key={index}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        colorClass={stat.color}
                        bgClass={stat.bg}
                    />
                ))}
            </div>

            {/* List Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-gray-50 flex items-center justify-between bg-white">
                    <h3 className="text-base sm:text-lg font-black text-gray-800 tracking-tight uppercase">Recent Attendance</h3>
                    <button className="text-blue-600 hover:text-blue-700 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-colors">
                        View More
                    </button>
                </div>
                <div className="flex flex-col">
                    {recentRecords.map((record, index) => (
                        <AttendanceItem key={index} {...record} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceTab;
