import type { ReactNode } from "react";
import { ProgressBar } from "primereact/progressbar";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;

  accentColor?: string;

  badgeText?: string;
  badgeColor?: string;

  trendText?: string;
  trendPositive?: boolean;

  progress?: number;

  iconPosition?: "left" | "right";
  trendPercent?: string; // New prop
  trendLabel?: string;
  targetText?: string; // New prop
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
  bgClass = "bg-white",
  badgeText,
  badgeColor = "bg-blue-50 text-blue-600",
  trendPercent,
  trendLabel,
  trendPositive = true,
  targetText,
  progress,
  iconPosition = "left",
  variant = "default",
}: StatsCardProps) => {
  const isRight = iconPosition === "right";
  const isCompact = variant === "compact";

  return (
    <div
      className={`relative ${bgClass}  bg-white rounded-xl border border-gray-200 p-5 shadow-sm
      before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-xl ${accentColor}`}
    >
      <div
        className={`flex items-start justify-between gap-4 ${
          isRight ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* CONTENT */}
        <div className={`flex-1 ${isRight ? "text-left" : "text-right"}`}>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {targetText && (
            <span className="text-sm text-gray-400 mt-1">{targetText}</span>
          )}

          {/* Trend Text */}
          {trendPercent || trendLabel ? (
            <p
              className={`mt-1 text-sm ${
                forceBlackText
                  ? "text-gray-800"
                  : trendPositive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
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

        {/* ICON + BADGE (ALWAYS TOGETHER) */}
        <div className="flex flex-col items-start gap-3 min-w-[50px]">
          <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
            {icon}
          </div>

          {badgeText && (
            <span
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${badgeColor}`}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>

      {/* PROGRESS */}
      {typeof progress === "number" && (
        <div className={`${isCompact ? "mt-2" : "mt-2"}`}>
          <ProgressBar value={progress} showValue={false} />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
