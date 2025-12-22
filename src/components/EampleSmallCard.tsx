import { FiUsers } from "react-icons/fi";
// import "./SmallCard/CustomCard.css";

import SmallCard from "./HOC/SmallCard/SmallCard";

const EampleSmallCard = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <SmallCard
          icon={<FiUsers />}
          title="New Leads"
          value="1"
          iconBg="#eef2ff"
        />

        <SmallCard
          icon={<FiUsers />}
          title="New Leads"
          value="1"
          iconBg="#eef2ff"
        />

        <SmallCard
          icon={<FiUsers />}
          title="New Leads"
          value="1"
          iconBg="#eef2ff"
        />
      </div>
    </>
  );
};

export default EampleSmallCard;
