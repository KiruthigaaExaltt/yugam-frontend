import { type JSX, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavigationMenu.css";
import {
  PiHouse,
  PiUsers,
  PiFileText,
  PiUser,
  PiUserPlus,
  PiCurrencyDollar,
  PiReceipt,
  PiArrowsCounterClockwise,
  PiClock,
  PiCreditCard,
  PiCalculator,
  PiCube,
  PiHammer,
  PiFolder,
  PiCheckSquare,
  PiPhone,
  PiTruck,
  PiShareNetwork,
  PiBrain,
  PiKey,
  PiHardDrive,
  PiGear,
  PiCaretDownBold,
  PiCaretRightBold,
} from "react-icons/pi";

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon: JSX.Element;
  route: string;
  badge?: string | number;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

interface NavigationMenuProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const NavigationMenu = ({
  collapsed = false,
  onNavigate,
}: NavigationMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationData: NavCategory[] = [
    {
      category: "CORE",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          description: "Main overview dashboard",
          icon: <PiHouse />,
          route: "/dashboard",
        },
      ],
    },
    {
      category: "SALES & CRM",
      items: [
        {
          id: "orbit",
          label: "Orbit",
          description: "Sales CRM with lead managem",
          icon: <PiUsers />,
          route: "/orbit",
        },
        {
          id: "estimo",
          label: "Estimo",
          description: "Quote Generator with BOM/BO",
          icon: <PiFileText />,
          route: "/estimo",
        },
      ],
    },
    {
      category: "HR & WORKFORCE",
      items: [
        {
          id: "crew",
          label: "Crew",
          description: "Human resource management",
          icon: <PiUser />,
          route: "/crew",
        },
        {
          id: "hire",
          label: "Hire",
          description: "Recruitment management",
          icon: <PiUserPlus />,
          route: "/hire",
        },
        {
          id: "crewpay",
          label: "CrewPay",
          description: "Payroll system",
          icon: <PiCurrencyDollar />,
          route: "/payroll",
        },
      ],
    },
    {
      category: "ACCOUNTS & FINANCE",
      items: [
        {
          id: "billr",
          label: "Billr",
          description: "Quick invoicing system",
          icon: <PiReceipt />,
          route: "/accounts",
        },
        {
          id: "cycle",
          label: "Cycle",
          description: "Subscription management",
          icon: <PiArrowsCounterClockwise />,
          route: "/subscriptions",
        },
        {
          id: "flex",
          label: "Flex",
          description: "Workforce management & pro",
          icon: <PiClock />,
          route: "/flex",
        },
        {
          id: "trail",
          label: "Trail",
          description: "Expense management & receip",
          icon: <PiCreditCard />,
          route: "/trail",
        },
        {
          id: "ledger",
          label: "Ledger",
          description: "Financial accounting & bookke",
          icon: <PiCalculator />,
          route: "/ledger",
        },
      ],
    },
    {
      category: "OPERATIONS",
      items: [
        {
          id: "vault",
          label: "Vault",
          description: "Inventory, warehouse & assets",
          icon: <PiCube />,
          route: "/inventory",
        },
        {
          id: "forge",
          label: "Forge",
          description: "Production planning, work ord",
          icon: <PiHammer />,
          route: "/forge",
        },
        {
          id: "flow",
          label: "Flow",
          description: "Project management",
          icon: <PiFolder />,
          route: "/projects",
        },
        {
          id: "sprintx",
          label: "SprintX",
          description: "Agile development",
          icon: <PiCheckSquare />,
          route: "/tasks-v2",
        },
        {
          id: "sync",
          label: "Sync",
          description: "Communications & collaborati",
          icon: <PiPhone />,
          route: "/collaboration/messages",
        },
        {
          id: "field",
          label: "Field",
          description: "Field service management",
          icon: <PiTruck />,
          route: "/field",
        },
      ],
    },
    {
      category: "MARKETING & COMMERCE",
      items: [
        {
          id: "reach",
          label: "Reach",
          description: "Social media management",
          icon: <PiShareNetwork />,
          route: "/social",
        },
      ],
    },
    {
      category: "LEGAL & CONTRACTS",
      items: [
        {
          id: "contracta",
          label: "Contracta",
          description: "Contract management",
          icon: <PiFileText />,
          route: "/contracts",
        },
      ],
    },
    {
      category: "ANALYTICS & SECURITY",
      items: [
        {
          id: "vision",
          label: "Vision",
          description: "Business intelligence",
          icon: <PiBrain />,
          route: "/reports",
        },
        {
          id: "gate",
          label: "Gate",
          description: "Identity management",
          icon: <PiKey />,
          route: "/security",
        },
      ],
    },
    {
      category: "STORAGE & WORKFLOWS",
      items: [
        {
          id: "drive",
          label: "Drive",
          description: "Cloud storage",
          icon: <PiHardDrive />,
          route: "/collaboration/storage",
        },
      ],
    },
    {
      category: "ADMINISTRATION",
      items: [
        {
          id: "settings",
          label: "Settings",
          description: "System administration, RBAC &",
          icon: <PiGear />,
          route: "/settings",
        },
      ],
    },
  ];

  /** Active item */
  const activeItemId =
    navigationData
      .flatMap((section) => section.items)
      .find((item) => location.pathname.startsWith(item.route))?.id ?? "";

  /** Active category (derived, no effect needed) */
  const activeCategory =
    navigationData.find((section) =>
      section.items.some((item) =>
        location.pathname.startsWith(item.route)
      )
    )?.category ?? "CORE";

  /* Expanded category state (only one at a time) */
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    activeCategory,
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      // Accordion behavior: if clicking the already open one, close it.
      // Otherwise, switch to the new one (closing others).
      if (prev.includes(category)) {
        return [];
      }
      return [category];
    });
  };

  return (
    <div className={`navigation-menu ${collapsed ? "collapsed" : ""}`}>
      {navigationData.map((section) => {
        // "CORE" and "WORK" are always expanded visually and have no header toggles.
        // Updated to remove "WORK" as it's no longer a category in the new structure
        const isAlwaysExpanded = ["CORE"].includes(section.category);
        // Check if explicitly expanded OR always expanded
        const isExpanded = isAlwaysExpanded || expandedCategories.includes(section.category);

        return (
          <div key={section.category} className="nav-section">
            {!collapsed && !isAlwaysExpanded && (
              <div
                className="nav-category-title"
                onClick={() => toggleCategory(section.category)}
              >
                <span>{section.category}</span>
                <span className="nav-category-icon">
                  {isExpanded ? (
                    <PiCaretDownBold />
                  ) : (
                    <PiCaretRightBold />
                  )}
                </span>
              </div>
            )}

            {(collapsed || isExpanded) && (
              <div className="nav-items">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item ${
                      activeItemId === item.id ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate(item.route);
                      onNavigate?.();
                    }}
                  >
                    <div className="nav-item-icon">{item.icon}</div>

                    {!collapsed && (
                      <div className="nav-item-content">
                        <div className="nav-item-label-row">
                             <div className="nav-item-label">{item.label}</div>
                             {item.badge !== undefined && (
                                <span className="nav-item-badge">{item.badge}</span>
                             )}
                        </div>
                        {item.description && <div className="nav-item-description">
                          {item.description}
                        </div>}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavigationMenu;
