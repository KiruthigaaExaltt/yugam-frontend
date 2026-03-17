import LeaveHeader from "./LeaveHeader"
import LeaveTable from "./LeaveTable"
const Leaves = () => {
  return (

    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300">
      <LeaveHeader />
      <LeaveTable />
    </div>
  );
};

export default Leaves