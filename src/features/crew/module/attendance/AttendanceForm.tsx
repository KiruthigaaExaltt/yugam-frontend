import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Clock, Plus, Save, CheckCircle } from "lucide-react";
import { RHFInput, RDropdown } from "../../../../components/common/HOC/form/RHFFields";
import { toast } from "sonner";
import ReusableDialog from "../../../../components/common/HOC/dialog/ReusableDialog";
 
 
interface DialogProps {
    visible: boolean;
    onHide: () => void;
    recordId?: string | null;
}
 
const attendanceSchema = yup.object().shape({
    employeeName: yup.string().required("Employee name is required"),
    status: yup.string().oneOf(["present", "absent", "late", "on leave"]).required("Status is required"),
    checkIn: yup.string().when("status", {
        is: "present",
        then: (schema) => schema.required("Check-in time is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
    checkOut: yup.string().notRequired(),
    location: yup.string().required("Location is required"),
});
 
const AttendanceForm = ({ visible, onHide, recordId }: DialogProps) => {
    const isEdit = !!recordId;
 
    const methods = useForm({
        resolver: yupResolver(attendanceSchema),
        defaultValues: {
            employeeName: "",
            status: "present",
            checkIn: "",
            checkOut: "",
            location: "Office",
        },
    });
 
    useEffect(() => {
        if (!visible) {
            methods.reset();
        }
    }, [visible, methods]);
 
    const onSubmit = async (formData: any) => {
        try {
            // Mocking API call
            console.log("Submitting Attendance:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
           
            toast.success(`Attendance ${isEdit ? 'updated' : 'marked'} successfully`);
            onHide();
            methods.reset();
        } catch (error: any) {
            toast.error(`Failed to ${isEdit ? 'update' : 'mark'} attendance`);
        }
    };
 
    const statusOptions = [
        { label: "Present", value: "present" },
        { label: "Absent", value: "absent" },
        { label: "Late", value: "late" },
        { label: "On Leave", value: "on leave" },
    ];
 
    const body = (
        <FormProvider {...methods}>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <RHFInput
                        name="employeeName"
                        label="Employee Name"
                        vertical={true}
                        placeholder="e.g. Jabastin"
                        className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                    />
                    <RDropdown
                        name="status"
                        label="Status"
                        vertical={true}
                        options={statusOptions}
                        placeholder="Select status"
                        className="bg-white border border-gray-200 focus:border-blue-500 transition-all rounded-xl h-11"
                    />
                    <RHFInput
                        name="checkIn"
                        label="Check In Time"
                        type="time"
                        vertical={true}
                        className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                    />
                    <RHFInput
                        name="checkOut"
                        label="Check Out Time"
                        type="time"
                        vertical={true}
                        className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                    />
                    <div className="md:col-span-2">
                        <RHFInput
                            name="location"
                            label="Location"
                            vertical={true}
                            placeholder="e.g. Office, WFH"
                            className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
 
    return (
        <ReusableDialog
            visible={visible}
            onHide={() => {
                onHide();
                methods.reset();
            }}
            title={isEdit ? "Edit Attendance" : "Mark Attendance"}
            subtitle={isEdit ? "Update attendance details for the employee" : "Record arrival and departure times for today"}
            icon={isEdit ? <Clock size={22} className="text-[var(--primary-color)]" /> : <Plus size={22} className="text-[var(--primary-color)]" />}
            body={body}
            submitLabel={isEdit ? "Update Attendance" : "Mark Attendance"}
            submitIcon={isEdit ? <Save size={18} /> : <CheckCircle size={18} />}
            onConfirm={methods.handleSubmit(onSubmit)}
            isLoading={methods.formState.isSubmitting}
        />
    );
};
 
export default AttendanceForm;