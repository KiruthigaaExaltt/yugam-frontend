// NavButtons.tsx
import React from "react";
import { FiUsers } from "react-icons/fi";
import type { ButtonAction } from "../../HOC/buttons/Buttons";
import Buttons from "../../HOC/buttons/Buttons";

interface NavButtonsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Quotes: React.FC<NavButtonsProps> = ({ activeTab, onTabClick }) => {
  const tabs: ButtonAction[] = [
    {
      label: "Add New Quote",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Add New Quote" ? "primary" : "secondary",
      onClick: () => onTabClick("Add New Quote"),
    },
    {
      label: "Create Revision Quote",
      icon: <FiUsers size={16} />,
      variant: activeTab === "Create Revision Quote" ? "primary" : "secondary",
      onClick: () => onTabClick("Create Revision Quote"),
    },
  ];

  return <Buttons actions={tabs} />;
};

export default Quotes;
