import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiDownload,  FiSave, FiSettings } from "react-icons/fi";

export default function Header() {
  return (
    <PageHeader
      icon={<FiSettings size={18} />}
      title="Financial Management"
      subtitle="Quotes, invoices, payments, and financial tracking"
      actions={[
        {
          label: "Export",
          icon: <FiDownload size={16} />,
          variant: "secondary",
          onClick: () => console.log("Preview clicked"),
        },
        {
          label: "+ New Quote",
          icon: <FiSave size={16} />,
          variant: "primary",
          onClick: () => {
            console.log("Save clicked");
            window.dispatchEvent(new Event("settings-save-trigger"));
          },
        },
      ]}
    />
  );
}
