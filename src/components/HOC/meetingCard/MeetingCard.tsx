// import React from "react";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import type { IconType } from "react-icons";
import { FiBriefcase, FiChevronRight, FiClock, FiUsers } from "react-icons/fi";
import "./mettingCard.css";

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
  highlight?: boolean;
  badgeText?: string;
  timestamp: string;


  showToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;

  isTask?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
  tags?: Array<{ label: string; color: string }>;
  dueDate?: string;

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

  variant?: "list" | "cards";
  titleIcon?: IconType;
  titleIconColor?: string;

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
  badgeText?: string;
  showArrowOnly?: boolean;
}

/* ================= COMPONENT ================= */

const MeetingCard: React.FC<MeetingSectionProps> = ({
  title,
  meetings,
  variant = "list",
  showAdd,
  addIcon: AddIcon,
  addButtonLabel,
  onAddClick,
  footerLabel,
  footerIcon: FooterIcon,
  isRecentCall,
  isDetailed,
  isPayment,
  headerAction,
  badgeText,

  showArrowOnly,
  titleIcon: TitleIcon,
  titleIconColor,
}) => {
  const getTintClass = (m: MeetingItem) => {
    if (m.tone === "blue" || m.statusColor?.includes("3b82f6"))
      return "bg-[#EEF2FF]";
    if (m.tone === "purple" || m.statusColor?.includes("a855f7"))
      return "bg-[#F5F3FF]";
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

  const ItemLayout = ({ m }: { m: MeetingItem }) => {
    const Icon = m.icon;
    return (
      <div className="flex flex-col gap-1 w-full relative">
        {/* TOP ROW */}
        <div className="flex justify-between items-start w-full">
          {/* LEFT SECTION */}
          <div className="flex gap-3 items-start flex-1 min-w-0">
            {/* Payment or Activity Style Logo/Icon */}
            {(isPayment || m.tone) && m.icon && (
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200`}
                style={{
                  backgroundColor: m.tone ? `var(--tint-${m.tone})` : 'white',
                  boxShadow: !m.tone ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                }}
              >
                <m.icon
                  size={18}
                  style={{ color: m.tone ? getToneColor(m.tone) : 'inherit' }}
                />
              </div>
            )}

            {/* Task Checkbox */}
            {m.isTask && (
              <div className="mt-0.5">
                <Checkbox
                  checked={m.isChecked ?? false}
                  onChange={(e) => m.onCheck?.(e.checked ?? false)}
                  className={m.isChecked ? "p-checkbox-checked" : ""}
                  icon={
                    <i className="pi pi-check" style={{ fontSize: "10px" }} />
                  }
                />
              </div>
            )}

            {/* Optional timestamp */}



            {/* General MainIcon */}
            {m.mainIcon && <div className="shrink-0">{m.mainIcon}</div>}

            {/* Recent Call Icon (Time-based Avatar-style circle) */}
            {isRecentCall && m.time && (
              <div className="flex flex-col items-center justify-center min-w-[55px] leading-tight shrink-0">
                <span
                  className="font-bold text-sm"
                  style={{ color: m.statusColor || "var(--text-color)" }}
                >
                  {m.time.split(" ")[0]}
                </span>
                <span className="text-[10px] uppercase font-semibold text-gray-400">
                  {m.time.split(" ")[1]}
                </span>
              </div>
            )}

            {/* TITLE & INFO */}
            <div className="flex-1 min-w-0">
              <h4
                className={`text-sm font-bold text-gray-800 truncate ${m.isChecked ? "line-through text-gray-400 font-medium" : ""}`}
              >
                {m.title}
              </h4>

              {/* Tags and Due Date (Task style) */}
              {m.tags && m.tags.length > 0 && (
                <div className="flex gap-2 mt-1.5 flex-wrap items-center">
                  {m.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
                      style={{
                        backgroundColor:
                          tag.color === "red"
                            ? "#FEE2E2"
                            : tag.color === "yellow"
                              ? "#FEF3C7"
                              : tag.color === "green"
                                ? "#D1FAE5"
                                : tag.color === "blue"
                                  ? "#DBEAFE"
                                  : "#F3F4F6",
                        color:
                          tag.color === "red"
                            ? "#EF4444"
                            : tag.color === "yellow"
                              ? "#D97706"
                              : tag.color === "green"
                                ? "#10B981"
                                : tag.color === "blue"
                                  ? "#3B82F6"
                                  : "#4B5563",
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                  {m.dueDate && (
                    <span className="text-[10px] text-gray-400 font-medium">
                      Due: {m.dueDate}
                    </span>
                  )}
                </div>
              )}

              {/* Priority & Role (Alt Task style) */}
              {!m.tags && (m.priority || m.role) && (
                <div className="flex items-center gap-3 mt-1.5">
                  {m.priority && (
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold"
                      style={{
                        fontSize: "10px",
                        backgroundColor:
                          m.priority === "high"
                            ? "var(--priority-high-bg)"
                            : m.priority === "medium"
                              ? "var(--priority-medium-bg)"
                              : "var(--priority-low-bg)",
                        color:
                          m.priority === "high"
                            ? "var(--priority-high-text)"
                            : m.priority === "medium"
                              ? "var(--priority-medium-text)"
                              : "var(--priority-low-text)",
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
              )}

              {/* Name (Call style) */}
              {m.name && (
                <div
                  className="flex items-center gap-1.5 text-gray-500 mt-1"
                  style={{ fontSize: "11px" }}
                >
                  {Icon && <Icon size={12} className="text-gray-400" />}
                  <span className="font-medium">{m.name}</span>
                </div>
              )}

              {/* Description */}
              {m.description && (
                <p
                  className="text-gray-400 mt-0.5 leading-relaxed"
                  style={{ fontSize: "11px" }}
                >
                  {m.description}
                </p>
              )}
              {m.timestamp && (
                <span className="text-xs text-gray-400 shrink-0 mt-1">
                  {m.timestamp}
                </span>
              )}

              {/* Detailed schedule info */}
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
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 shrink-0 ml-2">
            {m.rightContent}

            {m.leftText && (
              <div
                className="font-bold text-base"
                style={{ color: getToneColor(m.tone) }}
              >
                ${m.leftText}
              </div>
            )}

            {m.showToggle && (
              <InputSwitch
                checked={m.toggleValue ?? false}
                onChange={(e) => m.onToggleChange?.(e.value)}
                className="scale-75"
                pt={{
                  slider: {
                    style: {
                      backgroundColor: m.toggleValue
                        ? "var(--primary-color)"
                        : "",
                      border: m.toggleValue
                        ? "1px solid var(--primary-color)"
                        : "",
                    },
                  },
                }}
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

            {showArrowOnly && (
              <FiChevronRight size={18} className="text-gray-400" />
            )}
          </div>
        </div>

        {/* CUSTOM CHILDREN (Settings permissions etc) */}
        {m.children && <div className="mt-3">{m.children}</div>}
      </div>
    );
  };

  const Content = (
    <div className="flex flex-col gap-3">
      {/* HEADER */}
      {title && (
        <div className="flex justify-between items-center mb-1">
          <h3
            className="text-(--text-color)"
            style={{
              fontSize: "var(--card-title-size)",
              fontWeight: "var(--card-title-weight)",
            }}
          >
            <div className="flex items-center gap-2">
              {TitleIcon && (
                <TitleIcon
                  size={18}
                  style={{ color: titleIconColor || "var(--primary-color)" }}
                />
              )}
              {title}
            </div>
          </h3>

          <div className="flex items-center gap-2">
            {headerAction && (
              <Button
                onClick={headerAction.onClick}
                icon={
                  headerAction.icon ? (
                    <headerAction.icon size="var(--header-action-icon-size)" />
                  ) : undefined
                }
                className={
                  !headerAction.label
                    ? "header-action-btn"
                    : "p-button-text demo-button"
                }

              // className="p-button-outlined p-button-sm !rounded-md !border-gray-100 font-medium hover:!border-emerald-500 hover:!text-emerald-500 hover:!bg-emerald-50 transition-all text-gray-400 bg-white shadow-sm w-8 h-8 p-0"
              />
            )}

            {showAdd && (
              <Button
                onClick={onAddClick}
                label={addButtonLabel}
                icon={
                  AddIcon ? (
                    <AddIcon size="var(--header-action-icon-size)" />
                  ) : (
                    <span>+</span>
                  )
                }
                className={
                  !addButtonLabel
                    ? "header-action-btn"
                    : "p-button-text demo-button"
                }
                style={
                  !addButtonLabel
                    ? {
                      background: "white",
                      border: "1px solid var(--surface-border)",
                      color: "var(--text-color)",
                    }
                    : {
                      background: "white",
                      border: "1px solid var(--surface-border)",
                      color: "var(--text-color)",
                      borderRadius: "var(--border-radius)",
                      padding: "0.25rem 0.75rem",
                    }
                }
              />
            )}
            {badgeText && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {badgeText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ITEMS */}
      <div className="flex flex-col gap-3">
        {meetings.map((m, i) =>
          variant === "cards" ? (
            <Card
              key={i}
              className="cursor-pointer rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&_.p-card-body]:p-3!"
              style={{
                borderColor: "var(--surface-border)",
                borderRadius: "var(--border-radius)",
              }}
            >
              <ItemLayout m={m} />
            </Card>
          ) : (
            <div
              key={i}
              className={`cursor-pointer transition-all duration-300 hover:brightness-95 p-3 ${isRecentCall || isPayment
                ? getTintClass(m)
                : "bg-white border border-(--surface-border)"
                }`}
              style={{
                borderRadius: "12px",
              }}
            >
              <ItemLayout m={m} />
            </div>
          ),
        )}
      </div>

      {/* FOOTER */}
      {footerLabel && (
        <button className="meeting-footer-btn">
          {FooterIcon && <FooterIcon size={14} />}
          {footerLabel}
        </button>
      )}
    </div>
  );

  // If list variant with title, wrap the whole thing once
  return variant === "list" && title ? (
    <Card
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&_.p-card-body]:p-3!"
      style={{
        borderColor: "var(--surface-border)",
        backgroundColor: "var(--surface-card)",
        borderRadius: "var(--border-radius)",
      }}
    >
      {Content}
    </Card>
  ) : (
    Content
  );
};

export default MeetingCard;
