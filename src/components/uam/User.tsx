import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../HOC/ReusableDataTable/ReusableDataTable";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
    Search,
    Download,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { useGetUsersQuery, useDeleteUserMutation } from "./userApi";
import AddUserDialog from "./AddUserDialog";
import ConfirmationDialog from "../HOC/dialog/ConfirmationDialog";
import { toast } from "sonner";

import { useDebouncedValue } from "../customHooks/useDebouncedValue";

interface User {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    status: "active" | "suspended";
    lastLogin: string;
    initials: string;
    avatarBg: string;
}

const User = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const { data, isLoading } = useGetUsersQuery({
        deleted: "notdeleted",
        keyword: debouncedSearch || undefined,
        sortStatus: selectedStatus || "all",
        page: (first / rows) + 1,
        limit: rows,
    });
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const users = useMemo(() => {
        if (!data?.data?.items) return [];

        return data.data.items.map((apiUser) => {
            const primaryRole = apiUser.roles?.[0]?.roleName || "No Role";
            return {
                id: apiUser._id,
                name: apiUser.username || "Unknown",
                email: apiUser.email || "N/A",
                department: "General", // Default value as it's not in the API
                role: primaryRole,
                status: apiUser.accountstatus,
                lastLogin: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString() + " " + new Date(apiUser.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
                initials: (apiUser.username || "U").substring(0, 2).toUpperCase(),
                avatarBg: "#E0F2FE",
            } as User;
        });
    }, [data]);

    const statusOptions = [
        { label: "All Status", value: "all" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Suspended", value: "Suspended" },
    ];

    const getStatusColor = (status: User["status"]) => {
        switch (status) {
            case "active":
                return { bg: "#DCFCE7", text: "#166534" };
            case "suspended":
                return { bg: "#FEE2E2", text: "#991B1B" };
            default:
                return { bg: "#F3F4F6", text: "#374151" };
        }
    };

    const nameBodyTemplate = (rowData: User) => (
        <div className="flex items-center gap-3">
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border"
                style={{
                    color: 'var(--primary-color)',
                    borderColor: 'var(--primary-color-light)',
                    backgroundColor: rowData.avatarBg || 'var(--primary-color-light)'
                }}
            >
                {rowData.initials}
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-gray-900 tracking-tight">{rowData.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{rowData.email}</span>
            </div>
        </div>
    );

    const statusBodyTemplate = (rowData: User) => {
        const { bg, text } = getStatusColor(rowData.status);
        return (
            <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider"
                style={{ backgroundColor: bg, color: text }}
            >
                {rowData.status}
            </span>
        );
    };

    const actionsBodyTemplate = (rowData: User) => (
        <div className="flex items-center gap-4">
            <button
                className="p-1 hover:bg-[var(--surface-hover)] rounded-lg transition-colors text-[var(--text-muted)] !cursor-pointer"
                title="Edit user"
                onClick={() => {
                    setEditingUserId(rowData.id);
                    setDisplayAddDialog(true);
                }}
            >
                <Pencil size={18} />
            </button>
            <button
                className="p-1 hover:bg-[var(--surface-hover)] rounded-lg transition-colors text-red-500 hover:text-red-600 !cursor-pointer"
                title="Delete user"
                onClick={() => {
                    setDeletingUserId(rowData.id);
                    setDisplayDeleteDialog(true);
                }}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );

    const columns: CrudColumn<User>[] = [
        { selectionMode: "multiple", style: { width: "3.5rem" } },
        { header: "User", body: nameBodyTemplate, style: { minWidth: "250px" } },
        { field: "department", header: "Department", style: { minWidth: "150px" } },
        { field: "role", header: "Role", style: { minWidth: "180px" } },
        { header: "Status", body: statusBodyTemplate, style: { minWidth: "120px" } },
        { field: "lastLogin", header: "Last Login", style: { minWidth: "180px" } },
        {
            header: "Actions",
            body: actionsBodyTemplate,
            style: { minWidth: "150px" },
        },
    ];

    const headerFilters = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search users..."
                    className="w-full !pl-12 pr-4 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all text-[var(--text-color)]"
                />
            </div>
            <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.value)}
                placeholder="All Status"
                className="w-full sm:w-40 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm flex items-center focus-within:border-[var(--primary-color)] focus-within:ring-2 focus-within:ring-[var(--primary-color-light)] text-[var(--text-color)]"
            />
        </div>
    );

    const toolbarRight = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
                label="Export"
                icon={<Download size={16} />}
                className="p-button-outlined p-button-secondary h-10 text-sm gap-2 border-[var(--surface-border)] bg-[var(--surface-card)] shadow-sm hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] focus:border-[var(--primary-color)] transition-all w-full sm:w-auto text-[var(--text-color)]"
                style={{ borderRadius: "8px" }}
            />
            <Button
                label="Add User"
                icon={<Plus size={16} />}
                className="h-10 text-sm gap-2 border-none shadow-sm font-medium w-full sm:w-auto"
                style={{
                    borderRadius: "8px",
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                    border: "1px solid var(--primary-color)"
                }}
                onClick={() => {
                    setEditingUserId(null);
                    setDisplayAddDialog(true);
                }}
            />
        </div>
    );

    return (
        <div className="p-4 sm:p-6 bg-transparent min-h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--surface-border)] shadow-sm">
                    {headerFilters}
                    {toolbarRight}
                </div>

                <div className="bg-[var(--surface-card)] rounded-xl shadow-sm border border-[var(--surface-border)] overflow-hidden">
                    <div className="px-6 py-5 border-b border-[var(--surface-border)] flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[var(--text-color)]">
                            User Directory
                        </h2>
                    </div>

                    <div className="p-0">
                        <ReusableCrudTable<User>
                            data={users}
                            columns={columns}
                            dataKey="id"
                            totalRecords={data?.data?.totalItems || users.length}
                            selection={selectedUsers}
                            onSelectionChange={setSelectedUsers}
                            globalFilter={globalFilter}
                            onGlobalFilterChange={setGlobalFilter}
                            page={first / rows}
                            rows={rows}
                            onPageChange={(e: any) => {
                                setFirst(e.first);
                                setRows(e.rows);
                            }}
                            loading={isLoading}
                            title=""
                            toolbar={false}
                            showSearch={false}
                            isCard={false}
                        />
                    </div>
                </div>
            </div>

            <AddUserDialog
                visible={displayAddDialog}
                onHide={() => {
                    setDisplayAddDialog(false);
                    setEditingUserId(null);
                }}
                userId={editingUserId}
            />

            <ConfirmationDialog
                visible={displayDeleteDialog}
                onHide={() => {
                    setDisplayDeleteDialog(false);
                    setDeletingUserId(null);
                }}
                onConfirm={async () => {
                    if (deletingUserId) {
                        try {
                            await deleteUser(deletingUserId).unwrap();
                            toast.success("User deleted successfully");
                            setDisplayDeleteDialog(false);
                            setDeletingUserId(null);
                        } catch (error: any) {
                            toast.error(error?.data?.message || "Failed to delete user");
                        }
                    }
                }}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmLabel="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default User;
