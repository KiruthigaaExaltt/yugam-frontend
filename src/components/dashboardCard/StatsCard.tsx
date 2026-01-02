// import type { ReactNode } from "react";
// import { ProgressBar } from "primereact/progressbar";

// interface StatsCardProps {
//   title: string;
//   value: string | number;
//   icon: ReactNode;

//   accentColor?: string;

//   badgeText?: string;
//   badgeColor?: string;

//   trendText?: string;
//   trendPositive?: boolean;

//   progress?: number;

//   iconPosition?: "left" | "right";
//   trendPercent?: string; // New prop
//   trendLabel?: string;
//   targetText?: string; // New prop
//   subtitle?: string;
//   variant?: "default" | "compact";
//   bgClass?: string; 
//   valueAlign?: "center" | "right";
//   showLabel?: boolean;
//   forceBlackText?: boolean;
 
// }

// const StatsCard = ({
//   title,
//   value,
//   accentColor,
//   icon,
//   forceBlackText = false,
//   bgClass = "bg-white",
//   badgeText,
//   badgeColor = "bg-blue-50 text-blue-600",
//   trendPercent,
//   trendLabel,
//   trendPositive = true,
//   targetText,
//   progress,
//   iconPosition = "left",
//   variant = "default",
// }: StatsCardProps) => {
//   const isRight = iconPosition === "right";
//   const isCompact = variant === "compact";

//   return (
//     <div
//       className={`relative ${bgClass}  bg-white rounded-xl border border-gray-200 p-5 shadow-sm
//       before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-xl ${accentColor}`}
//     >
//       <div
//         className={`flex items-start justify-between gap-4 ${
//           isRight ? "flex-row" : "flex-row-reverse"
//         }`}
//       >
//         {/* CONTENT */}
//         <div className={`flex-1 ${isRight ? "text-left" : "text-right"}`}>
//           <p className="text-sm text-gray-500">{title}</p>
//           <h3 className="text-2xl font-semibold mt-1">{value}</h3>
//           {targetText && (
//             <span className="text-sm text-gray-400 mt-1">{targetText}</span>
//           )}

//           {/* Trend Text */}
//           {trendPercent || trendLabel ? (
//             <p
//               className={`mt-1 text-sm ${
//                 forceBlackText
//                   ? "text-gray-800"
//                   : trendPositive
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {trendPercent && (
//                 <span>
//                   {trendPositive ? "↑" : "↓"}
//                   {trendPercent}
//                 </span>
//               )}
//               {trendLabel && <span className="block">{trendLabel}</span>}
//             </p>
//           ) : null}
//         </div>

//         {/* ICON + BADGE (ALWAYS TOGETHER) */}
//         <div className="flex flex-col items-start gap-3 min-w-[50px]">
//           <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
//             {icon}
//           </div>

//           {badgeText && (
//             <span
//               className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${badgeColor}`}
//             >
//               {badgeText}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* PROGRESS */}
//       {typeof progress === "number" && (
//         <div className={`${isCompact ? "mt-2" : "mt-2"}`}>
//           <ProgressBar value={progress} showValue={false} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatsCard;
import type { ReactNode } from "react";
import { Card } from "primereact/card";
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
  variant = "default",
}: StatsCardProps) => {
  const isRight = iconPosition === "right";

  return (

    
 <Card
  className={`relative rounded-xl border shadow-sm ${bgClass} before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-xl ${accentColor}`}
 
  style={{
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--surface-border)",
    boxShadow: "var(--card-shadow)",
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
          className={`flex-1 ${isRight ? "text-left" : "text-right"} `}
          style={{ color: "var(--text-color)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {title}
          </p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {targetText && (
            <span className="text-xs mt-1  bg-gray-100" style={{ color: "var(--text-muted)" }}>
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
       <div className="flex flex-col items-start gap-2 min-w-[50px] h-full justify-between">

          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--icon-bg)" }}
          >
            {icon}
          </div>

          {badgeText && (
            <span
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${badgeColor}`}
              style={{
                backgroundColor: badgeColor ? undefined : "var(--badge-info-bg)",
                color: badgeColor ? undefined : "var(--badge-info-text)",
              }}
            >
              {badgeText}
            </span>
          )}
        </div>
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

