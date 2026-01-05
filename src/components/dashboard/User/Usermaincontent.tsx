import { useState } from "react";
import MeetingCard, {
  type MeetingItem,
} from "../../HOC/meetingCard/MeetingCard";
import { Card } from "primereact/card";

import { FiUsers } from "react-icons/fi";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import MiniProfileNotificationCard from "../../HOC/miniProfileNotificationCard/MiniProfileNotificationCard";

const initialTasks: MeetingItem[] = [
  {
    title: "Review client presentation materials",
    isTask: true,
    isChecked: false,
    tags: [{ label: "High priority", color: "red" }],
    dueDate: "Today 3:00 PM",
  },
  {
    title: "Update social media calendar",
    isTask: true,
    isChecked: false,
    tags: [{ label: "Medium", color: "yellow" }],
    dueDate: "Tomorrow",
  },
  {
    title: "Design mockups for Q2 campaign",
    isTask: true,
    isChecked: false,
    tags: [{ label: "Low priority", color: "green" }],
    dueDate: "Friday",
  },
];
const projectProgress = [
  {
    title: "TechStart Brand Refresh",
    phase: "Design Phase",
    value: 67,
  },
  {
    title: "E-commerce Platform",
    phase: "Development Phase",
    value: 45,
  },
  {
    title: "Marketing Campaign",
    phase: "Planning Phase",
    value: 12,
  },
];
const recentCalls: MeetingItem[] = [
  {
    title: "Client Review Meeting",
    description: "4 attendees",
    name: "TechStart Inc - Conference Room A",

    icon: FiUsers,
  },
  {
    title: "Design Sprint Planning",
    name: "Team Meeting - Virtual",
    description: "Zoom Meeting",
  },
  {
    title: "Weekly Standup",

    description: "All Teams - Main Office",

    icon: FiUsers,
  },
];
const applications = [
  {
    initials: "SC",
    name: "Mike Chen",
    role: "Lead Developer",
    showAvatar: true,
    showName: true,
    showRole: true,
    showInitials: true,
  },
  {
    initials: "SC",
    name: "Emily Davis",
    role: "Project Manager",
    showAvatar: true,
    showName: true,
    showRole: true,
    showInitials: true,
  },
];
const getCardVisuals = (item: any) => {
  if (item.showAvatar) {
    return {
      avatar: true,
      logo: undefined,
      initials: item.showInitials ? item.initials : undefined,
    };
  }

  if (item.showLogo) {
    return {
      avatar: true,
      logo: item.logo,
      initials: undefined,
    };
  }

  return {
    avatar: false,
    logo: undefined,
    initials: undefined,
  };
};

const Usermaincontent = () => {
  const [tasks, setTasks] = useState<MeetingItem[]>(initialTasks);

  const toggleTask = (index: number, checked: boolean) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], isChecked: checked };
    setTasks(newTasks);
  };

  const meetingItems = tasks.map((task, index) => ({
    ...task,
    onCheck: (checked: boolean) => toggleTask(index, checked),
  }));

  return (
    <div className="pt-5">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card
            title="My Tasks"
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <MeetingCard
              meetings={meetingItems}
              showAdd
              addButtonLabel="Add Task"
              footerLabel="View All Tasks"
            />
          </Card>
          <Card
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base">My Project Progress</h3>
              <Button
                label="View Projects"
                icon="pi pi-briefcase"
                outlined
                size="small"
              />
            </div>

            {/* Progress Items */}
            <div className="space-y-5">
              {projectProgress.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.phase}</p>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </div>

                  <ProgressBar
                    value={item.value}
                    showValue={false}
                    pt={{
                      root: {
                        style: {
                          height: "6px",
                          borderRadius: "999px",
                        },
                      },
                      value: {
                        style: {
                          borderRadius: "999px",
                          backgroundColor: "var(--primary-color)",
                        },
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MeetingCard
            title="Recent Calls"
            meetings={recentCalls}
            isRecentCall
          />
          <SingleLineCard
            title="Time Tracking"
            items={[
              {
                label: "Punch In:",
                value: "9:00 AM",
              },
              {
                label: "Break Time:",
                value: "30min",
              },
              {
                label: "Expected End",
                value: "6:00 PM",
              },
            ]}
            action={{
              label: "Take Break",
              onClick: () => console.log("Open report"),
            }}
          />
          <Card
            title="Quick Contacts"
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <div>
              {applications.map((item, index) => {
                const { avatar, logo, initials } = getCardVisuals(item);

                return (
                  <MiniProfileNotificationCard
                    key={index}
                    avatar={avatar}
                    logo={logo}
                    initials={initials}
                    name={item.showName ? item.name : ""}
                    role={item.showRole ? item.role : ""}
                    // statusColor={item.statusColor}
                    avatarWidth="3.5rem"
                    avatarHeight="3.5rem"
                    showEye={false}
                    showDelete={false}
                    avatarPosition="left"
                    backgroundColor="#ebfdf5"
                    showMail
                    showPhone
                    onMailClick={() => console.log("Mail clicked")}
                    onPhoneClick={() => console.log("Phone clicked")}
                  />
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Usermaincontent;
