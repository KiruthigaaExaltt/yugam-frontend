import React from "react";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import type { IconType } from "react-icons";
import { FiUsers, FiClock, FiBriefcase } from "react-icons/fi";
// import "./mettingCard.css"

/* ================= TYPES ================= */

export interface MeetingItem {
  title: string;
  description?: string;
  name?: string;
  company?: string;

  time?: string;
  attendees?: number;

  date?: string;
  leftText?: string;
  icon?: IconType;

  showToggle?: boolean; // ✅ ONLY toggle

  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void; // optional controlled value
  
  // Task specific props
  isTask?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
  tags?: Array<{ label: string; color: string }>;
  dueDate?: string;
  
  // New props for reuse
  mainIcon?: React.ReactNode;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
  statusColor?: string;
  priority?: "high" | "medium" | "low";
  role?: string;
  tone?: "blue" | "green" | "orange" | "purple" | "red";
}

interface HeaderAction {
  label: string;
  onClick: () => void;
  icon?: IconType;
}

/* ================= PROPS ================= */

interface MeetingSectionProps {
  title?: string;
  meetings: MeetingItem[];

  showAdd?: boolean;
  addIcon?: IconType;
  addButtonLabel?: string;
  onAddClick?: () => void;

  footerLabel?: string;
  footerIcon?: IconType;

  isRecentCall?: boolean;
  isDetailed?: boolean;
  isCallHistory?: boolean;
  isPayment?: boolean;
  headerAction?: HeaderAction;
}

/* ================= COMPONENT ================= */

const MeetingCard: React.FC<MeetingSectionProps> = ({
  title,
  meetings,
  showAdd,
  addIcon: AddIcon,
  addButtonLabel,
  onAddClick,
  footerLabel,
  footerIcon: FooterIcon,
  isRecentCall,
  isDetailed,
  isCallHistory,
  isPayment,
  headerAction,
}) => {
  const getTintClass = (m: MeetingItem) => {
    if (m.tone === "blue" || m.statusColor?.includes("3b82f6")) return "bg-[#EEF2FF]";
    if (m.tone === "purple" || m.statusColor?.includes("a855f7")) return "bg-[#F5F3FF]";
    if (m.tone === "green") return "bg-[#ECFDF5]";
    if (m.tone === "orange") return "bg-[#FFFBEB]";
    if (m.tone === "red") return "bg-[#FEF2F2]";
    return "bg-[#ECFDF5]"; // Default/Green tint
  };

  const getToneColor = (tone?: string) => {
    if (tone === "green") return "#10B981";
    if (tone === "orange") return "#D97706";
    if (tone === "red") return "#EF4444";
    if (tone === "blue") return "#3B82F6";
    if (tone === "purple") return "#A855F7";
    return "var(--text-color)";
  };

  return (
    <Card
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&_.p-card-body]:p-3! "
      style={{
        borderColor: "var(--surface-border)",
        backgroundColor: "var(--surface-card)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <div className="flex flex-col gap-3">
      {/* ===== Header ===== */}
      {title && (
        <div className="flex justify-between items-center mb-3">
          <h3 
            className="text-(--text-color)"
            style={{
              fontSize: "var(--card-title-size)",
              fontWeight: "var(--card-title-weight)"
            }}
          >
            {title}
          </h3>

          <div className="flex items-center gap-2">
            {headerAction && (
              <Button
                onClick={headerAction.onClick}
                icon={headerAction.icon ? <headerAction.icon size={16} /> : undefined}
                className="p-button-outlined p-button-sm !rounded-md !border-gray-100 font-medium hover:!border-emerald-500 hover:!text-emerald-500 hover:!bg-emerald-50 transition-all text-gray-400 bg-white shadow-sm w-8 h-8 p-0"
              />
            )}

            {showAdd && (
              <Button
                onClick={onAddClick}
                label={addButtonLabel}
                icon={AddIcon ? <AddIcon size={14} /> : <span>+</span>}
                className="p-button-outlined p-button-sm !rounded-full !px-3 font-medium transition hover:shadow-md hover:!bg-emerald-50 hover:!text-emerald-600 hover:!border-emerald-200"
                style={{
                  background: "white",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-color)"
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* ===== Cards ===== */}
      <div className="flex flex-col gap-3">
        {meetings.map((m, i) => {

          return (
            <div
              key={i}
              className={`cursor-pointer transition-all duration-300 hover:brightness-95 p-3 ${
                isRecentCall || isPayment 
                  ? getTintClass(m) 
                  : 'bg-white border border-(--surface-border)'
              }`}
              style={{
                borderRadius: "12px",
              }}
            >
              <div className="relative">
                {/* PAYMENT LAYOUT (Admin Specific) */}
                {isPayment ? (
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {m.title}
                      </h4>
                      <p className="text-gray-400 mt-0.5" style={{ fontSize: "11px" }}>
                        {m.description}
                      </p>
                    </div>
                    {m.leftText && (
                      <div 
                        className="font-bold text-base"
                        style={{ color: getToneColor(m.tone) }}
                      >
                        ${m.leftText}
                      </div>
                    )}
                  </div>
                ) : isCallHistory ? (
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-gray-800 text-sm truncate">
                         {m.title}
                       </h4>
                       <div className="flex items-center gap-1.5 text-gray-500 mt-1" style={{ fontSize: "11px" }}>
                          <FiUsers size={12} className="text-gray-400" />
                          <span className="font-medium">{m.name}</span>
                       </div>
                       <p className="text-gray-400 mt-1 leading-relaxed" style={{ fontSize: "11px" }}>
                          {m.description}
                       </p>
                    </div>
                    {m.date && (
                       <Badge 
                         value={m.date} 
                         className="ml-2"
                         pt={{
                           root: {
                             style: {
                               background: '#f8fafc',
                               color: '#64748b',
                               border: '1px solid #e2e8f0',
                               fontSize: '10px',
                               fontWeight: '600',
                               borderRadius: '6px',
                               padding: '2px 8px'
                             }
                           }
                         }}
                       />
                    )}
                  </div>
                ) : (
                  /* SCHEDULE LAYOUT (isRecentCall - User Specific) */
                  isRecentCall ? (
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex flex-col items-center justify-center min-w-[55px] leading-tight">
                       <span className="font-bold text-sm" style={{ color: m.statusColor || 'var(--text-color)' }}>{m.time?.split(' ')[0]}</span>
                       <span className="text-[10px] uppercase font-semibold text-gray-400">{m.time?.split(' ')[1]}</span>
                    </div>

                    <div className="flex-1 min-w-0 ml-2">
                       <h4 className="font-bold text-gray-800 truncate" style={{ fontSize: "var(--font-size-body)" }}>
                         {m.title}
                       </h4>
                       <div className="flex flex-col text-gray-400 mt-0.5" style={{ fontSize: "11px" }}>
                          <span className="truncate">{m.name}</span>
                          {m.attendees && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <FiUsers size={12} />
                              <span>{m.attendees} attendees</span>
                            </div>
                          )}
                          {m.description && <span className="italic">{m.description}</span>}
                       </div>
                    </div>
                  </div>
                ) : (
                  /* TASK LAYOUT (Default) */
                  <div className="flex justify-between items-start">
                    {/* LEFT */}
                    <div className="flex gap-3 items-start">
                      {m.isTask && (
                        <div className="mt-0.5">
                          <Checkbox 
                            checked={m.isChecked ?? false} 
                            onChange={(e) => m.onCheck?.(e.checked ?? false)}
                            pt={{
                              box: ({ props }: any) => ({
                                className: `w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                                  props.checked 
                                    ? 'bg-emerald-500 border-emerald-500' 
                                    : 'bg-white border-gray-300'
                                }`
                              }),
                              icon: { className: 'text-white text-[10px]' }
                            }}
                          />
                        </div>
                      )}

                      {m.mainIcon && (
                        <div className="shrink-0">{m.mainIcon}</div>
                      )}
                      <div>
                        <h4 className={`text-sm font-bold text-gray-800 ${m.isChecked ? 'line-through text-gray-400' : ''}`}>
                          {m.title}
                        </h4>

                        {isDetailed && (
                          <div className="flex flex-col gap-1.5 mt-2 transition-all">
                            {m.time && (
                              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                <FiClock size={14} className="text-gray-300" />
                                <span>{m.time}</span>
                              </div>
                            )}
                            {m.company && (
                              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                <FiBriefcase size={14} className="text-gray-300" />
                                <span>{m.company}</span>
                              </div>
                            )}
                            {m.attendees !== undefined && (
                              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                <FiUsers size={14} className="text-gray-300" />
                                <span>{m.attendees} attendees</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-1.5">
                          {m.priority && (
                             <span className="px-2.5 py-0.5 rounded-full font-bold" 
                              style={{ 
                                fontSize: "10px",
                                backgroundColor: m.priority === 'high' ? 'var(--priority-high-bg)' : m.priority === 'medium' ? 'var(--priority-medium-bg)' : 'var(--priority-low-bg)',
                                color: m.priority === 'high' ? 'var(--priority-high-text)' : m.priority === 'medium' ? 'var(--priority-medium-text)' : 'var(--priority-low-text)'
                              }}
                            >
                              {m.priority} priority
                            </span>
                          )}
                          
                          {m.role && (
                            <span className="text-[10px] text-gray-400 font-medium">
                              {m.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">
                      {m.rightContent && m.rightContent}
                      {m.leftText && <span className="font-semibold text-(--text-color)">${m.leftText}</span>}
                      {m.showToggle && (
                        <InputSwitch
                          checked={m.toggleValue ?? false}
                          onChange={(e) => m.onToggleChange?.(e.value)}
                        />
                      )}
                      {m.date && (
                        <Badge
                          value={m.date}
                          className="rounded-full px-2 py-1"
                          style={{
                            fontSize: "11px",
                            background: "var(--light-secondary-light)",
                            color: "var(--secondary-color)",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Footer ===== */}
      {footerLabel && (
        <button
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm transition hover:!bg-emerald-50 hover:!text-emerald-600 hover:!border-emerald-200"
          style={{
            background: "white",
            border: "1px solid var(--surface-border)",
            color: "var(--text-color)",
            borderRadius: "var(--border-radius)",
          }}
        >
          {FooterIcon && <FooterIcon size={14} />}
          {footerLabel}
        </button>
      )}
    </div>
    </Card>
  
  );
};

export default MeetingCard;
