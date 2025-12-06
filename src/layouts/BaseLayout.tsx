import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { useTheme } from '../context/ThemeContext';

import './BaseLayout.css';
import NavigationMenu from '../components/sideBar/NavigationMenu';

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
}

export const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const menuRef = useRef<TieredMenu>(null);
  const { theme, toggleTheme } = useTheme();

  const profileMenuItems = [
    { label: 'Profile', icon: 'pi pi-user', command: () => console.log('Profile clicked') },
    { label: 'Settings', icon: 'pi pi-cog', command: () => console.log('Settings clicked') },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => console.log('Logout clicked') },
  ];

  // LEFT SIDE TOOLBAR
  const toolbarStart = (
    <div className="flex items-center gap-2">
      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-button-text"
        onClick={() => setSidebarVisible(!sidebarVisible)}
        aria-label="Toggle Sidebar"
      />
      {title && <h2 className="m-0 ml-3">{title}</h2>}
    </div>
  );

  // RIGHT SIDE TOOLBAR
  const toolbarEnd = (
    <div className="flex items-center gap-3">
      <Button
        icon={theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
        className="p-button-rounded p-button-text"
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
      />

      <Button
        icon="pi pi-bell"
        className="p-button-rounded p-button-text p-button-danger p-badge"
        badge="3"
        badgeClassName="p-badge-danger"
      />

      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.jpg"
        shape="circle"
        className="cursor-pointer"
        onClick={(e) => menuRef.current?.toggle(e)}
      />

      <TieredMenu
        ref={menuRef}
        model={profileMenuItems}
        popup
        className="profile-menu"
      />
    </div>
  );

  return (
    <div className={`base-layout ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      
      {/* HEADER */}
      <header className="top-header">
        <Toolbar start={toolbarStart} end={toolbarEnd} className="header-toolbar" />
      </header>

      {/* LAYOUT ROW */}
      <div className="content-row flex">
        
        {/* SIDEBAR */}
        {sidebarVisible && (
          <aside className="sidebar-wrapper">
            <div className="sidebar-header flex items-center">
              <h3 className="m-0">ExaltAI</h3>
            </div>
            <NavigationMenu />
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className="main-container flex flex-col flex-1">
          <div className="page-content flex-1">{children}</div>

          {/* FOOTER */}
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
