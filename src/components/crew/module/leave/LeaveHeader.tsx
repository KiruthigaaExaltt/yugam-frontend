import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";

const LeaveHeader = () => {
    return (
        <>
            <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl text-[var(--text-color)]">Leave Management</h1>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full border border-blue-100">1 Pending</span>
            </div>
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SmallCard
                    icon={<Clock size={20} />}
                    title="Pending Requests"
                    value="1"
                    subText=""
                    iconBg="#FEF3C7"
                    valueColor="#D97706"
                />

                <SmallCard
                    icon={<CheckCircle2 size={20} />}
                    title="Approved"
                    value="1"
                    subText=""
                    iconBg="#ECFDF5"
                    valueColor="#059669"
                />

                <SmallCard
                    icon={<XCircle size={20} />}
                    title="Rejected"
                    value="0"
                    subText=""
                    iconBg="#FEF2F2"
                    valueColor="#DC2626"
                />

                <SmallCard
                    icon={<Calendar size={20} />}
                    title="Total Days"
                    value="5"
                    subText=""
                    iconBg="#EFF6FF"
                    valueColor="#2563EB"
                />
            </div>
        </>
    );
};

export default LeaveHeader;
