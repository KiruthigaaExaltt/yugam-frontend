import { useState, useRef } from "react";
import ReusableCrudTable, { type CrudColumn } from "../../HOC/ReusableDataTable/ReusableDataTable";
import { Button } from "primereact/button";
import { FiMoreHorizontal } from "react-icons/fi";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import UserForm from "./UserForm";
import ExampleCard from "./RoleCard";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  workspaces: string[];
  avatar: string;
}

const USERS_DATA: User[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@agency.com",
    role: "Administrator",
    status: "active",
    lastActive: "about 1 year ago",
    workspaces: ["main", "techstart", "+1"],
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@agency.com",
    role: "Manager",
    status: "active",
    lastActive: "about 1 year ago",
    workspaces: ["main", "techstart"],
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@agency.com",
    role: "Staff",
    status: "active",
    lastActive: "about 1 year ago",
    workspaces: ["main"],
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Jennifer Adams",
    email: "jennifer.adams@techstart.com",
    role: "Client",
    status: "active",
    lastActive: "about 1 year ago",
    workspaces: ["techstart"],
    avatar: "https://i.pravatar.cc/150?u=4",
  },
];

const ROLES = [
  { label: "All Roles", value: null },
  { label: "Administrator", value: "Administrator" },
  { label: "Manager", value: "Manager" },
  { label: "Staff", value: "Staff" },
  { label: "Client", value: "Client" },
];

const RoleBadge = ({ role }: { role: string }) => {
  const icons: Record<string, string> = {
    Administrator: "👑",
    Manager: "🛡️",
    Staff: "👤",
    Client: "🔒",
  };
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full text-xs font-medium border border-surface-200 dark:border-surface-700">
      <span>{icons[role] || "👤"}</span>
      {role}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
    {status}
  </span>
);

const UserCell = ({ data }: { data: any }) => (
  <div className="flex items-center gap-3">
    <img
      src={data.avatar}
      alt={data.name}
      className="w-8 h-8 rounded-full bg-gray-200"
    />
    <div className="flex flex-col">
      <span className="text-sm font-medium" style={{ color: "var(--text-color)" }}>
        {data.name}
      </span>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
        {data.email}
      </span>
    </div>
  </div>
);

const WorkspacesCell = ({ workspaces }: { workspaces: string[] }) => (
  <div className="flex items-center gap-1 flex-wrap">
    {workspaces.map((ws, i) => (
      <span
        key={i}
        className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 rounded-md text-xs border border-surface-200 dark:border-surface-700"
      >
        {ws}
      </span>
    ))}
  </div>
);

const UsersRolesSettings = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(5);
  
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const menu = useRef<Menu>(null);

  const menuItems = [
    { 
        label: 'Edit User', 
        icon: 'pi pi-user-edit', 
        command: () => setShowModal(true)
    },
    { 
        label: 'View Details', 
        icon: 'pi pi-eye', 
        command: () => console.log('View Details', editingUser) 
    },
    { 
        label: 'Reset Password', 
        icon: 'pi pi-key', 
        command: () => console.log('Reset Password', editingUser) 
    },
    { 
        label: 'Deactivate', 
        icon: 'pi pi-ban', 
        className: 'text-red-600',
        command: () => console.log('Deactivate', editingUser) 
    }
  ];

  // Filter Logic
  const filteredData = USERS_DATA.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(globalFilter.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  // Mock Pagination logic
  const paginatedData = filteredData.slice(page * rows, (page + 1) * rows);

  const handleSubmitUser = (formData: any) => {
    console.log("Form Submitted:", formData);
    // Here you would call API to add/update
    setShowModal(false);
    setEditingUser(null);
  };

  const columns: CrudColumn<User>[] = [
    {
      field: "name",
      header: "User",
      body: (data: User) => <UserCell data={data} />,
    },
    {
      field: "role",
      header: "Role",
      body: (data: User) => <RoleBadge role={data.role} />,
    },
    {
      field: "status",
      header: "Status",
      body: (data: User) => <StatusBadge status={data.status} />,
    },
    {
      field: "lastActive",
      header: "Last Active",
      body: (data: User) => <span className="text-sm text-gray-500">{data.lastActive}</span>,
    },
    {
      field: "workspaces",
      header: "Workspaces",
      body: (data: User) => <WorkspacesCell workspaces={data.workspaces} />,
    },
    {
      header: "Actions",
      body: (data: User) => (
        <>
            <Button
                icon={<FiMoreHorizontal />}
                className="p-button-text p-button-rounded p-button-sm text-gray-400 hover:bg-surface-100"
                onClick={(e) => {
                    setEditingUser(data);
                    menu.current?.toggle(e);
                }}
            />
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Menu model={menuItems} popup ref={menu} />

      <ReusableCrudTable
        title="Users & Roles"
        data={paginatedData}
        columns={columns}
        dataKey="id"
        totalRecords={filteredData.length}
        page={page}
        rows={rows}
        onPageChange={(e) => {
            setPage(e.page);
            setRows(e.rows);
        }}
        onAdd={() => {
            setEditingUser(null);
            setShowModal(true);
        }}
        addLabel=" + Add new user"
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        headerFilters={
          <Dropdown
            value={selectedRole}
            onChange={(e) => {
                setSelectedRole(e.value);
                setPage(0); // reset page on filter
            }}
            options={ROLES}
            placeholder="Filter by Role"
            className="w-full sm:w-48"
          />
        }
        loading={false}
        // onAdd removed to hide default toolbar button
        // onDeleteSelected when we have selection logic
      />

      <Dialog
        header={editingUser ? "Edit User" : "Add New User"}
        visible={showModal}
        style={{ width: "700px" }}
        modal
        onHide={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        contentClassName="p-0"
      >
        <div className="p-4">
            <UserForm
            initialValues={editingUser}
            onSubmit={handleSubmitUser}
            onCancel={() => setShowModal(false)}
            />
        </div>
      </Dialog>
      <ExampleCard />
    </div>
  );
};

export default UsersRolesSettings;
