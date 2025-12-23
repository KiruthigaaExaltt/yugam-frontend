import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./quickaction.css";

export type QuickActionItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type QuickActionsProps = {
  title?: string;
  actions: QuickActionItem[];
  layout?: "grid" | "row";
};

const QuickActions: React.FC<QuickActionsProps> = ({
  title = "Quick Actions",
  actions,
  layout = "grid",
}) => {
  return (
    <Card className="rounded-2xl bg-(--surface-card) border border-(--surface-border)">
      <div className="mb-4 text-sm font-medium text-(--text-color)">
        {title}
      </div>

      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              label={action.label}
              onClick={action.onClick}
              className="quick-action-btn h-24 w-full rounded-xl flex flex-col items-center justify-center gap-2"
              icon={() =>
                action.icon ? (
                  <span className="text-lg">{action.icon}</span>
                ) : null
              }
            />
          ))}
        </div>
      )}

      {layout === "row" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              label={action.label}
              onClick={action.onClick}
              className="quick-action-btn h-20 w-full rounded-xl flex flex-col items-center justify-center gap-2"
              icon={() =>
                action.icon ? (
                  <span className="text-lg">{action.icon}</span>
                ) : null
              }
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default QuickActions;
