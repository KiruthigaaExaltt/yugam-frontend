import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Clock, Save, Plus } from "lucide-react";
import { RHFInput, RDropdown } from "../../../../components/common/HOC/form/RHFFields";
import { toast } from "sonner";
import ReusableDialog from "../../../../components/common/HOC/dialog/ReusableDialog";

interface ShiftFormProps {
    visible: boolean;
    onHide: () => void;
    shiftId?: string | null;
}

const shiftSchema = yup.object().shape({
    shiftName: yup.string().required("Shift name is required"),
    startTime: yup.string().required("Start time is required"),
    endTime: yup.string().required("End time is required"),
    breakDuration: yup.string().required("Break duration is required"),
    status: yup.string().required("Status is required"),
});

const STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

const ShiftForm = ({ visible, onHide, shiftId }: ShiftFormProps) => {
    const isEdit = !!shiftId;

    const methods = useForm({
        resolver: yupResolver(shiftSchema),
        defaultValues: {
            shiftName: "",
            startTime: "09:00",
            endTime: "18:00",
            breakDuration: "60min",
            status: "active",
        },
    });

    const onSubmit = async (formData: any) => {
        try {
            console.log("Shift Form Data:", formData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success(`Shift ${isEdit ? 'updated' : 'created'} successfully`);
            handleHide();
        } catch (error: any) {
            toast.error(`Failed to ${isEdit ? 'update' : 'create'} shift`);
        }
    };

    const handleHide = () => {
        onHide();
        methods.reset();
    };

    const body = (
        <FormProvider {...methods}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-2">
                <RHFInput
                    name="shiftName"
                    label="Shift Name"
                    vertical={true}
                    placeholder="e.g. Morning Shift"
                    className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                />
                <RDropdown
                    name="status"
                    label="Status"
                    vertical={true}
                    options={STATUS_OPTIONS}
                    placeholder="Select status"
                    className="bg-white border border-gray-200 focus:border-blue-500 transition-all rounded-xl h-11"
                />
                <RHFInput
                    name="startTime"
                    label="Start Time"
                    type="time"
                    vertical={true}
                    className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                />
                <RHFInput
                    name="endTime"
                    label="End Time"
                    type="time"
                    vertical={true}
                    className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                />
                <RHFInput
                    name="breakDuration"
                    label="Break Duration"
                    vertical={true}
                    placeholder="e.g. 60min"
                    className="bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all px-4 rounded-xl text-sm"
                />
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-black border transition-all cursor-pointer ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-100'
                                    : 'bg-gray-50 text-gray-400 border-gray-100'
                                }`}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </FormProvider>
    );

    return (
        <ReusableDialog
            visible={visible}
            onHide={handleHide}
            title={isEdit ? "Edit Shift" : "Create New Shift"}
            subtitle={isEdit ? "Update shift timing and parameters" : "Define a new work schedule for employees."}
            icon={<Clock size={22} className="text-blue-600" />}
            body={body}
            submitLabel={isEdit ? "Update Shift" : "Create Shift"}
            submitIcon={isEdit ? <Save size={18} /> : <Plus size={18} />}
            onConfirm={methods.handleSubmit(onSubmit)}
            isLoading={methods.formState.isSubmitting}
        />
    );
};

export default ShiftForm;
