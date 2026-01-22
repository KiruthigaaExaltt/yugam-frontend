import {
  FaRupeeSign,
  FaUsers,
  FaChartLine,
  FaHeartbeat,
 
} from "react-icons/fa";
import KpiCard from "../../HOC/dashboard/StatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      {/* ===== Business Overview ===== */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 mt-5">
          <KpiCard
            title="Monthly Revenue"
            value="₹7.2L"
            icon={<FaRupeeSign className="text-teal-600" />}
            badgeText="+12.5% from last month"
            badgeColor="bg-teal-50 text-teal-600"
            accentColor="before:bg-teal-500"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Active Customers"
            value="542"
            icon={<FaUsers className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            badgeText="+8.3% growth rate"
            badgeColor="bg-blue-50 text-blue-600"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Conversion Rate"
            value="31.5%"
            icon={<FaChartLine className="text-sky-600" />}
            accentColor="before:bg-sky-500"
            badgeText="+2.8% improvement"
            badgeColor="bg-sky-50 text-sky-600"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Active Projects"
            value="24"
            icon={<FaHeartbeat className="text-emerald-600" />}
            accentColor="before:bg-emerald-500"
            badgeText="6 on schedule"
            badgeColor="bg-emerald-50 text-emerald-600"
            iconPosition="left"
            targetText="Target: 103%"
          />
        </div>
      </div> 
      </div>
      );
};

export default Dashboard