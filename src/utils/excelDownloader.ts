import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
 
export const exportToExcel = (rows: any[], fileName: string) => {
  const formatted = rows.map((item) => ({
    ...item,
    dob: item.dob, // leave DOB as string
  }));
 
  const sheet = XLSX.utils.json_to_sheet(formatted);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Sheet1");
 
  const excelBuffer = XLSX.write(book, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
 
  saveAs(blob, `${fileName}.xlsx`);
};