import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiEye,  FiSave, FiSettings } from "react-icons/fi";

export default function ExamplePageHeader() {
  return (
    <PageHeader
      icon={<FiSettings size={18} />}
      title="Pulse"
      subtitle="Complete Customer Support & Service Management"
      actions={[
        {
          label: "Preview",
          icon: <FiEye size={16} />,
          variant: "secondary",
          onClick: () => console.log("Preview clicked"),
        },
        {
          label: "Save Changes",
          icon: <FiSave size={16} />,
          variant: "primary",
          onClick: () => console.log("Save clicked"),
        },
      ]}
    />
  );
}
