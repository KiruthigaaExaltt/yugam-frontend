import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";

const AttendanceHeader = () => {
    return (
        <>
            <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl text-[var(--text-color)]">Attendance Management</h1>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full border border-blue-100">Today: 2/3</span>
            </div>
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SmallCard
                    icon={<CheckCircle2 size={20} />}
                    title="Present Today"
                    value="2"
                    subText=""
                    iconBg="#ECFDF5"
                    valueColor="#059669"
                />

                <SmallCard
                    icon={<XCircle size={20} />}
                    title="Absent Today"
                    value="0"
                    subText=""
                    iconBg="#FEF2F2"
                    valueColor="#DC2626"
                />

                <SmallCard
                    icon={<Clock size={20} />}
                    title="Late Today"
                    value="0"
                    subText=""
                    iconBg="#FEF3C7"
                    valueColor="#D97706"
                />

                <SmallCard
                    icon={<Calendar size={20} />}
                    title="On Leave"
                    value="1"
                    subText=""
                    iconBg="#EFF6FF"
                    valueColor="#2563EB"
                />
            </div>
        </>
    );
};

export default AttendanceHeader;