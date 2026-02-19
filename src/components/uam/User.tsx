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
    Settings,
} from "lucide-react";
import { useGetUsersQuery } from "./userApi";

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

    const { data, isLoading } = useGetUsersQuery();

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
                status: apiUser.status === "suspended" ? "suspended" : "active",
                lastLogin: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString() + " " + new Date(apiUser.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
                initials: (apiUser.username || "U").substring(0, 2).toUpperCase(),
                avatarBg: "#E0F2FE",
            } as User;
        });
    }, [data]);

    const statusOptions = [
        { label: "All Status", value: null },
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
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
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 border border-blue-100"
                style={{ backgroundColor: rowData.avatarBg }}
            >
                {rowData.initials}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{rowData.name}</span>
                <span className="text-xs text-gray-500">{rowData.email}</span>
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
            <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.value)}
                placeholder="All Status"
                className="w-40 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm flex items-center"
            />
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
                            User Directory
                        </h2>
                    </div>

                    <div className="p-0">
                        <ReusableCrudTable<User>
                            data={users}
                            columns={columns}
                            dataKey="id"
                            totalRecords={users.length}
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
        </div>
    );
};

export default User;
