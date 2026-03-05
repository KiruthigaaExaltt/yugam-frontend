import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { CheckCircle2, XCircle, Clock, Calendar } from "lucide-react";

const AttendanceHeader = () => {
    return (
        <>
            <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl text-[var(--text-color)]">Attendance Management</h1>
                <span className="bg-[#E0F2FE] text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">
                    Today: 2/3
                </span>
            </div>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SmallCard
                    icon={<CheckCircle2 size={20} className="text-[#059669]" />}
                    title="Present Today"
                    value="2"
                    iconBg="#ECFDF5"
                    valueColor="#059669"
                />

                <SmallCard
                    icon={<XCircle size={20} className="text-[#DC2626]" />}
                    title="Absent Today"
                    value="0"
                    iconBg="#FEF2F2"
                    valueColor="#DC2626"
                />

                <SmallCard
                    icon={<Clock size={20} className="text-[#D97706]" />}
                    title="Late Today"
                    value="0"
                    iconBg="#FFFBEB"
                    valueColor="#D97706"
                />

                <SmallCard
                    icon={<Calendar size={20} className="text-[#2563EB]" />}
                    title="On Leave"
                    value="1"
                    iconBg="#EEF2FF"
                    valueColor="#2563EB"
                />
            </div>
        </>
    );
};

export default AttendanceHeader;
