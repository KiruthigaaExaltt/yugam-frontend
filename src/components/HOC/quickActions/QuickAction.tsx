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
  tone?: "blue" | "green" | "orange" | "purple";
  type?: "action" | "stat";
};

type QuickActionsProps = {
  title?: string;
  actions: readonly QuickActionItem[];
  layout?: "grid" | "row";
};

const toneMap: Record<string, string> = {
  blue: "stat-blue",
  green: "stat-green",
  orange: "stat-orange",
  purple: "stat-purple",
};

const QuickActions: React.FC<QuickActionsProps> = ({
  title = "Quick Actions",
  actions,
  layout = "grid",
}) => {
  const isStatsLayout = actions.every((a) => a.type === "stat");

  return (
    <Card
      className="rounded-2xl border"
      style={{
        borderColor: "var(--surface-border)",
        backgroundColor: "var(--surface-card)",
      }}
    >
      {/* TITLE */}
      <div
        className="mb-4 font-medium"
        style={{
          color: "var(--text-color)",
          fontSize: "var(--font-size-body-lg)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        {title}
      </div>

      {/* ===================== */}
      {/*  STATS CARD LAYOUT    */}
      {/* ===================== */}
      {isStatsLayout && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`rounded-xl border p-4 text-center ${toneMap[action.tone ?? "blue"]}`}
              style={{
                borderColor: "var(--surface-border)",
                backgroundColor: "var(--surface-hover)",
              }}
            >
              <div
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "inherit",
                }}
              >
                {action.value}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--text-color)",
                  marginTop: "0.25rem",
                }}
              >
                {action.label}
              </div>
              {action.subLabel && (
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
          ))}
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
    </Card>
  );
};

export default QuickActions;
