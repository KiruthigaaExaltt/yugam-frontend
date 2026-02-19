import { useState, useMemo } from "react";
import ReusableCrudTable, {
    type CrudColumn,
} from "../HOC/ReusableDataTable/ReusableDataTable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
    Search,
    Filter,
    Download,
    Plus,
    Eye,
    Pencil,
    Settings,
} from "lucide-react";
import { useGetUsersQuery } from "./userApi";

import { ShieldAlert, ShieldCheck } from "lucide-react";

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


    const { data, isLoading } = useGetUsersQuery();

    const roles = useMemo(() => {
        if (!data?.data?.items) return [];

        const uniqueRolesMap = new Map<string, RoleData>();

        data.data.items.forEach((apiUser) => {
            apiUser.roles?.forEach((role) => {
                if (!uniqueRolesMap.has(role.roleCode)) {
                    uniqueRolesMap.set(role.roleCode, {
                        id: role._id,
                        roleName: role.roleName,
                        roleDescription: role.roleDescription || "No description provided",
                        permissions: role.permissions || [],
                        lastLogin: role.updatedAt ? new Date(role.updatedAt).toLocaleDateString() : "N/A",
                        status: role.isDeleted ? "denied" : "active",
                    });
                }
            });
        });

        return Array.from(uniqueRolesMap.values());
    }, [data]);



    const roleNameBodyTemplate = (rowData: RoleData) => (
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rowData.roleName.toLowerCase().includes('admin') ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}>
                {rowData.roleName.toLowerCase().includes('admin') ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-gray-900 tracking-tight">{rowData.roleName}</span>
                <span className="text-[10px] text-gray-400 font-mono uppercase">ID: {rowData.id.substring(rowData.id.length - 6)}</span>
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

    const actionsBodyTemplate = () => (
        <div className="flex items-center gap-4">
            <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
                title="View details"
            >
                <Eye size={18} />
            </button>
            <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
                title="Edit user"
            >
                <Pencil size={18} />
            </button>
            <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
                title="User settings"
            >
                <Settings size={18} />
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
        <div className="flex items-center gap-3">
            <div className="relative">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search users..."
                    className="w-64 pl-10 pr-4 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
                />
            </div>
            <Button
                label="More Filters"
                icon={<Filter size={16} />}
                className="p-button-outlined p-button-secondary h-10 text-sm gap-2 border-gray-200 bg-white"
                style={{ borderRadius: "8px" }}
            />
        </div>
    );

    const toolbarRight = (
        <div className="flex items-center gap-3">
            <Button
                label="Export"
                icon={<Download size={16} />}
                className="p-button-outlined p-button-secondary h-10 text-sm gap-2 border-gray-200 bg-white shadow-sm"
                style={{ borderRadius: "8px" }}
            />
            <Button
                label="Add User"
                icon={<Plus size={16} />}
                className="h-10 text-sm gap-2 bg-blue-600 border-none hover:bg-blue-700 text-white shadow-sm font-medium"
                style={{ borderRadius: "8px" }}
            />
        </div>
    );

    return (
        <div className="p-6 bg-gray-50/20 min-h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
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
        </div>
    );
};

export default Role;
