import React from "react";
import { useTheme } from "../../../../context/ThemeContext";

export interface NavItem {
  label: string;
  value: string;
}

interface TopNavBarProps {
  items: NavItem[];
  active: string;
  onChange: (value: string) => void;
}

const NavBarNew: React.FC<TopNavBarProps> = ({
  items,
  active,
  onChange,
}) => {
  const { activeTheme } = useTheme();

  return (
    <div>
      <div
        className="flex flex-wrap items-stretch justify-between gap-2"
        style={{
          fontFamily: "var(--font-primary)",
          background: "transparent",
        }}
      >
        {items.map((item) => {
          const isActive = active === item.value;
          const showPill = isActive && activeTheme === "light";

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className="flex-1 min-w-[110px] text-center transition-all flex items-center justify-center px-1"
              style={{
                background: "transparent",
                border: "none",
                padding: "0.25rem 0",
                color: isActive ? "var(--text-color)" : "var(--text-muted)",
                fontSize: "var(--font-size-button)",
                fontWeight: isActive ? "600" : "500",
                cursor: "pointer",
                minHeight: "44px"
              }}
            >
              <span
                style={{
                  background: showPill ? "#fff" : "transparent",
                  padding: showPill ? "0.45rem 1.6rem" : "0.5rem 0",
                  borderRadius: showPill ? "100px" : "0",
                  boxShadow: showPill ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap"
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavBarNew;
