import LeaveHeader from "./LeaveHeader";
import LeaveTable from "./LeaveTable";

const LeaveIndex = () => {
    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300">
            <div className="flex flex-col gap-6">
                <LeaveHeader />
                <LeaveTable />
            </div>
        </div>
    );
};

export default LeaveIndex;
