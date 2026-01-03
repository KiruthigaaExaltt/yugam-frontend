import { useState } from 'react';
import Header from './Header'
import NavButtons from './NavButtons'
import OrganizationSettings from './OrganizationSettings/OrganizationSettings';
import BrandingSettings from './OrganizationSettings/BrandingSettings';
import UsersRolesSettings from './OrganizationSettings/UsersRolesSettings';

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