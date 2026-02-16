import NavBarNew, { type NavItem } from "../HOC/navbarNew/NavBarNew";
import Buttons, { type ButtonAction } from "../HOC/buttons/Buttons";
import { FaCheckCircle, FaClock, FaTicketAlt } from "react-icons/fa";
import StatsCard from "../HOC/dashboard/StatsCard";
import ReusableProgressListCard, { type StatItem } from "../HOC/progressbar/ReusableProgressListCard";
import QuickActions from "../HOC/quickActions/QuickAction";
import NewQuote from "./NewQuote";
import QuoteLibrary from "./QuoteLibrary";
import RFQImport from "./RFQImport";
import Header from "./estimoSettings/Header";
import Reports from "./Reports";


type NavBarProps = {
  activeTab?: string;
  onTabClick?: (value: string) => void;
};

const navItems: NavItem[] = [
  { label: "Dashboard", value: "dashboard" },
  { label: "New Quote", value: "new-quote" },
  { label: "Quote Library", value: "quote-library" },
  { label: "RFQ Import", value: "rfq-import" },
  { label: "Reports", value: "reports" },
  { label: "Settings", value: "settings" },
];

const dashboardButtons: ButtonAction[] = [
  {
    label: "Create New Quote",
    icon: <i className="pi pi-plus" />,
    variant: "primary",
    onClick: () => { }
  },
  {
    label: "Import RFQ",
    icon: <i className="pi pi-upload" />, // Using upload as approximation for import
    variant: "primary", // Using primary as it seems to handle the 'filled' style based on typical patterns, though color might vary by CSS
    onClick: () => { }
  },
  {
    label: "Export Templates",
    icon: <i className="pi pi-download" />,
    variant: "secondary",
    onClick: () => { }
  },
  {
    label: "View Reports",
    icon: <i className="pi pi-chart-bar" />,
    variant: "secondary",
    onClick: () => { }
  }
];

const winLossData: StatItem[] = [
  { label: "Win Rate", percent: 68, barColor: "#1E5BB8" },
];

const combinedData: StatItem[] = [
  { label: "This Month", percent: 18.2 },
  { label: "Last Month", percent: 15.8 },
  { label: "Quarter Avg", percent: 16.5 },
];

export default function NavBar({ activeTab = "dashboard", onTabClick }: NavBarProps) {
  return (
    <div className="mt-10">
      <NavBarNew
        items={navItems}
        active={activeTab}
        onChange={onTabClick ?? (() => { })}
      />

      {activeTab === 'dashboard' && (
        <div className="mt-6">
          <Buttons actions={dashboardButtons} />

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            <StatsCard
              title="Draft"
              value="0"
              icon={<FaTicketAlt className="text-blue-600" />}
              forceBlackText
              trendLabel="Pending completion "
              trendPositive={true}
              iconPosition="right"
            />

            <StatsCard
              title="Sent"
              value="1"
              icon={<FaClock className="text-orange-600" />}
              forceBlackText
              trendLabel="Awaiting response"
              trendPositive={false}
              iconPosition="right"
            />

            <StatsCard
              title="Approved"
              value="0"
              icon={<FaCheckCircle className="text-green-600" />}
              trendLabel="Ready to execute"
              trendPositive
              iconPosition="right"
              forceBlackText
            />
            <StatsCard
              title="Won"
              value="1"
              icon={<FaCheckCircle className="text-green-600" />}
              forceBlackText
              trendLabel="Successful quotes"
              trendPositive
              iconPosition="right"
            />
            <StatsCard
              title="Lost"
              value="1"
              icon={<FaCheckCircle className="text-green-600" />}
              forceBlackText
              trendLabel="Unsuccessful quotes"
              trendPositive
              iconPosition="right"
            />

          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 mt-6">
            <ReusableProgressListCard
              title="Win/Loss Ratio"
              items={winLossData}
              footerStats={{
                leftLabel: "Won Quotes",
                leftValue: 1,
                rightLabel: "Lost Quotes",
                rightValue: 0,
              }}
            />
            <ReusableProgressListCard
              title="Combined Stats"
              items={combinedData}
              averageText="Average Margin"
              averagePercent={16.5}
            />
          </div>

          <div className="mt-6">
            <QuickActions
              title="Industry-wise Quote Volume"
              variant="default"
              columns={5}
              actions={[
                {
                  id: "civil",
                  label: "Quotes",
                  type: "stat",
                  tone: "green",
                  value: "1",
                  subLabel: "₹24.5L",
                  icon: <span className="text-sm font-medium text-gray-600 not-italic">Civil</span>
                },
                {
                  id: "peb",
                  type: "stat",
                  tone: "green",
                  value: "1",
                  label: "Quotes",
                  subLabel: "₹18.5L",
                  icon: <span className="text-sm font-medium text-gray-600 not-italic">PEB</span>
                },
                {
                  id: "automation",
                  type: "stat",
                  tone: "green",
                  value: "0",
                  label: "Quotes",
                  subLabel: "₹0.0L",
                  icon: <span className="text-sm font-medium text-gray-600 not-italic">Automation</span>
                },
                {
                  id: "foundry",
                  type: "stat",
                  tone: "green",
                  value: "0",
                  label: "Quotes",
                  subLabel: "₹0.0L",
                  icon: <span className="text-sm font-medium text-gray-600 not-italic">Foundry</span>
                },
                {
                  id: "textile",
                  type: "stat",
                  tone: "green",
                  value: "0",
                  label: "Quotes",
                  subLabel: "₹0.0L",
                  icon: <span className="text-sm font-medium text-gray-600 not-italic">Textile</span>
                }
              ]}
            />
          </div>
        </div>
      )}

      {activeTab === 'new-quote' && (
        <NewQuote />
      )}
      {activeTab === 'quote-library' && (
        <QuoteLibrary />
      )}
      {activeTab === 'rfq-import' && (
        <RFQImport />
      )}
      {activeTab === 'reports' && (
        <Reports />
      )}
      {activeTab === 'settings' && (
        <Header />
      )}
    </div>
  );
}
