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
            title="Total Clients"
            value="3"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendLabel="+0 this month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <StatsCard
            title="Active Projects"
            value="6"
            icon={<FaClock className="text-orange-600" />}
            trendLabel="+5 this week"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <StatsCard
            title="Completion Rate"
            value="61%"
            icon={<FaCheckCircle className="text-(--primary-color)" />}
            trendLabel="+3% this week"
            iconPosition="right"
            bgClass="bg-[color:var(--primary-color-light)] hover:bg-[color:var(--primary-color-light)] transition"
          />
          <StatsCard
            title="Total Revenue"
            value="$56K"
            icon={<FaShieldAlt className="text-purple-600" />}
            trendLabel="+18% this month"
            iconPosition="right"
            bgClass="bg-purple-50 hover:bg-purple-100 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderCards;
