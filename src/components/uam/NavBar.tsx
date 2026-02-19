import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";
import User from "./User";


type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Role", value: "role" },
  { label: "User", value: "user" },
];


export default function NavBar({ activeTab = "dashboard", onTabClick }: NavBarProps) {
  return (
    <div className="mt-10">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => { })}
      />


      {activeTab === 'user' && (
        <User />
      )}

    </div>
  );
}
