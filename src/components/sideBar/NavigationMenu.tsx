import { type JSX } from "react";
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
} from "react-icons/pi";

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon: JSX.Element;
  route: string;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

interface NavigationMenuProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const NavigationMenu = ({ collapsed = false, onNavigate, }: NavigationMenuProps) => {
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
        // badge: 8, // optional (for green badge)
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


  const activeItemId =
    navigationData
      .flatMap((section) => section.items)
      .find((item) => location.pathname.startsWith(item.route))?.id ?? "";

  return (
    <div className={`navigation-menu ${collapsed ? "collapsed" : ""}`}>
      {navigationData.map((section) => (
        <div key={section.category} className="nav-section">
          {!collapsed && (
            <div className="nav-category-title">{section.category}</div>
          )}

          <div className="nav-items">
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${
                  activeItemId === item.id ? "active" : ""
                }`}
                onClick={() => {
                  navigate(item.route);
                  onNavigate?.(); // ✅ close sidebar on mobile
                }}
              >
                <div className="nav-item-icon">{item.icon}</div>

                {!collapsed && (
                  <div className="nav-item-content">
                    <div className="nav-item-label">{item.label}</div>
                    <div className="nav-item-description">
                      {item.description}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;
