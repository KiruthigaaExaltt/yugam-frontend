import Dashboard from "../crew/module/Crewdashboard";
import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";
import Attendance from "./module/attendance/AttendanceIndex";
import Leaves from "./module/leave/LeaveIndex";
import Performance from "./module/Performance";
import Onboarding from "./module/Onboarding";
import Shifts from "./module/Shifts";
import AssetsIndex from "./module/assests/AssestsIndex";
import EmployeeIndex from "./module/employee/EmployeeIndex";
type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Dashboard", value: "Dashboard" },
  { label: "Employee", value: "Employee" },
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
        onChange={onTabClick ?? (() => { })}
      />

      {activeTab === "Dashboard" && <Dashboard />}

      {activeTab === "Employee" && <EmployeeIndex />}

      {activeTab === "Attendance" && <Attendance />}

      {activeTab === "Leaves" && <Leaves />}

      {activeTab === "Performance" && <Performance />}

      {activeTab === "Onboarding" && <Onboarding />}

      {activeTab === "Shifts" && <Shifts />}

      {activeTab === "Assets" && <AssetsIndex />}
    </div>
  );
}
