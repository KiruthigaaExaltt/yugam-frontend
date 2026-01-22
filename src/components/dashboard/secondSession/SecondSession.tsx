import { useState } from "react";
import type { NavItem } from "../../HOC/navbarNew/NavBarNew";
import NavBarNew from "../../HOC/navbarNew/NavBarNew";
import { CoreFeatures } from "../modules/CoreFeatures";
import { PurchaseModule } from "../modules/PurchaseModule";
import { SalesModule } from "../modules/SalesModule";

const navItems: NavItem[] = [
  { label: "Purchase Module", value: "Purchase Module" },
  { label: "Sales Module", value: "Sales Module" },
  { label: "Core Features", value: "Core Features" },
];

export default function SecondSession() {
  // ✅ STATE INSIDE THIS FILE
  const [activeTab, setActiveTab] = useState<string>("Purchase Module");

  return (
    <div className="mt-3">
      {/* Tabs */}
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "Purchase Module" && <PurchaseModule />}
      {activeTab === "Sales Module" && <SalesModule />}
      {activeTab === "Core Features" && <CoreFeatures />}
    </div>
  );
}
