import SmallCard from "../../components/common/HOC/SmallCard/SmallCard";
import { UserPlus, Phone, Target, FileText } from "lucide-react";


const EmployeeHeader = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-2xl text-[var(--text-color)]">Employee Directory</h1>
      </div>
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <SmallCard
          icon={<UserPlus size={20} />}
          title="Active Employees"
          value="2"
          subText=""
          iconBg="#ECFDF5"
          valueColor="#059669"
        />

        <SmallCard
          icon={<Target size={20} />}
          title="On Leave"
          value="1"
          subText=""
          iconBg="#FEF3C7"
          valueColor="#D97706"
        />

        <SmallCard
          icon={<FileText size={20} />}
          title="Avg Performance"
          value="4.5/5.0"
          subText=""
          iconBg="#EFF6FF"
          valueColor="#2563EB"
        />

        <SmallCard
          icon={<Phone size={20} />}
          title="Departments"
          value="3"
          subText=""
          iconBg="#F5F3FF"
          valueColor="#7C3AED"
        />
      </div>
    </>
  );
};

export default EmployeeHeader;