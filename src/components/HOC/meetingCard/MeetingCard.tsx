import React from "react";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";
import type { IconType } from "react-icons";
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
}) => {
  return (
    // <Card
    //   className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&_.p-card-body]:p-3!"
    //   style={{
    //     borderColor: "var(--surface-border)",
    //     backgroundColor: "var(--surface-card)",
    //     borderRadius: "var(--border-radius)",
    //   }}
    // >
     <div className="flex flex-col gap-3">
      {/* ===== Header ===== */}
      {title && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-(--text-color)">
            {title}
          </h3>

          {showAdd && (
            addButtonLabel ? (
              <button
                onClick={onAddClick}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition hover:shadow-md"
                style={{
                  background: "white",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-color)"
                }}
              >
                {AddIcon ? <AddIcon size={14} /> : <span>+</span>}
                {addButtonLabel}
              </button>
            ) : (
                <button
                onClick={onAddClick}
                className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-50 transition"
                style={{
                  background: "white",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-color)"
                }}
              >
                {AddIcon ? <AddIcon size={14} /> : <span>+</span>}
              </button>
            )
          )}
        </div>
      )}

      {/* ===== Cards ===== */}
      <div className="flex flex-col gap-3">
        {meetings.map((m, i) => {
          const Icon = m.icon;

          return (
            <Card
              key={i}
              className="cursor-pointer rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&_.p-card-body]:p-3!"
              style={{
                borderColor: "var(--surface-border)",
                 borderRadius: "var(--border-radius)",
              }}
            >
              {/* ===== Top Row ===== */}
              <div className="flex justify-between items-start">
                {/* LEFT */}
                <div className="flex gap-3 items-start">
                   {/* Task Checkbox */}
                   {m.isTask && (
                     <div className="mt-0.5">
                       <Checkbox 
                        checked={m.isChecked ?? false} 
                        onChange={(e) => m.onCheck?.(e.checked ?? false)}
                        className={m.isChecked ? "p-checkbox-checked" : ""}
                        icon={<i className="pi pi-check" style={{ fontSize: '10px' }} />}
                       />
                     </div>
                   )}

                  {m.mainIcon && (
                     <div className="shrink-0">
                       {m.mainIcon}
                     </div>
                  )}
                  <div>
                    <h4 className={`text-sm font-medium text-(--text-color) ${m.isChecked ? 'line-through text-gray-400' : ''}`}>
                      {m.title}
                    </h4>

                    {m.tags && m.tags.length > 0 && (
                        <div className="flex gap-2 mt-1.5 flex-wrap items-center">
                            {m.tags.map((tag, idx) => (
                                <span 
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md text-xs font-medium"
                                    style={{
                                        backgroundColor: tag.color.includes('red') ? '#FEE2E2' : 
                                                         tag.color.includes('green') ? '#D1FAE5' : 
                                                         tag.color.includes('yellow') ? '#FEF3C7' : 
                                                         tag.color.includes('blue') ? '#DBEAFE' : '#F3F4F6',
                                        color: tag.color.includes('red') ? '#DC2626' : 
                                               tag.color.includes('green') ? '#059669' : 
                                               tag.color.includes('yellow') ? '#D97706' : 
                                               tag.color.includes('blue') ? '#2563EB' : '#4B5563'
                                    }}
                                >
                                    {tag.label}
                                </span>
                            ))}
                            
                            {m.dueDate && (
                                <span 
                                    className="text-xs ml-2"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    Due: {m.dueDate}
                                </span>
                            )}
                        </div>
                    )}

                    {m.description && (
                      <p className="text-xs text-(--text-muted) mt-1">
                        {m.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  {m.rightContent && m.rightContent}
                  
                  {m.leftText && (
                    <span className="font-semibold text-(--text-color)">
                      ${m.leftText}
                    </span>
                  )}

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
                        background: "#E8F1FF",
                        color: "#2563EB",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* ===== Custom Children (e.g. Permissions) ===== */}
              {m.children && (
                <div className="mt-3">
                   {m.children}
                </div>
              )}

              {/* ===== Extra Info ===== */}
              <div className="mt-2 text-xs text-(--text-muted) space-y-1">
                {m.name && (
                  <div className="flex items-center gap-2">
                    {Icon && <Icon size={12} />}
                    {m.name}
                  </div>
                )}

                {!isRecentCall && m.time && <div>🕒 {m.time}</div>}
                {!isRecentCall && m.attendees !== undefined && (
                  <div>👥 {m.attendees} attendees</div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* ===== Footer ===== */}
      {footerLabel && (
        <button
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm transition hover:!bg-green-50 hover:!text-green-600 hover:!border-green-200"
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
  );
};

export default MeetingCard;
