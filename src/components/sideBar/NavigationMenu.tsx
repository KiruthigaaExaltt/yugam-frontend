import { type JSX, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentPermissions } from "../login/authSlice";
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
  PiUserGear,
} from "react-icons/pi";

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon: JSX.Element;
  route: string;
  badge?: string | number;
  permission?: string; // Add permission field
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
  const userPermissions = useSelector(selectCurrentPermissions);

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
          permission: "VIEW_ORBIT", // Example mapping
        },
        {
          id: "estimo",
          label: "Estimo",
          description: "Quote Generator with BOM/BO",
          icon: <PiFileText />,
          route: "/estimo",
          permission: "VIEW_ESTIMO",
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
          permission: "VIEW_USERS",
        },
        {
          id: "hire",
          label: "Hire",
          description: "Recruitment management",
          icon: <PiUserPlus />,
          route: "/hire",
          permission: "VIEW_HIRE",
        },
        {
          id: "crewpay",
          label: "CrewPay",
          description: "Payroll system",
          icon: <PiCurrencyDollar />,
          route: "/payroll",
          permission: "VIEW_PAYROLL",
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
          permission: "VIEW_BILLR",
        },
        {
          id: "cycle",
          label: "Cycle",
          description: "Subscription management",
          icon: <PiArrowsCounterClockwise />,
          route: "/subscriptions",
          permission: "VIEW_CYCLE",
        },
        {
          id: "flex",
          label: "Flex",
          description: "Workforce management & pro",
          icon: <PiClock />,
          route: "/flex",
          permission: "VIEW_FLEX",
        },
        {
          id: "trail",
          label: "Trail",
          description: "Expense management & receip",
          icon: <PiCreditCard />,
          route: "/trail",
          permission: "VIEW_TRAIL",
        },
        {
          id: "ledger",
          label: "Ledger",
          description: "Financial accounting & bookke",
          icon: <PiCalculator />,
          route: "/ledger",
          permission: "VIEW_LEDGER",
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
          permission: "VIEW_VAULT",
        },
        {
          id: "forge",
          label: "Forge",
          description: "Production planning, work ord",
          icon: <PiHammer />,
          route: "/forge",
          permission: "VIEW_FORGE",
        },
        {
          id: "flow",
          label: "Flow",
          description: "Project management",
          icon: <PiFolder />,
          route: "/projects",
          permission: "VIEW_FLOW",
        },
        {
          id: "sprintx",
          label: "SprintX",
          description: "Agile development",
          icon: <PiCheckSquare />,
          route: "/tasks-v2",
          permission: "VIEW_SPRINTX",
        },
        {
          id: "sync",
          label: "Sync",
          description: "Communications & collaborati",
          icon: <PiPhone />,
          route: "/collaboration/messages",
          permission: "VIEW_SYNC",
        },
        {
          id: "field",
          label: "Field",
          description: "Field service management",
          icon: <PiTruck />,
          route: "/field",
          permission: "VIEW_FIELD",
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
          permission: "VIEW_REACH",
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
          permission: "VIEW_CONTRACTA",
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
          permission: "VIEW_VISION",
        },
        {
          id: "gate",
          label: "Gate",
          description: "Identity management",
          icon: <PiKey />,
          route: "/security",
          permission: "VIEW_GATE",
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
          permission: "VIEW_DRIVE",
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
          permission: "VIEW_SETTINGS",
        },
        {
          id: "uam",
          label: "User Access Management",
          description: "User management, RBAC & permissions",
          icon: <PiUserGear />,
          route: "/uam",
          permission: "VIEW_ROLES", // Based on your screenshot
        },
      ],
    },
  ];

  // Filter navigation data based on permissions
  const filteredNavigationData = navigationData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) => !item.permission || userPermissions.includes(item.permission)
      ),
    }))
    .filter((category) => category.items.length > 0);

  /** Active item */
  const activeItemId =
    filteredNavigationData
      .flatMap((section) => section.items)
      .find((item) => location.pathname.startsWith(item.route))?.id ?? "";

  /** Active category (derived, no effect needed) */
  const activeCategory =
    filteredNavigationData.find((section) =>
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
      {filteredNavigationData.map((section) => {
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
                    className={`nav-item ${activeItemId === item.id ? "active" : ""
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
