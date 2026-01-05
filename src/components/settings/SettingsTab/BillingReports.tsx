// import KpiCard from "../components/KpiCard";
import {
  FaDollarSign,
  FaUserAlt,
  FaServer,
  
} from "react-icons/fa";
import StatsCard from "../../HOC/dashboard/StatsCard";


const HeaderCards = () => {
  return (
    <div className="space-y-10 mt-3">   
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3  gap-4">
          <StatsCard
            title="Total Invoices"
            value="₹2.47Cr"
            icon={<FaDollarSign className="text-blue-600" />}
            trendLabel="+12.5% from last month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <StatsCard
            title="Pending Invoices"
            value="23"
            icon={<FaUserAlt className="text-orange-600" />}
            trendLabel="₹45.2L outstanding"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <StatsCard
            title="Overdue"
            value="₹7"
            icon={<FaServer className="text-green-600" />}
            trendLabel="₹12.8L overdue"
            iconPosition="right"
            bgClass="bg-green-50 hover:bg-green-100 transition"
          />
         
        </div>
      </div>
    </div>
  );
};

export default HeaderCards;
