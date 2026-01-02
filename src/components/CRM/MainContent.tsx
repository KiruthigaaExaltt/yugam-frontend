import FilterBar from "../HOC/filterbar/FilterBar";



export default function MainContent() {
  return (
    <div className="pt-6">
      {/* Filters */}
      <FilterBar
        searchPlaceholder="Search Clients..."
        stageOptions={[
          { label: "New", value: "new" },
          { label: "Qualified", value: "qualified" },
        ]}
        sourceOptions={[
          { label: "Referral", value: "referral" },
          { label: "Website", value: "website" },
        ]}
      />
    
    </div>
  );
}
