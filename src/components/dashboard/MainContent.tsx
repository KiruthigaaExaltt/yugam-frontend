import QuickActions from "../HOC/quickActions/QuickAction";
import { ProgressBar } from "primereact/progressbar";
import SingleLineCard from "../HOC/singlelineCard/SingleLineCard";

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
            <QuickActions title="Team Attendance Today" actions={ticketStats}>
              <div className="space-y-1">
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
            >
              <div className="space-y-1">
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
          </div>

          {/* RIGHT: 1/4 WIDTH */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Upcoming Meetings / Any other card */}
             <SingleLineCard
              title="Client Performance"
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
