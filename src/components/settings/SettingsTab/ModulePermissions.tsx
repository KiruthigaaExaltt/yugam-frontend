import { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";
import { 
  FiLayout, 
  FiUsers, 
  FiCheckSquare, 
  FiFolder, 
  FiShare2, 
  FiMessageSquare, 
  FiCalendar, 
  FiDatabase, 
  FiFileText, 
  FiDollarSign, 
  FiBox, 
  FiSettings 
} from "react-icons/fi";
import MeetingCard, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";

const ROLES = ["Administrator", "Manager", "Staff", "Client"];

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionModule {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  roleVisibility: string[];
  featureFlags?: FeatureFlag[];
}

const INITIAL_MODULES: PermissionModule[] = [
  { 
    id: 1, 
    name: "Dashboards", 
    description: "Analytics and overview dashboards", 
    icon: <FiLayout />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 2, 
    name: "CRM", 
    description: "Customer relationship management", 
    icon: <FiUsers />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 3, 
    name: "Tasks", 
    description: "Task management and tracking", 
    icon: <FiCheckSquare />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 4, 
    name: "Projects", 
    description: "Project management and collaboration", 
    icon: <FiFolder />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 5, 
    name: "Social Media", 
    description: "Social media management", 
    icon: <FiShare2 />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"],
    featureFlags: [
      {
        id: "create_post_fullpage",
        name: "Create Post Fullpage",
        description: "Enable full-page post creation experience",
        enabled: true
      }
    ]
  },
  { 
    id: 6, 
    name: "Messages", 
    description: "Team and client messaging", 
    icon: <FiMessageSquare />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 7, 
    name: "Meetings & Calls", 
    description: "Meeting management and calls", 
    icon: <FiCalendar />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 8, 
    name: "Data Storage", 
    description: "File storage and collateral hub", 
    icon: <FiDatabase />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 9, 
    name: "Reports", 
    description: "Analytics and reporting", 
    icon: <FiFileText />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 10, 
    name: "Accounts", 
    description: "Financial management", 
    icon: <FiDollarSign />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 11, 
    name: "Inventory", 
    description: "Asset and resource management", 
    icon: <FiBox />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
  { 
    id: 12, 
    name: "Settings", 
    description: "System configuration", 
    icon: <FiSettings />, 
    enabled: true, 
    roleVisibility: ["Administrator", "Manager", "Staff", "Client"] 
  },
];

const ModulePermissions: React.FC = () => {
  const [modules, setModules] = useState<PermissionModule[]>(INITIAL_MODULES);

  const toggleModule = (id: number) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ));
  };

  const toggleRole = (moduleId: number, role: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        const hasRole = m.roleVisibility.includes(role);
        return {
          ...m,
          roleVisibility: hasRole 
            ? m.roleVisibility.filter(r => r !== role)
            : [...m.roleVisibility, role]
        };
      }
      return m;
    }));
  };

  const toggleFeatureFlag = (moduleId: number, flagId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId && m.featureFlags) {
        return {
          ...m,
          featureFlags: m.featureFlags.map(f => 
            f.id === flagId ? { ...f, enabled: !f.enabled } : f
          )
        };
      }
      return m;
    }));
  };

  const meetings: MeetingItem[] = modules.map(module => ({
      title: module.name,
      description: module.description,
      
      // Render the main icon with the specific styling
      mainIcon: (
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg mix-blend-multiply"
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
      onToggleChange: () => toggleModule(module.id),

      // Pass the complex children (Roles + Flags)
      children: (
          <div className="mt-2">
            {/* Role Visibility */}
            <div className="mb-2">
                <h5 className="text-xs font-semibold text-(--text-color) mb-2">Role Visibility</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ROLES.map((role) => (
                    <div key={role} className="flex items-center gap-2">
                    <Checkbox 
                        inputId={`${module.id}-${role}`}
                        checked={module.roleVisibility.includes(role)} 
                        onChange={() => toggleRole(module.id, role)}
                        className="scale-90"
                    />
                    <label 
                        htmlFor={`${module.id}-${role}`} 
                        className="text-sm cursor-pointer text-(--text-color)"
                    >
                        {role}
                    </label>
                    </div>
                ))}
                </div>
            </div>

            {/* Feature Flags */}
            {module.featureFlags && module.featureFlags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-(--surface-border)">
                <h5 className="text-xs font-semibold text-(--text-color) mb-2">Feature Flags</h5>
                <div className="space-y-3">
                    {module.featureFlags.map((flag) => (
                        <div key={flag.id} className="flex justify-between items-center">
                            <div>
                                <div className="text-sm font-medium text-(--text-color)">{flag.name}</div>
                                <div className="text-xs text-(--text-muted)">{flag.description}</div>
                            </div>
                            <InputSwitch 
                                checked={flag.enabled}
                                onChange={() => toggleFeatureFlag(module.id, flag.id)}
                                className="scale-75"
                            />
                        </div>
                    ))}
                </div>
                </div>
            )}
          </div>
      )
  }));

  return (
    <MeetingCard meetings={meetings} />
  );
};

export default ModulePermissions;
