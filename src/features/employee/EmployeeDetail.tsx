import { useState } from "react";
import { ArrowLeft, X, Save } from "lucide-react";



import ProfileTab from "./ProfileTab.tsx";
import AttendanceTab from "./AttendanceTab.tsx";
import LeavesTab from "./LeavesTab.tsx";


interface EmployeeDetailProps {
    employee: any;
    onBack: () => void;
}

const EmployeeDetail = ({ employee, onBack }: EmployeeDetailProps) => {
    const [activeTab, setActiveTab] = useState("Profile");
    const [isEditing, setIsEditing] = useState(false);


    const tabs = [
        "Profile",
        "Attendance",
        "Leaves",
        "Performance",
        "Documents",
        "Payroll"
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Profile Summary */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start justify-between relative z-10 gap-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <button 
                                onClick={onBack}
                                className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-blue-100"
                            >
                                <ArrowLeft size={20} className="text-gray-500" />
                            </button>

                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-4 border-white shadow-md flex items-center justify-center text-white text-xl sm:text-2xl font-bold shrink-0">
                                {employee.initials}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-tight">
                                {employee.name}
                            </h1>
                            <p className="text-gray-500 font-medium text-xs sm:text-sm flex items-center gap-2">
                                {employee.position} <span className="text-gray-300">•</span> {employee.employee_id}
                            </p>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-500 bg-white border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                            >
                                <Save size={16} />
                                Save
                            </button>
                        </div>
                    )}
                </div>



                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            </div>

            {/* Tab Navigation */}
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
                <div className="bg-gray-50/50 p-1.5 rounded-2xl flex gap-1 border border-gray-100 w-max sm:w-fit min-w-full sm:min-w-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                                activeTab === tab 
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
                                : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-2">
                {activeTab === "Profile" && <ProfileTab employee={employee} onEdit={() => setIsEditing(true)} />}
                {activeTab === "Attendance" && <AttendanceTab employee={employee} />}

                {activeTab === "Leaves" && <LeavesTab employee={employee} />}
                {activeTab === "Performance" && (

                    <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center">
                        <p className="text-gray-400 font-medium italic">Performance analytics coming soon...</p>
                    </div>
                )}
                {activeTab === "Documents" && (
                    <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center">
                        <p className="text-gray-400 font-medium italic">Employee documents coming soon...</p>
                    </div>
                )}
                {activeTab === "Payroll" && (
                    <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center">
                        <p className="text-gray-400 font-medium italic">Payroll information coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetail;
