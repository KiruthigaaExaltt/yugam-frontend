import { useState } from 'react';
import Header from './Header'
import NavButtons from './NavButtons'
import OrganizationSettings from './SettingsTab/OrganizationSettings';
import BrandingSettings from './SettingsTab/BrandingSettings';
import UsersRolesSettings from './SettingsTab/UsersRolesSettings';
import PermissionsSettings from './SettingsTab/PermissionsSettings';
import ModulePermissions from './SettingsTab/ModulePermissions';
import IntegrationsSettings from './SettingsTab/IntegrationsSettings';
import NotificationSettingsPage from './SettingsTab/NotificationSettingsPage';
import BillingPage from './SettingsTab/BillingPage';

const IndexSettings = () => {
  const [activeTab, setActiveTab] = useState<string>("General");
  return (
    <>
    <Header />
    <NavButtons activeTab={activeTab} onTabClick={setActiveTab} />
    <div className="pt-6">
        {activeTab === "General" && <OrganizationSettings />}
        {activeTab === "Branding" && <BrandingSettings />}
        {activeTab === "Users & Roles" && <UsersRolesSettings />}
        {activeTab === "Permissions" && <PermissionsSettings />}
        {activeTab === "Modules" && <ModulePermissions/>}
        {activeTab === "Integrations" && <IntegrationsSettings/>}
        {activeTab === "Notifications" && <NotificationSettingsPage/>}
        {activeTab === "Billing" && <BillingPage/>}
      </div>
    </>
  )
}

export default IndexSettings