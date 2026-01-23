
import PageHeader from "../HOC/pageHeader/PageHeader";
// import NavBar from "./NavBar";


const Crewheader = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null);
//   const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <>
      <PageHeader
        icon={<i className="pi pi-calculator text-lg" />}
        title="Crew"
        subtitle="Employee management, attendance, leaves & performance tracking"
      />
      {/* <NavBar activeTab={activeTab} onTabClick={setActiveTab} /> */}
    </>
  );
};
export default Crewheader;
