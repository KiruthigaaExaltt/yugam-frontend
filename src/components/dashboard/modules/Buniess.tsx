import ReusableChart from "../../HOC/charts/ReusableChart";
import ReusableProgressListCard, { type StatItem } from "../../HOC/progressbar/ReusableProgressListCard";
import QuickActions from "../../HOC/quickActions/QuickAction";
import MeetingSection, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";
import { FiActivity, FiDollarSign, FiTarget, FiCheckCircle, FiShield, FiUserPlus } from "react-icons/fi";
import { FaBullseye, FaComments, FaUserPlus, FaBriefcase, FaBox, FaChartBar } from "react-icons/fa";

const moduleUsageData: StatItem[] = [
    { label: "Orbit CRM", users: 45, percent: 95, dotColor: "#1E5BB8", barColor: "#1E5BB8" },
    { label: "Pulse Support", users: 32, percent: 87, dotColor: "#00A8A8", barColor: "#1E5BB8" },
    { label: "Crew HRMS", users: 28, percent: 92, dotColor: "#64B5F6", barColor: "#1E5BB8" },
    { label: "Vault Inventory", users: 25, percent: 78, dotColor: "#26A69A", barColor: "#1E5BB8" },
    { label: "Flow Projects", users: 35, percent: 83, dotColor: "#81C784", barColor: "#1E5BB8" },
    { label: "Vision Analytics", users: 18, percent: 71, dotColor: "#FB8C00", barColor: "#1E5BB8" },
];

const gridActions = [
    { id: "lead", label: "New Lead", icon: <FaBullseye /> },
    { id: "ticket", label: "Create Ticket", icon: <FaComments /> },
    { id: "employee", label: "Add Employee", icon: <FaUserPlus /> },
    { id: "project", label: "New Project", icon: <FaBriefcase /> },
    { id: "inventory", label: "Check Inventory", icon: <FaBox /> },
    { id: "report", label: "Generate Report", icon: <FaChartBar /> },
];

const recentActivities: MeetingItem[] = [
    { title: "New sale closed", description: "Deal #1234 closed for ₹2.5L by Rajesh Kumar", timestamp: "5 minutes ago", icon: FiDollarSign, tone: "green" },
    { title: "High-value lead assigned", description: "New enterprise lead assigned to sales team", timestamp: "15 minutes ago", icon: FiTarget, tone: "purple" },
    { title: "Project milestone completed", description: "Mobile app development phase 2 completed", timestamp: "1 hour ago", icon: FiCheckCircle, tone: "blue" },
    { title: "Critical ticket resolved", description: "High priority support ticket #789 resolved", timestamp: "2 hours ago", icon: FiShield, tone: "green" },
    { title: "New employee onboarded", description: "Sarah Johnson joined as Senior Developer", timestamp: "3 hours ago", icon: FiUserPlus, tone: "green" },
];

export const BusinessOverview = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <ReusableChart type="line" label="Monthly Comparison" />
                <ReusableProgressListCard
                    title="Module Usage"
                    items={moduleUsageData}
                    showEyeButton
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions
                    title="Quick Actions"
                    actions={gridActions}
                    layout="grid"
                />
                <div className="recent-activity-wrapper">
                    <MeetingSection
                        title="Recent Activities"
                        titleIcon={FiActivity}
                        titleIconColor="#3b82f6"
                        meetings={recentActivities}
                        badgeText="5 new"
                        showArrowOnly
                    />
                </div>
            </div>
        </div>
    );
};
