import SecurityIPAddress from "./SecurityIPAddress";
import SecuritySection from "./SecuritySection";
import SecuritySpace from "./SecuritySpace";

const NotificationSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
     <SecuritySpace />
     <SecuritySection />
     <SecurityIPAddress />
    </div>
  );
};

export default NotificationSettingsPage;
