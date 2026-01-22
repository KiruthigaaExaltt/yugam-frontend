// import { useState } from "react";
// import Dashcards from "./Dashcards"
// import Dashheader from "./Dashheader"
// import Dashmain from "./Dashmain"
// import DashNavBar from "./Dash"


// const Dashindex = () => {
//     const [activeTab, setActiveTab] = useState("Business Overview");

//     return (
//         <>
//             <Dashheader />
//             <DashNavBar activeTab={activeTab} onTabClick={setActiveTab} />

//             {/* Business Overview has KPI cards */}
//             {activeTab === "Business Overview" && (
//                 <>
//                     <Dashcards />
//                     <Dashmain activeTab={activeTab} onModuleClick={setActiveTab} />
//                 </>
//             )}

//             {/* Other modules only show Dashmain */}
//             {activeTab !== "Business Overview" && (
//                 <Dashmain activeTab={activeTab} onModuleClick={setActiveTab} />
//             )}
//         </>
//     )
// }

// export default Dashindex
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
      <DashNavBar
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* KPI cards always visible */}
     

      {/* All dashboard modules always visible */}
      {/* <Dashmain
        activeTab={activeTab}
        onModuleClick={setActiveTab}
      /> */}
    </>
  );
};

export default Dashindex;
