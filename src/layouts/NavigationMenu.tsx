import { PanelMenu } from 'primereact/panelmenu';
import type { MenuItem } from 'primereact/menuitem';

const NavigationMenu = () => {
  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => console.log('Dashboard'),
    },
    {
      label: 'Sales & CRM',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Orbit',
          icon: 'pi pi-users',
          command: () => console.log('Orbit'),
        },
        {
          label: 'Pulse',
          icon: 'pi pi-phone',
          command: () => console.log('Pulse'),
        },
        {
          label: 'Estimo',
          icon: 'pi pi-file-edit',
          command: () => console.log('Estimo'),
        },
      ],
    },
    {
      label: 'HR & Workforce',
      icon: 'pi pi-user-edit',
      items: [
        {
          label: 'Crew',
          icon: 'pi pi-fw pi-users',
          command: () => console.log('Crew'),
        },
        {
          label: 'Hire',
          icon: 'pi pi-fw pi-list',
          command: () => console.log('Hire'),
        },
        {
          label: 'CrewPay',
          icon: 'pi pi-fw pi-money-bill',
          command: () => console.log('CrewPay'),
        },
      ],
    },
    {
      label: 'Accounts & Finance',
      icon: 'pi pi-wallet',
      items: [
        {
          label: 'Billr',
          icon: 'pi pi-fw pi-receipt',
          command: () => console.log('Billr'),
        },
        {
          label: 'PayIn',
          icon: 'pi pi-fw pi-credit-card',
          command: () => console.log('PayIn'),
        },
        {
          label: 'Cycle',
          icon: 'pi pi-fw pi-calendar',
          command: () => console.log('Cycle'),
        },
        {
          label: 'Seal',
          icon: 'pi pi-fw pi-shield',
          command: () => console.log('Seal'),
        },
        {
          label: 'Flex',
          icon: 'pi pi-fw pi-bolt',
          command: () => console.log('Flex'),
        },
        {
          label: 'Trail',
          icon: 'pi pi-fw pi-replay',
          command: () => console.log('Trail'),
        },
      ],
    },
  ];

  return (
    <div className="navigation-menu">
      <PanelMenu
        model={menuItems}
        multiple={false}
        className="w-full"
      />
    </div>
  );
};

export default NavigationMenu;
