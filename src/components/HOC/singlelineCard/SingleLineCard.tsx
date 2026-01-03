import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

type CardAction = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

export type CardItem = {
  label: string;
  value: React.ReactNode;
  subValue?: string;
  valueTone?: "primary" | "success" | "warning" | "danger";
  dividerBefore?: boolean;
};

type ReusableCardProps = {
  title: string;
  icon?: React.ReactNode;
  items: CardItem[];
  action?: CardAction;
  footer?: React.ReactNode;
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
}) => {
  return (
    <Card
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--surface-border)",
        borderRadius: "var(--border-radius)",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        {icon && <span>{icon}</span>}
        <h3
          className="font-medium"
          style={{
            color: "var(--text-color)",
            fontSize: "var(--font-size-body-lg)",
          }}
        >
          {title}
        </h3>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        {items.map((item, index) => (
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
      {/* FOOTER ACTION (OPTIONAL) */}
      {action && (
        <>
          <div
            className="my-4"
            style={{ height: "1px", backgroundColor: "var(--surface-border)" }}
          />

          <Button
            label={action.label}
            icon={action.icon}
            onClick={action.onClick}
            className="w-full"
            style={{
              backgroundColor: "var(--surface-hover)",
              borderColor: "var(--surface-border)",
              color: "var(--text-color)",
              fontSize: "var(--font-size-button)",
              fontWeight: "var(--font-weight-medium)",
            }}
          />
        </>
      )}
      {footer && <div className="mt-4">{footer}</div>}
    </Card>
  );
};

export default SingleLineCard;
