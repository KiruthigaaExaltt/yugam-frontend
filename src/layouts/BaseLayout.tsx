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

  // Profile menu items
  const profileMenuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => console.log('Profile clicked'),
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => console.log('Settings clicked'),
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => console.log('Logout clicked'),
    },
  ];

  const toolbarStart = (
    <div className="flex align-items-center gap-2">
      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-button-text"
        onClick={() => setSidebarVisible(!sidebarVisible)}
        aria-label="Toggle Sidebar"
      />
      {title && <h2 className="m-0 ml-3">{title}</h2>}
    </div>
  );

  const toolbarEnd = (
    <div className="flex align-items-center gap-3">
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
        aria-label="Notifications"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.jpg"
        shape="circle"
        style={{ cursor: 'pointer' }}
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
      {/* Top Header (full width) */}
      <header className="top-header">
        <Toolbar
          start={toolbarStart}
          end={toolbarEnd}
          className="header-toolbar"
        />
      </header>

      {/* Content row: sidebar + main */}
      <div className="content-row">
        {/* Sidebar Navigation */}
        {sidebarVisible && (
          <aside className="sidebar-wrapper">
            <div className="sidebar-header">
              <h3 className="m-0">ExaltAI</h3>
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text close-btn"
                onClick={() => setSidebarVisible(false)}
                aria-label="Close Sidebar"
                severity="danger"
              />
            </div>
            <NavigationMenu />
          </aside>
        )}

        {/* Main Content Area */}
        <main className="main-container">
          <div className="page-content">
            {children}
          </div>

          {/* Footer inside main content */}
          <footer className="page-footer">
            <div className="footer-inner">© {new Date().getFullYear()} ExaltAI · All rights reserved</div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
