import { useForm, FormProvider, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus, Plus, Save } from "lucide-react";
import { RHFInput, RDropdown, RCalendar } from "../../../../components/common/HOC/form/RHFFields";
import PhoneNumberField from "../../../../components/common/HOC/phonenumber/PhoneNumberField";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import ReusableDialog from "../../../../components/common/HOC/dialog/ReusableDialog";

interface EmployeeFormProps {
  visible: boolean;
  onHide: () => void;
  employeeId?: string | null;
}

const employeeSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  employeeId: yup.string().required("Employee ID is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().test("is-valid-phone", "Invalid phone number", (value) => !value || isValidPhoneNumber(value)).required("Phone number is required"),
  department: yup.string().required("Department is required"),
  designation: yup.string().required("Designation is required"),
  joiningDate: yup.date().nullable().required("Joining date is required"),
  salary: yup.number().typeError("Salary must be a number").positive("Salary must be positive").required("Salary is required"),
});

const DEPARTMENT_OPTIONS = [
  { label: "Design", value: "Design" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Finance", value: "Finance" },
];

const EmployeeForm = ({ visible, onHide, employeeId }: EmployeeFormProps) => {
  const isEdit = !!employeeId;

  const methods = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      fullName: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: null as any,
      salary: undefined as any,
    },
  });

  const onEmployeeSubmit = async (formData: any) => {
    try {
      console.log("Form Data:", formData);
      // Placeholder for API call
      toast.success(`Employee ${isEdit ? 'updated' : 'added'} successfully`);
      handleHide();
    } catch (error: any) {
      toast.error(`Failed to ${isEdit ? 'update' : 'add'} employee`);
    }
  };

  const handleHide = () => {
    onHide();
    methods.reset();
  };

  const body = (
    <FormProvider {...methods}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-2">
        <RHFInput
          name="fullName"
          label="Full Name"
          vertical={true}
          placeholder="Enter full name"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <RHFInput
          name="employeeId"
          label="Employee ID"
          vertical={true}
          placeholder="e.g. EMP001"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <RHFInput
          name="email"
          label="Email"
          vertical={true}
          placeholder="e.g. employee@company.com"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <Controller
          name="phone"
          control={methods.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text-color)]">Phone</label>
              <PhoneNumberField
                value={field.value}
                onChange={field.onChange}
                className="bg-gray-50/50 border border-[var(--surface-border)] focus:bg-white transition-all rounded-xl h-11 px-4 PhoneInput"
              />
              {fieldState.error && (
                <small className="text-red-500">{fieldState.error.message}</small>
              )}
            </div>
          )}
        />
        <RDropdown
          name="department"
          label="Select Department"
          vertical={true}
          options={DEPARTMENT_OPTIONS}
          placeholder="Choose department"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
        />
        <RHFInput
          name="designation"
          label="Designation"
          vertical={true}
          placeholder="e.g. Software Engineer"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <RCalendar
          name="joiningDate"
          label="Joining Date"
          vertical={true}
          placeholder="Select date"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
          showIcon
        />
        <RHFInput
          name="salary"
          label="Salary"
          type="number"
          vertical={true}
          placeholder="Enter salary"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl"
        />
      </form>
    </FormProvider>
  );

  return (
    <ReusableDialog
      visible={visible}
      onHide={handleHide}
      title={isEdit ? "Edit Employee" : "Add New Employee"}
      subtitle={isEdit ? "Update employee details" : "Enter the details to add a new employee to the system."}
      icon={isEdit ? <Plus size={22} className="text-[var(--primary-color)]" /> : <UserPlus size={22} className="text-[var(--primary-color)]" />}
      body={body}
      submitLabel={isEdit ? "Update Employee" : "Add Employee"}
      submitIcon={isEdit ? <Save size={18} /> : <Plus size={18} />}
      onConfirm={methods.handleSubmit(onEmployeeSubmit)}
      isLoading={false}
    />
  );
};

export default EmployeeForm;