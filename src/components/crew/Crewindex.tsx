import Crewheader from '../crew/Crewheader'
import Crewnavbar from './Crewnavbar'
import { useState } from 'react'


const Crewindex = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <>
    <Crewheader />
    <Crewnavbar activeTab={activeTab} onTabClick={setActiveTab} />
    </>
  )
}
export default Crewindex
