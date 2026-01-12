import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./singlelinecard.css";

type CardAction = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

export type CardItem = {
  label: React.ReactNode;
  value: React.ReactNode;
  subValue?: string;
  valueTone?: "primary" | "success" | "warning" | "danger";
  dividerBefore?: boolean;
};

type HeaderAction = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

type ReusableCardProps = {
  title?: string;
  icon?: React.ReactNode;
  items?: CardItem[];
  action?: CardAction;
  extraButtons?: CardAction[];
  footer?: React.ReactNode;
  headerAction?: HeaderAction;
  
  // New props for Time Tracking
  bigValue?: string;
  bigValueLabel?: string;
  statusBadge?: { label: string; color?: string };
  isHoverable?: boolean; // New
};

const toneClassMap: Record<NonNullable<CardItem["valueTone"]>, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const SingleLineCard: React.FC<ReusableCardProps> = ({
  title,
  icon,
  items,
  action,
  footer,
  headerAction,
  extraButtons,
  bigValue,
  bigValueLabel,
  statusBadge,
  isHoverable = true, // Default to true for existing cards
}) => {
  return (
    <Card
      className={`rounded-(--border-radius) border shadow-sm ${
        isHoverable ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" : ""
      }`}
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--surface-border)",
        borderRadius: "var(--border-radius)",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <h3
            style={{
              color: "var(--text-color)",
              fontSize: "var(--card-title-size)",
              fontWeight: "var(--card-title-weight)"
            }}
          >
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
            {statusBadge && (
               <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: '#ecfdf5', color: '#059669' }}>
                 <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                 {statusBadge.label}
               </span>
            )}
            {headerAction && (
              <Button
                icon={headerAction.icon}
                onClick={headerAction.onClick}
                className="header-action-btn"
              />
            )}
        </div>
      </div>

      {/* BIG VALUE SECTION */}
      {bigValue && (
        <div className="flex flex-col items-center justify-center py-4">
           <div className="text-4xl font-bold text-emerald-500 leading-none">
             {bigValue}
           </div>
           {bigValueLabel && (
             <div className="text-xs text-gray-400 mt-1">
               {bigValueLabel}
             </div>
           )}
        </div>
      )}

      {/* CONTENT */}
      <div className="space-y-3">
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {/* OPTIONAL DIVIDER */}
            {item.dividerBefore && (
              <div
                className="my-3"
                style={{
                  height: "1px",
                  backgroundColor: "var(--surface-border)",
                }}
              />
            )}

            <div className="flex items-center justify-between">
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "var(--font-size-body)",
                }}
              >
                {item.label}
              </span>

              <div className="text-right">
                <div
                  className={item.valueTone ? toneClassMap[item.valueTone] : ""}
                  style={{ fontWeight: "var(--font-weight-semibold)" }}
                >
                  {item.value}
                </div>

                {item.subValue && (
                  <div
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.subValue}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* FOOTER ACTIONS */}
      {(action || extraButtons) && (
        <div className="mt-4 flex flex-col gap-2">
           {action && (
              <Button
                onClick={action.onClick}
            // className="p-button-text demo-button"

                className="w-full p-button-outlined rounded-full flex justify-center items-center gap-2 p-button-text demo-button"
                style={{
                  borderColor: "var(--surface-border)",
                  color: "var(--text-color)",
                  fontSize: "12px",
                  height: '36px',
                }}
              >
                {action.icon}
                <span>{action.label}</span>
              </Button>
           )}
           {extraButtons?.map((btn, idx) => (
              <Button
                key={idx}
                onClick={btn.onClick}
                className="w-full p-button-outlined rounded-full flex justify-center items-center gap-2 p-button-text demo-button"
                style={{
                  borderColor: "var(--surface-border)",
                  color: "var(--text-color)",
                  fontSize: "12px",
                  height: '36px',
                  fontWeight: '500'
                }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </Button>
           ))}
        </div>
      )}
      {footer && <div className="mt-4">{footer}</div>}
    </Card>
  );
};

export default SingleLineCard;
