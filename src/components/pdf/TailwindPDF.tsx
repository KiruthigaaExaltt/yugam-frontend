import { FiDownload } from "react-icons/fi";
import { generateInvoicePDF } from "../../utils/pdfutils";

export default function TailwindPDF() {
  const invoice = {
    id: "INV-2024-001",
    customer: "Acme Corporation",
    email: "billing@acme.com",
    amount: "₹15,420",
    status: "Paid",
    due: "14 Feb 2024",
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Invoice</h2>

        <button
          onClick={() => generateInvoicePDF(invoice)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FiDownload /> Download PDF
        </button>
      </div>

      {/* Invoice Content */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold">Invoice ID:</span>
          <span>{invoice.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Customer:</span>
          <span>{invoice.customer}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{invoice.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Amount:</span>
          <span>{invoice.amount}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Status:</span>
          <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm font-medium">
            {invoice.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Due Date:</span>
          <span>{invoice.due}</span>
        </div>
      </div>
    </div>
  );
}
