import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";

export default function Invoice() {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">
      <div
        ref={invoiceRef}
        className="bg-white shadow-lg rounded-xl border border-gray-300 p-8 w-[550px]"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Invoice</h1>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg hover:bg-[#1d4ed8]"
          >
            <FaDownload />
            Download PDF
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Invoice ID:</span>
            <span>INV-2024-001</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Customer:</span>
            <span>Acme Corporation</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Email:</span>
            <span>billing@acme.com</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Amount:</span>
            <span>₹15,420</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Status:</span>
            <span className="bg-[#d1fae5] text-[#065f46] px-3 py-1 rounded-md">
              Paid
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Due Date:</span>
            <span>14 Feb 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
