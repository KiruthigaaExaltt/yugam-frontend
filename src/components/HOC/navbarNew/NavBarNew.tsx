// import React from "react";

// export interface NavItem {
//   label: string;
//   value: string;
// }

// interface TopNavBarProps {
//   items: NavItem[];
//   active: string;
//   onChange: (value: string) => void;
// }

// const NavBarNew: React.FC<TopNavBarProps> = ({
//   items,
//   active,
//   onChange,
// }) => {
//   return (
//     <div>
//       <div
//         className="
//           flex flex-wrap items-stretch justify-between
//           gap-2
//           rounded-full
//           px-2
//         "
//         style={{
//           background: "var(--surface-ground)", 
//           boxShadow: "var(--card-shadow)",
//           borderRadius: "var(--border-radius)",
//         }}
//       >
//         {items.map((item) => {
//           const isActive = active === item.value;

//           return (
//             <button
//               key={item.value}
//               onClick={() => onChange(item.value)}
//               className="
//                 flex-1 min-w-[120px]
//                 text-center
//                 rounded-full
//                 px-4 py-3
//                 text-sm font-medium
//                 transition-all
//               "
//               style={{
//                 background: isActive
//                   ? "var(--surface-card)" 
//                   : "transparent",
//                 color: "var(--navbar-item-color)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background =
//                     "var(--surface-hover)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background = "transparent";
//                 }
//               }}
//             >
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default NavBarNew;
// import React from "react";

// export interface NavItem {
//   label: string;
//   value: string;
// }

// interface TopNavBarProps {
//   items: NavItem[];
//   active: string;
//   onChange: (value: string) => void;
// }

// const NavBarNew: React.FC<TopNavBarProps> = ({
//   items,
//   active,
//   onChange,
// }) => {
//   return (
//     <div>
//       <div
//         className="
//           flex flex-wrap items-stretch justify-between
//           gap-2
//           rounded-full
//           px-2
//         "
//         style={{
//           background: "var(--surface-ground)",
//           boxShadow: "var(--card-shadow)",
//           borderRadius: "var(--border-radius)",
//           fontFamily: "var(--font-primary)", // ✅ global font
//         }}
//       >
//         {items.map((item) => {
//           const isActive = active === item.value;

//           return (
//             <button
//               key={item.value}
//               onClick={() => onChange(item.value)}
//               className="
//                 flex-1 min-w-[120px]
//                 text-center
//                 rounded-full
//                 px-4 py-3
//                 transition-all
//               "
//               style={{
//                 background: isActive
//                   ? "var(--surface-card)"
//                   : "transparent",
//                 color: "var(--navbar-item-color)",

//                 /* ✅ TYPOGRAPHY FROM TOKENS */
//                 fontSize: "var(--font-size-button)",
//                 fontWeight: "var(--font-weight-medium)",
//                 lineHeight: "var(--line-height-normal)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background =
//                     "var(--surface-hover)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background = "transparent";
//                 }
//               }}
//             >
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default NavBarNew;
import React from "react";

export interface NavItem {
  label: string;
  value: string;
}

interface TopNavBarProps {
  items: NavItem[];
  active: string;
  onChange: (value: string) => void;
}

const NavBarNew: React.FC<TopNavBarProps> = ({
  items,
  active,
  onChange,
}) => {
  return (
    <div>
      <div
        className="
          flex flex-wrap items-stretch justify-between
          gap-2
          rounded-full
        "
        style={{
          background: "var(--surface-ground)",
          boxShadow: "var(--card-shadow)",
          borderRadius: "var(--border-radius)",
          fontFamily: "var(--font-primary)",
        //   padding: "clamp(4px, 1vw, 8px)", // ✅ responsive spacing
        }}
      >
        {items.map((item) => {
          const isActive = active === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className="flex-1 min-w-[110px] text-center rounded-full transition-all"
              style={{
                background: isActive
                  ? "var(--surface-card)"
                  : "transparent",
                color: "var(--navbar-item-color)",

                /* ✅ TYPOGRAPHY (responsive via clamp) */
                fontSize: "var(--font-size-button)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "var(--line-height-normal)",

                /* ✅ Responsive padding */
                padding: "clamp(8px, 1.6vw, 12px) clamp(12px, 2vw, 16px)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background =
                    "var(--surface-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavBarNew;
