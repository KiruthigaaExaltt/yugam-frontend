import { useState } from "react";
import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew"


const navItems: NavItem[] = [
  { label: "Dashboard", value: "dashboard" },
  { label: "New Quote", value: "new-quote" },
  { label: "Quote Library", value: "quote-library" },
  { label: "RFQ Import", value: "rfq-import" },
  { label: "Reports", value: "reports" },
  { label: "Settings", value: "settings" },
];

export default function ExampleNewNavBar() {
  const [active, setActive] = useState("dashboard");

  return (
    <NavBarNew
      items={navItems}
      active={active}
      onChange={setActive}
    />
  );
}
