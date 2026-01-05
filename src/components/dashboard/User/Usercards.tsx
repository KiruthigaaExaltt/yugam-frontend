import {
 FaClock,
 FaCalendar,
FaClipboardCheck,
FaChartPie,
} from "react-icons/fa";
import StatsCard from "../../HOC/dashboard/StatsCard";

const UserCards = () => {
  return (
    <div className="space-y-10">   
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-4 gap-4">
          <StatsCard
            title="My Attendance Today"
            value="6.5h"
            icon={<FaClock className="text-emerald-500" />}
            trendLabel="Punched in at 9:00 AM"
            iconPosition="right"
            bgClass="bg-white hover:bg-emerald-50 transition border border-emerald-100"
          />

          <StatsCard
            title="My Tasks"
            value="8"
            icon={<FaClipboardCheck className="text-emerald-500" />}
            trendLabel="3 due today"
            iconPosition="right"
            bgClass="bg-white hover:bg-emerald-50 transition border border-emerald-100"
          />

          <StatsCard
            title="My Meetings"
            value="0"
            icon={<FaCalendar className="text-emerald-500" />}
            trendLabel="Next at 10:00 AM"
            iconPosition="right"
            bgClass="bg-white hover:bg-emerald-50 transition border border-emerald-100"
          />
          <StatsCard
            title="Project Progress"
            value="67%"
            icon={<FaChartPie className="text-emerald-500" />}
            trendLabel="+5% this week"
            iconPosition="right"
            bgClass="bg-white hover:bg-emerald-50 transition border border-emerald-100"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCards;
