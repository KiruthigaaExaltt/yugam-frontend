
import React from "react";
import { Shield } from "lucide-react";
import PageHeader from "../../components/common/HOC/pageHeader/PageHeader";
import NavBar from "./NavBar";


const Header = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null);
  const [activeTab, setActiveTab] = React.useState("user");

  return (
    <>
      <PageHeader
        icon={<Shield size={22} />}
        title="Gate"
        subtitle="Identity & Access Management"
      />
      <NavBar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  );
};
export default Header;
