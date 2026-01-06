import { useState } from "react";
import ReusableCrudTable, {
  type CrudColumn,
} from "../../HOC/ReusableDataTable/ReusableDataTable"; // Adjust path if needed
import { Dropdown } from "primereact/dropdown";

/* ================================
   TYPES
================================ */
interface AuditLog {
  id: number;
  user: string;
  userSubtext: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

/* ================================
   MOCK DATA
================================ */
const AUDIT_DATA: AuditLog[] = [
  {
    id: 1,
    user: "Sarah Wilson",
    userSubtext: "Changed role from Staff to Manager for Alex Rodriguez",
    action: "Updated user permissions",
    module: "Settings",
    timestamp: "Dec 20, 21:00",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    user: "Alex Rodriguez",
    userSubtext: "Created project 'Brand Refresh Campaign'",
    action: "Created new project",
    module: "Projects",
    timestamp: "Dec 20, 19:45",
    ipAddress: "192.168.1.101",
  },
  {
    id: 3,
    user: "Sarah Wilson",
    userSubtext: "Added new integration 'Slack'",
    action: "Integration added",
    module: "Integrations",
    timestamp: "Dec 19, 14:20",
    ipAddress: "192.168.1.100",
  },
  {
    id: 4,
    user: "System",
    userSubtext: "Automated backup completed successfully",
    action: "System Backup",
    module: "System",
    timestamp: "Dec 19, 02:00",
    ipAddress: "127.0.0.1",
  },
];

const AuditLogsTable = () => {
  const [data] = useState<AuditLog[]>(AUDIT_DATA);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  /* ================================
     TEMPLATES
  ================================ */
  const userBodyTemplate = (rowData: AuditLog) => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-sm" style={{ color: "var(--text-color)" }}>
          {rowData.user}
        </span>
        <span className="text-xs text-gray-500">{rowData.userSubtext}</span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: AuditLog) => {
    return (
      <span
        className="px-3 py-1 text-xs rounded-full border"
        style={{
          backgroundColor: "var(--surface-ground)",
          borderColor: "var(--surface-border)",
          color: "var(--text-color)",
          fontWeight: 500,
        }}
      >
        {rowData.action}
      </span>
    );
  };

  /* ================================
     COLUMNS
  ================================ */
  const columns: CrudColumn<AuditLog>[] = [
    {
      field: "user",
      header: "User",
      body: userBodyTemplate,
      sortable: true,
      style: { width: "35%" },
    },
    {
      field: "action",
      header: "Action",
      body: actionBodyTemplate,
      sortable: true,
      style: { width: "20%" },
    },
    {
      field: "module",
      header: "Module",
      sortable: true,
      style: { width: "15%" },
    },
    {
      field: "timestamp",
      header: "Timestamp",
      sortable: true,
      style: { width: "15%" },
    },
    {
      field: "ipAddress",
      header: "IP Address",
      sortable: false,
      style: { width: "15%" },
    },
  ];

  /* ================================
     HEADER FILTERS
  ================================ */
  const actionOptions = [
    { label: "All Actions", value: null },
    { label: "Created", value: "Created" },
    { label: "Updated", value: "Updated" },
    { label: "Deleted", value: "Deleted" },
  ];

  const headerFilters = (
    <Dropdown
      value={selectedAction}
      options={actionOptions}
      onChange={(e) => setSelectedAction(e.value)}
      placeholder="All Actions"
      className="p-inputtext-sm w-40"
      style={{
           borderRadius: "var(--border-radius)", 
           height: "2.5rem", 
           alignItems: 'center' 
      }}
    />
  );

  return (
    <ReusableCrudTable
      title="" // No title in screenshot (search bar is the main thing)
      data={data}
      columns={columns}
      dataKey="id"
      totalRecords={data.length}
      page={first / rows}
      rows={rows}
      onPageChange={(e: any) => {
        setFirst(e.first);
        setRows(e.rows);
      }}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
      loading={false}
      onExport={true} // Shows export button
      headerFilters={headerFilters}
      showSearch={true}
    />
  );
};

export default AuditLogsTable;
