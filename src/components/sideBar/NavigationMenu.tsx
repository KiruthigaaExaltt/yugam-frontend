// import { useState } from 'react';
// import './NavigationMenu.css';

// interface NavItem {
//   id: string;
//   label: string;
//   description: string;
//   icon: string;
// }

// interface NavCategory {
//   category: string;
//   items: NavItem[];
// }

// const NavigationMenu = () => {
//   const [activeItem, setActiveItem] = useState('pulse');

//   const navigationData: NavCategory[] = [
//     {
//       category: 'CORE',
//       items: [
//         {
//           id: 'dashboard',
//           label: 'Dashboard',
//           description: 'Main overview dashboard',
//           icon: 'pi pi-home',
//         },
//       ],
//     },
//     {
//       category: 'SALES & CRM',
//       items: [
//         {
//           id: 'orbit',
//           label: 'Orbit',
//           description: 'Sales CRM with lead manager',
//           icon: 'pi pi-users',
//         },
//         {
//           id: 'pulse',
//           label: 'Pulse',
//           description: 'Customer support system',
//           icon: 'pi pi-phone',
//         },
//         {
//           id: 'estimo',
//           label: 'Estimo',
//           description: 'Quote Generator with BOM/BOQ',
//           icon: 'pi pi-file-edit',
//         },
//       ],
//     },
//     {
//       category: 'HR & WORKFORCE',
//       items: [
//         {
//           id: 'crew',
//           label: 'Crew',
//           description: 'Human resource management',
//           icon: 'pi pi-users',
//         },
//         {
//           id: 'hire',
//           label: 'Hire',
//           description: 'Recruitment management',
//           icon: 'pi pi-list',
//         },
//         {
//           id: 'crewpay',
//           label: 'CrewPay',
//           description: 'Payroll system',
//           icon: 'pi pi-money-bill',
//         },
//       ],
//     },
//     {
//       category: 'ACCOUNTS & FINANCE',
//       items: [
//         {
//           id: 'billr',
//           label: 'Billr',
//           description: 'Quick invoicing system',
//           icon: 'pi pi-receipt',
//         },
//         {
//           id: 'payin',
//           label: 'PayIn',
//           description: 'Payment processing & checkout',
//           icon: 'pi pi-credit-card',
//         },
//         {
//           id: 'cycle',
//           label: 'Cycle',
//           description: 'Subscription management',
//           icon: 'pi pi-calendar',
//         },
//         {
//           id: 'seal',
//           label: 'Seal',
//           description: 'Digital signatures & e-sign',
//           icon: 'pi pi-shield',
//         },
//         {
//           id: 'flex',
//           label: 'Flex',
//           description: 'Workforce management & pro',
//           icon: 'pi pi-bolt',
//         },
//         {
//           id: 'trail',
//           label: 'Trail',
//           description: 'Expense management & receipt',
//           icon: 'pi pi-replay',
//         },
//       ],
//     },
//   ];

//   const handleItemClick = (itemId: string) => {
//     setActiveItem(itemId);
//     console.log(`Navigating to ${itemId}`);
//   };

//   return (
//     <div className="navigation-menu">
//       {navigationData.map((section) => (
//         <div key={section.category} className="nav-section">
//           <div className="nav-category-title">{section.category}</div>
//           <div className="nav-items">
//             {section.items.map((item) => (
//               <button
//                 key={item.id}
//                 className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
//                 onClick={() => handleItemClick(item.id)}
//               >
//                 <div className="nav-item-icon">
//                   <i className={item.icon}></i>
//                 </div>
//                 <div className="nav-item-content">
//                   <div className="nav-item-label">{item.label}</div>
//                   <div className="nav-item-description">{item.description}</div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NavigationMenu;
import { useState, type JSX } from 'react';
import './NavigationMenu.css';

import {
  PiHouseFill,
  PiUsersFill,
  PiPhoneFill,
  PiFileTextFill,
  PiListFill,
  PiMoneyFill,
  PiReceiptFill,
  PiCreditCardFill,
  PiCalendarFill,
  PiShieldFill,
  PiLightningFill,
  PiArrowCounterClockwiseFill,
} from 'react-icons/pi';

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

interface NavigationMenuProps {
  collapsed?: boolean;
}

const NavigationMenu = ({ collapsed = false }: NavigationMenuProps) => {
  const [activeItem, setActiveItem] = useState('pulse');

  const navigationData: NavCategory[] = [
    {
      category: 'CORE',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          description: 'Main overview dashboard',
          icon: <PiHouseFill />,
        },
      ],
    },
    {
      category: 'SALES & CRM',
      items: [
        { id: 'orbit', label: 'Orbit', description: 'Sales CRM', icon: <PiUsersFill /> },
        { id: 'pulse', label: 'Pulse', description: 'Customer support', icon: <PiPhoneFill /> },
        { id: 'estimo', label: 'Estimo', description: 'Quote generator', icon: <PiFileTextFill /> },
      ],
    },
    {
      category: 'HR & WORKFORCE',
      items: [
        { id: 'crew', label: 'Crew', description: 'HR management', icon: <PiUsersFill /> },
        { id: 'hire', label: 'Hire', description: 'Recruitment', icon: <PiListFill /> },
        { id: 'crewpay', label: 'CrewPay', description: 'Payroll', icon: <PiMoneyFill /> },
      ],
    },
    {
      category: 'ACCOUNTS & FINANCE',
      items: [
        { id: 'billr', label: 'Billr', description: 'Invoicing', icon: <PiReceiptFill /> },
        { id: 'payin', label: 'PayIn', description: 'Payments', icon: <PiCreditCardFill /> },
        { id: 'cycle', label: 'Cycle', description: 'Subscriptions', icon: <PiCalendarFill /> },
        { id: 'seal', label: 'Seal', description: 'E-sign', icon: <PiShieldFill /> },
        { id: 'flex', label: 'Flex', description: 'Workforce', icon: <PiLightningFill /> },
        { id: 'trail', label: 'Trail', description: 'Expenses', icon: <PiArrowCounterClockwiseFill /> },
      ],
    },
  ];

  return (
    <div className={`navigation-menu ${collapsed ? 'collapsed' : ''}`}>
      {navigationData.map((section) => (
        <div key={section.category} className="nav-section">
          {!collapsed && (
            <div className="nav-category-title">{section.category}</div>
          )}

          <div className="nav-items">
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <div className="nav-item-icon">{item.icon}</div>

                {!collapsed && (
                  <div className="nav-item-content">
                    <div className="nav-item-label">{item.label}</div>
                    <div className="nav-item-description">
                      {item.description}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;

