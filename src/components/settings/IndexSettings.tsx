import { useState } from 'react';
import Header from './Header'
import NavButtons from './NavButtons'
import OrganizationSettings from './SettingsTab/OrganizationSettings';
import BrandingSettings from './SettingsTab/BrandingSettings';
import UsersRolesSettings from './SettingsTab/UsersRolesSettings';

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
        {activeTab === "Permissions" && <div>Permissions Component</div>}
        
      </div>
    </>
  )
}

export default IndexSettings