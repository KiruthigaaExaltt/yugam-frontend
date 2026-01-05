import React from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { FiEye } from "react-icons/fi";

/* =======================
   TYPES
======================= */
export interface StatItem {
  label: string;
  percent?: number;
  users?: number;
  dotColor?: string;
  barColor?: string;
  completed?: boolean;
  rightText?: string;
   subText?: string;
}

interface ReusableStatCardProps {
  title: string;
  items?: StatItem[];
  checklistItems?: StatItem[];
  showEyeButton?: boolean;
  averageText?: string;
  averagePercent?: number;
  scorePercent?: number;
  scoreLabel?: string;
  footerStats?: {
  leftLabel: string;
  leftValue: number | string;   // <-- allow string
  rightLabel: string;
  rightValue: number | string; 
   // <-- allow string
};
  children?: React.ReactNode;
}

/* =======================
   COMMON PROGRESS BAR
   (USED EVERYWHERE)
======================= */
const CommonProgressBar = ({
  value,
  color = "var(--primary-color)",
}: {
  value: number;
  color?: string;
}) => (
  <ProgressBar
    value={Number(value) || 0}   // ✅ SAFE
    showValue={false}
    pt={{
      root: {
        style: {
          height: "0.5rem",
          borderRadius: "9999px",
          backgroundColor: "#E5EDF6",
        },
      },
      value: {
        style: {
          borderRadius: "9999px",
          backgroundColor: color,
        },
      },
    }}
  />
);


/* =======================
   MAIN COMPONENT
======================= */
const ReusableStatCard: React.FC<ReusableStatCardProps> = ({
  title,
  items,
  checklistItems,
  showEyeButton = false,
  averageText,
  averagePercent,
  scorePercent,
  scoreLabel,
  footerStats,
}) => {
  return (
    <Card className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">{title}</h3>
        {showEyeButton && (
          <button className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50">
            <FiEye className="text-gray-600 text-sm" />
          </button>
        )}
      </div>

      {/* AVERAGE */}
      {averagePercent !== undefined && (
        <div className="flex justify-between text-sm mb-4">
          <span>{averageText || "Average"}</span>
          <span className="font-semibold text-(--secondary-color)">
            {averagePercent}%
          </span>
        </div>
      )}

      {/* =======================
         PROGRESS LIST
      ======================= */}
      {items && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 text-sm">
                {/* LEFT */}
                <div className="flex items-center gap-2">
                  {item.dotColor && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.dotColor }}
                    />
                  )}
                  <span>{item.label}</span>
                </div>

                {/* RIGHT — THIS IS WHERE rightText IS USED */}
                <span className="text-gray-500 whitespace-nowrap">
                  {item.rightText ?? `${item.percent}%`}
                </span>
              </div>

              {/* PROGRESS BAR */}
              {item.percent !== undefined && (
              <CommonProgressBar
                value={item.percent}
                color={item.barColor}
                
              />
              )}
              {/* SUBTEXT BELOW BAR */}
              {item.subText && (
                <p className="text-xs text-gray-400 mt-1">{item.subText}</p>
              )}
              
            </div>
            
          ))}
        </div>
      )}

      {/* =======================
         CHECKLIST
      ======================= */}
      {checklistItems && (
        <div className="mt-4 pt-4 space-y-1">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  item.completed
                    ? "border-(--primary-color) bg-(--primary-color-light) text-(--primary-color)"
                    : "border-red-400 bg-red-50 text-red-500"
                }`}
              >
                {item.completed ? "✔" : "✖"}
              </span>

              <span
                className={
                  item.completed ? "line-through text-gray-400" : ""
                }
              >
                {item.label}
              </span>
            </div>
          ))}

          <div className="border-t border-gray-200 my-3" />

          {/* COMPLIANCE SCORE */}
          {scorePercent !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">
                  {scoreLabel || "Compliance Score"}
                </span>
                <span className="font-semibold text-(--primary-color)">
                  {scorePercent}%
                </span>
              </div>

              <CommonProgressBar value={scorePercent} />
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      {footerStats && (
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="text-gray-500">{footerStats.leftLabel}</p>
            <p className="font-semibold">{footerStats.leftValue}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">{footerStats.rightLabel}</p>
            <p className="font-semibold">{footerStats.rightValue}</p>
          </div>
        </div>
      )}
     
    </Card>
  );
};

export default ReusableStatCard;


