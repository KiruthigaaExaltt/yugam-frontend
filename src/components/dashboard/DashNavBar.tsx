import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";
import { AdvancedAnalytics } from "./modules/Advancedanalytics";
import { BusinessOverview } from "./modules/BusinessOverview";
import { SystemStatus } from "./modules/SystemStatus";

type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Business Overview", value: "Business Overview" },
  { label: "Advanced Analytics", value: "Advanced Analytics" },
  { label: "System Status", value: "System Status" },
];

export default function DashNavBar({
  activeTab = "Business Overview",
  onTabClick,
}: NavBarProps) {
  return (
    <div className="mt-3">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => {})}
      />

      {activeTab === "Business Overview" && <BusinessOverview />}

      {activeTab === "Advanced Analytics" && <AdvancedAnalytics />}

      {activeTab === "System Status" && <SystemStatus />}
    </div>
  );
}
