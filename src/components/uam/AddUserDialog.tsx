import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus, Plus } from "lucide-react";
import { RHFInput, RDropdown } from "../HOC/form/RHFFields";
import { useGetRolesQuery, useCreateUserMutation } from "./userApi";
import { toast } from "sonner";
import ReusableDialog from "../HOC/dialog/ReusableDialog";

interface AddUserDialogProps {
    visible: boolean;
    onHide: () => void;
}

const addUserSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    roles: yup.string().required("Role is required"),
});

const AddUserDialog = ({ visible, onHide }: AddUserDialogProps) => {
    const { data: rolesData } = useGetRolesQuery();
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

    const methods = useForm({
        resolver: yupResolver(addUserSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            roles: "",
        },
    });

    const roleOptions = useMemo(() => {
        const data = rolesData?.data;
        if (!data) return [];

        // Handle cases where data is an object with numeric keys instead of an array
        const rolesArray = Array.isArray(data) ? data : Object.values(data);

        return rolesArray.map((role: any) => ({
            label: role.roleName,
            value: role?.roleName?.toUpperCase(),
        }));
    }, [rolesData]);

    const onAddUserSubmit = async (formData: any) => {

        try {
            const payload = {
                ...formData,
                roles: [formData.roles]
            };
            await createUser(payload).unwrap();
            toast.success("User added successfully");
            onHide();
            methods.reset();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add user");
        }
    };

    const handleHide = () => {
        onHide();
        methods.reset();
    };

    const body = (
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
                <RHFInput
                    name="password"
                    label="Password"
                    vertical={true}
                    placeholder="••••••••"
                    type="password"
                    className="bg-gray-50/50 border-gray-200! focus:border-blue-500! focus:bg-white transition-all py-3 px-4 rounded-xl text-gray-800 placeholder:text-gray-400"
                />
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
            title="Add New User"
            subtitle="Create a new user account and assign roles"
            icon={<UserPlus size={22} />}
            body={body}
            submitLabel="Create User"
            submitIcon={<Plus size={18} />}
            onConfirm={methods.handleSubmit(onAddUserSubmit)}
            isLoading={isCreating}
        />
    );
};

export default AddUserDialog;
