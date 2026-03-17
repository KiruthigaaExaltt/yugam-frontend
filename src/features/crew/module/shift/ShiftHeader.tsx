import SmallCard from "../../../../components/common/HOC/SmallCard/SmallCard";
import { Play, Users, Clock, PauseCircle, Download, Plus } from "lucide-react";


interface ShiftHeaderProps {
    onCreateShift: () => void;
}

const ShiftHeader = ({ onCreateShift }: ShiftHeaderProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="font-bold text-2xl text-[var(--text-color)]">Shift Management</h1>
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full border border-blue-100"> 2 Active Shifts</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-100 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={16} />
                        Export Schedule
                    </button>
                </div>
            </div>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <SmallCard
                    icon={<Play size={20} className="text-emerald-500" />}
                    title="Active Shifts"
                    value="2"
                    subText=""
                    iconBg="#ECFDF5"
                    valueColor="#059669"
                />

                <SmallCard
                    icon={<Users size={20} className="text-blue-500" />}
                    title="Assigned Employees"
                    value="2"
                    subText=""
                    iconBg="#EFF6FF"
                    valueColor="#2563EB"
                />

                <SmallCard
                    icon={<Clock size={20} className="text-purple-500" />}
                    title="Avg Working Hours"
                    value="8h"
                    subText=""
                    iconBg="#F5F3FF"
                    valueColor="#7C3AED"
                />

                <SmallCard
                    icon={<PauseCircle size={20} className="text-amber-500" />}
                    title="Inactive Shifts"
                    value="1"
                    subText=""
                    iconBg="#FFFBEB"
                    valueColor="#D97706"
                />
            </div>
        </div>
    );
};

export default ShiftHeader;
