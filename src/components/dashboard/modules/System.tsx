import { FiRefreshCw, FiDatabase, FiZap, FiShield, FiActivity, FiClock } from "react-icons/fi";

export const SystemStatus = () => {
    return (
        <div className="flex flex-col gap-8 my-4">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">System Health</h2>
                    <p className="text-sm text-gray-500 truncate">Monitor system components and performance</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <FiRefreshCw className="animate-spin" /> Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { label: 'Database', status: 'Healthy', color: 'emerald', icon: <FiDatabase /> },
                    { label: 'API Gateway', status: 'Healthy', color: 'emerald', icon: <FiZap /> },
                    { label: 'File Storage', status: 'Warning', color: 'rose', icon: <FiDatabase /> },
                    { label: 'Authentication', status: 'Healthy', color: 'emerald', icon: <FiShield /> },
                    { label: 'Notifications', status: 'Healthy', color: 'emerald', icon: <FiActivity /> },
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${s.color === 'emerald' ? 'green-50' : 'red-50'} text-${s.color === 'emerald' ? 'green-600' : 'red-600'}`}>{s.icon}</div>
                            <span className="font-semibold text-gray-800">{s.label}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-${s.color === 'emerald' ? 'green-100 text-green-700' : 'red-100 text-red-700'} border border-${s.color === 'emerald' ? 'green-200' : 'red-200'}`}>
                            {s.status}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                {[
                    { label: 'Database Size', val: '2.8GB', icon: <FiDatabase className="text-blue-500" /> },
                    { label: 'Avg Respons', val: '125ms', icon: <FiClock className="text-amber-500" /> },
                    { label: 'Uptime', val: '99.8%', icon: <FiActivity className="text-emerald-500" /> },
                    { label: 'API Calls/day', val: '1.2M', icon: <FiZap className="text-purple-500" /> },
                ].map((m, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                            {m.icon} <span>{m.label}</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{m.val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};