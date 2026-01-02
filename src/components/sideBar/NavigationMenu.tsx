import { type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavigationMenu.css";
import {
  PiHouseFill,
  PiUsersFill,
  PiPhoneFill,
  PiFileTextFill,
  PiListFill,
  PiMoneyFill,
  PiReceiptFill,
  PiCreditCardFill,
  PiCalendarFill,
  PiShieldFill,
  PiLightningFill,
  PiArrowCounterClockwiseFill,
} from "react-icons/pi";

interface NavItem {
  id: string;
  label: string;
  description: string;
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
          id: "dashboard",
          label: "Dashboard",
          description: "Main overview dashboard",
          icon: <PiHouseFill />,
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
          description: "Sales CRM",
          icon: <PiUsersFill />,
          route: "/sales/orbit",
        },
        {
          id: "pulse",
          label: "Pulse",
          description: "Customer support",
          icon: <PiPhoneFill />,
          route: "/support/pulse",
        },
        {
          id: "estimo",
          label: "Estimo",
          description: "Quote generator",
          icon: <PiFileTextFill />,
          route: "/sales/estimo",
        },
      ],
    },
    {
      category: "HR & WORKFORCE",
      items: [
        {
          id: "crew",
          label: "Crew",
          description: "HR management",
          icon: <PiUsersFill />,
          route: "/hr/crew",
        },
        {
          id: "hire",
          label: "Hire",
          description: "Recruitment",
          icon: <PiListFill />,
          route: "/hr/hire",
        },
        {
          id: "crewpay",
          label: "CrewPay",
          description: "Payroll",
          icon: <PiMoneyFill />,
          route: "/hr/crewpay",
        },
      ],
    },
    {
      category: "ACCOUNTS & FINANCE",
      items: [
        {
          id: "billr",
          label: "Billr",
          description: "Invoicing",
          icon: <PiReceiptFill />,
          route: "/finance/billr",
        },
        {
          id: "payin",
          label: "PayIn",
          description: "Payments",
          icon: <PiCreditCardFill />,
          route: "/finance/payin",
        },
        {
          id: "cycle",
          label: "Cycle",
          description: "Subscriptions",
          icon: <PiCalendarFill />,
          route: "/finance/cycle",
        },
        {
          id: "seal",
          label: "Seal",
          description: "E-sign",
          icon: <PiShieldFill />,
          route: "/finance/seal",
        },
        {
          id: "flex",
          label: "Flex",
          description: "Workforce",
          icon: <PiLightningFill />,
          route: "/finance/flex",
        },
        {
          id: "trail",
          label: "Trail",
          description: "Expenses",
          icon: <PiArrowCounterClockwiseFill />,
          route: "/finance/trail",
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
