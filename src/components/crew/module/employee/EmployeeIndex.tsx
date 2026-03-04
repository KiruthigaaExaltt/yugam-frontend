import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";

const EmployeeIndex = () => {
  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300">
      <EmployeeHeader />
      <EmployeeTable />
    </div>
  );
};

export default EmployeeIndex;