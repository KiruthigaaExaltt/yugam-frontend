// // import React from "react";
// // import { Button } from "primereact/button";

// // interface PageHeaderProps {
// //   icon?: React.ReactNode;
// //   title: string;
// //   subtitle?: string;
// //   buttonLabel?: string;
// //   onButtonClick?: () => void;
// //   buttonIcon?: string;
// // }

// // const PageHeader: React.FC<PageHeaderProps> = ({
// //   icon,
// //   title,
// //   subtitle,
// //   buttonLabel,
// //   onButtonClick,
// //   buttonIcon = "pi pi-plus",
// // }) => {
// //   return (
// //     <div className="w-full bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-4">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
// //         {/* Left Section */}
// //         <div className="flex items-start gap-3">
// //           {icon && (
// //             <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
// //               {icon}
// //             </div>
// //           )}

// //           <div>
// //             <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
// //               {title}
// //             </h1>
// //             {subtitle && (
// //               <p className="text-sm text-slate-500 mt-0.5">
// //                 {subtitle}
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right Section */}
// //         {buttonLabel && (
// //           <div className="flex justify-start sm:justify-end">
// //             <Button
// //               label={buttonLabel}
// //               icon={buttonIcon}
// //               onClick={onButtonClick}
// //               className="!bg-sky-500 hover:!bg-sky-600 !border-none"
// //             />
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PageHeader;
// import React from "react";
// import { Button } from "primereact/button";

// interface PageHeaderProps {
//   icon?: React.ReactNode;
//   title: string;
//   subtitle?: string;
//   buttonLabel?: string;
//   onButtonClick?: () => void;
//   buttonIcon?: string;
// }

// const PageHeader: React.FC<PageHeaderProps> = ({
//   icon,
//   title,
//   subtitle,
//   buttonLabel,
//   onButtonClick,
//   buttonIcon = "pi pi-plus",
// }) => {
//   return (
//     <div
//       className="w-full px-4 sm:px-6 py-4"
//       style={{
//         background: "var(--surface-ground)",
//         borderColor: "var(--surface-border)",
//         fontFamily: "var(--font-primary)", // ✅ global font
//       }}
//     >
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
//         {/* Left Section */}
//         <div className="flex items-start gap-3">
//           {icon && (
//             <div
//               className="flex items-center justify-center w-10 h-10 rounded-lg"
//               style={{
//                 background: "var(--primary-color-light)",
//                 color: "var(--primary-color)",
//               }}
//             >
//               {icon}
//             </div>
//           )}

//           <div>
//             {/* Title */}
//             <h1
//               style={{
//                 fontSize: "var(--font-size-h1)",
//                 fontWeight: "var(--font-weight-semibold)",
//                 lineHeight: "var(--line-height-tight)",
//                 color: "var(--text-color)",
//               }}
//             >
//               {title}
//             </h1>

//             {/* Subtitle */}
//             {subtitle && (
//               <p
//                 style={{
//                   fontSize: "var(--font-size-body-sm)",
//                   fontWeight: "var(--font-weight-regular)",
//                   lineHeight: "var(--line-height-normal)",
//                   color: "var(--text-muted)",
//                   marginTop: "2px",
//                 }}
//               >
//                 {subtitle}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right Section */}
//         {buttonLabel && (
//           <div className="flex justify-start sm:justify-end">
//             <Button
//               label={buttonLabel}
//               icon={buttonIcon}
//               onClick={onButtonClick}
//               className="!border-none"
//               style={{
//                 background: "var(--primary-color)",
//                 color: "#fff",
//                 fontSize: "var(--font-size-button)", // ✅ token
//                 fontWeight: "var(--font-weight-medium)",
//                 fontFamily: "var(--font-primary)",
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PageHeader;
import React from "react";
import { Button } from "primereact/button";

interface PageHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  buttonIcon?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  buttonIcon = "pi pi-plus",
}) => {
  return (
    <div
      className="w-full"
      style={{
        background: "var(--surface-ground)",
        borderBottom: "1px solid var(--surface-border)",
        fontFamily: "var(--font-primary)",
        padding: "clamp(12px, 2vw, 16px)", // ✅ responsive padding
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-start gap-3">
          {icon && (
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                background: "var(--primary-color-light)",
                color: "var(--primary-color)",
                width: "clamp(36px, 4vw, 40px)",
                height: "clamp(36px, 4vw, 40px)",
              }}
            >
              {icon}
            </div>
          )}

          <div>
            {/* Title */}
            <h1
              style={{
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "var(--line-height-tight)",
                color: "var(--text-color)",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: "var(--font-size-body-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        {buttonLabel && (
          <Button
            label={buttonLabel}
            icon={buttonIcon}
            onClick={onButtonClick}
            className="!border-none"
            style={{
              background: "var(--primary-color)",
              color: "#fff",
              fontSize: "var(--font-size-button)",
              fontWeight: "var(--font-weight-medium)",
              fontFamily: "var(--font-primary)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(14px, 2.4vw, 20px)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
