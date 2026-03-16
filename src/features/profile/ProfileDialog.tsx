import { useForm, FormProvider} from "react-hook-form";
import ReusableDialog from "../../components/common/HOC/dialog/ReusableDialog";
import { RHFInput, RCalendar, RDropdown, RFileUpload, RPhoneNumberInput } from "../../components/common/HOC/form/RHFFields";
import { User, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "primereact/button";
import ChangePasswordDialog from "./ChangePasswordDialog";


import { useGetProfileQuery, useUpdateProfileMutation } from "./profileApi";
import { useEffect } from "react";
import { primeToast } from "../../hooks/usePrimeToast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";


interface ProfileDialogProps {
    visible: boolean;
    onHide: () => void;
}

interface ProfileFormValues {
    firstName: string;
    lastName: string;
    profilePicture: any;
    dob: Date | null;
    gender: string | null;
    phoneNumber: string;
    social: string;
}

const ProfileDialog = ({ visible, onHide }: ProfileDialogProps) => {
    const user = useSelector(selectCurrentUser) || {};
    const profileId = user.profileId || "";

    const { data: profileResponse, isLoading: isFetching } = useGetProfileQuery(profileId, {
        skip: !profileId || !visible,
    });
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const methods = useForm<ProfileFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            profilePicture: null,
            dob: null,
            gender: null,
            phoneNumber: "",
            social: "",
        },
    });

    useEffect(() => {
        if (profileResponse?.data && visible) {
            const profile = profileResponse.data;
            methods.reset({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                profilePicture: null,
                dob: profile.dob ? new Date(profile.dob) : null,
                gender: profile.gender || null,
                phoneNumber: profile.phoneNumber || "",
                social: profile.social || "",
            });
        }
    }, [profileResponse, methods, visible]);

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const formattedData = {
                ...data,
                dob: data.dob ? data.dob.toISOString() : null
            };
            const response = await updateProfile({ userId: profileId, body: formattedData }).unwrap();
            if (response.success) {
                primeToast(response.message || "Profile updated successfully", "success");
                onHide();
            }
        } catch (error: any) {
            primeToast(error.data?.message || "Failed to update profile", "error");
        }
    };


    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const body = (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {isFetching ? (
                    <div className="flex items-center justify-center py-10">
                        <i className="pi pi-spin pi-spinner text-2xl" style={{ color: 'var(--primary-color)' }}></i>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <RHFInput
                                name="firstName"
                                label="First Name"
                                vertical
                                rules={{
                                    required: "First name is required",
                                    minLength: { value: 2, message: "Minimum 2 characters" }
                                }}
                            />
                            <RHFInput
                                name="lastName"
                                label="Last Name"
                                vertical
                            />
                        </div>
                        <RFileUpload
                            name="profilePicture"
                            label="Profile Picture (Optional)"
                            vertical
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <RCalendar
                                name="dob"
                                label="Date of Birth"
                                vertical
                                rules={{ required: "Date of birth is required" }}
                            />
                            <RDropdown
                                name="gender"
                                label="Gender"
                                options={genderOptions}
                                vertical
                                rules={{ required: "Gender is required" }}
                            />
                        </div>
                        <RPhoneNumberInput
                            name="phoneNumber"
                            label="Phone Number"
                            vertical
                            required
                        />
                        <RHFInput
                            name="social"
                            label="Social Link (Optional)"
                            vertical
                            rules={{
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                    message: "Enter a valid URL"
                                }
                            }}
                        />

                        <div className="pt-2  border-gray-100 mt-4">
                            <Button
                                type="button"
                                label="Change Password"
                                icon={<Lock size={16} className="mr-2" />}
                                className="p-button-text p-button-sm font-semibold"
                                style={{ color: 'var(--primary-color)' }}
                                onClick={() => setChangePasswordVisible(true)}
                            />
                        </div>
                    </>
                )}
            </form>
        </FormProvider>
    );


    return (
        <>
            <ReusableDialog
                visible={visible}
                onHide={onHide}
                title="Edit Profile"
                subtitle="Update your personal information"
                icon={<User size={24} />}
                body={body}
                onConfirm={methods.handleSubmit(onSubmit)}
                submitLabel="Save Changes"
                maxWidth="max-w-2xl"
                isLoading={isUpdating}
            />
            <ChangePasswordDialog
                visible={changePasswordVisible}
                onHide={() => setChangePasswordVisible(false)}
            />
        </>
    );


};

export default ProfileDialog;
