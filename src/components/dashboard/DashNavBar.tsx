import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";

type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Business Overview", value: "Business Overview" },
  { label: "Advanced Analytics", value: "Advanced Analytics" },
  { label: "System Status", value: "System Status" },

];

export default function NavBar({ activeTab = "Business Overview", onTabClick }: NavBarProps) {
  return (
    <div className="mt-3">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => {})}
      />
    </div>
  );
}
