import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import AdminDashboard from "./AdminDashboard";
import Userimport from "../User/Userimport";


const IndexDashboard = () => {
  const [view, setView] = useState<'admin' | 'user'>('admin');

  return (
    <>
      <DashboardHeader view={view} setView={setView} />
      {view === 'admin' ? <AdminDashboard /> : <Userimport />}
    </>
  );
};

export default IndexDashboard;
