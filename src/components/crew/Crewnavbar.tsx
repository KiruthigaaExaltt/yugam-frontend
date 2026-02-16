import Dashboard from "../crew/module/Crewdashboard";
import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";
import Directory from "./module/Directory";
import Attendance from "./module/Attendance";
import Leaves from "./module/Leaves";
import Performance from "./module/Performance";
import Onboarding from "./module/Onboarding";
import Shifts from "./module/Shifts";
import Assets from "./module/Assests";   
type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Dashboard", value: "Dashboard" },
  { label: "Directory", value: "Directory" },
  { label: "Attendance", value: "Attendance" },
  { label: "Leaves", value: "Leaves" },
  { label: "Performance", value: "Performance" },
  { label: "Onboarding", value: "Onboarding" },
  { label: "Shifts", value: "Shifts" },
  { label: "Assets", value: "Assets" },
];

export default function Crewnavbar({
  activeTab = "Dashboard",
  onTabClick,
}: NavBarProps) {
  return (
    <div className="mt-3">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => {})}
      />

      {activeTab === "Dashboard" && <Dashboard />}

      {activeTab === "Directory" && <Directory />}

      {activeTab === "Attendance" && <Attendance />}

      {activeTab === "Leaves" && <Leaves />}

      {activeTab === "Performance" && <Performance />}

      {activeTab === "Onboarding" && <Onboarding />}

      {activeTab === "Shifts" && <Shifts />}

      {activeTab === "Assets" && <Assets />}
    </div>
  );
}
