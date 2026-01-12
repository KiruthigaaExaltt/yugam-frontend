import React from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { FiMail, FiPhone, FiClock , FiEdit, FiX , FiMoreHorizontal} from "react-icons/fi";
import { useState } from "react";
export interface ClientSummaryCardProps {
  fullName: any;
  // Common
  name: string;
  company: string;
  initials?: string;
  status?: "active" | "pending" | "trial" | "cancelled";
  priority?: "low" | "medium" | "high";
  tags?: string[];
  description?: string;
  isVerified?: boolean;
  showExternalLink?: boolean;
  showWarning?: boolean;

  // Client-specific
  email?: string;
  phone?: string;
  lastContact?: string;
  progressValue?: number;
  progressText?: string;
  progressColor?: string;
  revenue?: string;
  projectsCount?: number;

  // Subscription-specific
  monthlyCost?: string | number;
  usersCurrent?: number;
  usersMax?: number;
  usersActive?: number;
  utilizationRate?: number;
  lastAccessed?: string;
  department?: string;
  billingCycle?: string;
  nextRenewal?: string;
  renewalStatus?: string;
  isRenewalOverdue?: boolean;
  autoRenew?: boolean;
  showCancel?: boolean;

  // Actions
  onEdit?: () => void;
  onCancel?: () => void;
}

const statusColorMap = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  trial: "bg-yellow-200 text-yellow-800",
  cancelled: "bg-red-100 text-red-700",
};

const priorityColorMap = {
  low: "bg-[var(--priority-low-bg)] text-[var(--priority-low-text)] border border-[var(--light-surface-border)]",
  medium: "bg-[var(--priority-medium-bg)] text-[var(--priority-medium-text)] border border-[var(--light-surface-border)]",
  high: "bg-[var(--priority-high-bg)] text-[var(--priority-high-text)] border border-[var(--light-surface-border)]",
};

const ClientSummaryCard: React.FC<ClientSummaryCardProps> = (props) => {
  const isClientCard = !!props.email;
  const isSubscriptionCard = !!props.monthlyCost;

  const [currentStatus, setCurrentStatus] = useState(props.status);
  const [isCancelled, setIsCancelled] = useState(props.status === "cancelled");
  const [autoRenew, setAutoRenew] = useState(props.autoRenew ?? true);

  const handleCancel = () => {
    setCurrentStatus("cancelled");
    setIsCancelled(true);
    props.onCancel?.();
  };

  return (
  <Card
  className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-(--card-shadow-hover) border border-(--surface-border)"
  style={{ 
    backgroundColor: "var(--surface-card)",
    borderRadius: "var(--card-radius)"
  }}
     pt={{
        body: { style: { padding: isClientCard ? "14px 18px" : "18px 22px" } },
        content: { className: 'p-0' }
      }}
    >
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex gap-4 items-center">
          {isClientCard && props.initials && (
            <div
              className="h-11 w-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ backgroundColor: "var(--icon-bg-primary)", color: "var(--icon-color-primary)" }}
            >
              {props.initials}
            </div>
          )}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              {props.isVerified && (
                <div className="bg-blue-50 text-blue-500 p-0.5 rounded-md flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <h3 className="font-bold text-[15px] text-gray-900 leading-none">{props.name}</h3>
              {props.showExternalLink && (
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-[11px] font-semibold text-gray-400 mt-1">{props.company}</p>
            {props.description && (
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{props.description}</p>
            )}
          </div>
        </div>

        <div className={`flex ${isClientCard ? 'flex-col items-end gap-1' : 'items-center gap-2'}`}>
          {[currentStatus, isClientCard && props.priority].map((val, i) => val && (
            <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${i === 0 ? statusColorMap[currentStatus!] : priorityColorMap[props.priority!]}`}>
               {val}
            </span>
          ))}
          {props.showWarning && (
             <div className="text-red-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <circle cx="12" cy="13" r="0.5" fill="currentColor"/><line x1="12" y1="8" x2="12" y2="12" />
                </svg>
             </div>
          )}
        </div>
      </div>

      {isSubscriptionCard && (
        <>
          {/* STATS STRIP */}
          <div className="grid grid-cols-2 gap-4 mt-6 mb-8 border-b border-t border-gray-200 pb-4">
            <div className="text-center border-r border-gray-200">
              <p className="font-extrabold text-xl mb-0.5" style={{ color: "var(--primary-color)" }}>${props.monthlyCost}</p>
              <p className="text-[10px] text-(--text-muted) font-semibold uppercase">Monthly Cost</p>
            </div>
            <div className="text-center">
              <p className="font-extrabold text-xl mb-0.5" style={{ color: "var(--text-color)" }}>{props.usersCurrent}/{props.usersMax}</p>
              <p className="text-[10px] text-(--text-muted) font-semibold uppercase">Users</p>
            </div>
          </div>

          {/* PROGRESS SECTION */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-(--text-color)">Utilization Rate</span>
               <span className="text-xs font-extrabold text-(--text-color)">{props.utilizationRate}%</span>
            </div>
            <ProgressBar 
              value={props.utilizationRate || 0} 
              showValue={false} 
              pt={{
                root: { style: { height: "7px", borderRadius: "999px", backgroundColor: "var(--progress-bg)" } },
                value: { style: { borderRadius: "999px", backgroundColor: "var(--progress-fill)" } }
              }} 
            />
            <p className="text-[10px] text-gray-400 mt-2 font-medium">{props.usersActive} active users</p>
            <p className="text-right text-[10px] text-gray-400 -mt-4 mb-4 font-medium">Last accessed {props.lastAccessed}</p>
          </div>

          {/* INFO ROWS */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">Department:</span>
              <span className="text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{props.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">Billing Cycle:</span>
              <span className="text-xs font-bold text-gray-700">{props.billingCycle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">Next Renewal:</span>
              <div className="text-right">
                <p className={`text-xs font-extrabold ${props.isRenewalOverdue ? 'text-red-500' : 'text-gray-900'}`}>{props.nextRenewal}</p>
                {props.renewalStatus && <p className="text-[10px] text-gray-400 font-medium -mt-0.5">{props.renewalStatus}</p>}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">Auto Renew:</span>
              <div 
                className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors duration-200 ${autoRenew ? 'bg-[#10B981]' : 'bg-gray-200'}`}
                onClick={() => setAutoRenew(!autoRenew)}
              >
                <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${autoRenew ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-8">
            {props.tags?.map((tag) => (
              <span key={tag} className="text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center pt-4 border-t border-gray-50">
            <div className="flex gap-2">
              <button
                onClick={() => props.onEdit?.()}
                disabled={isCancelled}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border-2 border-[#10B981] text-[#10B981] text-xs font-bold hover:bg-[#10B981] hover:text-white transition-all disabled:opacity-50 disabled:grayscale"
              >
                <FiEdit size={14} />
                Edit
              </button>
              {props.showCancel && !isCancelled && (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border-2 border-red-100 text-red-500 text-xs font-bold hover:bg-red-50 transition-all"
                >
                  <FiX size={14} className="border border-red-500 rounded-full text-[8px]" />
                  Cancel
                </button>
              )}
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600 transition-colors">
              <FiMoreHorizontal size={20} />
            </button>
          </div>
        </>
      )}

      {isClientCard && (
        <div className="mt-2.5">
          {/* CONTACT INFO */}
          <div className="space-y-2.5 mb-5">
            {props.email && (
              <div className="flex items-center gap-3 text-gray-500 hover:text-gray-700 transition-colors">
                <FiMail size={14} className="text-gray-400" />
                <span className="text-xs font-medium">{props.email}</span>
              </div>
            )}
            {props.phone && (
              <div className="flex items-center gap-3 text-gray-500 hover:text-gray-700 transition-colors">
                <FiPhone size={14} className="text-gray-400" />
                <span className="text-xs font-medium">{props.phone}</span>
              </div>
            )}
            {props.lastContact && (
              <div className="flex items-center gap-3 text-gray-500 hover:text-gray-700 transition-colors">
                <FiClock size={14} className="text-gray-400" />
                <span className="text-xs font-medium">Last contact: {props.lastContact}</span>
              </div>
            )}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {props.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-gray-500 bg-white px-3 py-0.5 rounded-full border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6 border-t border-gray-300"></div>

          {/* PROGRESS SECTION */}
          {(props.progressValue !== undefined || props.progressText) && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-gray-800">Deliverables Progress</span>
                <span className="text-[11px] font-extrabold text-gray-900">{props.progressText}</span>
              </div>
              <ProgressBar
                value={props.progressValue || 0}
                showValue={false}
                pt={{
                  root: { style: { height: "7px", borderRadius: "999px", backgroundColor: "var(--progress-bg)" } },
                value: { style: { borderRadius: "999px", backgroundColor: "var(--progress-fill)" } }
              }}
            />
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-300">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-tight">Revenue</span>
            <span className="text-sm font-extrabold" style={{ color: "var(--primary-color)" }}>{props.revenue}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-(--text-color) bg-(--surface-ground) px-3 py-1.5 rounded-full border border-gray-200">
              {props.projectsCount} projects
            </span>
          </div>
        </div>
        </div>
      )}
    </Card>
  );
};

export default ClientSummaryCard;
