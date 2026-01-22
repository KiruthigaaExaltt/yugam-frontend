import {
  FaBolt,
  FaFileAlt,
  FaPlus,
  FaChartLine,
} from "react-icons/fa";
import QuickActions from "../HOC/quickActions/QuickAction";
import { FiShoppingCart, FiSettings, FiBriefcase, FiZap } from "react-icons/fi";
import ImplementationHighlightsCard from "./ImplementationHighlightsCard";

// Import Modular Components
import { BusinessOverview } from "./modules/buniess";
import { PurchaseModule } from "./modules/purchase";
import { SalesModule } from "./modules/Sales";
import { CoreFeatures } from "./modules/Core";
import { AdvancedAnalytics } from "./modules/AdvancedAnalytics";
import { SystemStatus } from "./modules/System";

const moduleItems = [
  { label: "Business Overview", icon: <FiBriefcase className="text-gray-500" /> },
  { label: "Purchase Module", icon: <FiShoppingCart className="text-gray-500" /> },
  { label: "Sales Module", icon: <FiSettings className="text-gray-500" /> },
  { label: "Core Features", icon: <FiBriefcase className="text-gray-500" /> },
  { label: "Advanced Analytics", icon: <FiZap className="text-gray-500" /> },
  { label: "System Status", icon: <FiActivity className="text-gray-500" /> },
];

const rowActions = [
  { id: "po", label: "Create PO", icon: <FaPlus /> },
  { id: "quote", label: "New Quote", icon: <FaFileAlt /> },
  { id: "analytics", label: "View Analytics", icon: <FaChartLine /> },
  { id: "workflow", label: "Setup Workflow", icon: <FaBolt /> },
];

const FeatureShowcaseBanner = () => (
  <div className="w-full mt-10 mb-6 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 mb-4 cursor-default">
      <FiZap className="text-amber-500 animate-pulse text-lg" />
      <span className="text-amber-800 font-bold tracking-tight text-xl bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">Exaltt.ai Feature Showcase</span>
      <FiZap className="text-amber-500 animate-pulse text-lg" />
    </div>
    <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
      Explore our comprehensive suite of business automation tools designed to streamline your operations, boost productivity, and drive growth with intelligent workflows and advanced analytics.
    </p>
  </div>
);

import { FiActivity } from "react-icons/fi";

export default function Dashmain({ activeTab, onModuleClick }: { activeTab: string, onModuleClick: (val: string) => void }) {
  const renderContent = () => {
    switch (activeTab) {
      case "Business Overview":
        return <BusinessOverview />;
      case "Purchase Module":
        return <PurchaseModule />;
      case "Sales Module":
        return <SalesModule />;
      case "Core Features":
        return <CoreFeatures />;
      case "Advanced Analytics":
        return <AdvancedAnalytics />;
      case "System Status":
        return <SystemStatus />;
      default:
        return <BusinessOverview />;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-4">
      {/* 2. FEATURE SHOWCASE BANNER */}
      <FeatureShowcaseBanner />

      {/* 3. SPREAD-WIDTH MODULE NAVIGATION BAR */}
      <div className="w-full mb-10 px-6">
        <div className="w-full flex items-center justify-between gap-2 overflow-hidden">
          {moduleItems.map((item, idx) => {
            const isActive = activeTab === item.label;
            return (
              <div
                key={idx}
                onClick={() => onModuleClick(item.label)}
                className={`
                  flex-1 flex items-center justify-center gap-3
                  py-2 px-6
                  rounded-xl
                  cursor-pointer
                  transition-all duration-300
                  whitespace-nowrap
                  ${isActive
                    ? "bg-white shadow-md text-blue-700 font-bold scale-[1.02]"
                    : "text-gray-500 hover:bg-white/40 hover:text-gray-800"
                  }
                `}
              >
                <span className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MODULE CONTENT */}
      {renderContent()}

      {/* 5. COMMON FOOTER */}
      <div className="mt-12 flex flex-col gap-8">
        <ImplementationHighlightsCard />
        <div>
          <QuickActions title="Quick Actions" actions={rowActions} layout="row" />
        </div>
      </div>
    </div>
  );
}


