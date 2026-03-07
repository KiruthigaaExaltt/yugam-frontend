import AssestsHeader from "./AssestsHeader";
import AssestsTable from "./AssestsTable";

const AssestsIndex = () => {
  return (
    <div className="p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <AssestsHeader />
        <AssestsTable />
      </div>
    </div>
  );
};

export default AssestsIndex;