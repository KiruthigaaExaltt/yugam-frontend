import Crewnavbar from './Crewnavbar'
import { useState } from 'react'
import PageHeader from "../../components/common/HOC/pageHeader/PageHeader";
import { Users } from "lucide-react";


const Crewindex = () => { 
    const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <>
   <PageHeader
          icon={<Users size={22} />}
        title="Crew"
        subtitle="Employee management, attendance, leaves & performance tracking"
      />
    <Crewnavbar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  )
}
export default Crewindex
