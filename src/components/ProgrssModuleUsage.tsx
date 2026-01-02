import React from "react";
import ReusableProgressListCard, {
  type StatItem,
} from "./HOC/progressbar/ReusableProgressListCard";

const moduleUsageData: StatItem[] = [
  {
    label: "Orbit CRM",
    users: 45,
    percent: 95,
    dotColor: "#1E5BB8",
    barColor: "#1E5BB8",
  },
  {
    label: "Pulse Support",
    users: 32,
    percent: 87,
    dotColor: "#00A8A8",
    barColor: "#1E5BB8",
  },
  {
    label: "Crew HRMS",
    users: 28,
    percent: 92,
    dotColor: "#64B5F6",
    barColor: "#1E5BB8",
  },
  {
    label: "Vault Inventory",
    users: 25,
    percent: 78,
    dotColor: "#26A69A",
    barColor: "#1E5BB8",
  },
  {
    label: "Flow Projects",
    users: 35,
    percent: 83,
    dotColor: "#81C784",
    barColor: "#1E5BB8",
  },
  {
    label: "Vision Analytics",
    users: 18,
    percent: 71,
    dotColor: "#FB8C00",
    barColor: "#1E5BB8",
  },
];

const combinedData: StatItem[] = [
  { label: "This Month", percent: 18.2 },
  { label: "Last Month", percent: 15.8 },
  { label: "Quarter Avg", percent: 16.5 },
];

const winLossData: StatItem[] = [
  { label: "Win Rate", percent: 68, barColor: "#1E5BB8" },
];

const complianceChecklist: StatItem[] = [
  { label: "Generate payslips", completed: true },
  { label: "File PF returns", completed: true },

  { label: "Pay PF challan", completed: true },
  { label: "Pay ESI challan", completed: false },
  { label: "File ESI returns", completed: false },
  { label: "Pay professional tax", completed: true },
  { label: "Submit TDS challan", completed: false },
  { label: "Update employee records", completed: true },
];
const supplierPerformanceData = [
  {
    label: "On-Time Delivery",
    percent: 87,
    rightText: "87% / 90%",
  },
  {
    label: "Quality Score",
    percent: 92,
    rightText: "92% / 95%",
  },
  {
    label: "Price Competitiveness",
    percent: 78,
    rightText: "78% / 85%",
  },
  {
    label: "Service Rating",
    percent: 89,
    rightText: "89% / 90%",
  },
];

const departmentSpendingData = [
  {
    label: "Sales",
    percent:90,
    rightText: "₹85,000.00 (45 expenses)",
  },
  {
    label: "Engineering",
     percent: 89,
    rightText: "₹72,000.00 (38 expenses)",
  },
  {
    label: "Marketing",
     percent: 69,
    rightText: "₹61,000.00 (34 expenses)",
  },
  {
    label: "Operations",
    percent: 49,
    rightText: "₹48,000.00 (29 expenses)",
  },
  {
    label: "HR",
     percent: 39,
    rightText: "₹32,000.00 (22 expenses)",
  },
];
const Performancemetricesdata: StatItem[] = [
  { label: "Machine Utilization", percent: 82 },
  { label: "Labor Efficiency", percent: 89 },
  { label: "Quality Rate", percent:96.4},
    { label: "Overall OEE", percent:76},
];
const shiftItems = [
  {
    label: "Morning Shift (6 AM - 2 PM)",
    percent: 75,
    rightText: "75% Complete",
    subText: "5 operators active",
  },
  {
    label: "Afternoon Shift (2 PM - 10 PM)",
    percent: 45,
    rightText: "45% Complete",
    subText: "7 operators active",
  },
  {
    label: "Night Shift (10 PM - 6 AM)",
    percent: 0,
    rightText: "Not Started",
    subText: "3 operators scheduled",
  },
];



const costBreakdownItems = [
  {
    label: "Raw Material Cost",
    percent: 60,
    rightText: "₹45,200 (60%)",
  },
  {
    label: "Labor Cost",
    percent: 25,
    rightText: "₹18,500 (25%)",
  },
  {
    label: "Overhead Cost",
    percent: 12,
    rightText: "₹9,200 (12%)",
  },
  {
    label: "Scrap Loss",
    percent: 3,
    rightText: "₹2,100 (3%)",
    barColor: "#EF4444", // red bar
  },
  

];
const oeeDashboardItems = [
  {
    label: "Availability",
    percent: 85,
    rightText: "85%",
  },
  {
    label: "Performance",
    percent: 92,
    rightText: "92%",
  },
  {
    label: "Quality",
    percent: 97,
    rightText: "97%",
  },
];




const ModuleUsage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <ReusableProgressListCard
        title="Module Usage"
        items={moduleUsageData}
        showEyeButton
      />
      <ReusableProgressListCard
        title="Combined Stats"
        items={combinedData}
        averageText="Average Margin"
        averagePercent={16.5}
      />
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
        title="Monthly Compliance Checklist"
        items={[]} // REQUIRED (can be empty)
        checklistItems={complianceChecklist}
        scorePercent={75}
        scoreLabel="Compliance Score"
      />
      <ReusableProgressListCard
  title="Supplier Performance"
  items={supplierPerformanceData}
/>
<ReusableProgressListCard title="Department Spending" items={departmentSpendingData} />
    <ReusableProgressListCard title="Performance Metrics" items={Performancemetricesdata} />  
   <ReusableProgressListCard title="Shift Progress & Timeline" items={shiftItems} />;
<ReusableProgressListCard
  title="Cost Breakdown Analysis"
   items={ costBreakdownItems}
  // footerStats={{
  //         leftLabel: "Total Actual Cost",
  //         leftValue: 75000,
  //        leftLabel: "Total Actual Cost",
  //         rightValue: 0,
  //       }}
>
</ReusableProgressListCard>

    <ReusableProgressListCard
  title="OEE Dashboard"
  items={oeeDashboardItems}
  footerStats={{
    leftLabel: "Overall OEE",
    leftValue: 85,
    rightLabel: "Overall OEE",
    rightValue: 76,
  }}
/>
    
    </div>
  );
};

export default ModuleUsage;
