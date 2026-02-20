import { useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus, Plus, Pencil, Save } from "lucide-react";
import { RHFInput, RDropdown } from "../HOC/form/RHFFields";
import { useCreateUserMutation, useUpdateUserMutation, useGetUserByIdQuery } from "./userApi";
import { toast } from "sonner";
import ReusableDialog from "../HOC/dialog/ReusableDialog";
import { useGetRolesQuery } from "./roleApi";

interface AddUserDialogProps {
    visible: boolean;
    onHide: () => void;
    userId?: string | null;
}

const addUserSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().when("$isEdit", {
        is: false,
        then: (schema) => schema.min(6, "Password must be at least 6 characters").required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
    roles: yup.string().required("Role is required"),
});

const AddUserDialog = ({ visible, onHide, userId }: AddUserDialogProps) => {
    const isEdit = !!userId;
    const { data: rolesData } = useGetRolesQuery();
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const { data: userData, isFetching: isFetchingUser } = useGetUserByIdQuery(userId as string, {
        skip: !userId,
    });

    const methods = useForm({
        resolver: yupResolver(addUserSchema),
        context: { isEdit },
        defaultValues: {
            username: "",
            email: "",
            password: "",
            roles: "",
        },
    });

    useEffect(() => {
        if (isEdit && userData?.data) {
            const user = userData.data;
            methods.reset({
                username: user.username || "",
                email: user.email || "",
                password: "",
                roles: user.roles?.[0]?.roleName?.toUpperCase() || "",
            });
        } else {
            methods.reset({
                username: "",
                email: "",
                password: "",
                roles: "",
            });
        }
    }, [userData, isEdit, methods]);

    const roleOptions = useMemo(() => {
        const data = rolesData?.data;
        if (!data) return [];

        // Handle cases where data is an object with numeric keys instead of an array
        const rolesArray = Array.isArray(data) ? data : Object.values(data);

        return rolesArray.map((role: any) => ({
            label: role.roleName,
            value: role?.roleCode,
        }));
    }, [rolesData]);

    const onAddUserSubmit = async (formData: any) => {
        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                roles: [formData.roles]
            } as any;

            if (formData.password) {
                payload.password = formData.password;
            }

            if (isEdit && userId) {
                await updateUser({ id: userId, body: payload }).unwrap();
                toast.success("User updated successfully");
            } else {
                await createUser(payload).unwrap();
                toast.success("User added successfully");
            }
            onHide();
            methods.reset();
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${isEdit ? 'update' : 'add'} user`);
        }
    };

    const handleHide = () => {
        onHide();
        methods.reset();
    };

    const body = isFetchingUser ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <i className="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
            <p className="text-gray-500 font-medium">Loading user data...</p>
        </div>
    ) : (
        <FormProvider {...methods}>
            <form className="space-y-6">
                <RHFInput
                    name="username"
                    label="Username"
                    vertical={true}
                    placeholder="Enter username"
                    className="bg-gray-50/50 border-gray-200! focus:border-blue-500! focus:bg-white transition-all py-3 px-4 rounded-xl text-gray-800 placeholder:text-gray-400"
                />
                <RHFInput
                    name="email"
                    label="Email address"
                    vertical={true}
                    placeholder="name@company.com"
                    type="email"
                    className="bg-gray-50/50 border-gray-200! focus:border-blue-500! focus:bg-white transition-all py-3 px-4 rounded-xl text-gray-800 placeholder:text-gray-400"
                />
                {!isEdit && (
                    <RHFInput
                        name="password"
                        label={isEdit ? "New Password (Leave blank to keep current)" : "Password"}
                        vertical={true}
                        placeholder="••••••••"
                        type="password"
                        className="bg-gray-50/50 border-gray-200! focus:border-blue-500! focus:bg-white transition-all py-3 px-4 rounded-xl text-gray-800 placeholder:text-gray-400"
                    />
                )}
                <RDropdown
                    name="roles"
                    label="Role"
                    vertical={true}
                    options={roleOptions}
                    placeholder="Select a role"
                    className="bg-gray-50/50 border-gray-200! focus:border-blue-500! transition-all py-2 rounded-xl text-gray-800"
                />
            </form>
        </FormProvider>
    );

    return (
        <ReusableDialog
            visible={visible}
            onHide={handleHide}
            title={isEdit ? "Edit User" : "Add New User"}
            subtitle={isEdit ? "Modify user details and roles" : "Create a new user account and assign roles"}
            icon={isEdit ? <Pencil size={22} /> : <UserPlus size={22} />}
            body={body}
            submitLabel={isEdit ? "Update User" : "Create User"}
            submitIcon={isEdit ? <Save size={18} /> : <Plus size={18} />}
            onConfirm={methods.handleSubmit(onAddUserSubmit)}
            isLoading={isCreating || isUpdating}
        />
    );
};

export default AddUserDialog;
