import { useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShieldCheck, Plus, Pencil, Save } from "lucide-react";
import { RHFInput, RPermissionSelector } from "../HOC/form/RHFFields";
import {
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useGetRoleByIdQuery,
    useGetPermissionsQuery
} from "./roleApi";
import { toast } from "sonner";
import ReusableDialog from "../HOC/dialog/ReusableDialog";
import LoadingDots from "../HOC/loading/LoadingDots";

interface DialogProps {
    visible: boolean;
    onHide: () => void;
    roleId?: string | null;
}

const roleSchema = yup.object().shape({
    roleName: yup.string().required("Role name is required"),
    roleDescription: yup.string().required("Description is required"),
    permissions: yup.array().min(1, "At least one permission is required").required("Permissions are required"),
});

const RoleForm = ({ visible, onHide, roleId }: DialogProps) => {
    const isEdit = !!roleId;
    const { data: permissionsData } = useGetPermissionsQuery();
    const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
    const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
    const { data: roleResponse, isFetching: isFetchingRole } = useGetRoleByIdQuery(roleId as string, {
        skip: !roleId,
    });

    const methods = useForm({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            roleName: "",
            roleDescription: "",
            permissions: [],
        },
    });

    useEffect(() => {
        if (isEdit && roleResponse?.data) {
            const role = roleResponse.data;
            methods.reset({
                roleName: role.roleName || "",
                roleDescription: role.roleDescription || "",
                permissions: role.permissions || [],
            });
        } else if (!isEdit) {
            methods.reset({
                roleName: "",
                roleDescription: "",
                permissions: [],
            });
        }
    }, [roleResponse, isEdit, methods, visible]);

    const permissionOptions = useMemo(() => {
        const rawData = permissionsData?.data;
        if (!rawData) return [];

        // Based on the screenshot, available permissions are in data["0"].permissionsRaw
        // We iterate through all entries just in case multiple users' permissions are returned
        const allPermissions = new Set<string>();
        Object.values(rawData).forEach((item: any) => {
            if (item.permissionsRaw && Array.isArray(item.permissionsRaw)) {
                item.permissionsRaw.forEach((p: string) => allPermissions.add(p));
            }
        });

        return Array.from(allPermissions)
            .filter((perm): perm is string => perm !== null && perm !== undefined && typeof perm === "string")
            .map((perm) => ({
                label: perm.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()),
                value: perm,
            }));
    }, [permissionsData]);

    const onRoleSubmit = async (formData: any) => {
        try {
            const payload = {
                roleName: formData.roleName,
                roleDescription: formData.roleDescription,
                permissions: formData.permissions,
                roleCode: formData.roleName.toUpperCase().replace(/\s+/g, '_')
            };

            if (isEdit && roleId) {
                await updateRole({ id: roleId, body: payload }).unwrap();
                toast.success("Role updated successfully");
            } else {
                await createRole(payload).unwrap();
                toast.success("Role created successfully");
            }
            handleHide();
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} role`);
        }
    };

    const handleHide = () => {
        onHide();
        methods.reset();
    };

    const body = isFetchingRole ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
            <LoadingDots />
            <p className="text-gray-500 font-medium text-sm">Loading role data...</p>
        </div>
    ) : (
        <FormProvider {...methods}>
            <form className="space-y-6">
                <RHFInput
                    name="roleName"
                    label="Role Name"
                    vertical={true}
                    placeholder="e.g. Content Manager"
                    className="bg-[var(--surface-card)] border border-[var(--surface-border)] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all py-3 px-4 rounded-xl text-[var(--text-color)] outline-none"
                />
                <RHFInput
                    name="roleDescription"
                    label="Description"
                    vertical={true}
                    placeholder="What can this role do?"
                    className="bg-[var(--surface-card)] border border-[var(--surface-border)] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all py-3 px-4 rounded-xl text-[var(--text-color)] outline-none"
                />
                <RPermissionSelector
                    name="permissions"
                    label="Permissions"
                    vertical={true}
                    options={permissionOptions}
                    placeholder="Assign permissions to this role"
                />
            </form>
        </FormProvider>
    );

    return (
        <ReusableDialog
            visible={visible}
            onHide={handleHide}
            title={isEdit ? "Edit Role" : "Create New Role"}
            subtitle={isEdit ? "Update role description and access levels" : "Define a new role and its associated permissions"}
            icon={isEdit ? <Pencil size={22} className="text-[var(--primary-color)]" /> : <ShieldCheck size={22} className="text-[var(--primary-color)]" />}
            body={body}
            submitLabel={isEdit ? "Update Role" : "Create Role"}
            submitIcon={isEdit ? <Save size={18} /> : <Plus size={18} />}
            onConfirm={methods.handleSubmit(onRoleSubmit)}
            isLoading={isCreating || isUpdating}
        />
    );
};

export default RoleForm;
