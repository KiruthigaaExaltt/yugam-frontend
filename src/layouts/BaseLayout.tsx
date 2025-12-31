import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { TieredMenu } from "primereact/tieredmenu";
import { useTheme } from "../context/ThemeContext";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import type { MenuItem } from "primereact/menuitem";
import "./BaseLayout.css";
import NavigationMenu from "../components/sideBar/NavigationMenu";
import { useLocation, useNavigate } from "react-router-dom";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
}

const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuRef = useRef<TieredMenu>(null);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const topNavItems = [
    { label: "Orbit", route: "/sales/orbit" },
    { label: "Ledger", route: "/finance/ledger" },
    { label: "Vault", route: "/vault" },
    { label: "Crew", route: "/hr/crew" },
    { label: "Flow", route: "/flow" },
    { label: "Field", route: "/field" },
    { label: "Vision", route: "/vision" },
    { label: "Shield", route: "/shield" },
  ];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";
  }, [mobileSidebarOpen]);

  const profileMenuItems: MenuItem[] = [
    {
      label: "Profile",
      template: () => (
        <div className="p-menuitem-link flex items-center gap-2">
          <FiUser /> Profile
        </div>
      ),
      command: () => console.log("Profile clicked"),
    },
    {
      label: "Settings",
      template: () => (
        <div className="p-menuitem-link flex items-center gap-2">
          <FiSettings /> Settings
        </div>
      ),
      command: () => console.log("Settings clicked"),
    },
    { separator: true },
    {
      label: "Logout",
      template: () => (
        <div className="p-menuitem-link flex items-center gap-2">
          <FiLogOut /> Logout
        </div>
      ),
      command: () => console.log("Logout clicked"),
    },
  ];

  const toolbarStart = (
    <div className="flex items-center w-full">
      {/* Left: Sidebar toggle + Brand */}
      <div className="flex items-center gap-2">
        <Button
          className="p-button-rounded p-button-text p-button-sm"
          onClick={() => {
            if (isMobile) setMobileSidebarOpen((v) => !v);
            else setSidebarExpanded((v) => !v);
          }}
        >
          {isMobile || !sidebarExpanded ? (
            <FiMenu size={18} />
          ) : (
            <FiX size={18} />
          )}
        </Button>

        <div className="flex items-center gap-2 ml-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold"
            style={{
              background: "linear-gradient(to right, #3b82f6, #10b981)",
            }}
          >
            E
          </div>
          <>
            <span className="font-semibold text-sm">Exaltt.ai</span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: "var(--light-primary-light)",
                color: "var(--primary-color)",
              }}
            >
              DEMO
            </span>
          </>
        </div>
      </div>

      {title && <h2 className="m-0 ml-3 text-sm">{title}</h2>}

      <div className="flex-1 justify-center gap-2 hidden lg:flex">
        {topNavItems.map((item) => (
          <button
            key={item.label}
            className={`text-xs px-3 py-1 rounded ${
              location.pathname.startsWith(item.route)
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              navigate(item.route);
              if (isMobile) setMobileSidebarOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );

  const toolbarEnd = (
    <div className="flex items-center gap-2">
      <Button
        className="p-button-rounded p-button-text p-button-sm"
        icon={theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
        onClick={toggleTheme}
      />
      <Button
        className="p-button-rounded p-button-text p-button-sm p-badge"
        icon={<FiBell size={25} />}
        badge="3"
        badgeClassName="p-badge-danger"
      />
      <Button
        className="p-button-rounded p-button-text p-button-sm"
        icon={<FiSettings size={30} />}
        onClick={(e) => menuRef.current?.toggle(e)}
      />
      <TieredMenu ref={menuRef} model={profileMenuItems} popup />
    </div>
  );

  return (
    <div className="base-layout">
      {/* HEADER */}
      <header className="top-header">
        <Toolbar start={toolbarStart} center={undefined} end={toolbarEnd} />
      </header>

      {/* BODY */}
      <div className="content-row">
        {/* SIDEBAR */}
        <aside
          className={`
            sidebar-wrapper
            ${mobileSidebarOpen ? "mobile-open" : ""}
            ${!isMobile && sidebarExpanded ? "expanded" : ""}
            ${!isMobile && !sidebarExpanded ? "collapsed" : ""}
          `}
        >
          <div className="sidebar-header">
            {((!isMobile && sidebarExpanded) || isMobile) && (
              <h3 className="text-sm m-0">ExaltAI Modules</h3>
            )}
          </div>
          <div className="sidebar-content">
            <NavigationMenu
              collapsed={!sidebarExpanded && !isMobile}
              onNavigate={() => {
                if (isMobile) setMobileSidebarOpen(false);
              }}
            />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-container">
          <div className="page-content">{children}</div>

          <footer className="page-footer">
            <div className="footer-inner text-xs text-gray-500">
              © {new Date().getFullYear()} ExaltAI · All rights reserved
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
