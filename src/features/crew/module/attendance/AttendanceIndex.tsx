import AttendanceHeader from "./AttendanceHeader";
import AttendanceTable from "./AttendanceTable";

const AttendanceIndex = () => {
    return (
        <div className="p-4 sm:p-6 min-h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
                <AttendanceHeader />
                <AttendanceTable />
            </div>
        </div>
    );
};

export default AttendanceIndex;
