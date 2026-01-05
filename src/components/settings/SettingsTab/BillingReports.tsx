// import KpiCard from "../components/KpiCard";
import {
  FaDollarSign,
  FaUserAlt,
  FaServer,
  FaUserPlus,
} from "react-icons/fa";
import StatsCard from "../../HOC/dashboard/StatsCard";
import { ProgressBar } from "primereact/progressbar";
import MeetingCard, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";


const HeaderCards = () => {
  const usedSeats = 18;
  const totalSeats = 25;
  const seatPercent = Math.round((usedSeats / totalSeats) * 100);

  const recentInvoices: MeetingItem[] = [
    {
      title: "2024-12-01",
      // description: "Monthly subscription",
      leftText: "99.00",
      // date: "Dec 1",
      rightContent: <span className="text-xs px-2 py-1 rounded-full bg-(--primary-color-light) text-(--primary-color)">Paid</span>,
    },
    {
      title: "2024-11-01",
      // description: "Monthly subscription",
      leftText: "99.00",
      // date: "Nov 1",
      rightContent: <span className="text-xs px-2 py-1 rounded-full bg-(--primary-color-light) text-(--primary-color)">Paid</span>,
    },
    {
      title: "2024-10-01",
      // description: "Monthly subscription",
      leftText: "99.00",
      // date: "Oct 1",
      rightContent: <span className="text-xs px-2 py-1 rounded-full bg-(--primary-color-light) text-(--primary-color)">Paid</span>,
    },
  ];

  return (
    <div className="space-y-10 mt-3">   
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3  gap-4">
          <StatsCard
            title="Total Invoices"
            value="₹2.47Cr"
            icon={<FaDollarSign className="text-blue-600" />}
            trendLabel="+12.5% from last month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <StatsCard
            title="Pending Invoices"
            value="23"
            icon={<FaUserAlt className="text-orange-600" />}
            trendLabel="₹45.2L outstanding"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <StatsCard
            title="Overdue"
            value="₹7"
            icon={<FaServer className="text-(--primary-color)" />}
            trendLabel="₹12.8L overdue"
            iconPosition="right"
            bgClass="bg-[color:var(--primary-color-light)] hover:bg-[color:var(--primary-color-light)] transition"
          />
         
        </div>
      </div>

    {/* ===== Additional section: Seat Management & Recent Invoices ===== */}
    <div className="mt-6">
      <div
        className="rounded-(--border-radius) border shadow-sm p-4"
        style={{
          borderColor: "var(--surface-border)",
          backgroundColor: "var(--surface-card)",
          borderRadius: "var(--border-radius)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seat Management */}
          <div>
            <h3 className="text-sm font-semibold">Seat Management</h3>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <div className="w-full pr-4">
                  <div className="text-xs text-(--text-muted)">Used Seats</div>
                  <div className="mt-2">
                    <ProgressBar value={seatPercent} showValue={false} pt={{
                      root: { style: { height: "6px", borderRadius: "999px" } },
                      value: {
                        style: {
                          borderRadius: "999px",
                          backgroundColor: "var(--primary-color)",
                        },
                      },
                    }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-medium">{usedSeats} / {totalSeats}</div>
                    <div className="text-sm text-(--text-muted)">{seatPercent}%</div>
                  </div>
                </div>
              </div>

              <button
                className="mt-4 py-2 px-3 inline-flex items-center gap-2 rounded-md"
                style={{
                  background: "white",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <FaUserPlus size={14} />
                Add Seats
              </button>
            </div>
          </div>

          {/* Recent Invoices */}
          <div>
            <MeetingCard
              title="Recent Invoices"
              meetings={recentInvoices}
              footerLabel="View All Invoices"
            />
          </div>
        </div>
      </div>
    </div>

  </div>

  );
};

export default HeaderCards;
