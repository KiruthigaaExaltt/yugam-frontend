import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Save, MonitorSmartphone } from "lucide-react";
import { RHFInput, RDropdown, RCalendar } from "../../../../components/common/HOC/form/RHFFields";
import { toast } from "sonner";
import ReusableDialog from "../../../../components/common/HOC/dialog/ReusableDialog";

interface AssestsFormProps {
  visible: boolean;
  onHide: () => void;
  assetId?: string | null;
}

const assetSchema = yup.object().shape({
  employeeId: yup.string().required("Employee is required"),
  assetName: yup.string().required("Asset name is required"),
  assetType: yup.string().required("Asset type is required"),
  assetId: yup.string().required("Asset ID is required"),
  allocatedDate: yup.date().nullable().required("Allocated date is required"),
  condition: yup.string().required("Condition is required"),
  value: yup.number().typeError("Value must be a number").positive("Value must be positive").required("Value is required"),
  status: yup.string().required("Status is required"),
});

const EMPLOYEE_OPTIONS = [
  { label: "Jabastin", value: "EMP001" },
  { label: "Priya Patel", value: "EMP002" },
  { label: "Amit Kumar", value: "EMP003" },
];

const ASSET_TYPE_OPTIONS = [
  { label: "Laptop", value: "laptop" },
  { label: "Monitor", value: "monitor" },
  { label: "Mobile", value: "mobile" },
  { label: "Other", value: "other" },
];

const CONDITION_OPTIONS = [
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" },
];

const STATUS_OPTIONS = [
  { label: "Allocated", value: "allocated" },
  { label: "Returned", value: "returned" },
];

const AssestsForm = ({ visible, onHide, assetId }: AssestsFormProps) => {
  const isEdit = !!assetId;

  const methods = useForm({
    resolver: yupResolver(assetSchema),
    defaultValues: {
      employeeId: "",
      assetName: "",
      assetType: "laptop",
      assetId: "",
      allocatedDate: null as any,
      condition: "good",
      value: undefined as any,
      status: "allocated",
    },
  });

  const onAssetSubmit = async (formData: any) => {
    try {
      console.log("Form Data:", formData);
      // Placeholder for API call
      toast.success(`Asset ${isEdit ? 'updated' : 'allocated'} successfully`);
      handleHide();
    } catch (error: any) {
      toast.error(`Failed to ${isEdit ? 'update' : 'allocate'} asset`);
    }
  };

  const handleHide = () => {
    onHide();
    methods.reset();
  };

  const body = (
    <FormProvider {...methods}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-2">
        <RDropdown
          name="employeeId"
          label="Select Employee"
          vertical={true}
          options={EMPLOYEE_OPTIONS}
          placeholder="Choose employee"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
        />
        <RHFInput
          name="assetName"
          label="Asset Name"
          vertical={true}
          placeholder="e.g. MacBook Pro 14"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <RDropdown
          name="assetType"
          label="Asset Type"
          vertical={true}
          options={ASSET_TYPE_OPTIONS}
          placeholder="Choose type"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
        />
        <RHFInput
          name="assetId"
          label="Asset ID"
          vertical={true}
          placeholder="e.g. LAPTOP-001"
          className="bg-gray-50/50 border-[var(--surface-border)] focus:bg-white transition-all rounded-xl"
        />
        <RCalendar
          name="allocatedDate"
          label="Allocated Date"
          vertical={true}
          placeholder="Select date"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
          showIcon
        />
        <RDropdown
          name="condition"
          label="Condition"
          vertical={true}
          options={CONDITION_OPTIONS}
          placeholder="Choose condition"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
        />
        <RHFInput
          name="value"
          label="Value (₹)"
          type="number"
          vertical={true}
          placeholder="e.g. 150000"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl"
        />
        <RDropdown
          name="status"
          label="Status"
          vertical={true}
          options={STATUS_OPTIONS}
          placeholder="Choose status"
          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl h-11"
        />
      </form>
    </FormProvider>
  );

  return (
    <ReusableDialog
      visible={visible}
      onHide={handleHide}
      title={isEdit ? "Edit Asset" : "Allocate New Asset"}
      subtitle={isEdit ? "Update asset details" : "Enter the details to allocate a new asset to an employee."}
      icon={<MonitorSmartphone size={22} className="text-[var(--primary-color)]" />}
      body={body}
      submitLabel={isEdit ? "Update Asset" : "Allocate Asset"}
      submitIcon={isEdit ? <Save size={18} /> : <Plus size={18} />}
      onConfirm={methods.handleSubmit(onAssetSubmit)}
      isLoading={false}
    />
  );
};

export default AssestsForm;