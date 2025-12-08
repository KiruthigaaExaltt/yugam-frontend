
import { FaDownload } from "react-icons/fa";
import { downloadPDF } from "../../utils/pdfDownloader";

 
export default function InvoiceLineBreak() {
    return (
        <div
            className="w-full min-h-screen flex items-center justify-center p-6"
            style={{ background: "#f3f4f6" }}
        >
            <div
                id="invoice-content"
                className="shadow-lg rounded-xl border p-8 w-[800px]"
                style={{ background: "white", borderColor: "#d1d5db" }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
                        Invoice
                    </h1>
 
                    <button
                        onClick={() => downloadPDF("invoice-content", "invoice.pdf")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{ background: "#2563eb", color: "white" }}
                    >
                        <FaDownload />
                        Download PDF
                    </button>
                </div>
 
                {/* Invoice Details */}
                <div className="space-y-4" style={{ color: "#374151" }}>
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Invoice ID:
                        </span>
                        <span>INV-2024-001</span>
                    </div>
 
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Customer:
                        </span>
                        <span>Acme Corporation</span>
                    </div>
 
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Email:
                        </span>
                        <span>billing@acme.com</span>
                    </div>
 
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Amount:
                        </span>
                        <span>₹15,420</span>
                    </div>
 
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Status:
                        </span>
                        <span
                            className="px-3 py-1 rounded-md"
                            style={{ background: "#d1fae5", color: "#065f46" }}
                        >
                            Paid
                        </span>
                    </div>
 
                    <div className="flex justify-between">
                        <span className="font-semibold" style={{ color: "#111827" }}>
                            Due Date:
                        </span>
                        <span>14 Feb 2024</span>
                    </div>
                </div>
 
                {/* Line Break Test */}
                <div
                    className="mt-8 p-4 "
                    // style={{ borderColor: "#d1d5db", background: "#f9fafb" }}
                >
                    <h2
                        className="text-lg font-semibold mb-3"
                        style={{ color: "#111827" }}
                    >
                        Line Break Test Section
                    </h2>
 
                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            color: "#374151",
                        }}
                    >
                        {`
This is a test block to check line-breaking functionality.
 
Here is a manual line break.
 
Here is another line.
 
Now testing a long paragraph that should automatically wrap based on the container width. This will verify if html2canvas and jsPDF correctly wrap long text when generating the final PDF.
 
Line 1
Line 2
Line 3
Here is a manual line break.
Line 4
Line 5
This is a test block to check line-breaking functionality.
 
Here is a manual line break.
 
Here is another line.
 
Now testing a long paragraph that should automatically wrap based on the container width. This will verify if html2canvas and jsPDF correctly wrap long text when generating the final PDF.
 
Line 1
Line 2
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
 
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Line 3
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Line 3
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 2
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
Line 1
Line 3
Line 4
Line 4
Line 5
Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
 
(End of Line Break Test)
            `}
                    </div>
                </div>
            </div>
        </div>
    );
}
 