import { useState } from "react";
import PageHeader from "../../HOC/pageHeader/PageHeader";
import NavBarNew, { type NavItem } from "../../HOC/navbarNew/NavBarNew";
import LaborRates from "./LaborRates";
import MachineRates from "./MachineRates";
import Overheads from "./Overheads";
import General from "./General";

const Header = () => {
    const [activeTab, setActiveTab] = useState("labor-rates");

    const settingsNavItems: NavItem[] = [
        { label: "Labor Rates", value: "labor-rates" },
        { label: "Machine Rates", value: "machine-rates" },
        { label: "Overheads", value: "overheads" },
        { label: "General", value: "general" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <PageHeader
                title="Settings"
                subtitle="Configure quote generation parameters and templates"
            />

            <div className="px-0">
                <NavBarNew
                    items={settingsNavItems}
                    active={activeTab}
                    onChange={(val) => setActiveTab(val)}
                />
            </div>

            <div className="transition-all duration-300">
                {activeTab === "labor-rates" && <LaborRates />}
                {activeTab === "machine-rates" && <MachineRates />}
                {activeTab === "overheads" && <Overheads />}
                {activeTab === "general" && <General />}
            </div>
        </div>
    );
};

export default Header;
