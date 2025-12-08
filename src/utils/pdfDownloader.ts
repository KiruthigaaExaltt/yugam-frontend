// import html2pdf from "html2pdf.js";

// export const downloadPDF = (
//   elementId: string,
//   fileName: string = "document.pdf"
// ) => {
//   const element = document.getElementById(elementId);
//   if (!element) {
//     console.error(`Element with ID '${elementId}' not found`);
//     return;
//   }

//   const options = {
//     margin: 10,
//     filename: fileName,
//     html2canvas: { scale: 2 },
//     jsPDF: {
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait" as const,
//     },
//   };

//   html2pdf().set(options).from(element).save();
// };

// utils/downloadPDF.ts
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { PDFDocument, rgb, degrees } from "pdf-lib";
 
export const downloadPDF = async (
  elementId: string,
  fileName: string = "document.pdf"
) => {
  const element = document.getElementById(elementId);
  if (!element) return;
 
  const TOP_SPACING = 60;       // ⬅⬅⬅ Custom Top Spacing
  const BOTTOM_SPACING = 60;    // ⬅⬅⬅ Custom Bottom Spacing
 
  // Convert entire content to canvas
  const fullCanvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });
 
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
 
  const pxToMm = (px: number) => (px * 25.4) / 96;
 
  // Convert spacing to PDF mm
  const topMarginMM = pxToMm(TOP_SPACING);
  const bottomMarginMM = pxToMm(BOTTOM_SPACING);
 
  // Calculate viewport height in px that fits between margins
  const usableHeightMM = pdfHeight - topMarginMM - bottomMarginMM;
  const usableHeightPX = (usableHeightMM * fullCanvas.width) / pdfWidth;
 
  let renderedHeight = 0;
 
  while (renderedHeight < fullCanvas.height) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = fullCanvas.width;
    pageCanvas.height = Math.min(
      usableHeightPX,
      fullCanvas.height - renderedHeight
    );
 
    const ctx = pageCanvas.getContext("2d")!;
    ctx.drawImage(
      fullCanvas,
      0,
      renderedHeight,
      fullCanvas.width,
      pageCanvas.height,
      0,
      0,
      fullCanvas.width,
      pageCanvas.height
    );
 
    const imgData = pageCanvas.toDataURL("image/png");
 
    const imgHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
 
    if (renderedHeight === 0) {
      // FIRST PAGE
      pdf.addImage(imgData, "PNG", 0, topMarginMM, pdfWidth, imgHeight);
    } else {
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, topMarginMM, pdfWidth, imgHeight);
    }
 
    renderedHeight += usableHeightPX;
  }
 
  // Save intermediate output
  const arrayBuffer = pdf.output("arraybuffer");
 
  // ---- Add watermark (optional)
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
 

