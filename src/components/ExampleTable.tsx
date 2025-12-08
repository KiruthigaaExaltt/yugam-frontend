// src/ExampleTable.tsx
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Table } from "./HOC/table/Table";
import usePageTitle from "./customHooks/usePageTitle";
import { generateInvoicePDF } from "../utils/pdfutils";
import { FiEye, FiEdit, FiDownload } from "react-icons/fi";

export default function ExampleTable() {
  usePageTitle("yugam | Table");

  const invoices = [
    { id: "INV-2024-001", customer: "Acme Corp", amount: "₹15,420", status: "Paid", due: "2/14/2024" },
    { id: "INV-2024-002", customer: "TechStart Ltd", amount: "₹8,750.5", status: "Pending", due: "2/17/2024" },
    { id: "INV-2024-003", customer: "Global Dynamics", amount: "₹22,100.75", status: "Overdue", due: "2/9/2024" },
  ];

  const statusTemplate = (row: any) => {
    const severity =
      row.status === "Paid"
        ? "success"
        : row.status === "Pending"
          ? "warning"
          : row.status === "Draft"
            ? "info"
            : "danger";

    return <Tag value={row.status} severity={severity} />;
  };

  const actionsTemplate = (row: any) => (
    <div className="flex gap-3 text-xl">
      <FiEye className="cursor-pointer" />
      <FiEdit className="cursor-pointer" />
      <FiDownload
        className="cursor-pointer text-blue-600"
        onClick={() => generateInvoicePDF(row)}
      />
    </div>
  );

  const columns = [
    { field: "id", header: "Invoice No" },
    { field: "customer", header: "Customer" },
    { field: "amount", header: "Amount" },
    { field: "status", header: "Status", body: statusTemplate },
    { field: "due", header: "Due Date" },
    { field: "actions", header: "Actions", body: actionsTemplate },
  ];

  return (
    <div id="invoice-pdf-area" className="p-4">
      <Table
        title="Recent Invoices"
        data={invoices}
        columns={columns}
        headerButton={
          <Button
            label="New Invoice"
            icon="pi pi-plus"
            className="p-button-sm"
          />
        }
      />
    </div>
  );
}
