import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";

const EmployeeIndex = () => {
  return (
    <div className="p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <EmployeeHeader />
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeIndex;