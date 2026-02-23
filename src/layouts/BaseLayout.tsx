import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
// import { TieredMenu } from "primereact/tieredmenu";
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
  FiChevronRight,
  FiLock,
} from "react-icons/fi";
import { Monitor } from "lucide-react";
import "./BaseLayout.css";
import NavigationMenu from "../components/sideBar/NavigationMenu";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileDialog from "../components/profile/ProfileDialog";
import ChangePasswordDialog from "../components/profile/ChangePasswordDialog";


interface BaseLayoutProps {
  children?: ReactNode;
  title?: string;
}

const BaseLayout = ({ title }: BaseLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [profileDialogVisible, setProfileDialogVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const [passwordDialogVisible, setPasswordDialogVisible] = useState(false);
  const settingsBtnRef = useRef<any>(null);
  const themeBtnRef = useRef<any>(null);

  useEffect(() => {
    const handleBrandingUpdate = (e: any) => {
      if (e.detail && e.detail.logo) {
        setCustomLogo(e.detail.logo);
      }
    };
    window.addEventListener("branding-update", handleBrandingUpdate);
    return () => {
      window.removeEventListener("branding-update", handleBrandingUpdate);
    };
  }, []);

  const { theme, activeTheme, setTheme } = useTheme();

  const navigate = useNavigate();
  // const location = useLocation();

  // const topNavItems = [
  //   { label: "Orbit", route: "/sales/orbit" },
  //   { label: "Ledger", route: "/finance/ledger" },
  //   { label: "Vault", route: "/vault" },
  //   { label: "Crew", route: "/hr/crew" },
  //   { label: "Flow", route: "/flow" },
  //   { label: "Field", route: "/field" },
  //   { label: "Vision", route: "/vision" },
  //   { label: "Shield", route: "/shield" },
  // ];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";
  }, [mobileSidebarOpen]);

  // Handle clicks outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuVisible &&
        themeBtnRef.current &&
        !themeBtnRef.current.contains(event.target as Node)
      ) {
        setThemeMenuVisible(false);
      }
      if (
        profileMenuVisible &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(event.target as Node)
      ) {
        setProfileMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeMenuVisible, profileMenuVisible]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = `${user.firstName || "User"} ${user.lastName || ""}`.trim();
  const role = user.role || "Administrator";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  const renderProfileMenu = () => {
    if (!profileMenuVisible) return null;

    return (
      <div
        className="profile-menu shadow-2xl animate-in fade-in zoom-in duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="profile-menu-header">
          <div className="menu-avatar">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="initials">{initials}</span>
            )}
          </div>
          <div className="menu-header-info">
            <h3 className="menu-name">{name}</h3>
            <p className="menu-role">{role}</p>
          </div>
        </div>

        <div className="menu-links">
          <div className="menu-link settings" onClick={() => setProfileMenuVisible(false)}>
            <div className="link-content">
              <FiSettings size={18} />
              <span>Settings</span>
            </div>
            <FiChevronRight size={14} className="chevron" />
          </div>

          <div className="menu-link" onClick={() => { setProfileDialogVisible(true); setProfileMenuVisible(false); }}>
            <div className="link-content">
              <FiUser size={18} />
              <span>Profile</span>
            </div>
          </div>

          <div className="menu-link" onClick={() => { setPasswordDialogVisible(true); setProfileMenuVisible(false); }}>
            <div className="link-content">
              <FiLock size={18} />
              <span>Change Password</span>
            </div>
          </div>

          <div className="menu-divider"></div>

          <div className="menu-link logout" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("remember");
            navigate("/login");
          }}>
            <div className="link-content">
              <FiLogOut size={18} />
              <span className="text-red-500">Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderThemeMenu = () => {
    if (!themeMenuVisible) return null;

    const themeOptions = [
      { label: "Light", value: "light" as const, icon: <FiSun size={18} /> },
      { label: "Dark", value: "dark" as const, icon: <FiMoon size={18} /> },
      { label: "System", value: "system" as const, icon: <Monitor size={18} /> },
    ];

    return (
      <div
        className="theme-menu shadow-2xl animate-in fade-in zoom-in duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="menu-links">
          {themeOptions.map((opt) => (
            <div
              key={opt.value}
              className={`menu-link ${theme === opt.value ? "active" : ""}`}
              onClick={() => {
                setTheme(opt.value);
                setThemeMenuVisible(false);
              }}
            >
              <div className="link-content">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const toolbarStart = (
    <div className="flex items-center gap-2 min-w-0">
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
          {customLogo ? (
            <img
              src={customLogo}
              alt="Logo"
              className="w-7 h-7 rounded-sm object-contain"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                background: activeTheme === "light"
                  ? "linear-gradient(to right, #10b981, #059669)"
                  : "linear-gradient(to right, #34d399, #10b981)",
              }}
            >
              E
            </div>
          )}
          <>
            <span className="font-semibold text-sm">Exaltt.ai</span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: activeTheme === "dark" ? "rgba(16, 185, 129, 0.1)" : "var(--light-primary-light)",
                color: activeTheme === "dark" ? "#34d399" : "var(--primary-color)",
              }}
            >
              DEMO
            </span>
          </>
        </div>
      </div>

      {title && <h2 className="m-0 ml-3 text-sm">{title}</h2>}

      {/* <div className="flex-1 justify-center gap-2 hidden lg:flex">
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
      </div> */}
    </div>
  );

  const getThemeIcon = () => {
    if (theme === "system") return <Monitor size={22} color={activeTheme === "dark" ? "#34d399" : "#059669"} />;
    if (theme === "dark") return <FiMoon size={22} color="#34d399" />;
    return <FiSun size={22} color="#f59e0b" />;
  };

  const toolbarEnd = (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        ref={themeBtnRef}
        className="p-button-rounded p-button-text p-button-sm"
        icon={getThemeIcon()}
        onClick={() => setThemeMenuVisible(!themeMenuVisible)}
      />
      {renderThemeMenu()}
      <Button
        className="p-button-rounded p-button-text p-button-sm hidden sm:inline-flex"
        icon={<FiBell size={25} />}
        badge="3"
        badgeClassName="p-badge-danger"
      />
      <Button
        ref={settingsBtnRef}
        className="p-button-rounded p-button-text p-button-sm"
        icon={<FiSettings size={30} />}
        onClick={() => setProfileMenuVisible(!profileMenuVisible)}
      />
      {renderProfileMenu()}
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
          {/* <div className="sidebar-header">
            {((!isMobile && sidebarExpanded) || isMobile) && (
              <h3 className="text-sm m-0">ExaltAI Modules</h3>
            )}
          </div> */}
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
          <div className="page-content">
            <Outlet />
          </div>

          <footer className="page-footer">
            <div className="footer-inner text-xs text-gray-500">
              © {new Date().getFullYear()} ExaltAI · All rights reserved
            </div>
          </footer>
        </main>
      </div>
      <ProfileDialog
        visible={profileDialogVisible}
        onHide={() => setProfileDialogVisible(false)}
      />
      <ChangePasswordDialog
        visible={passwordDialogVisible}
        onHide={() => setPasswordDialogVisible(false)}
      />
    </div>

  );
};

export default BaseLayout;
