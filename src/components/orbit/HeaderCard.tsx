import {
  UserPlus,
  Phone,
  Target,
  FileText,
  TrendingUp
} from "lucide-react";
import SmallCard from "../HOC/SmallCard/SmallCard";

const HeaderCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-6">
      <SmallCard
        icon={<UserPlus size={20} />}
        title="New Leads"
        value="1"
        iconBg="#EFF6FF"
        valueColor="#3B82F6"
      />

      <SmallCard
        icon={<Phone size={20} />}
        title="Contacted"
        value="1"
        iconBg="#FEF3C7"
        valueColor="#D97706"
      />

      <SmallCard
        icon={<Target size={20} />}
        title="Qualified"
        value="1"
        iconBg="#F3E8FF"
        valueColor="#9333EA"
      />

      <SmallCard
        icon={<FileText size={20} />}
        title="Proposals"
        value="1"
        iconBg="#FFEDD5"
        valueColor="#F97316"
      />

      <SmallCard
        icon={<TrendingUp size={20} />}
        title="Converted"
        value="1"
        iconBg="#DCFCE7"
        valueColor="#22C55E"
      />

    </div>
  );
};

export default HeaderCard;
