// NavButtons.tsx
import React from "react";
import Buttons, { type ButtonAction } from "../HOC/buttons/Buttons";
import { FiUsers, FiShield } from "react-icons/fi";

interface NavButtonsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const NavButtons: React.FC<NavButtonsProps> = ({ activeTab, onTabClick }) => {
  const tabs: ButtonAction[] = [
    {
      label: "General",
      icon: <FiUsers size={16} />,
      variant: activeTab === "General" ? "primary" : "secondary",
      onClick: () => onTabClick("General"),
    },
    {
      label: "Branding",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Branding" ? "primary" : "secondary",
      onClick: () => onTabClick("Branding"),
    },
    {
      label: "Users & Roles",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Users & Roles" ? "primary" : "secondary",
      onClick: () => onTabClick("Users & Roles"),
    },
    {
      label: "Permissions",
      icon: <FiShield size={16} />,
      variant: activeTab === "Permissions" ? "primary" : "secondary",
      onClick: () => onTabClick("Permissions"),
    },
    {
      label: "Modules",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Modules" ? "primary" : "secondary",
      onClick: () => onTabClick("Modules"),
    },
    {
      label: "Integrations",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Integrations" ? "primary" : "secondary",
      onClick: () => onTabClick("Integrations"),
    },
    {
      label: "Notifications",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Notifications" ? "primary" : "secondary",
      onClick: () => onTabClick("Notifications"),
    },
    {
      label: "Billing",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Billing" ? "primary" : "secondary",
      onClick: () => onTabClick("Billing"),
    },
    {
      label: "Security",
      icon: <FiShield size={16} />,
      variant: activeTab === "Security" ? "primary" : "secondary",
      onClick: () => onTabClick("Security"),
    },
    {
      label: "Data & Audit",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Data & Audit" ? "primary" : "secondary",
      onClick: () => onTabClick("Data & Audit"),
    },
  ];

  return <Buttons actions={tabs} />;
};

export default NavButtons;
