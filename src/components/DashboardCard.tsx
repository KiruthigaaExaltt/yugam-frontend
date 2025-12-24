// import KpiCard from "../components/KpiCard";
import {
  FaRupeeSign,
  FaUsers,
  FaChartLine,
  FaHeartbeat,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaShieldAlt,
  FaDollarSign,
  FaArrowsAlt,
} from "react-icons/fa";
import KpiCard from "./dashboardCard/StatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      {/* ===== Business Overview ===== */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Business Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Monthly Revenue"
            value="₹7.2L"
            icon={<FaRupeeSign className="text-teal-600" />}
            badgeText="+12.5% from last month"
            badgeColor="bg-teal-50 text-teal-600"
            accentColor="before:bg-teal-500"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Active Customers"
            value="542"
            icon={<FaUsers className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            badgeText="+8.3% growth rate"
            badgeColor="bg-blue-50 text-blue-600"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Conversion Rate"
            value="31.5%"
            icon={<FaChartLine className="text-sky-600" />}
            accentColor="before:bg-sky-500"
            badgeText="+2.8% improvement"
            badgeColor="bg-sky-50 text-sky-600"
            iconPosition="left"
            targetText="Target: 103%"
          />

          <KpiCard
            title="Active Projects"
            value="24"
            icon={<FaHeartbeat className="text-emerald-600" />}
            accentColor="before:bg-emerald-500"
            badgeText="6 on schedule"
            badgeColor="bg-emerald-50 text-emerald-600"
            iconPosition="left"
            targetText="Target: 103%"
          />
        </div>
      </div>

      {/* ===== Support Overview ===== */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Customer Support & Service
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Tickets"
            value="5"
            icon={<FaTicketAlt className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            trendPercent="+12%"
            trendLabel="from last month"
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Open Tickets"
            value="2"
            icon={<FaClock className="text-orange-600" />}
            accentColor="before:bg-orange-500"
            trendPercent="-5%"
            trendLabel="from yesterday"
            trendPositive={false}
            iconPosition="right"
          />

          <KpiCard
            title="Resolved Today"
            value="0"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendPercent="+8% "
            trendLabel="from yesterday"
            trendPositive
            iconPosition="right"
          />

          <KpiCard
            title="SLA Compliance"
            value="87%"
            icon={<FaShieldAlt className="text-purple-600" />}
            accentColor="before:bg-purple-500"
            progress={87}
            iconPosition="right"
          />
        </div>
      </div>

      {/* ===== SLA Overview ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          variant="default"
          title="Overall SLA"
          value="87%"
          subtitle="Compliance Rate"
          icon={<FaCheckCircle className="text-green-600" />}
          progress={87}
        />

        <KpiCard
          variant="compact"
          title="Response SLA"
          value="92%"
          subtitle="First Response"
          icon={<FaClock className="text-blue-600" />}
          progress={92}
        />

        <KpiCard
          variant="compact"
          title="Resolution SLA"
          value="78%"
          subtitle="Resolution Rate"
          icon={<FaShieldAlt className="text-purple-600" />}
          progress={78}
        />
      </div>

      {/* ===== Knowledge Base ===== */}
      <div>
        <h2 className="text-lg font-semibold mb-4">knowledge base</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Articles"
            value="5"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendPercent="4"
            trendLabel=" +5 new this month"
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Page Views"
            value="2"
            icon={<FaClock className="text-orange-600" />}
            trendPercent="12.5K"
            trendLabel="+18% from last month"
            trendPositive={false}
            iconPosition="right"
          />

          <KpiCard
            title="Avg. Rating"
            value="0"
            icon={<FaCheckCircle className="text-green-600" />}
            forceBlackText
            trendPercent="4.7 "
            trendLabel="Based on 533 ratings"
            trendPositive
            iconPosition="right"
          />
          <KpiCard
            title="Categories"
            value="0"
            icon={<FaCheckCircle className="text-green-600" />}
            forceBlackText
            trendPercent="8 "
            trendLabel="Well organized content"
            trendPositive
            iconPosition="right"
          />
        </div>
      </div>
      {/* estimo */}

      <div>
        <h2 className="text-lg font-semibold mb-4">Estimo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KpiCard
            title="Draft"
            value="0"
            icon={<FaTicketAlt className="text-blue-600" />}
            forceBlackText
            trendLabel="Pending completion "
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Sent"
            value="1"
            icon={<FaClock className="text-orange-600" />}
            forceBlackText
            trendLabel="Awaiting response"
            trendPositive={false}
            iconPosition="right"
          />

          <KpiCard
            title="Approved"
            value="0"
            icon={<FaCheckCircle className="text-green-600" />}
            trendLabel="Ready to execute"
            trendPositive
            iconPosition="right"
            forceBlackText
          />
          <KpiCard
            title="Won"
            value="1"
            icon={<FaCheckCircle className="text-green-600" />}
            forceBlackText
            trendLabel="Successful quotes"
            trendPositive
            iconPosition="right"
          />
          <KpiCard
            title="Lost"
            value="1"
            icon={<FaCheckCircle className="text-green-600" />}
            forceBlackText
            trendLabel="Unsuccessful quotes"
            trendPositive
            iconPosition="right"
          />
        </div>
      </div>

      {/* Reports & Analytics */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Reports & Analytics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Revenue"
            value="₹4.43Cr"
            icon={<FaDollarSign />}
            forceBlackText
            trendLabel="+18.2% from last month"
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Win Rate"
            value="68%"
            icon={<FaClock />}
            forceBlackText
            trendLabel="+5.3% from last month"
            trendPositive={false}
            iconPosition="right"
          />

          <KpiCard
            title="Avg. Quote Value"
            value="₹22.4L"
            icon={<FaCheckCircle />}
            trendLabel="+12.7% from last month"
            trendPositive
            iconPosition="right"
            forceBlackText
          />
          <KpiCard
            title="Active Quotes"
            value="19"
            icon={<FaClock />}
            forceBlackText
            trendLabel="3 pending approval"
            iconPosition="right"
          />
        </div>
      </div>

      {/* Billr */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Billr</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Invoices"
            value="₹2.47Cr"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendLabel="+12.5% from last month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <KpiCard
            title="Pending Invoices"
            value="23"
            icon={<FaClock className="text-orange-600" />}
            trendLabel="₹45.2L outstanding"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <KpiCard
            title="Overdue"
            value="₹7"
            icon={<FaCheckCircle className="text-green-600" />}
            trendLabel="₹12.8L overdue"
            iconPosition="right"
            bgClass="bg-green-50 hover:bg-green-100 transition"
          />
          <KpiCard
            title="E-Way Bill"
            value="156"
            icon={<FaShieldAlt className="text-purple-600" />}
            trendLabel="3 pending approval"
            iconPosition="right"
            bgClass="bg-purple-50 hover:bg-purple-100 transition"
          />
        </div>
      </div>

      {/** Billr(E-way Bill)  */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Billr(E-way Bill)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total E-Way Bills"
            value="156"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendLabel="This month"
            iconPosition="right"
            bgClass="bg-blue-50 hover:bg-blue-100 transition"
          />

          <KpiCard
            title="Active Bills"
            value="42"
            icon={<FaClock className="text-orange-600" />}
            trendLabel="In transit"
            iconPosition="right"
            bgClass="bg-orange-50 hover:bg-orange-100 transition"
          />

          <KpiCard
            title="Expiring Soon"
            value="5"
            icon={<FaCheckCircle className="text-green-600" />}
            trendLabel="Within 24 hours"
            iconPosition="right"
            bgClass="bg-green-50 hover:bg-green-100 transition"
          />
          <KpiCard
            title="Extended Bills"
            value="23"
            icon={<FaArrowsAlt className="text-purple-600" />}
            trendLabel="This month"
            iconPosition="right"
            bgClass="bg-purple-50 hover:bg-purple-100 transition"
          />
        </div>
      </div>

      {/* flex */}

      <div>
        <h2 className="text-lg font-semibold mb-4">flex dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Requests"
            value="156"
            icon={<FaTicketAlt className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            trendPercent="+8.2%"
            trendLabel="from last month"
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Pending Approvals"
            value="23"
            icon={<FaClock className="text-orange-600" />}
            accentColor="before:bg-orange-500"
            trendPercent="-12%"
            trendLabel="from last week"
            trendPositive={false}
            iconPosition="right"
          />

          <KpiCard
            title="Total Spend"
            value="0.3cr"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendPercent="+5.4% "
            trendLabel="YTD growth"
            trendPositive
            iconPosition="right"
          />

          <KpiCard
            title="Cost Savings"
            value="1L"
            icon={<FaShieldAlt className="text-purple-600" />}
            accentColor="before:bg-purple-500"
            trendPercent="+4.4% "
            trendLabel="total spend"
            trendPositive
            iconPosition="right"
          />
        </div>
      </div>

      {/* Ledger */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Ledger dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Assets"
            value="₹2,140,000"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendLabel="+8.2% from last month"
            iconPosition="right"
          />

          <KpiCard
            title="Net Profit"
            value="₹1,530,000"
            icon={<FaClock className="text-orange-600" />}
            trendLabel="Margin: 28.2%"
            iconPosition="right"
          />

          <KpiCard
            title="Cash & Bank"
            value="₹2,095,000"
            icon={<FaCheckCircle className="text-green-600" />}
            trendLabel="Cash: ₹245,000 | Bank: ₹1,850,000"
            iconPosition="right"
          />

          <KpiCard
            title="GST Liability"
            value="₹125,000"
            icon={<FaShieldAlt className="text-purple-600" />}
            trendLabel="TDS: ₹85,000"
            iconPosition="right"
          />
        </div>
      </div>

      {/* Forge dashboard */}

      <div>
        <h2 className="text-lg font-semibold mb-4">forge dasbhboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="WIP Orders"
            value="1"
            icon={<FaTicketAlt className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            trendLabel="Active production"
            iconPosition="right"
          />

          <KpiCard
            title="Finished Goods"
            value="0"
            icon={<FaClock className="text-orange-600" />}
            accentColor="before:bg-orange-500"
            trendLabel="Completed this week"
            iconPosition="right"
          />

          <KpiCard
            title="Utilization %"
            value="82%"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendLabel="Machine efficiency"
            iconPosition="right"
          />
          <KpiCard
            title="Downtime"
            value="3.2hr"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendLabel="Today's downtime"
            trendPositive
            iconPosition="right"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">forge material</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard
            title="Materials Issued"
            value="1₹2.34L"
            icon={<FaTicketAlt className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            trendLabel="This month"
            iconPosition="right"
          />

          <KpiCard
            title="Scrap Value"
            value="₹8,450"
            icon={<FaClock className="text-orange-600" />}
            accentColor="before:bg-orange-500"
            trendLabel="3.6% of issued"
            iconPosition="right"
          />

          <KpiCard
            title="Returns"
            value="₹12,200"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendLabel="Returned to stock"
            iconPosition="right"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">forge quality</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Passed"
            value="1,247"
            icon={<FaTicketAlt className="text-blue-600" />}
            accentColor="before:bg-blue-500"
            trendLabel="This month"
            iconPosition="right"
          />

          <KpiCard
            title="Rejected"
            value="43"
            icon={<FaClock className="text-orange-600" />}
            accentColor="before:bg-orange-500"
            trendLabel="3.3% rejection rate"
            iconPosition="right"
          />

          <KpiCard
            title="Pending"
            value="28"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendLabel="Awaiting inspection"
            iconPosition="right"
          />
          <KpiCard
            title="Certificates"
            value="156"
            icon={<FaCheckCircle className="text-green-600" />}
            accentColor="before:bg-green-500"
            trendLabel="Generated"
            iconPosition="right"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">forge Analytics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Revenue"
            value="5₹30.06L"
            icon={<FaTicketAlt className="text-blue-600" />}
            trendPercent="18.3% vs"
            trendLabel=" last period"
            trendPositive={true}
            iconPosition="right"
          />

          <KpiCard
            title="Deals Closed"
            value="186"
            icon={<FaClock className="text-orange-600" />}
            trendPercent="12.7% vs"
            trendPositive={true}
            trendLabel="last period"
            iconPosition="right"
          />

          <KpiCard
            title="Conversion Rate"
            value="25.4%"
            icon={<FaClock className="text-orange-600" />}
            trendPercent="5.2% vs"
            trendPositive={true}
            trendLabel="last period"
            iconPosition="right"
          />

          <KpiCard
            title="Avg. Deal Size"
            value="₹1.62L"
            icon={<FaClock className="text-orange-600" />}
            trendPercent="3.1% vs last"
            trendPositive={false}
            trendLabel="last period"
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
