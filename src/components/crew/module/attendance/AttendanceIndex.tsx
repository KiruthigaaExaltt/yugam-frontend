import AttendanceHeader from "./AttendanceHeader";
import AttendanceTable from "./AttendanceTable";

const AttendanceIndex = () => {
    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300">
            <AttendanceHeader />
            <AttendanceTable />
        </div>
    );
};

export default AttendanceIndex;
