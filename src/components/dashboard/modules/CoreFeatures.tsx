import { FiGrid, FiBarChart2, FiLayers } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import MidCard from "../../HOC/midCard/MidCard";


export const CoreFeatures = () => {
    return (
        <>
        <div className="animate-fadeIn">
           <div className="w-full text-center flex flex-col items-center mt-10 mb-8">
               <h2 className="text-2xl font-semibold text-gray-900">
    Platform-Wide Capabilities
  </h2>

  <p className="text-gray-500 mt-2 max-w-2xl mx-auto whitespace-normal wrap-break-word leading-relaxed">
    Foundation features that power efficiency across all modules with consistent user experience
  </p>
            </div>
                   
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
                <MidCard
                    icon={<FiGrid className="text-cyan-600" />}
                    title="Form Modals"
                    badge="New"
                    description="Comprehensive modal forms with validation, multi-step processes, and real-time calculations"
                    ctaLabel="Benefit"
                />
                <MidCard
                    icon={<FiBarChart2 className="text-teal-600" />}
                    title="Advanced Analytics"
                    badge="New"
                    description="Interactive charts, forecasting, performance metrics, and customizable dashboards"
                    ctaLabel="Benefit"
                />
                <MidCard
                    icon={<FiLayers className="text-blue-600" />}
                    title="Workflow Engine"
                    badge="New"
                    description="Visual workflow builder with triggers, conditions, actions, and automation templates"
                    ctaLabel="Benefit"
                />
                <MidCard
                    icon={<MdCheckCircle className="text-emerald-600" />}
                    title="Approval System"
                    badge="New"
                    description="Multi-level approval workflows with notifications, comments, and audit trails"
                    ctaLabel="Benefit"
                />
            </div>
        </div>
     
        </>
    );
};