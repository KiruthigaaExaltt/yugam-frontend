import FilterBar from "../../FilterBar";
import ExampleTable from "../table/ExampleTable";

export default function LeadsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <FilterBar
        searchPlaceholder="Search leads..."
        stageOptions={[
          { label: "New", value: "new" },
          { label: "Qualified", value: "qualified" },
        ]}
        sourceOptions={[
          { label: "Referral", value: "referral" },
          { label: "Website", value: "website" },
        ]}
      />

      {/* Table – FULL WIDTH */}
      <div className="w-full">
        <ExampleTable />
      </div>
    </div>
  );
}
