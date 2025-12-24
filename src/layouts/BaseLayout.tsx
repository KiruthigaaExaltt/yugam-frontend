import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import { TieredMenu } from "primereact/tieredmenu";
import { useTheme } from "../context/ThemeContext";

import "./BaseLayout.css";
import NavigationMenu from "../components/sideBar/NavigationMenu";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
}

export const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const menuRef = useRef<TieredMenu>(null);
  const { theme, toggleTheme } = useTheme();

const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);



  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";
  }, [mobileSidebarOpen]);

  const profileMenuItems = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

  const toolbarStart = (
    <div className="flex items-center gap-2">
      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-button-text"
        onClick={() => {
          if (isMobile) {
            setMobileSidebarOpen(true);
          } else {
            setSidebarExpanded((v) => !v);
          }
        }}
      />
      {title && <h2 className="m-0 ml-3">{title}</h2>}
    </div>
  );

  const toolbarEnd = (
    <div className="flex items-center gap-3">
      <Button
        icon={theme === "dark" ? "pi pi-sun" : "pi pi-moon"}
        className="p-button-rounded p-button-text"
        onClick={toggleTheme}
      />

      <Button
        icon="pi pi-bell"
        className="p-button-rounded p-button-text p-button-danger p-badge"
        badge="3"
      />

      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.jpg"
        shape="circle"
        className="cursor-pointer"
        onClick={(e) => menuRef.current?.toggle(e)}
      />

      <TieredMenu ref={menuRef} model={profileMenuItems} popup />
    </div>
  );

  return (
    <div className="base-layout">
      {/* HEADER */}
      <header className="top-header">
        <Toolbar start={toolbarStart} end={toolbarEnd} />
      </header>

      {/* BODY */}
      <div className="content-row">
        {/* SIDEBAR */}
        <aside
          className={`sidebar-wrapper
            ${mobileSidebarOpen ? "mobile-open" : ""}
            ${!isMobile && sidebarExpanded ? "expanded" : ""}
            ${!isMobile && !sidebarExpanded ? "collapsed" : ""}
          `}
        >
          <div className="sidebar-header">
            {isMobile && (
              <button
                className="sidebar-close"
                onClick={() => setMobileSidebarOpen(false)}
              >
                ✕
              </button>
            )}

            {(!isMobile && sidebarExpanded) || isMobile ? (
              <h3>ExaltAI modules</h3>
            ) : null}
          </div>

          <div className="sidebar-content">
            <NavigationMenu collapsed={!sidebarExpanded && !isMobile} />
          </div>
        </aside>

        {/* MAIN */}
        <main className="main-container">
          <div className="page-content">{children}</div>

          <footer className="page-footer">
            <div className="footer-inner">
              © {new Date().getFullYear()} ExaltAI · All rights reserved
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
