// import React from "react";
// import type { ReactNode } from "react";

// import { Card } from "primereact/card";

// interface SmallCardProps {
//   style?: React.CSSProperties;
//   className?: string;
//   icon?: ReactNode;
//   title?: ReactNode;
//   mainValue?: ReactNode;
//   minWidth?: string | number;
//   maxWidth?: string | number;
//   subValue?: ReactNode;
//   targetValue?: ReactNode;
//   footerLeft?: ReactNode;
//   footerRight?: ReactNode;
//   contentPosition?: "row" | "column";
//   iconPosition?:
//   | "left"
//   | "right"
//   | "top"
//   | "bottom"
//   | "bottom-left"
//   | "bottom-right";
//   width?: string | number;
//   height?: string | number;
//   titlePosition?: "left" | "center" | "right";
//   titleWeight?: "normal" | "bold" | "bolder" | "lighter";
//   titleColor?: string;
//   titleSize?: string | number;
// }

// const SmallCard: React.FC<SmallCardProps> = ({
//   style,
//   className = "",
//   icon,
//   title,
//   mainValue,
//   subValue,
//   targetValue,
//   footerLeft,
//   footerRight,
//   contentPosition = "column",
//   iconPosition = "left",
//   width,
//   height,
//   titlePosition = "left",
//   titleWeight,
//   titleColor,
//   titleSize,
//   minWidth,
//   maxWidth,
// }) => {

//   const dynamicStyle: React.CSSProperties = {
//     ...style,
//     width: width,           // optional fixed width
//     minWidth: minWidth,     // card can grow if content is larger
//     maxWidth: maxWidth,     // optional max width
//     height,
//     backgroundColor: "var(--card-bg)"
//   };

//   // const isHorizontal = iconPosition === "left" || iconPosition === "right";
//   // const isVertical = iconPosition === "top" || iconPosition === "bottom";

//   // Special case for bottom-left and bottom-right:
//   const isBottomLeft = iconPosition === "bottom-left";
//   const isBottomRight = iconPosition === "bottom-right";

//   return (
//     <Card className={`custom-card ${className}`} style={dynamicStyle}>
//       {/* For icon on left, right, top, bottom */}
//       {(iconPosition === "left" ||
//         iconPosition === "right" ||
//         iconPosition === "top" ||
//         iconPosition === "bottom") && (
//           <div
//             className="card-wrapper"
//             style={{
//               display: "flex",
//               flexDirection:
//                 iconPosition === "left"
//                   ? "row"
//                   : iconPosition === "right"
//                     ? "row-reverse"
//                     : iconPosition === "top"
//                       ? "column"
//                       : "column-reverse",
//               alignItems: "center",
//               gap: "0.75rem",
//             }}
//           >
//             {icon && <div className="card-icon">{icon}</div>}

//             <div
//               className={`card-content ${contentPosition === "row" ? "row-layout" : "column-layout"
//                 }`}
//               style={{
//                 display: "flex",
//                 flexDirection: contentPosition === "row" ? "row" : "column",
//                 gap: "0.25rem",
//                 flex: 1,
//               }}
//             >
//               {title && (
//                 <div
//                   className={`card-title ${titlePosition}`}
//                   style={{
//                     fontWeight: titleWeight,
//                     color: titleColor || "inherit",
//                     fontSize: titleSize || "1rem",
//                     wordBreak: "break-word",  // ensures long titles wrap
//                   }}
//                 >
//                   {title}
//                 </div>
//               )}
//               {mainValue && <div className="card-main-value">{mainValue}</div>}
//               <div className="card-sub-info">
//                 {subValue && <span className="sub-value">{subValue}</span>}
//                 {targetValue && <span className="target-value">{targetValue}</span>}
//               </div>
//             </div>
//           </div>
//         )}

//       {/* For icon on bottom-left or bottom-right */}
//       {(isBottomLeft || isBottomRight) && (
//         <>
//           <div
//             className={`card-content ${contentPosition === "row" ? "row-layout" : "column-layout"
//               }`}
//             style={{
//               display: "flex",
//               flexDirection: contentPosition === "row" ? "row" : "column",
//               gap: "0.25rem",
//               flex: 1,
//             }}
//           >
//             {title && (
//               <div className={`card-title ${titlePosition}`}>{title}</div>
//             )}

//             {mainValue && <div className="card-main-value">{mainValue}</div>}

//             <div className="card-sub-info">
//               {subValue && <span className="sub-value">{subValue}</span>}
//               {targetValue && <span className="target-value">{targetValue}</span>}
//             </div>
//           </div>

//           {icon && (
//             <div
//               style={{
//                 marginTop: "0.75rem",
//                 display: "flex",
//                 justifyContent: isBottomLeft ? "flex-start" : "flex-end",
//                 width: "100%",
//               }}
//             >
//               <div className="card-icon">{icon}</div>
//             </div>
//           )}

//         </>
//       )}

//       {(footerLeft || footerRight) && (
//         <div
//           className="card-footer"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: "auto",
//             fontSize: "0.85rem",
//             color: "#666",
//           }}
//         >
//           <div className="footer-left">{footerLeft}</div>
//           <div className="footer-right">{footerRight}</div>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default SmallCard;
import { Card } from "primereact/card";
import type { ReactNode } from "react";
import "./SmallCard.css";

interface SmallCardProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  subText?: string;

  /** Optional styling */
  iconBg?: string;
  valueColor?: string;

  /** Layout control */
  minWidth?: number;
  height?: number;
}

const SmallCard: React.FC<SmallCardProps> = ({
  icon,
  title,
  value,
  subText,
  iconBg = "var(--icon-bg)",
  valueColor = "var(--text-color)",
  minWidth = 220,
  height = 90,
}) => {
  return (
    <Card className="stat-card" style={{ minWidth, height }}>
      <div className="stat-card-content">
        {/* ICON */}
        <div className="stat-icon" style={{ backgroundColor: iconBg }}>
          {icon}
        </div>

        {/* TEXT */}
        <div className="stat-text">
          <span className="stat-title">{title}</span>
          <span className="stat-value" style={{ color: valueColor }}>
            {value}
          </span>
          {subText && <span className="stat-subtext">{subText}</span>}
        </div>
      </div>
    </Card>
  );
};

export default SmallCard;
