import { FiBarChart2, FiZap } from "react-icons/fi";
import SecondSession from "../secondSession/SecondSession";
import ImplementationHighlightsCard from "../ImplementationHighlightsCard";

 const FeatureShowcaseBanner = () => (
  <div className="w-full mt-10 mb-6 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 mb-4 cursor-default">
      <FiZap className="text-amber-500 animate-pulse text-lg" />
      <span className="text-amber-800 font-bold tracking-tight text-xl bg-linear-to-r from-amber-600 to-amber-900 bg-clip-text">Exaltt.ai Feature Showcase</span>
      <FiZap className="text-amber-500 animate-pulse text-lg" />
    </div>
    <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
      Explore our comprehensive suite of business automation tools designed to streamline your operations, boost productivity, and drive growth with intelligent workflows and advanced analytics.
    </p>
  </div>
 );

export const AdvancedAnalytics = () => {
    return (
        <>
        <div className="w-full flex flex-col items-center justify-center p-12 shadow-sm  my-4 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <FiBarChart2 className="text-blue-600 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Advanced Analytics</h1>
            <p className="text-gray-500 max-w-xl mb-8 leading-relaxed px-4">
                Detailed business intelligence and advanced analytics are available in the Vision module. Gain real-time insights and predictive forecasting to scale your performance.
            </p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center mt-3 gap-2">
                Open Vision Analytics
            </button>
        </div>
            
            <FeatureShowcaseBanner />
            <SecondSession />
            <ImplementationHighlightsCard />
        </>
    );
};



 

