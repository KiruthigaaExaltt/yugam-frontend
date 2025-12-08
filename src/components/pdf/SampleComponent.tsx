import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function InvoiceDownload() {
    const contentRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        if (!contentRef.current) return;

        const element = contentRef.current;

        const options = {
            filename: "invoice.pdf",
            margin: 10,
            html2canvas: {
                scale: 2,
                useCORS: true,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait" as const,
            },
        };

        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="min-h-screen p-10 flex justify-center">
            {/* PDF SAFE PAGE BREAK CSS */}
            <style>
                {`
                    .pdf-section {
                        page-break-inside: avoid;
                        break-inside: avoid;
                        padding-bottom: 12px;
                    }

                    #invoice-content {
                        page-break-inside: avoid;
                    }

                    .pdf-page {
                        page-break-before: always;
                    }
                `}
            </style>

            <div className="w-full max-w-3xl shadow-lg rounded-xl p-8 relative border">

                {/* Download Button */}
                <button
                    onClick={downloadPDF}
                    className="absolute right-6 top-6 px-4 py-2 rounded-md border"
                >
                    Download PDF
                </button>

                {/* PDF Content */}
                <div ref={contentRef} id="invoice-content" className="mt-10 pb-20">

                    {/* SECTION 1 */}
                    <div className="pdf-section">
                        <h1 className="text-2xl font-bold">Invoice</h1>

                        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                            <div className="font-semibold">Invoice ID:</div>
                            <div>INV-2024-001</div>

                            <div className="font-semibold">Customer:</div>
                            <div>Acme Corporation</div>

                            <div className="font-semibold">Email:</div>
                            <div>billing@acme.com</div>

                            <div className="font-semibold">Amount:</div>
                            <div>₹15,420</div>

                            <div className="font-semibold">Status:</div>
                            Paid

                            <div className="font-semibold">Due Date:</div>
                            <div>14 Feb 2024</div>
                        </div>
                    </div>

                    {/* SECTION 2 */}
                    <div className="pdf-section mt-10">
                        <h2 className="text-lg font-semibold mb-3">Line Break Test Section</h2>

                        <div className="whitespace-pre-wrap text-sm leading-6">
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
`}
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="pdf-section mt-4">
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            Click here to open Google
                        </a>
                    </div>

                    <div className="pdf-section mt-4">
                        <a
                            href="https://www.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            Click here to open Google
                        </a>
                    </div>

                    <div className="pdf-section">hi hello</div>

                    <div className="pdf-section mt-4">
                        <a
                            href="https://www.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            Click here to open Google
                        </a>
                    </div>

                    {/* SECTION 3 */}
                    <div className="pdf-section mt-10">
                        <div className="whitespace-pre-wrap text-sm leading-6">
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
`}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
