import React, { useState } from "react";
import { PiWarning } from "react-icons/pi";
import ReusableCrudTable, { type CrudColumn } from "../../HOC/ReusableDataTable/ReusableDataTable";

interface TrialBalanceItem {
  account: string;
  type: string;
  debit: string;
  credit: string;
}

const TrialBalance: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading] = useState(false);
  const [page, setPage] = useState(0);

  const data: TrialBalanceItem[] = [
    { account: "Cash", type: "Asset", debit: "$32,500", credit: "-" },
    { account: "Accounts Receivable", type: "Asset", debit: "$5,700", credit: "-" },
    { account: "Equipment", type: "Asset", debit: "$35,000", credit: "-" },
    { account: "Deferred Revenue", type: "Liability", debit: "-", credit: "$8,500" },
    { account: "Accounts Payable", type: "Liability", debit: "-", credit: "$4,050" },
    { account: "Owner's Equity", type: "Equity", debit: "-", credit: "$65,000" },
    { account: "Recurring Revenue", type: "Revenue", debit: "-", credit: "$11,400" },
    { account: "Setup Revenue", type: "Revenue", debit: "-", credit: "$2,500" },
    { account: "Rent Expense", type: "Expense", debit: "$3,200", credit: "-" },
    { account: "Marketing Tools Expense", type: "Expense", debit: "$850", credit: "-" },
    { account: "Contract Fulfillment Costs", type: "Expense", debit: "$2,200", credit: "-" },
  ];

  const columns: CrudColumn<TrialBalanceItem>[] = [
    { field: "account", header: "Account", sortable: true },
    { 
      field: "type", 
      header: "Type", 
      sortable: true,
      body: (rowData) => (
        <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] text-gray-600">
          {rowData.type}
        </span>
      )
    },
    { 
      field: "debit", 
      header: "Debit", 
      sortable: true,
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' }
    },
    { 
      field: "credit", 
      header: "Credit", 
      sortable: true,
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' }
    },
  ];

  const totals = {
    debit: "$79,450",
    credit: "$91,450"
  };

  const balanceCheck = {
    difference: "$12,000",
    status: "Unbalanced"
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-(--surface-border) rounded-(--border-radius) shadow-sm overflow-hidden  hover:-translate-y-1 hover:shadow-lg">
        <div className="p-2">
          <ReusableCrudTable
            data={data}
            columns={columns}
            dataKey="account"
            totalRecords={data.length}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            loading={loading}
            page={page}
            rows={20}
            onPageChange={(e) => setPage(e.page)}
            toolbar={true}
            title={
              <div className="px-4">
                <h2 className="text-xl font-bold text-gray-800">Trial Balance</h2>
                <p className="text-sm text-gray-400 mt-1">As of {new Date().toLocaleDateString()}</p>
              </div>
            }
            onExport={true}
            showSearch={false}
            showGridlines={false}
            paginator={false}
            isCard={false}
          />
        </div>

        {/* TOTALS ROW */}
        <div className="px-10 py-4 bg-gray-50/50 border-t border-(--surface-border) flex justify-between items-center text-sm font-bold text-gray-800">
          <div className="uppercase tracking-wider">Totals</div>
          <div className="flex gap-24">
            <div className="w-24 text-right">{totals.debit}</div>
            <div className="w-24 text-right">{totals.credit}</div>
          </div>
        </div>

        {/* BALANCE CHECK SECTION */}
        <div className="p-6 bg-red-50/30 border-t border-(--surface-border)">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-sm font-bold text-gray-800">Balance Check:</span>
              <p className="text-sm text-red-500 font-medium">Difference: {balanceCheck.difference}</p>
            </div>
            <div className="flex items-center gap-2 text-red-600 font-bold bg-white px-3 py-1.5 rounded-lg border border-red-100 shadow-sm">
              <PiWarning size={16} />
              <span>{balanceCheck.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBalance;
