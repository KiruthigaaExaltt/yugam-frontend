import { FiCheckCircle, FiPhone, FiUsers } from "react-icons/fi";
import SmallCard from "../HOC/SmallCard/SmallCard";

const ExalttSmallCard = () => {
  return (
    <div className="card-wrapper-5">
      <SmallCard icon={<FiUsers />} title="New Leads" value="1" />

      <SmallCard
        icon={<FiPhone />}
        title="Contacted"
        value="1"
        iconBg="#FEF3C7"
        valueColor="#F59E0B"
      />

      <SmallCard
        icon={<FiPhone />}
        title="Contacted"
        value="1"
        iconBg="#FEF3C7"
        valueColor="#F59E0B"
      />

      <SmallCard
        icon={<FiPhone />}
        title="Contacted"
        value="1"
        iconBg="#FEF3C7"
        valueColor="#F59E0B"
      />
      <SmallCard
        icon={<FiPhone />}
        title="Contacted"
        value="1"
        iconBg="#FEF3C7"
        valueColor="#F59E0B"
      />

      <SmallCard
        icon={<FiCheckCircle />}
        title="Converted"
        value="1"
        subText="Successful"
        iconBg="#DCFCE7"
        valueColor="#16A34A"
      />
    </div>
  );
};

export default ExalttSmallCard;
