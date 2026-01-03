import React from "react";

export interface ButtonAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

interface ButtonsProps {
  actions: ButtonAction[];
}

const Buttons: React.FC<ButtonsProps> = ({ actions }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className="p-button-text demo-button"
        >
          {action.icon && <span className="flex">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
