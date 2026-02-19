
import React from "react";
import PageHeader from "../HOC/pageHeader/PageHeader";
import NavBar from "./NavBar";


const Header = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null);
  const [activeTab, setActiveTab] = React.useState("user");

  return (
    <>
      <PageHeader
        icon={<i className="pi pi-calculator text-lg" />}
        title="Gate"
        subtitle="Identity & Access Management"
      />
      <NavBar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  );
};
export default Header;
