import { MdShoppingCart, MdGroups, MdCheckCircle } from "react-icons/md";
import { FiBarChart2, FiZap } from "react-icons/fi";
import MidCard from "../../HOC/midCard/MidCard";
// import ImplementationHighlightsCard from "../ImplementationHighlightsCard";

export const PurchaseModule = () => {
    return (
        <>
        <div className="animate-fadeIn w-full px-2">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Purchase Management Excellence</h1>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                    Transform your procurement process with intelligent automation and comprehensive supplier management
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <MidCard
                    icon={<MdShoppingCart />}
                    iconBg="#e0e7ff"
                    title="Smart Purchase Orders"
                    badge="Enhanced"
                    isPrimary={true}
                    description="Create comprehensive purchase orders with item management, supplier selection, and automatic calculations"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<MdGroups />}
                    iconBg="#f3f4f6"
                    title="Supplier Management"
                    badge="New"
                    description="Manage supplier relationships with performance tracking, ratings, and detailed profiles"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<MdCheckCircle />}
                    iconBg="#f3f4f6"
                    title="Approval Workflows"
                    badge="New"
                    description="Automated approval processes for purchase requisitions with multi-level authorization"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<FiBarChart2 />}
                    iconBg="#f3f4f6"
                    title="Purchase Analytics"
                    badge="New"
                    description="Advanced reporting with spend analysis, supplier performance, and cost optimization insights"
                    ctaLabel="Try Demo"
                />
                <MidCard
                    icon={<FiZap />}
                    iconBg="#f3f4f6"
                    title="Workflow Automation"
                    badge="New"
                    description="Automate repetitive tasks like purchase order routing, supplier notifications, and deadline reminders"
                    ctaLabel="Try Demo"
                />
            </div>
        </div>
        {/* <ImplementationHighlightsCard /> */}
        </>
    );
};
