import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, Plus, Save, FileText } from "lucide-react";
import { RHFInput, RDropdown, RCalendar } from "../../../../components/common/HOC/form/RHFFields";
import { toast } from "sonner";
import ReusableDialog from "../../../../components/common/HOC/dialog/ReusableDialog";
 
 
interface DialogProps {
    visible: boolean;
    onHide: () => void;
    recordId?: string | null;
}
 
const leaveSchema = yup.object().shape({
    employeeName: yup.string().required("Employee name is required"),
    leaveType: yup.string().required("Leave type is required"),
    fromDate: yup.date().required("From date is required"),
    toDate: yup.date().required("To date is required"),
    reason: yup.string().required("Reason is required"),
});
 
const LeaveForm = ({ visible, onHide, recordId }: DialogProps) => {
    const isEdit = !!recordId;
 
    const methods = useForm({
        resolver: yupResolver(leaveSchema),
        defaultValues: {
            employeeName: "",
            leaveType: "casual",
            fromDate: null as any,
            toDate: null as any,
            reason: "",
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
            console.log("Submitting Leave Application:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
           
            toast.success(`Leave ${isEdit ? 'updated' : 'applied'} successfully`);
            onHide();
            methods.reset();
        } catch (error: any) {
            toast.error(`Failed to ${isEdit ? 'update' : 'apply'} leave`);
        }
    };
 
    const leaveTypeOptions = [
        { label: "Casual Leave", value: "casual" },
        { label: "Sick Leave", value: "sick" },
        { label: "Earned Leave", value: "earned" },
        { label: "Loss of Pay", value: "lop" },
    ];
 
    const body = (
        <FormProvider {...methods}>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <RHFInput
                        name="employeeName"
                        label="Employee Name"
                        vertical={true}
                        placeholder="e.g. Amit Kumar"
                        className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                    />
                    <RDropdown
                        name="leaveType"
                        label="Leave Type"
                        vertical={true}
                        options={leaveTypeOptions}
                        placeholder="Select leave type"
                        className="bg-white border border-gray-200 focus:border-blue-500 transition-all rounded-xl h-11"
                    />
                    <RCalendar
                        name="fromDate"
                        label="From Date"
                        vertical={true}
                        placeholder="Pick start date"
                        className="bg-white border border-gray-200 focus:border-blue-500 transition-all rounded-xl h-11"
                    />
                    <RCalendar
                        name="toDate"
                        label="To Date"
                        vertical={true}
                        placeholder="Pick end date"
                        className="bg-white border border-gray-200 focus:border-blue-500 transition-all rounded-xl h-11"
                    />
                    <div className="md:col-span-2">
                        <RHFInput
                            name="reason"
                            label="Reason"
                            vertical={true}
                            placeholder="e.g. Family function, Feeling unwell"
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
            title={isEdit ? "Edit Leave Request" : "Apply for Leave"}
            subtitle={isEdit ? "Update leave application details" : "Submit a new leave request for approval"}
            icon={isEdit ? <Calendar size={22} className="text-[var(--primary-color)]" /> : <Plus size={22} className="text-[var(--primary-color)]" />}
            body={body}
            submitLabel={isEdit ? "Update Request" : "Submit Application"}
            submitIcon={isEdit ? <Save size={18} /> : <FileText size={18} />}
            onConfirm={methods.handleSubmit(onSubmit)}
            isLoading={methods.formState.isSubmitting}
        />
    );
};
 
export default LeaveForm;