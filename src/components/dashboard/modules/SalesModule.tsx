
import { FiFileText } from "react-icons/fi";
import { MdTimeline, MdNotificationsActive } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import MidCard from "../../HOC/midCard/MidCard";
// import ImplementationHighlightsCard from "../ImplementationHighlightsCard";

export const SalesModule = () => {
    return (
        <>
        <div className="animate-fadeIn">
            <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-800">Sales Performance Optimization</h1>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                    Accelerate your sales cycle with intelligent pipeline management and automated follow-up systems
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
                <MidCard
                    icon={<FiFileText className="text-indigo-600" />}
                    title="Quote Management"
                    badge="Enhanced"
                    description="Professional quote creation with customizable templates, discount management, and tracking"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<MdTimeline className="text-blue-600" />}
                    title="Pipeline Management"
                    badge="Enhanced"
                    description="Visual sales pipeline with deal tracking, probability scoring, and stage progression"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<FaChartBar className="text-purple-600" />}
                    title="Sales Analytics"
                    badge="New"
                    description="Comprehensive sales reporting with performance metrics, conversion analysis, and forecasting"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<MdNotificationsActive className="text-pink-600" />}
                    title="Follow-up Automation"
                    badge="New"
                    description="Automated quote follow-ups, deal progression notifications, and customer engagement workflows"
                    ctaLabel="Try Demo"
                />
            </div>
        </div>
        {/* <ImplementationHighlightsCard /> */}
        </>
    );
};