import * as yup from "yup";
import FormWrapper from "../../HOC/form/FormWrapper";
import { RDropdown, RHFInput, RMultiSelect } from "../../HOC/form/RHFFields";
import { Button } from "primereact/button";

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  status: yup.string().required("Status is required"),
  workspaces: yup.array().of(yup.string()).min(1, "Select at least one workspace").required(),
});

// Reuse the interface from UsersRolesSettings if possible, or redefine locally for the form
interface UserFormValues {
  name: string;
  email: string;
  role: string;
  status: string;
  workspaces: string[];
}

interface UserFormProps {
  initialValues?: UserFormValues | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ROLES_OPTIONS = [
  { label: "Administrator", value: "Administrator" },
  { label: "Manager", value: "Manager" },
  { label: "Staff", value: "Staff" },
  { label: "Client", value: "Client" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const WORKSPACE_OPTIONS = [
  { label: "Main Workspace", value: "main" },
  { label: "TechStart", value: "techstart" },
  { label: "Mobile App", value: "mobile_app" },
  { label: "Marketing", value: "marketing" },
];

const UserForm = ({ initialValues, onSubmit, onCancel }: UserFormProps) => {
  return (
    <FormWrapper
      schema={userSchema}
      onSubmit={onSubmit}
      defaultValues={{
        name: initialValues?.name ?? "",
        email: initialValues?.email ?? "",
        role: initialValues?.role ?? "",
        status: initialValues?.status ?? "active",
        workspaces: initialValues?.workspaces ?? [],
      }}
    >
      <RHFInput name="name" label="Full Name" />
      <RHFInput name="email" label="Email Address" />
      
      <RDropdown
        name="role"
        label="Role"
        options={ROLES_OPTIONS}
      />

      <RDropdown
        name="status"
        label="Status"
        options={STATUS_OPTIONS}
      />

      <RMultiSelect
        name="workspaces"
        label="Workspaces"
        options={WORKSPACE_OPTIONS}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" label="Cancel" outlined onClick={onCancel} className="p-button-secondary" />
        <Button type="submit" label={initialValues ? "Update User" : "Add User"} />
      </div>
    </FormWrapper>
  );
};

export default UserForm;
