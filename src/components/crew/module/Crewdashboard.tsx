import { FileText, Phone, Target, TrendingUp, UserPlus } from "lucide-react"
import SmallCard from "../../HOC/SmallCard/SmallCard"
import QuickActions from "../../HOC/quickActions/QuickAction"
import { FaBolt, FaChartLine, FaFileAlt, FaPlus } from "react-icons/fa";

const rowActions = [
    { id: "directory", label: "Employee Directory", icon: <FaPlus /> },
    { id: "attendance", label: "Mark Attendance", icon: <FaFileAlt /> },
    { id: "leave", label: "Apply Leave", icon: <FaChartLine /> },
    { id: "performance", label: "Performance", icon: <FaBolt /> },
];

const Crewdashboard = () => {
    return (
        <div>
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    w-full
                    mt-6
                    auto-rows-[var(--stat-card-height)]
                    place-items-stretch
                "
            >
                <SmallCard
                    icon={<UserPlus size={20} />}
                    title="Total Employees"
                    value="3"
                    subText="Active: 2"
                    iconBg="#EFF6FF"
                    valueColor="#3B82F6"
                />

                <SmallCard
                    icon={<Phone size={20} />}
                    title="Avg Attendance"
                    value="92%"
                    subText="This month"
                    iconBg="#FEF3C7"
                    valueColor="#D97706"
                />

                <SmallCard
                    icon={<Target size={20} />}
                    title="On Leave"
                    value="1"
                    subText="Currently"
                    iconBg="#F3E8FF"
                    valueColor="#9333EA"
                />


                <SmallCard
                    icon={<FileText size={20} />}
                    title="Avg Performance"
                    value="4.5"
                    subText="Out of 5.0"
                    iconBg="#FFEDD5"
                    valueColor="#F97316"
                />
            </div>
            <div className="mt-4">
                <QuickActions title="Quick Actions" actions={rowActions} layout="row" />
            </div>

        </div>
    )
}

export default Crewdashboard
