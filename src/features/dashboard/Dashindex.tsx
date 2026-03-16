import { useState } from "react";
import Dashheader from "./Dashheader";
import DashNavBar from "./DashNavBar";
const Dashindex = () => {
  // Active tab is ONLY for UI highlight & scroll
  const [activeTab, setActiveTab] = useState("Business Overview");
return (
    <>
      <Dashheader />

      {/* Top main navigation */}
      <DashNavBar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  );
};

export default Dashindex;
