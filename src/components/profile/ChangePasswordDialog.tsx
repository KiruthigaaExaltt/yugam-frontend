import { useForm, FormProvider } from "react-hook-form";
import ReusableDialog from "../HOC/dialog/ReusableDialog";
import { RHFInput } from "../HOC/form/RHFFields";
import { Lock } from "lucide-react";

import { useChangePasswordMutation } from "./changePasswordApi";
import { primeToast } from "../customHooks/usePrimeToast";

interface ChangePasswordDialogProps {
    visible: boolean;
    onHide: () => void;
}

const ChangePasswordDialog = ({ visible, onHide }: ChangePasswordDialogProps) => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const methods = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await changePassword(data).unwrap();
            if (response.success) {
                primeToast(response.message || "Password updated successfully", "success");
                onHide();
                methods.reset();
            } else {
                primeToast(response.message || "Failed to update password", "error");
            }
        } catch (error: any) {
            primeToast(error.data?.message || "An error occurred", "error");
        }
    };


    const body = (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    vertical
                    rules={{ required: "Current password is required" }}
                />
                <RHFInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    vertical
                    rules={{
                        required: "New password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                    }}
                />
            </form>
        </FormProvider>
    );

    return (
        <ReusableDialog
            visible={visible}
            onHide={onHide}
            title="Change Password"
            subtitle="Enter your current and new password to update"
            icon={<Lock size={24} />}
            body={body}
            onConfirm={methods.handleSubmit(onSubmit)}
            submitLabel="Update Password"
            maxWidth="max-w-md"
            isLoading={isLoading}
        />
    );
};

export default ChangePasswordDialog;
