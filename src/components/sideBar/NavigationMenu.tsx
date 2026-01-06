import { type JSX, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavigationMenu.css";
import {
  PiHouseFill,
  PiUsersFill,
  PiFileTextFill,
  PiReceiptFill,
  PiCreditCardFill,
  PiCalendarFill,
  PiGearFill,
  PiDatabaseFill,
  PiChatCircleTextFill,
  PiCubeFill,
  PiShareNetworkFill,
  PiFolderFill,
  PiCheckSquareFill,
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
          id: "dashboards",
          label: "Dashboards",
          icon: <PiHouseFill />,
          route: "/dashboard",
        },
      ],
    },
    {
      category: "WORK",
      items: [
        {
          id: "crm",
          label: "CRM",
          icon: <PiUsersFill />,
          route: "/crm",
        },
        {
          id: "tasks-rbac",
          label: "Tasks v2 (RBAC)",
          icon: <PiCheckSquareFill />,
          route: "/tasks-v2",
        },
        {
          id: "tasks-legacy",
          label: "Tasks (Legacy)",
          icon: <PiCheckSquareFill />,
          route: "/tasks",
        },
        {
          id: "projects",
          label: "Projects",
          icon: <PiFolderFill />,
          route: "/projects",
        },
        {
          id: "social-media",
          label: "Social Media",
          icon: <PiShareNetworkFill />,
          route: "/social",
        },
      ],
    },
    {
      category: "ORGANIZATION",
      items: [
        {
          id: "crew",
          label: "Crew",
          icon: <PiUsersFill />,
          route: "/crew",
        },
        {
          id: "inventory",
          label: "Inventory",
          icon: <PiCubeFill />,
          route: "/inventory",
        },
        {
          id: "accounts",
          label: "Accounts",
          icon: <PiReceiptFill />,
          route: "/accounts",
        },
      ],
    },
    {
      category: "COLLABORATION",
      items: [
        {
          id: "messages",
          label: "Messages",
          icon: <PiChatCircleTextFill />,
          route: "/collaboration/messages",
          badge: 8,
        },
        {
          id: "meetings",
          label: "Meetings & Calls",
          icon: <PiCalendarFill />,
          route: "/collaboration/meetings",
        },
        {
          id: "storage",
          label: "Data Storage",
          icon: <PiDatabaseFill />,
          route: "/collaboration/storage",
        },
      ],
    },
    {
      category: "PERFORMANCE",
      items: [
        {
          id: "reports",
          label: "Reports",
          icon: <PiFileTextFill />,
          route: "/reports",
        },
      ],
    },
    {
      category: "OPERATIONS",
      items: [
        {
          id: "subscriptions",
          label: "Subscriptions",
          icon: <PiCreditCardFill />,
          route: "/subscriptions",
        },
      ],
    },
    {
      category: "SETTINGS",
      items: [
        {
          id: "settings",
          label: "Settings",
          icon: <PiGearFill />,
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

  /** Expanded category state (only one at a time) */
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    activeCategory,
    "COLLABORATION" // Ensure collaboration is open by default if needed, or stick to auto logic
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
        const isAlwaysExpanded = ["CORE", "WORK"].includes(section.category);
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
