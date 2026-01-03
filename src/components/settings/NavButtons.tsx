
import Buttons, { type ButtonAction } from "../HOC/buttons/Buttons";
import {  FiUsers, FiShield } from "react-icons/fi";

const NavButtons = () => {
  const actions: ButtonAction[] = [
    { label: "General", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("General") },
    { label: "Branding", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Branding") },
    { label: "Users & Roles", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Users & Roles") },
    { label: "Permissions", icon: <FiShield size={16} />, variant: "primary", onClick: () => console.log("Permissions") },
    { label: "Modules", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Modules") },
    { label: "Integrations", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Integrations") },
    { label: "Notifications", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Notifications") },
    { label: "Billing", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Billing") },
    { label: "Security", icon: <FiShield size={16} />, variant: "secondary", onClick: () => console.log("Security") },
    { label: "Data & Audit", icon: <FiUsers size={16} />, variant: "secondary", onClick: () => console.log("Data & Audit") },
  ];

  return <Buttons actions={actions} />;
};

export default NavButtons;
