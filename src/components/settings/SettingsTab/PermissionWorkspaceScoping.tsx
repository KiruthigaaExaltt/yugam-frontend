import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import MeetingCard from "../../HOC/meetingCard/MeetingCard";

/**
 * WorkspaceScoping component implemented using MeetingCard HOC items.
 * Uses internal CSS variables and pt properties to ensure a green theme.
 */
const WorkspaceScoping: React.FC = () => {
    const [scoping, setScoping] = useState("cross");
    const [tabs, setTabs] = useState<string[]>(["messages", "reports", "approvals", "storage"]);

    const handleTabChange = (val: string, checked: boolean) => {
        setTabs(prev => checked ? [...prev, val] : prev.filter(t => t !== val));
    };

    // Shared Pass-Through configuration for green components
    const greenPt = {
        box: ({ props }: any) => ({
            style: {
                backgroundColor: props.checked ? 'var(--primary-color)' : '',
                borderColor: props.checked ? 'var(--primary-color)' : ''
            }
        })
    };

    return (
        <MeetingCard 
            meetings={[
                {
                    title: "",
                    children: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-2">
                            {/* Left Column: Workspace Scoping */}
                            <div className="space-y-4">
                                <h5 className="text-sm font-bold text-(--text-color) mb-4">Workspace Scoping</h5>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <RadioButton 
                                            inputId="strict" 
                                            value="strict" 
                                            checked={scoping === "strict"} 
                                            onChange={(e) => setScoping(e.value)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="strict" className="text-sm text-(--text-color) cursor-pointer">Strict workspace isolation</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioButton 
                                            inputId="cross" 
                                            value="cross" 
                                            checked={scoping === "cross"} 
                                            onChange={(e) => setScoping(e.value)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="cross" className="text-sm text-(--text-color) cursor-pointer font-medium">Cross-workspace visibility for admins</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioButton 
                                            inputId="shared" 
                                            value="shared" 
                                            checked={scoping === "shared"} 
                                            onChange={(e) => setScoping(e.value)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="shared" className="text-sm text-(--text-color) cursor-pointer">Shared resources access</label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Allowed Tabs for Clients */}
                            <div className="space-y-4">
                                <h5 className="text-sm font-bold text-(--text-color) mb-4">Allowed Tabs for Clients</h5>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            inputId="msg" 
                                            checked={tabs.includes("messages")} 
                                            onChange={(e) => handleTabChange("messages", e.checked ?? false)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="msg" className="text-sm text-(--text-color) cursor-pointer">Messages (Client tab only)</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            inputId="rep" 
                                            checked={tabs.includes("reports")} 
                                            onChange={(e) => handleTabChange("reports", e.checked ?? false)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="rep" className="text-sm text-(--text-color) cursor-pointer">Reports (Read-only)</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            inputId="app" 
                                            checked={tabs.includes("approvals")} 
                                            onChange={(e) => handleTabChange("approvals", e.checked ?? false)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="app" className="text-sm text-(--text-color) cursor-pointer">Approvals</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            inputId="sto" 
                                            checked={tabs.includes("storage")} 
                                            onChange={(e) => handleTabChange("storage", e.checked ?? false)} 
                                            pt={greenPt}
                                        />
                                        <label htmlFor="sto" className="text-sm text-(--text-color) cursor-pointer">Data Storage (Assigned files only)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]} 
        />
    );
};

export default WorkspaceScoping;
