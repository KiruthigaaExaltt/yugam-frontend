import { useState } from "react";
import MeetingCard, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";
import { FiBell, FiMail, FiSmartphone } from "react-icons/fi";

interface PermissionModule {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const INITIAL_MODULES: PermissionModule[] = [
  {
    id: 1,
    name: "Email Notifications",
    description: "Receive notifications via email",
    icon: <FiMail />,
    enabled: true
  },
  {
    id: 2,
    name: "Push Notifications",
    description: "Browser push notifications",
    icon: <FiBell />,
    enabled: false
  },
  {
    id: 3,
    name: "In-App Notifications",
    description: "Notifications within the application",
    icon: <FiSmartphone />,
    enabled: false
  }
];

const NotificationSettings: React.FC = () => {
  const [modules, setModules] = useState<PermissionModule[]>(INITIAL_MODULES);

  const toggleModule = (id: number) => {
    setModules(prev =>
      prev.map(module =>
        module.id === id
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
  };

  const meetings: MeetingItem[] = modules.map(module => ({
    title: module.name,
    description: module.description,

    mainIcon: (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{
          backgroundColor: "var(--icon-bg-primary)",
          color: "var(--icon-color-primary)"
        }}
      >
        {module.icon}
      </div>
    ),

    showToggle: true,
    toggleValue: module.enabled,
    onToggleChange: () => toggleModule(module.id)
  }));

  return <MeetingCard meetings={meetings} />;
};

export default NotificationSettings;
