import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../HOC/ReusableDataTable/ReusableDataTable";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
    Search,
    Filter,
    Download,
    Plus,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useGetRolesQuery, useDeleteRoleMutation } from "./roleApi";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import ConfirmationDialog from "../HOC/dialog/ConfirmationDialog";
import { toast } from "sonner";
import RoleForm from "./RoleForm";
import RoleDetailsDialog from "./RoleDetailsDialog";
import { useDebouncedValue } from "../customHooks/useDebouncedValue";

interface RoleData {
    id: string;
    roleName: string;
    roleDescription: string;
    permissions: string[];
    lastLogin: string; // Using this as 'Last Modified' or similar
    status: "active" | "denied";
}

const Role = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<RoleData[]>([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [editingById, setEditingById] = useState<string | null>(null);
    const [displayViewDialog, setDisplayViewDialog] = useState(false);
    const [viewId, setViewId] = useState<string | null>(null);

    const debouncedSearch = useDebouncedValue(globalFilter, 500);

    const { data: rolesData, isLoading } = useGetRolesQuery({
        deleted: "notdeleted",
        keyword: debouncedSearch || undefined,
        sortStatus: selectedStatus || "all",
        page: (first / rows) + 1,
        limit: rows,
    });

    const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

    const roles = useMemo(() => {
        const data = rolesData?.data;
        if (!data) return [];

        // Handle cases where data might be an object or array
        const rolesArray = Array.isArray(data) ? data : Object.values(data);

        // Filter out any entries that aren't valid role objects (e.g. metadata)
        return rolesArray
            .filter((role: any) => role && typeof role === 'object' && role._id && role.roleName)
            .map((role: any) => ({
                id: role._id,
                roleName: role.roleName,
                roleDescription: role.roleDescription || "No description provided",
                permissions: role.permissions || [],
                lastLogin: role.updatedAt ? new Date(role.updatedAt).toLocaleDateString() : "N/A",
                status: role.isDeleted ? "denied" : "active",
            } as RoleData));
    }, [rolesData]);

   

    const roleNameBodyTemplate = (rowData: RoleData) => (
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rowData?.roleName?.toLowerCase().includes('admin') ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                {rowData?.roleName?.toLowerCase().includes('admin') ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-gray-900 tracking-tight">{rowData?.roleName}</span>
                <span className="text-[10px] text-gray-400 font-mono uppercase">ID: {rowData?.id?.substring(rowData?.id?.length - 6)}</span>
            </div>
        </div>
    );

    const permissionsBodyTemplate = (rowData: RoleData) => {
        const count = rowData.permissions.length;
        return (
            <div className={`p-2 rounded-lg font-medium inline-flex items-center gap-2 ${count > 0 ? "bg-slate-50 text-slate-700" : "bg-gray-50 text-gray-400"
                }`}>
                <ShieldCheck size={14} />
                <span className="text-sm">{count} Permissions</span>
            </div>
        );
    };

    const actionsBodyTemplate = (rowData: RoleData) => (
        <div className="flex items-center gap-4">
            <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
                title="View details"
                onClick={() => {
                    setViewId(rowData.id);
                    setDisplayViewDialog(true);
                }}
            >
                <Eye size={18} />
            </button>
            <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
                title="Edit role"
                onClick={() => {
                    setEditingById(rowData.id);
                    setDisplayAddDialog(true);
                }}
            >
                <Pencil size={18} />
            </button>
            <button
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-red-500 hover:text-red-600 !cursor-pointer"
                title="Delete role"
                onClick={() => {
                    setDeleteId(rowData.id);
                    setDisplayDeleteDialog(true);
                }}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );

    const columns: CrudColumn<RoleData>[] = [
        { selectionMode: "multiple", style: { width: "3.5rem" } },
        { header: "Role Name", body: roleNameBodyTemplate, style: { minWidth: "250px" } },
        { field: "roleDescription", header: "Description", style: { minWidth: "220px" } },
        { header: "Permissions", body: permissionsBodyTemplate, style: { minWidth: "200px" } },
        { field: "lastLogin", header: "Last Modified", style: { minWidth: "150px" } },
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
                    className="w-full !pl-12 pr-4 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm"
                />
            </div>
            {/* <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.value)}
                placeholder="All Status"
                className="w-40 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm flex items-center"
            />
            <Button
                label="More Filters"
                icon={<Filter size={16} />}
                className="p-button-outlined p-button-secondary h-10 text-sm gap-2 border-gray-200 bg-white w-full sm:w-auto hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] focus:border-[var(--primary-color)] transition-all"
                style={{ borderRadius: "8px" }}
            /> */}
        </div>
    );

    const toolbarRight = (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
                label="Export"
                icon={<Download size={16} />}
                className="p-button-outlined p-button-secondary h-10 text-sm gap-2 border-gray-200 bg-white shadow-sm w-full sm:w-auto hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] focus:border-[var(--primary-color)] transition-all"
                style={{ borderRadius: "8px" }}
            />
            <Button
                label="Add Role"
                icon={<Plus size={16} />}
                className="h-10 text-sm gap-2 border-none shadow-sm font-medium w-full sm:w-auto"
                style={{ borderRadius: "8px", backgroundColor: "var(--primary-color)", color: "#fff", border: "1px solid var(--primary-color)" }}
                onClick={() => {
                    setEditingById(null);
                    setDisplayAddDialog(true);
                }}
            />
        </div>
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50/20 min-h-[calc(100vh-200px)] no-scrollbar">
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    {headerFilters}
                    {toolbarRight}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Role Management
                        </h2>
                    </div>

                    <div className="p-0">
                        <ReusableCrudTable<RoleData>
                            data={roles}
                            columns={columns}
                            dataKey="id"
                            totalRecords={roles.length}
                            selection={selectedRoles}
                            onSelectionChange={setSelectedRoles}
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

            <RoleForm
                visible={displayAddDialog}
                onHide={() => {
                    setDisplayAddDialog(false);
                    setEditingById(null);
                }}
                roleId={editingById}
            />

            <RoleDetailsDialog
                visible={displayViewDialog}
                onHide={() => {
                    setDisplayViewDialog(false);
                    setViewId(null);
                }}
                roleId={viewId}
            />

            <ConfirmationDialog
                visible={displayDeleteDialog}
                onHide={() => {
                    setDisplayDeleteDialog(false);
                    setDeleteId(null);
                }}
                onConfirm={async () => {
                    if (deleteId) {
                        try {
                            await deleteRole(deleteId).unwrap();
                            toast.success("Role deleted successfully");
                            setDisplayDeleteDialog(false);
                            setDeleteId(null);
                        } catch (error: any) {
                            toast.error(error?.data?.message || "Failed to delete role");
                        }
                    }
                }}
                title="Delete Role"
                message="Are you sure you want to delete this role? This action cannot be undone."
                confirmLabel="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default Role;
