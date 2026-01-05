import { useState } from "react";
import MeetingCard, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";
import {
  FiShield,
  FiTrash2,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";

interface PrivacyModule {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const INITIAL_PRIVACY_MODULES: PrivacyModule[] = [
  {
    id: 1,
    name: "Data Processing Consent",
    description: "Require explicit consent for data processing",
    icon: <FiShield />,
    enabled: true,
  },
  {
    id: 2,
    name: "Right to be Forgotten",
    description: "Allow users to request data deletion",
    icon: <FiTrash2 />,
    enabled: true,
  },
  {
    id: 3,
    name: "Data Portability",
    description: "Allow users to export their data",
    icon: <FiDownload />,
    enabled: true,
  },
  {
    id: 4,
    name: "Analytics Tracking",
    description: "Track user behavior for analytics",
    icon: <FiBarChart2 />,
    enabled: false,
  },
];

const DataPrivacySettings: React.FC = () => {
  const [modules, setModules] =
    useState<PrivacyModule[]>(INITIAL_PRIVACY_MODULES);

  const toggleModule = (id: number) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
  };

  const meetings: MeetingItem[] = modules.map((module) => ({
    title: module.name,
    description: module.description,

    mainIcon: (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{
          backgroundColor: "var(--icon-bg-primary)",
          color: "var(--icon-color-primary)",
        }}
      >
        {module.icon}
      </div>
    ),

    showToggle: true,
    toggleValue: module.enabled,
    onToggleChange: () => toggleModule(module.id),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {meetings.map((meeting, index) => (
        <MeetingCard key={index} meetings={[meeting]} />
      ))}
    </div>
  );
};

export default DataPrivacySettings;
