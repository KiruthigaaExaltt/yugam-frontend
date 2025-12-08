import html2pdf from "html2pdf.js";

export interface Html2PdfOptions {
    filename?: string;
    margin?: number;
    scale?: number;
    format?: "a4" | "letter";
    orientation?: "portrait" | "landscape";
}

export const downloadHtmlAsPdf = (
    element: HTMLElement,
    options?: Html2PdfOptions
) => {
    if (!element) return;

    const settings = {
        filename: options?.filename || "document.pdf",
        margin: options?.margin || 10,
        html2canvas: {
            scale: options?.scale || 2,
            useCORS: true,
        },
        jsPDF: {
            unit: "mm",
            format: options?.format || "a4",
            orientation: options?.orientation || "portrait",
        },
    };

    return html2pdf().from(element).set(settings).save();
};
