import { useState } from "react";
import EmployeeHeader from "../employee/EmployeeHeader";
import EmployeeTable from "../employee/EmployeeTable";
import EmployeeDetail from "../employee/EmployeeDetail";


const EmployeeIndex = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  return (
    <div className="p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        {selectedEmployee ? (
          <EmployeeDetail 
            employee={selectedEmployee} 
            onBack={() => setSelectedEmployee(null)} 
          />
        ) : (
          <>
            <EmployeeHeader />
            <EmployeeTable onView={setSelectedEmployee} />
          </>
        )}
      </div>
    </div>
  );
};


export default EmployeeIndex;