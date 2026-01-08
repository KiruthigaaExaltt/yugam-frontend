import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";

type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Quotes", value: "quotes" },
  { label: "Contracts", value: "contracts" },
  { label: "Recurring Invoice", value: "recurring-invoice" },
  { label: "Transactions", value: "transactions" },
  { label: "Trial Balance", value: "trial-balance" },
];

export default function NavBar({ activeTab = "quotes", onTabClick }: NavBarProps) {
  return (
    <div className="mt-10">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => {})}
      />
    </div>
  );
}
