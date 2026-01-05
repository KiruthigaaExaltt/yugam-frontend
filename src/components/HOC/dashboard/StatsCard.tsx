import type { ReactNode } from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

interface StatsCardProps {
  title?: string;
  value?: string | number;
  icon?: ReactNode;
  accentColor?: string;
  badgeText?: string;
  badgeColor?: string;
  trendText?: string;
  trendPositive?: boolean;
  progress?: number;
  iconPosition?: "left" | "right";
  trendPercent?: string;
  trendLabel?: string;
  targetText?: string;
  subtitle?: string;
  variant?: "default" | "compact";
  bgClass?: string;
  valueAlign?: "center" | "right";
  showLabel?: boolean;
  forceBlackText?: boolean;
}

const StatsCard = ({
  title,
  value,
  accentColor,
  icon,
  forceBlackText = false,
  bgClass = "",
  badgeText,
  badgeColor = "",
  trendPercent,
  trendLabel,
  trendPositive = true,
  targetText,
  progress,
  iconPosition = "left",
}: StatsCardProps) => {
  const isRight = iconPosition === "right";
  const hasIcon = Boolean(icon);
  const hasBadge = Boolean(badgeText);

  return (
    <Card
      className={`relative rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${bgClass} before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-(--border-radius) ${accentColor} [&_.p-card-body]:py-2! [&_.p-card-body]:px-5! [&_.p-card-content]:py-2!`}
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--surface-border)",
        boxShadow: "var(--card-shadow)",
        borderRadius: "var(--border-radius)",
        minHeight: "100px",
        width: "100%",
      }}
    >
      <div
        className={`flex justify-between gap-4 h-full ${
          isRight ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex-1 ${
            !hasIcon ? "text-left" : isRight ? "text-left" : "text-right"
          }`}
          style={{ color: "var(--text-color)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {title}
          </p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {targetText && (
            <span
              className="text-xs mt-1  bg-gray-100"
              style={{ color: "var(--text-muted)" }}
            >
              {targetText}
            </span>
          )}

          {trendPercent || trendLabel ? (
            <p
              className="mt-1 text-sm"
              style={{
                color: forceBlackText
                  ? "var(--text-color)"
                  : trendPositive
                  ? "var(--secondary-color)"
                  : "red",
              }}
            >
              {trendPercent && (
                <span>
                  {trendPositive ? "↑" : "↓"}
                  {trendPercent}
                </span>
              )}
              {trendLabel && <span className="block">{trendLabel}</span>}
            </p>
          ) : null}
        </div>

        {/* ICON + BADGE */}
        {(hasIcon || hasBadge) && (
          <div className="flex flex-col items-start gap-2 min-w-[50px] h-full justify-between">
            {hasIcon && (
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "var(--icon-bg-primary)",
                  color: "var(--icon-color-primary)",
                }}
              >
                {icon}
              </div>
            )}

            {hasBadge && (
              <span
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${badgeColor}`}
                style={{
                  backgroundColor: badgeColor
                    ? undefined
                    : "var(--badge-info-bg)",
                  color: badgeColor ? undefined : "var(--badge-info-text)",
                }}
              >
                {badgeText}
              </span>
            )}
          </div>
        )}
      </div>

      {/* PROGRESS */}
      {typeof progress === "number" && (
        <div className="mt-2">
          <ProgressBar value={progress} showValue={false} />
        </div>
      )}
    </Card>
  );
};

export default StatsCard;
