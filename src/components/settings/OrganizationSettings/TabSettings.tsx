import BrandingSettings from "./BrandingSettings";
import OrganizationSettings from "./OrganizationSettings"


const TabSettings = () => {
  return (
    <div style={{ paddingTop: "2rem" }}> {/* adjust as needed */}
      <OrganizationSettings />
      <BrandingSettings />
    </div>
  );
}

export default TabSettings
