import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { UserPlus, Phone, Target, FileText } from "lucide-react";


const AssestsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-2xl text-[var(--text-color)]">Employee Assets</h1>
        <span className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold">3 Allocated</span>
      </div>
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <SmallCard
          icon={<UserPlus size={20} />}
          title="Allocated"
          value="3"
          subText=""
          iconBg="#ECFDF5"
          valueColor="#059669"
        />

        <SmallCard
          icon={<Target size={20} />}
          title="Returned"
          value="0"
          subText=""
          iconBg="#EFF6FF"
          valueColor="#2563EB"
        />

        <SmallCard
          icon={<FileText size={20} />}
          title="Damaged/Lost"
          value="0"
          subText=""
          iconBg="#FEF2F2"
          valueColor="#DC2626"
        />

        <SmallCard
          icon={<Phone size={20} />}
          title="Total Value"
          value="₹270K"
          subText=""
          iconBg="#F5F3FF"
          valueColor="#7C3AED"
        />
      </div>
    </>
  );
};

export default AssestsHeader;