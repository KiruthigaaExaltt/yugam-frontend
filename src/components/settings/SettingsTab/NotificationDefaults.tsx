import { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";

const EVENTS = [
  "Task assignments",
  "Project updates",
  "Client messages",
  "System alerts",
] as const;

type RoleKey = "Admin" | "Manager" | "Staff" | "Client";

const NotificationDefaults: React.FC = () => {
  const [state, setState] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const buildItems = (role: RoleKey) =>
    EVENTS.map((event) => {
      const key = `${role}-${event}`;
      return {
        label: event,         // ✅ match SingleLineCard type
        value: (
          <InputSwitch
            checked={!!state[key]}
            onChange={() => toggle(key)}
            pt={{
              slider: {
                style: {
                  backgroundColor: !!state[key] ? 'var(--primary-color)' : '',
                  border: !!state[key] ? '1px solid var(--primary-color)' : ''
                }
              }
            }}
          />
        ),
      };
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SingleLineCard title="Admin Defaults" items={buildItems("Admin")} />
      <SingleLineCard title="Manager Defaults" items={buildItems("Manager")} />
      <SingleLineCard title="Staff Defaults" items={buildItems("Staff")} />
      <SingleLineCard title="Client Defaults" items={buildItems("Client")} />
    </div>
  );
};

export default NotificationDefaults;
