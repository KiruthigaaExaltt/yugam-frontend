import QuickActions from "../HOC/quickActions/QuickAction";
import { ProgressBar } from "primereact/progressbar";
import SingleLineCard from "../HOC/singlelineCard/SingleLineCard";
import { FaEye, FaArrowRight, FaChartBar, FaBullseye, FaComments, FaUserPlus, FaBriefcase, FaBox } from "react-icons/fa";
import MeetingCard, { type MeetingItem } from "../HOC/meetingCard/MeetingCard";
import {
  FiCalendar,
  FiDollarSign,
  FiFile,
  FiPhone,
  FiPlus,
  FiUsers,
} from "react-icons/fi";

const payments: MeetingItem[] = [
  {
    title: "Due Today",
    description: "2 payments",
    leftText: "15,400",
    icon: FiDollarSign,
  },
  {
    title: "Pending Approval",
    description: "5 invoices",
    leftText: "24,100",
    icon: FiDollarSign,
  },
  {
    title: "Overdue",
    description: "3 invoices",
    leftText: "8,750",
    icon: FiDollarSign,
  },
];

const recentCalls: MeetingItem[] = [
  {
    title: "TechStart Inc",
    name: "Sarah Wilson",
    description:
      "Discussed brand strategy feedback and timeline adjustments. Client is happy with the initial proposal but wants to expedite the delivery timeline.",
    date: "Dec 19",
    icon: FiUsers,
  },
  {
    title: "RetailCorp",
    name: "Alex Rodriguez",
    description:
      "Quick check-in call about holiday campaign performance. Metrics are exceeding expectations. Client wants to discuss budget increase for January.",
    date: "Dec 18",
    icon: FiUsers,
  },
  {
    title: "StartupXYZ",
    name: "Emma Davis",
    description:
      "Onboarding call for new client. Discussed goals, target audience, and initial campaign strategy. Scheduled follow-up meeting for detailed brief.",
    date: "Dec 17",
    icon: FiUsers,
  },
];
const upcomingMeetings: MeetingItem[] = [
  {
    title: "Client Review – TechStart Brand Strategy",
    time: "10:00",
    company: "TechStart Inc",
    attendees: 3,
    date: "Upcoming",
    icon: FiUsers,
  },
  {
    title: "Weekly Team Standup",
    time: "16:30",
    company: "Internal",
    attendees: 3,
    date: "Upcoming",
    icon: FiUsers,
  },
];

const gridActions = [
  { id: "lead", label: "New Lead", icon: <FaBullseye /> },
  { id: "ticket", label: "Create Ticket", icon: <FaComments /> },
  { id: "employee", label: "Add Employee", icon: <FaUserPlus /> },
  { id: "project", label: "New Project", icon: <FaBriefcase /> },
  { id: "inventory", label: "Check Inventory", icon: <FaBox /> },
  { id: "report", label: "Generate Report", icon: <FaChartBar /> },
];

const ticketStats = [
  {
    id: "tech",
    label: "Present",
    value: "18",
    tone: "blue",
    type: "stat",
  },
  {
    id: "billing",
    label: "Late Arraivals",
    value: "3",
    tone: "green",
    type: "stat",
  },
  {
    id: "account",
    label: "On Break",
    value: "2",
    tone: "orange",
    type: "stat",
  },
  {
    id: "account",
    label: "Absent",
    value: "6",
    tone: "purple",
    type: "stat",
  },
] as const;

const MainContent = () => {
  return (
    <>
      <div className="pt-5">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: 3/4 WIDTH */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <QuickActions
              title="Team Attendance Today"
              actions={ticketStats}
              headerAction={{
                label: "View All",
                icon: <FaEye className="mr-2" />,
                onClick: () => console.log("View All clicked"),
              }}
            >
              <div className="space-y-1 pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: "var(--text-muted)" }}>
                    Attendance Rate
                  </span>
                  <span className="font-semibold">75%</span>
                </div>
                <ProgressBar
                  value={75}
                  showValue={false}
                  pt={{
                    root: { style: { height: "6px", borderRadius: "999px" } },
                    value: {
                      style: {
                        borderRadius: "999px",
                        backgroundColor: "var(--primary-color)",
                      },
                    },
                  }}
                />
              </div>
            </QuickActions>

            <QuickActions
              title="Task Management Overview"
              actions={ticketStats}
              headerAction={{
                label: "Manage Tasks",
                icon: <FaArrowRight className="mr-2" />,
                onClick: () => console.log("Manage Tasks clicked"),
              }}
            >
              <div className="space-y-1 pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: "var(--text-muted)" }}>
                    Daily Completion Rate
                  </span>
                  <span className="font-semibold">35%</span>
                </div>
                <ProgressBar
                  value={35}
                  showValue={false}
                  pt={{
                    root: { style: { height: "6px", borderRadius: "999px" } },
                    value: {
                      style: {
                        borderRadius: "999px",
                        backgroundColor: "var(--primary-color)",
                      },
                    },
                  }}
                />
              </div>
            </QuickActions>
            <SingleLineCard
              title="Client Performance"
              headerAction={{
                label: "View Analytics",
                icon: <FaChartBar className="mr-2" />,
                onClick: () => console.log("View Analytics clicked"),
              }}
              items={[
                { label: "Active Projects", value: "5", valueTone: "primary" },
                {
                  label: "New Clients This Month",
                  value: "3",
                  valueTone: "success",
                },
                {
                  label: "Total Revenue",
                  value: "$324,000",
                  valueTone: "success",
                },
              ]}
              footer={
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span style={{ color: "var(--text-muted)" }}>
                      Client Satisfaction
                    </span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <ProgressBar
                    value={94}
                    showValue={false}
                    pt={{
                      root: { style: { height: "6px", borderRadius: "999px" } },
                      value: {
                        style: {
                          borderRadius: "999px",
                          backgroundColor: "var(--primary-color)",
                        },
                      },
                    }}
                  />
                </div>
              }
            />
            <QuickActions title="Quick Actions" actions={gridActions} layout="grid" />
          </div>

          {/* RIGHT: 1/4 WIDTH */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Upcoming Meetings / Any other card */}
            <MeetingCard
              title="Upcoming Meetings"
              meetings={upcomingMeetings}
              showAdd
              addIcon={FiPlus}
              footerLabel="View Full Calendar"
              footerIcon={FiCalendar}
            />

            <MeetingCard
              title="Recent Calls"
              meetings={recentCalls}
              isRecentCall
              footerLabel="View All Calls"
              footerIcon={FiPhone}
              showAdd
              addIcon={FiPhone}
            />
            <MeetingCard
              title="Payment Schedule"
              meetings={payments}
              footerLabel="Manage Invoices"
              footerIcon={FiFile}
              showAdd
              addIcon={FiDollarSign}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
