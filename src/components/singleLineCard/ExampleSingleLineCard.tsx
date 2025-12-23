import SingleLineCard from "../HOC/singlelineCard/SingleLineCard";

const ExampleSingleLineCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SingleLineCard
          title="Response Metrics"
          items={[
            {
              label: "Average First Response",
              value: "2.4 hours",
              valueTone: "primary",
            },
            { label: "< 1 Hour Response", value: "78%", valueTone: "success" },
            { label: "< 4 Hours Response", value: "94%", valueTone: "success" },
            {
              label: "Average Resolution",
              value: "18.5 hours",
              valueTone: "primary",
            },
          ]}
        />
        <SingleLineCard
          title="Customer Satisfaction"
          items={[
            {
              label: "Overall Rating",
              value: "⭐ 4.2 / 5.0",
              valueTone: "primary",
            },
            { label: "Response Quality", value: "91%", valueTone: "success" },
            { label: "Resolution Quality", value: "85%", valueTone: "success" },
            { label: "Net Promoter Score", value: "68", valueTone: "primary" },
          ]}
        />
        <SingleLineCard
          title="Financial Ratios"
          items={[
            {
              label: "Current Ratio",
              value: "2.8",
              subValue: "Healthy",
              valueTone: "success",
            },
            {
              label: "Quick Ratio",
              value: "1.9",
              subValue: "Good",
              valueTone: "success",
            },
            {
              label: "Debt-to-Equity",
              value: "0.66",
              subValue: "Moderate",
              valueTone: "warning",
            },
            {
              label: "Profit Margin",
              value: "28.2%",
              subValue: "Excellent",
              valueTone: "primary",
            },
          ]}
        />
        <SingleLineCard
          title="Working Capital Analysis"
          items={[
            {
              label: "Accounts Receivable",
              value: "₹680,000",
              valueTone: "success",
            },
            {
              label: "Inventory",
              value: "₹890,000",
              valueTone: "success",
            },
            {
              label: "Accounts Payable",
              value: "(₹420,000)",
              valueTone: "danger",
            },
            {
              label: "Net Working Capital",
              value: "₹1,150,000",
              valueTone: "primary",
              dividerBefore: true, // 👈 THIS CREATES THE LINE
            },
          ]}
        />
        <SingleLineCard
          title="Profit & Loss"
          items={[
            {
              label: "Total Income",
              value: "₹5,420,000",
              valueTone: "success",
            },
            {
              label: "Total Expenses",
              value: "₹3,890,000",
              valueTone: "danger",
            },
            {
              dividerBefore: true,
              label: "Net Profit",
              value: "₹1,530,000",
              valueTone: "success",
            },
          ]}
          action={{
            label: "Detailed Report",
            onClick: () => console.log("Open report"),
          }}
        />
      </div>
    </>
  );
};

export default ExampleSingleLineCard;
