import NotificationDefaults from "./NotificationDefaults";
import NotificationSettings from "./NotificationSettings";

const NotificationSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top: Notification Channels */}
      <NotificationSettings />

      {/* Bottom: Role-based Defaults */}
      <NotificationDefaults />
    </div>
  );
};

export default NotificationSettingsPage;
