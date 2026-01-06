import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./quickaction.css";

export type QuickActionItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;

  value?: string;
  subLabel?: string;
  tone?: "blue" | "green" | "orange" | "purple" | "red";
  type?: "action" | "stat";
};


type HeaderAction = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

type QuickActionsProps = {
  title?: string;
  actions?: readonly QuickActionItem[];
  layout?: "grid" | "row";
  children?: React.ReactNode;
  headerAction?: HeaderAction;
  isTinted?: boolean;
  variant?: "default" | "minimal";
};

const toneMap: Record<string, string> = {
  blue: "stat-blue",
  green: "stat-green",
  orange: "stat-orange",
  purple: "stat-purple",
  red: "stat-red",
};

const tintToneMap: Record<string, string> = {
  blue: "stat-blue-tint",
  green: "stat-green-tint",
  orange: "stat-orange-tint",
  purple: "stat-red-tint", // Purple sometimes maps to red in these designs
  red: "stat-red-tint",
};

const QuickActions: React.FC<QuickActionsProps> = ({
  title = "Quick Actions",
  actions = [],
  layout = "grid",
  children,
  headerAction,
  isTinted,
  variant = "default",
}) => {
  const isStatsLayout = actions.every((a) => a.type === "stat");

  return (
    <Card
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor: "var(--surface-border)",
        backgroundColor: "var(--surface-card)",
        borderRadius: "var(--border-radius)",
      }}
    >
      {/* TITLE */}
      <div className="flex justify-between items-start mb-4">
        <div
          style={{
            color: "var(--text-color)",
            fontSize: "var(--card-title-size)",
            fontWeight: "var(--card-title-weight)",
          }}
        >
          {title}
        </div>
        
        {headerAction && (
          <Button
            label={headerAction.label}
            icon={headerAction.icon}
            onClick={headerAction.onClick}
            className="p-button-outlined p-button-sm !rounded-full !px-3 font-medium transition-all hover:!bg-emerald-50 hover:!text-emerald-600 hover:!border-emerald-200"
            style={{
              borderColor: "var(--surface-border)",
              color: "var(--text-color)",
              background: 'white',
              fontSize: '12px',
              height: '32px'
            }}
          />
        )}
      </div>

      {/* ===================== */}
      {/*  STATS CARD LAYOUT    */}
      {/* ===================== */}
      {isStatsLayout && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const isMinimal = variant === "minimal";
            const colorTone = action.tone === "green" ? "#10B981" : 
                             action.tone === "blue" ? "#3B82F6" : 
                             action.tone === "orange" ? "#F59E0B" : 
                             action.tone === "red" ? "#EF4444" : "inherit";

            return (
              <div
                key={action.id}
                className={`rounded-xl text-center transition-all ${
                  isMinimal ? "" : (isTinted ? tintToneMap[action.tone ?? "blue"] : toneMap[action.tone ?? "blue"])
                } ${isMinimal ? "border-none" : "border"}`}
                style={{
                  borderColor: isMinimal || isTinted ? "transparent" : "var(--surface-border)",
                  backgroundColor: isMinimal ? "transparent" : (isTinted ? undefined : "var(--surface-hover)"),
                  padding: isMinimal ? "0.5rem" : "1rem"
                }}
              >
                <div
                  style={{
                    fontSize: "var(--font-size-h2)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: isMinimal ? colorTone : "inherit",
                  }}
                >
                  {action.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: isMinimal ? "var(--text-muted)" : "var(--text-color)",
                    marginTop: "0.25rem",
                    fontWeight: isMinimal ? "500" : "inherit"
                  }}
                >
                  {action.label}
                </div>
                {!isMinimal && action.subLabel && (
                  <div
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      color: "var(--text-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {action.subLabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ===================== */}
      {/*  GRID BUTTON LAYOUT   */}
      {/* ===================== */}
      {!isStatsLayout && layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              label={action.label}
              onClick={action.onClick}
              className="quick-action-btn h-24 w-full rounded-xl flex flex-col items-center justify-center gap-2"
              icon={() => (action.icon ? <span>{action.icon}</span> : null)}
              style={{
                fontSize: "var(--font-size-button)",
                fontWeight: "var(--font-weight-medium)",
              }}
            />
          ))}
        </div>
      )}

      {/* ===================== */}
      {/*  ROW BUTTON LAYOUT    */}
      {/* ===================== */}
      {!isStatsLayout && layout === "row" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              label={action.label}
              onClick={action.onClick}
              className="quick-action-btn h-20 w-full rounded-xl flex flex-col items-center justify-center gap-2"
              icon={() => (action.icon ? <span>{action.icon}</span> : null)}
              style={{
                fontSize: "var(--font-size-button)",
                fontWeight: "var(--font-weight-medium)",
              }}
            />
          ))}
        </div>
      )}
      {/* 👇 FOOTER GOES HERE */}
      {children && <div>{children}</div>}
    </Card>
  );
};

export default QuickActions;
