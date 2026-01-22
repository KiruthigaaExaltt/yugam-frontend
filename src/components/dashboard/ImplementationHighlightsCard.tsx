import { Card } from "primereact/card";
import { FiCheckCircle } from "react-icons/fi";

const ImplementationHighlightsCard = () => {
    const stats = [
        { value: "15+", label: "New Components", color: "#1E5BB8" },
        { value: "40+", label: "Enhanced Features", color: "#2E7D32" },
        { value: "100%", label: "Type Safe", color: "#7B1FA2" },
    ];

    const achievements = [
        "Comprehensive modal forms with validation",
        "Multi-level approval workflow system",
        "Advanced analytics with interactive charts",
        "Workflow automation engine",
        "Real-time calculations and updates",
        "Responsive design with dark mode support",
    ];

    return (
        <Card className="rounded-(--border-radius) border-none shadow-sm mt-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8">
                <FiCheckCircle className="text-emerald-500 text-xl" />
                <h3 className="font-semibold text-gray-700 text-sm">Implementation Highlights</h3>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                        <h2 className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</h2>
                        <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 my-8" />

            {/* Achievements Section */}
            <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-800 mb-4">Key Technical Achievements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                    {achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600 text-xs">
                            <FiCheckCircle className="text-emerald-500 shrink-0" />
                            <span>{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ImplementationHighlightsCard;
