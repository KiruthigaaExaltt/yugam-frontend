import ShiftHeader from "./ShiftHeader";
import ShiftTable from "./ShiftTable";

const ShiftIndex = () => {
    return (
        <div className="flex flex-col gap-6 p-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShiftHeader onCreateShift={() => {}} /> {/* Handled inside ShiftTable to keep logic centralized */}
            <ShiftTable />
        </div>
    );
};

export default ShiftIndex;
