import { useState } from "react";
import MeetingCard, {
  type MeetingItem,
} from "../../HOC/meetingCard/MeetingCard";
import { Card } from "primereact/card";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import MiniProfileNotificationCard from "../../HOC/miniProfileNotificationCard/MiniProfileNotificationCard";
import { FiCalendar } from "react-icons/fi";

import { MdOutlineWatchLater } from "react-icons/md";

const initialTasks: MeetingItem[] = [
  {
    title: "Review client presentation materials",
    isTask: true,
    isChecked: false,
    priority: "high",
    role: "Due: Today 3:00 PM",
  },
  {
    title: "Update social media calendar",
    isTask: true,
    isChecked: false,
    priority: "medium",
    role: "Due: Tomorrow",
  },
  {
    title: "Design mockups for Q2 campaign",
    isTask: true,
    isChecked: false,
    priority: "low",
    role: "Due: Friday",
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
    name: "TechStart Inc - Conference Room A",
    attendees: 4,
    time: "10:00 AM",
    statusColor: "#3b82f6", // Blue
  },
  {
    title: "Design Sprint Planning",
    name: "Team Meeting - Virtual",
    description: "Zoom Meeting",
    time: "02:00 PM",
    statusColor: "#a855f7", // Purple
  },
  {
    title: "Weekly Standup",
    name: "All Teams - Main Office",
    time: "04:30 PM",
    statusColor: "#10b981", // Green
  },
];
const applications = [
  {
    initials: "MC",
    name: "Mike Chen",
    role: "Lead Developer",
    showAvatar: true,
    showName: true,
    showRole: true,
    showInitials: true,
    avatarBg: "#10b981", // Emerald
  },
  {
    initials: "ED",
    name: "Emily Davis",
    role: "Project Manager",
    showAvatar: true,
    showName: true,
    showRole: true,
    showInitials: true,
    avatarBg: "#06b6d4", // Cyan
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
          <MeetingCard
            meetings={meetingItems}
            showAdd
            addButtonLabel="Add Task"
            footerLabel="View All Tasks"
            title="My Tasks"
          />
          <Card
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontSize: "var(--card-title-size)",
                  fontWeight: "var(--card-title-weight)",
                }}
              >
                My Project Progress
              </h3>
              <Button
                label="View Projects"
                icon="pi pi-briefcase"
                className="p-button-text demo-button"
                // className="p-button-outlined p-button-sm !rounded-full !px-3 font-medium hover:!bg-emerald-50 hover:!text-emerald-600 hover:!border-emerald-200 transition-all"
                pt={{
                  root: {
                    style: {
                      color: "var(--text-color)",
                      borderColor: "var(--surface-border)",
                      background: "white",
                    },
                  },
                }}
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
                          background: "var(--progress-bg)",
                        },
                      },
                      value: {
                        style: {
                          borderRadius: "999px",
                          backgroundColor: "var(--progress-fill)",
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
            title="Today's Schedule"
            meetings={recentCalls}
            headerAction={{
              label: "",
              onClick: () => console.log("Calendar clicked"),
              icon: FiCalendar,
            }}
            isRecentCall
          />
          <SingleLineCard
            title="Time Tracking"
            bigValue="6.5h"
            bigValueLabel="Today's Work Hours"
            statusBadge={{ label: "active" }}
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
              onClick: () => console.log("Take break clicked"),
              icon: <MdOutlineWatchLater size={16} />,
            }}
            extraButtons={[
              {
                label: "View Timesheet",
                onClick: () => console.log("View timesheet clicked"),
              },
            ]}
          />
          <Card
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontSize: "var(--card-title-size)",
                fontWeight: "var(--card-title-weight)",
              }}
            >
              Quick Contacts
            </h3>
            <div className="space-y-4">
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
                    avatarBgColor={item.avatarBg}
                    avatarWidth="2.5rem"
                    avatarHeight="2.5rem"
                    showEye={false}
                    showDelete={false}
                    avatarPosition="left"
                    isCompact
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
