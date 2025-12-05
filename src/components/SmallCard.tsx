import { FiTrendingUp, FiUsers } from "react-icons/fi";
// import "./SmallCard/CustomCard.css";
import { FiPlusCircle } from "react-icons/fi";
import CustomCard from "./HOC/SmallCard/SmallCard";


const SmallCard = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <CustomCard
          icon={<FiTrendingUp />}
          iconPosition="left"
          title="Monthly Revenue"
          mainValue="₹7.2L"
          contentPosition="column"
          minWidth={100}
          maxWidth={700}
          height={200}
          titlePosition="right"      // optional height
          // footerLeft={<span>Updated recently</span>}
          // footerRight={<span>Details</span>}
          titleWeight="bold"
          titleColor="black"
          titleSize='2em'
        />

        <CustomCard
          icon={<FiUsers />}
          title="Active Customers"
          mainValue="542"
          subValue="+8.3% growth rate"
          targetValue="LTV: ₹45K"
          contentPosition="column"
          
          titleWeight="bold"
        />

        <CustomCard
          icon={<FiPlusCircle />}
          iconPosition="top"
          title="Add New Item"
          // mainValue="+"
          contentPosition="column"
          minWidth={300}
          maxWidth={700}
          height={150}
          titleWeight="lighter"
          titleColor="black"
          titleSize="1em"
        />
      </div>

    </>
  );
};

export default SmallCard;
