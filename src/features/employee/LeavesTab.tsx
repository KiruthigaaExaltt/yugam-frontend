import { useState } from "react";
import LeaveForm from "../../features/crew/module/leave/LeaveForm";

interface LeaveBalanceCardProps {
    type: string;
    earned: number;
    used: number;
    remaining: number;
    colorClass: string;
}

const LeaveBalanceCard = ({ type, earned, used, remaining, colorClass }: LeaveBalanceCardProps) => {
    const percentage = (used / earned) * 100;
    
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-gray-700 font-black text-sm uppercase tracking-tight mb-4">{type}</h4>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Earned</span>
                    <span className="text-gray-700 font-black">{earned}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Used</span>
                    <span className="text-gray-700 font-black">{used}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-1">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Remaining</span>
                    <span className={`font-black text-lg ${colorClass}`}>{remaining}</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                    <div 
                        className={`h-full ${colorClass.replace('text-', 'bg-')} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

const LeavesTab = ({ employee: _employee }: { employee: any }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);


    const leaveBalances = [
        { type: "Annual Leave", earned: 12, used: 3, remaining: 9, color: "text-blue-600" },
        { type: "Sick Leave", earned: 6, used: 2, remaining: 4, color: "text-blue-500" },
        { type: "Casual Leave", earned: 6, used: 3, remaining: 3, color: "text-blue-600" },
    ];

    const recentApplications = [
        { type: "Sick Leave", date: "Dec 20-21, 2023", duration: "2 day(s)", status: "Approved" },
        { type: "Annual Leave", date: "Nov 15-17, 2023", duration: "3 day(s)", status: "Approved" },
        { type: "Casual Leave", date: "Oct 30, 2023", duration: "1 day(s)", status: "Approved" },
    ];

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Leave Balance Section */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-base sm:text-lg font-black text-gray-800 tracking-tight uppercase mb-6 px-1">Leave Balance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {leaveBalances.map((balance, index) => (
                        <LeaveBalanceCard key={index} {...balance} colorClass={balance.color} />
                    ))}
                </div>
            </div>

            {/* Recent Applications Section */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 sm:px-10 py-6 sm:py-8 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-black text-gray-800 tracking-tight uppercase">Recent Applications</h3>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] sm:text-xs px-6 py-3 sm:py-2.5 rounded-xl uppercase tracking-widest transition-all shadow-md shadow-emerald-100"
                    >
                        Apply Leave
                    </button>
                </div>
                <div className="flex flex-col">
                    {recentApplications.map((app, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-10 py-5 sm:py-6 border-b border-gray-50 last:border-none hover:bg-gray-50/30 transition-colors group gap-3 sm:gap-0">
                            <div className="flex flex-col gap-0.5 sm:gap-1">
                                <span className="font-black text-gray-700 text-sm tracking-tight">{app.type}</span>
                                <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{app.date} • {app.duration}</span>
                            </div>
                            <span className="w-fit bg-emerald-50 text-emerald-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <LeaveForm 
                visible={isFormOpen}
                onHide={() => setIsFormOpen(false)}
                recordId={null}
            />

        </div>
    );
};

export default LeavesTab;
