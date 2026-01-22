import { FiBarChart2 } from "react-icons/fi";

export const AdvancedAnalytics = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100 my-4 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <FiBarChart2 className="text-blue-600 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Advanced Analytics</h1>
            <p className="text-gray-500 max-w-xl mb-8 leading-relaxed px-4">
                Detailed business intelligence and advanced analytics are available in the Vision module. Gain real-time insights and predictive forecasting to scale your performance.
            </p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2">
                Open Vision Analytics
            </button>
        </div>
    );
};