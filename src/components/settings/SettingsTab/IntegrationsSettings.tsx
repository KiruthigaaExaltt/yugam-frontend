import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { Badge } from "primereact/badge";
import { 
  FiFacebook, 
  FiGlobe, 
  FiYoutube, 
  FiVideo, 
  FiRefreshCw, 
  FiSettings,
  FiEye,
  FiCopy,
  FiPlus
} from "react-icons/fi";
import MeetingCard, { type MeetingItem } from "../../HOC/meetingCard/MeetingCard";
import { RHFInput } from "../../HOC/form/RHFFields";

interface IntegrationModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  connected: boolean;
  scopes: string[];
  lastSync: string;
  autoSync: boolean;
}

const INITIAL_INTEGRATIONS: IntegrationModule[] = [
  { 
    id: "meta", 
    name: "Meta Business", 
    description: "Facebook and Instagram business accounts", 
    icon: <FiFacebook />,
    iconBg: "rgba(16, 185, 129, 0.1)", // Light green tint
    iconColor: "#10B981", 
    connected: true,
    scopes: ["pages_read_engagement", "pages_manage_posts", "instagram_basic"],
    lastSync: "about 1 year ago",
    autoSync: true
  },
  { 
    id: "google_ads", 
    name: "Google Ads", 
    description: "Google Ads campaign management", 
    icon: <FiGlobe />, 
    iconBg: "rgba(16, 185, 129, 0.1)",
    iconColor: "#10B981",
    connected: true,
    scopes: ["adwords", "analytics.readonly"],
    lastSync: "about 1 year ago",
    autoSync: true
  },
  { 
    id: "youtube", 
    name: "YouTube", 
    description: "YouTube channel management", 
    icon: <FiYoutube />, 
    iconBg: "rgba(239, 68, 68, 0.1)", // Red tint for YouTube often looks better, or keep uniform
    iconColor: "#71717a", // Gray when disconnected often?
    connected: false,
    scopes: [],
    lastSync: "-",
    autoSync: false
  },
  { 
    id: "zoom", 
    name: "Zoom", 
    description: "Video conferencing integration", 
    icon: <FiVideo />, 
    iconBg: "rgba(16, 185, 129, 0.1)",
    iconColor: "#10B981",
    connected: true,
    scopes: ["meeting:read", "meeting:write"],
    lastSync: "about 1 year ago",
    autoSync: true
  }
];

const IntegrationsSettings: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationModule[]>(INITIAL_INTEGRATIONS);
  
  const methods = useForm({
    defaultValues: {
      openaiKey: "",
      webhookUrl: "https://agency.com/api/webhooks"
    }
  });

  const toggleAutoSync = (id: string) => {
    setIntegrations(prev => prev.map(m => 
      m.id === id ? { ...m, autoSync: !m.autoSync } : m
    ));
  };

  const meetings: MeetingItem[] = integrations.map(module => ({
      title: module.name,
      description: module.description,
      
      // Render the main icon
      mainIcon: (
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg mix-blend-multiply"
            style={{
                backgroundColor: module.connected ? module.iconBg : 'rgba(244, 244, 245, 1)', // Gray if not connected
                color: module.connected ? module.iconColor : '#71717a'
            }}
          >
            {module.icon}
          </div>
      ),

      // Right Content: Status Badge + Action Button
      rightContent: (
        <div className="flex items-center gap-3">
            <Badge 
                value={module.connected ? "connected" : "disconnected"} 
                severity={module.connected ? "success" : "secondary"}
                className="font-normal"
                style={{
                    backgroundColor: module.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 244, 245, 1)',
                    color: module.connected ? '#10B981' : '#71717a',
                    border: 'none'
                }}
            />
            {module.connected ? (
                 <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition bg-white text-gray-700">
                    Configure
                 </button>
            ) : (
                <button className="px-3 py-1 text-sm rounded-md hover:bg-green-600 transition bg-green-500 text-white font-medium">
                    Connect
                 </button>
            )}
        </div>
      ),

      // Children: Body Content
      children: (
          <div className="mt-2">
            {module.connected && (
                <>
                {/* Scopes & Last Sync */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
                    <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Scopes</div>
                        <div className="flex flex-wrap gap-2">
                            {module.scopes.map(scope => (
                                <span key={scope} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                                    {scope}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-right sm:text-left">
                         <div className="text-xs font-semibold text-gray-500 mb-1">Last Sync</div>
                         <div className="text-xs text-gray-400">{module.lastSync}</div>
                    </div>
                </div>

                {/* Footer Actions Row */}
                <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                         <InputSwitch 
                            checked={module.autoSync} 
                            onChange={() => toggleAutoSync(module.id)}
                            className="scale-75"
                         />
                         <span className="text-sm font-medium text-gray-700">Auto Sync</span>
                    </div>

                     <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                        <FiRefreshCw size={14} />
                        Sync Now
                     </button>

                     <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                        <FiSettings size={14} />
                        Settings
                     </button>
                </div>
                </>
            )}
          </div>
      )
  }));

  return (
    <div className="flex flex-col gap-6">
        <MeetingCard meetings={meetings} />

        <div className="p-1">
            <Card
                className="rounded-(--border-radius) border shadow-sm [&_.p-card-body]:p-4!"
                style={{
                    borderColor: "var(--surface-border)",
                    backgroundColor: "var(--surface-card)",
                    borderRadius: "var(--border-radius)",
                }}
            >
                <FormProvider {...methods}>
                    <div className="flex flex-col md:flex-row gap-6">
                         {/* OpenAI Key */}
                         <div className="flex-1 relative">
                             <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-semibold">OpenAI API Key</label>
                             </div>
                             <div className="relative">
                                <div className="[&>div>label]:hidden [&>div>div]:w-0 [&>div>div]:hidden [&>div]:block [&_input]:pr-10">
                                    <RHFInput name="openaiKey" type="password" placeholder="sk-..." />
                                </div>
                                <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                    <FiEye />
                                </button>
                             </div>
                         </div>

                         {/* Webhook URL */}
                         <div className="flex-1 relative">
                             <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-semibold">Webhook URL</label>
                             </div>
                             <div className="relative">
                                <div className="[&>div>label]:hidden [&>div>div]:w-0 [&>div>div]:hidden [&>div]:block [&_input]:pr-10">
                                    <RHFInput name="webhookUrl" placeholder="https://..." />
                                </div>
                                <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                    <FiCopy />
                                </button>
                             </div>
                         </div>
                    </div>

                    <div className="mt-4">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium text-green-600 bg-green-50 border-green-200 hover:bg-green-100 transition">
                            <FiPlus />
                            Add API Key
                        </button>
                    </div>
                </FormProvider>
            </Card>
        </div>
    </div>
  );
};

export default IntegrationsSettings;
