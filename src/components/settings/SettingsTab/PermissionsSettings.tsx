import { useState } from "react";
import ReusableCrudTable, { type CrudColumn } from "../../HOC/ReusableDataTable/ReusableDataTable";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { FiLayout, FiUsers, FiCheckSquare, FiFolder, FiShare2, FiMessageSquare, FiCalendar, FiDatabase, FiFileText, FiDollarSign, FiBox, FiSettings } from "react-icons/fi";
import PermissionWorkspaceScoping from "./PermissionWorkspaceScoping";


const ROLES = [
  { label: "Administrator", value: "Administrator" },
  { label: "Manager", value: "Manager" },
  { label: "Staff", value: "Staff" },
  { label: "Client", value: "Client" },
];

// ... (PermissionModule interface)
interface PermissionModule {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canApprove: boolean;
}

const MODULES_DATA: PermissionModule[] = [
  { id: 1, name: "Dashboards", description: "Analytics and overview dashboards", icon: <FiLayout />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 2, name: "CRM", description: "Customer relationship management", icon: <FiUsers />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 3, name: "Tasks", description: "Task management and tracking", icon: <FiCheckSquare />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 4, name: "Projects", description: "Project management and collaboration", icon: <FiFolder />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 5, name: "Social Media", description: "Social media management", icon: <FiShare2 />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 6, name: "Messages", description: "Team and client messaging", icon: <FiMessageSquare />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 7, name: "Meetings & Calls", description: "Meeting management and calls", icon: <FiCalendar />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 8, name: "Data Storage", description: "File storage and collateral hub", icon: <FiDatabase />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 9, name: "Reports", description: "Analytics and reporting", icon: <FiFileText />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 10, name: "Accounts", description: "Financial management", icon: <FiDollarSign />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 11, name: "Inventory", description: "Asset and resource management", icon: <FiBox />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
  { id: 12, name: "Settings", description: "System configuration", icon: <FiSettings />, canView: true, canCreate: true, canEdit: true, canDelete: true, canExport: true, canApprove: true },
];

const ModuleCell = ({ name, description, icon }: { name: string; description: string; icon: React.ReactNode }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="mt-1 text-gray-500 text-lg">{icon}</div>
    <div>
      <div className="font-medium text-gray-800 dark:text-gray-100">{name}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

const ToggleCell = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
  <div className="flex justify-start pl-1">
    <InputSwitch 
      checked={checked} 
      onChange={(e) => onChange(e.value)} 
      className="scale-75"
      pt={{
        slider: {
          style: {
            backgroundColor: checked ? 'var(--primary-color)' : '',
            borderColor: checked ? 'var(--primary-color)' : ''
          }
        }
      }}
    />
  </div>
);

const PermissionsSettings = () => {
  const [selectedRole, setSelectedRole] = useState("Administrator");
  const [modules, setModules] = useState<PermissionModule[]>(MODULES_DATA);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(50);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleToggle = (id: number, field: keyof PermissionModule) => {
    setModules(prev => prev.map(m => {
        if (m.id === id) {
            return { ...m, [field]: !m[field] };
        }
        return m;
    }));
  };

  const paginatedData = modules.slice(page * rows, (page + 1) * rows);

  /* Helper for alignment */
  const leftAlign = { textAlign: 'left' as const };

  const columns: CrudColumn<PermissionModule>[] = [
    {
        field: "name",
        header: "Module",
        body: (d) => <ModuleCell name={d.name} description={d.description} icon={d.icon} />,
        sortable: true,
        style: { width: '250px' },
        headerStyle: { width: '250px', ...leftAlign }
    },
    {
        field: "canView",
        header: "View",
        body: (d) => <ToggleCell checked={d.canView} onChange={() => handleToggle(d.id, 'canView')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    },
    {
        field: "canCreate",
        header: "Create",
        body: (d) => <ToggleCell checked={d.canCreate} onChange={() => handleToggle(d.id, 'canCreate')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    },
    {
        field: "canEdit",
        header: "Edit",
        body: (d) => <ToggleCell checked={d.canEdit} onChange={() => handleToggle(d.id, 'canEdit')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    },
    {
        field: "canDelete",
        header: "Delete",
        body: (d) => <ToggleCell checked={d.canDelete} onChange={() => handleToggle(d.id, 'canDelete')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    },
    {
        field: "canExport",
        header: "Export",
        body: (d) => <ToggleCell checked={d.canExport} onChange={() => handleToggle(d.id, 'canExport')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    },
    {
        field: "canApprove",
        header: "Approve",
        body: (d) => <ToggleCell checked={d.canApprove} onChange={() => handleToggle(d.id, 'canApprove')} />,
        headerStyle: { ...leftAlign, width: '100px' },
        bodyStyle: { ...leftAlign, width: '100px' }
    }
  ];

  return (
    <div>
      <ReusableCrudTable
        title={
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden sm:inline">Configure permissions for:</span>
            <Dropdown
              value={selectedRole}
              options={ROLES}
              onChange={(e) => setSelectedRole(e.value)}
              className="w-full sm:w-48 rounded-xl"
              style={{ borderRadius: '0.75rem' }}
              placeholder="Select a Role"
              pt={{
                root: {
                  style: {
                    borderColor: 'var(--surface-border)',
                  }
                },
                item: ({ context }: any) => ({
                  style: {
                    backgroundColor: context.selected ? 'rgba(16, 185, 129, 0.1)' : '',
                    color: context.selected ? 'var(--primary-color)' : ''
                  }
                })
              }}
            />
          </div>
        }
        data={paginatedData}
        columns={columns}
        dataKey="id"
        totalRecords={modules.length}
        page={page}
        rows={rows}
        onPageChange={(e) => {
            setPage(e.page);
            setRows(e.rows);
        }}
        loading={false}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        paginator={modules.length > rows}
        showSearch={false}
        showGridlines={false}
      />

      <div className="mt-6">
        <PermissionWorkspaceScoping />
      </div>
    </div>
  );
};

export default PermissionsSettings;
