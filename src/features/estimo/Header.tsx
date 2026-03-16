import React from "react";
import PageHeader from "../../components/common/HOC/pageHeader/PageHeader";
import NavBar from "./NavBar";
import { Calculator } from "lucide-react";


const Header = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <>
      <PageHeader
          icon={<Calculator size={22} />}
        title="Estimo"
        subtitle="Quote Generator with BOM/BOQ builder, RFQ comparison & industry templates"
      />
      <NavBar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  );
};
export default Header;
