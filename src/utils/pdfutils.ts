// src/utils/pdfUtils.ts
import jsPDF from "jspdf";

export const generateInvoicePDF = (row: any) => {
  const pdf = new jsPDF();

  pdf.setFont("Helvetica", "normal");

  pdf.setFontSize(18);
  pdf.text("Invoice", 15, 15);

  pdf.setFontSize(12);
  pdf.text(`Invoice No: ${row.id}`, 15, 30);
  pdf.text(`Customer: ${row.customer}`, 15, 40);
  pdf.text(`Amount: ${row.amount}`, 15, 50);
  pdf.text(`Status: ${row.status}`, 15, 60);
  pdf.text(`Due Date: ${row.due}`, 15, 70);

  pdf.save(`${row.id}.pdf`);
};
