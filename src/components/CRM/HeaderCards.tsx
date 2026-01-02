// import KpiCard from "../components/KpiCard";
import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import StatsCard from "../HOC/dashboard/StatsCard";

const HeaderCards = () => {
  return (
    <div className="space-y-10">   
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-4 gap-4">
          <StatsCard
            title="Total Invoices"
            value="₹2.47Cr"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendLabel="+12.5% from last month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <StatsCard
            title="Pending Invoices"
            value="23"
            icon={<FaClock className="text-orange-600" />}
            trendLabel="₹45.2L outstanding"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <StatsCard
            title="Overdue"
            value="₹7"
            icon={<FaCheckCircle className="text-green-600" />}
            trendLabel="₹12.8L overdue"
            iconPosition="right"
            bgClass="bg-green-50 hover:bg-green-100 transition"
          />
          <StatsCard
            title="E-Way Bill"
            value="156"
            icon={<FaShieldAlt className="text-purple-600" />}
            trendLabel="3 pending approval"
            iconPosition="right"
            bgClass="bg-purple-50 hover:bg-purple-100 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderCards;
