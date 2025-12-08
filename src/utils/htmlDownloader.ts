import { jsPDF } from "jspdf";
import { PDFDocument, rgb, degrees } from "pdf-lib";

export const htmlDownloadPDF = async (elementId: string, fileName: string = "document.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  let y = 20;

  const nodes = element.querySelectorAll("*");

  for (const node of nodes) {

    // -----------------------------
    // Handle CLICKABLE LINKS
    // -----------------------------
    if (node instanceof HTMLElement && node.tagName === "A") {
      const text = node.innerText.trim();
      const url = node.getAttribute("href") ?? "";

      if (y > pdfHeight - 20) {
        pdf.addPage();
        y = 20;
      }

      pdf.textWithLink(text, 15, y, { url });
      y += 7;
      continue;
    }

    // -----------------------------
    // Handle NORMAL TEXT
    // -----------------------------
    if (
      node instanceof HTMLElement &&
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      const text = node.innerText.trim();
      if (!text) continue;

      const wrapped = pdf.splitTextToSize(text, pdfWidth - 30);

      for (const line of wrapped) {
        if (y > pdfHeight - 20) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 15, y);
        y += 7;
      }
    }
  }

  // ----------------------------
  // Add watermark
  // ----------------------------
  const arrayBuffer = pdf.output("arraybuffer");
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText("CONFIDENTIAL", {
      x: width / 2 - 150,
      y: height / 2,
      size: 40,
      color: rgb(0.85, 0.85, 0.85),
      rotate: degrees(30),
      opacity: 0.18,
    });
  });

  const modifiedBytes = await pdfDoc.save();
  const safeBuffer = new Uint8Array(modifiedBytes).buffer;
  const blob = new Blob([safeBuffer], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(link.href);
};
