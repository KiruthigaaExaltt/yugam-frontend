 
import { useMemo } from "react";
import type { FC } from "react";
 
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
 
import { exportToExcel } from "../../utils/excelDownloader";
 
type Row = {
  id: number;
  name: string;
  email: string;
  amount: number;
  dob: string;
  working: string;
  company: string;
  status: "Paid" | "Pending" | "Failed";
};
 
const sampleData: Row[] = [
  { id: 1, name: "Alice", dob: "6/10/2020", company:"xx", working:"core", email: "alice@example.com", amount: 250, status: "Paid" },
  { id: 2, name: "Bob", dob: "03/08/2020", company:"xx", working:"core", email: "bob@example.com", amount: 120, status: "Pending" },
  { id: 3, name: "Carol", dob: "06/10/2020", company:"xx", working:"core", email: "carol@example.com", amount: 350, status: "Paid" },
];
 
const ExcelExportTable: FC = () => {
  const data = useMemo(() => sampleData, []);
 
  return (
    <div className="w-full bg-gray-50 p-2">
      <div className="w-full bg-white border rounded-lg shadow-sm p-3">
 
        {/* Header */}
        <div className="flex flex-col gap-2 mb-3">
          <h2 className="text-base font-semibold text-gray-900">Payments</h2>
 
          <Button
            label="Excel"
            icon="pi pi-file-excel"
            className="p-button-success p-button-sm w-24"
            onClick={() => exportToExcel(data, "payments")}
          />
        </div>
 
        {/* Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[450px]">
            <DataTable value={data}
            >
              <Column field="id" header="ID" />
              <Column field="name" header="Name" />
              <Column field="email" header="Email" />
              <Column field="dob" header="DOB" />
              <Column field="working" header="Company Name" />
              <Column field="company" header="Cnamr" />
              <Column
                field="amount"
                header="Amount"
                body={(r: Row) => `₹ ${r.amount}`}
              />
              <Column
                field="status"
                header="Status"
                body={(r: Row) => (
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      r.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                )}
              />
            </DataTable>
          </div>
        </div>
 
       
      </div>
    </div>
  );
};
 
export default ExcelExportTable;
 
 